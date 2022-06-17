import { html, css, LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./punch-login";
import "@vaadin/text-field";
import "@vaadin/button";
import { SigninEvent } from "./types";

@customElement("punch-app")
export class PunchApp extends LitElement {
  @property({ attribute: false })
  private interval!: NodeJS.Timer;

  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => {
      this.time = new Date().toLocaleTimeString();
    }, 1000);
    window.addEventListener("signin", this._onSignin);
  }
  disconnectedCallback() {
    clearInterval(this.interval);
    window.removeEventListener("signin", this._onSignin);
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

  @property()
  name = "World";

  @property({ type: Number })
  count = 0;

  @property({ type: String })
  time = new Date().toLocaleTimeString();

  @property({ type: Boolean })
  isSignedIn = false;

  render() {
    let base = html`<h1>It is currently ${this.time}</h1>`;
    if (!this.isSignedIn) {
      return html`
        ${base}
        <punch-login></punch-login>
      `;
    } else {
      return html`
        ${base}
        <h1>Hello ${this.name}, ${this.count}!</h1>
        <vaadin-text-field
          label="Name"
          @change="${this._setName}"
          value="${this.name}"
        ></vaadin-text-field>
        <vaadin-button @click="${this._onClick}">Button</vaadin-button>
      `;
    }
  }

  private _onSignin(e: SigninEvent) {
    this.isSignedIn = e.detail.isSignedIn;
    e.stopPropagation();
    console.log("Signin event", e);
  }

  private _onClick() {
    this.count++;
  }

  private _setName(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }
}
