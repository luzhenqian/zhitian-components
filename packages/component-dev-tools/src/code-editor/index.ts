import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
} from "../../../../node_modules/lit/decorators";
import {
  createRef,
  Ref,
  ref,
} from "../../../../node_modules/lit/directives/ref";
import * as monaco from "monaco-editor";
import CodeMirror from "codemirror";

@customElement("zt-code-editor")
export default class CodeEditor extends LitElement {
  static styles = css``;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) height = 400;
  @property({ type: Number }) width = 400;

  containerRef: Ref<HTMLInputElement> = createRef();

  render() {
    return html`<div
      ${ref(this.containerRef)}
      style="height: ${this.height}px; width: ${this.width}px;"
    />`;
  }

  firstUpdated() {
    setTimeout(() => {
      const container = this.containerRef.value;
      if (container) {
        var myCodeMirror = CodeMirror(container, {
          value: "function myScript(){return 100;}\n",
          mode: "javascript",
        });
        // monaco.editor.create(container as HTMLElement, {
        //   theme: "vs-dark",
        //   value: ``,
        //   language: "javascript",
        //   cursorBlinking: "blink",
        // });
      }
    }, 1000);
  }
}
