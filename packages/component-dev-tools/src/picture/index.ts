import { css, html, LitElement } from "lit";
import { createRef, ref } from "../../../../node_modules/lit/directives/ref";
import {
  customElement,
  property,
  query,
  state,
} from "../../../../node_modules/lit/decorators";

enum Stat {
  Init,
  Loading,
  Success,
  Failed,
}

enum FileType {
  "*" = "*",
  jpeg = "jpeg",
  png = "png",
}

@customElement("zt-picture")
export default class Picture extends LitElement {
  static styles = css`
    .container {
      width: 128px;
      height: 128px;
      background-color: var(--ztcdt-disable-text-color);
      border-radius: 4px;
      border: 2px dashed var(--ztcdt-hight-text-color);
      cursor: pointer;
      position: relative;
    }
    .add {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .icon {
      width: 32px;
      height: 32px;
      fill: var(--ztcdt-middle-text-color);
    }
    .preview-wrap {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .preview {
      width: 100%;
    }
    .preview-action {
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.4;
      position: absolute;
      top: 0;
      justify-content: center;
      align-items: center;
      cursor: default;
    }
    .preview-action .icon {
      width: 24px;
      height: 24px;
      fill: #ffffff;
      cursor: pointer;
      margin: 0 6px;
    }
    .loading-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
    .loading-text {
      color: var(--ztcdt-hight-text-color);
    }
  `;

  @property({ type: Number }) max: Number = 20; // MB
  @property({ type: Array }) accept: FileType[] = [FileType["*"]];
  @property({ type: String }) uploadText: string = "上传图片";
  @property({ type: String }) uploadingText: string = "上传中";
  @property({ type: String }) url: string = "";
  @property({ type: Object }) headers: any = {};

  @state() stat: Stat = Stat.Init;
  @state() previewEl: HTMLImageElement | null = null;
  @state() pictureFile: File | null = null;
  @state() previewActionVisible = false;
  @state() progress = 0;
  inputRef = createRef<HTMLInputElement>();

  render() {
    return html`<div class="container">
      ${
        this.stat === Stat.Init
          ? html`
              <div class="add" @click="${this.uploadFile}">
                ${add}
                <span>${this.uploadText}</span>
              </div>
            `
          : this.stat === Stat.Loading
          ? html`<div class="loading-wrap">
              <zt-loading></zt-loading>
              <span class="loading-text">已上传 ${this.progress} %</span>
            </div>`
          : this.stat === Stat.Success
          ? html`<div
              class="preview-wrap"
              @mouseenter=${() => (this.previewActionVisible = true)}
              @mouseleave=${() => (this.previewActionVisible = false)}
            >
              ${this.previewEl}
              <div
                class="preview-action"
                style="display: ${this.previewActionVisible ? "flex" : "none"};"
              >
                <a @click=${this.preview}>${preview}</a>
                <a @click=${this.remove}>${del}</a>
              </div>
            </div> `
          : null
      }
        
      <input ${ref(this.inputRef)} 
      type="file" 
      style="display: none;"
      accept="${this.accept.map((type) => `image/${type}`).join(", ")}"
      @change="${this.fileChange}"></input>
    </div>`;
  }

  uploadFile() {
    const fileInput = this.inputRef.value;
    if (fileInput) {
      fileInput.click();
    }
  }

  fileChange() {
    const files = this.inputRef?.value?.files;
    if (!files) return;
    const file = files[0];
    if (this.validPicture(file)) {
      this.stat = Stat.Loading;

      this.pictureFile = file;

      this.upload();

      return;
    }
    this.stat = Stat.Failed;
  }

  uploadSuccess() {
    this.previewEl = document.createElement("img");
    this.previewEl.className = "preview";
    this.previewEl.src = URL.createObjectURL(this.pictureFile);
    this.stat = Stat.Success;
  }

  validPicture(file: File) {
    const sizeMB = file.size / 1024 / 1024;
    if (!(sizeMB < this.max)) {
      return false;
    }
    return true;
  }

  preview() {
    const modal = document.createElement("zt-modal");
    if (this.previewEl) {
      modal.appendChild(this.previewEl.cloneNode());
      document.body.appendChild(modal);
    }
  }

  remove() {
    this.previewEl = null;
    this.stat = Stat.Init;
  }

  upload() {
    if (!this.pictureFile) return;

    const formData = new FormData();
    formData.append("file", this.pictureFile);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.uploadSuccess();
        console.log("upload success");
        return;
      }
      this.stat = Stat.Failed;
      console.log("upload failed");
    };

    for (let key in this.headers) {
      // TODO
      // formData.append(key, this.headers[key]);
      xhr.setRequestHeader(key, this.headers[key]);
    }

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        this.progress = Math.floor((e.loaded / e.total) * 100);
      }
    };

    xhr.send(formData);
  }
}

const add = html`<svg
  t="1625108246764"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="3008"
>
  <path
    d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
    p-id="3009"
  ></path>
</svg>`;

const del = html`<svg
  t="1625119275683"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="3155"
>
  <path
    d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"
    p-id="3156"
  ></path>
  <path
    d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z"
    p-id="3157"
  ></path>
</svg>`;

const preview = html`<svg
  t="1625119346296"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="3307"
>
  <path
    d="M512 836.266667C230.4 836.266667 74.666667 533.333333 68.266667 520.533333c-4.266667-8.533333-4.266667-19.2 0-29.866666 6.4-12.8 164.266667-315.733333 443.733333-315.733334 281.6 0 437.333333 305.066667 443.733333 317.866667 4.266667 8.533333 4.266667 19.2 0 29.866667-6.4 10.666667-162.133333 313.6-443.733333 313.6zM132.266667 505.6c34.133333 57.6 170.666667 266.666667 379.733333 266.666667s345.6-209.066667 379.733333-266.666667c-34.133333-57.6-170.666667-266.666667-379.733333-266.666667S166.4 448 132.266667 505.6z"
    p-id="3308"
  ></path>
  <path
    d="M512 650.666667c-76.8 0-138.666667-61.866667-138.666667-138.666667s61.866667-138.666667 138.666667-138.666667 138.666667 61.866667 138.666667 138.666667-61.866667 138.666667-138.666667 138.666667z m0-213.333334c-40.533333 0-74.666667 34.133333-74.666667 74.666667s34.133333 74.666667 74.666667 74.666667 74.666667-34.133333 74.666667-74.666667-34.133333-74.666667-74.666667-74.666667z"
    p-id="3309"
  ></path>
</svg>`;
