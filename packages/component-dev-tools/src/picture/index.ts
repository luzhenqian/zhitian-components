import { css, html, LitElement } from "lit";
import { createRef, ref } from "lit/directives/ref";
import {
  customElement,
  property,
  query,
  state,
} from "../../../../node_modules/lit/decorators";

interface CheckItem {
  value: string;
  label: string;
}

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
    .preview {
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: Number }) max: Number = 20; // MB
  @property({ type: Array }) accept: FileType[] = [FileType["*"]];
  @property({ type: String }) uploadText: String = "上传图片"; // MB
  @property({ type: String }) uploadingText: String = "上传中"; // MB
  @state() stat: Stat = Stat.Init;
  @state() preview: HTMLImageElement | null = null;
  @state() pictureURL: string | null = null;
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
          : this.stat === Stat.Success
          ? html`${this.preview}`
          : null
      }
        
      <input ${ref(this.inputRef)} 
      type="file" 
      style="display: none;"
      accept="${this.accept.map((type) => `image/${type}`).join(", ")}"
      @change="${this.fileChange}"></input>
    </div>`;
  }

  uploadFile(item: CheckItem) {
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
      setTimeout(() => {
        this.preview = document.createElement("img");
        this.preview.className = "preview";
        this.preview.src = URL.createObjectURL(file);
        this.stat = Stat.Success;
      }, 2000);
      return;
    }
    this.stat = Stat.Failed;
  }

  validPicture(file: File) {
    const sizeMB = file.size / 1024 / 1024;
    if (!(sizeMB < this.max)) {
      return false;
    }
    return true;
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
