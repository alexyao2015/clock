import { html, css, LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("punch-app")
export class PunchApp extends LitElement {
  @property({ attribute: false })
  private interval!: NodeJS.Timer;

  @property({ type: String })
  time = new Date().toLocaleTimeString();

  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 250);
  }
  disconnectedCallback() {
    clearInterval(this.interval);
    super.disconnectedCallback();
  }

  static styles = css`
    :host {
      display: block;
      // border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  render() {
    return html`<h1>It is currently ${this.time}</h1>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "punch-app": PunchApp;
  }
}
