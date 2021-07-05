import { LitElement } from "lit";

export default class ZTComponent extends LitElement {
  stylesConfig: {} = {};

  constructor() {
    super();
    if (!("dataConfig" in this.constructor)) {
      throw new Error("data config is not found!");
    }
    if (!("stylesConfig" in this.constructor)) {
      throw new Error("styles config is not found!");
    }
    if (!("data" in this)) {
      throw new Error("data default is not found!");
    }
    if (!("styles" in this)) {
      throw new Error("styles default is not found!");
    }
  }
}
