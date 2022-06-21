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

  @property({ type: String })
  time = new Date().toLocaleTimeString();

  @property({ type: Boolean })
  isSignedIn = false;

  @property({ type: String })
  employeeID = "";

  render() {
    let base = html`<h1>It is currently ${this.time}</h1>`;
    if (!this.isSignedIn) {
      return html`
        ${base}
        <punch-login @signin=${this._onSignin}></punch-login>
      `;
    } else {
      return html`
        ${base}
        <h1>Hello ${this.employeeID}!</h1>
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
    this.employeeID = e.detail.employeeID;
    e.stopPropagation();
  }

  private _onClick() {
    this.count++;
  }

  private _setName(e: Event) {
    this.name = (e.target as HTMLInputElement).value;
  }
}
