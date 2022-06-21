import { html, css, LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@vaadin/text-field";
import "@vaadin/button";
import { SigninEvent } from "./types";

@customElement("punch-login")
export class PunchLogin extends LitElement {
  @property({ type: String, attribute: false })
  employeeID = "";

  render() {
    return html`
      <h4>Enter your employee id to sign in</h1>
      <vaadin-text-field
        placeholder="Employee ID"
        @change="${this._setName}"
      ></vaadin-text-field>
      <vaadin-button @click="${this._onClick}">Signin</vaadin-button>
    `;
  }

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent("signin", {
        detail: { isSignedIn: true, employeeID: this.employeeID },
        bubbles: true,
        composed: true,
        cancelable: true,
      } as SigninEvent)
    );
    console.log(`signing in ${this.employeeID}`);
  }

  private _setName(e: Event) {
    this.employeeID = (e.target as HTMLInputElement).value;
  }
}
