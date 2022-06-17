import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import { customElement } from "lit/decorators.js";
import { LitElement, html, css } from "lit";

@customElement("user-interface")
export default class UserInterface extends LitElement {
  render() {
    return html`<main>testtaa</main>`;
  }
  static get styles() {
    return [bootstrap];
  }
}
