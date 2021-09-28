import { DomUtils } from "../common/dom-utils";

export class Spinner {  
  static readonly spinnerHtml = /*html*/`
  <div class="abs-full-size-overlay">
    <div class="spinner">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  `;

  protected readonly _spinnerElement: HTMLElement;
  protected _isShown: boolean;

  constructor() {    
    this._spinnerElement = DomUtils.htmlToElements(Spinner.spinnerHtml)[0];
  }

  show(parent: HTMLElement, zIndex = 8) {
    if (this._isShown || !parent) {
      return;
    }

    this._spinnerElement.style.zIndex = zIndex + "";
    this._spinnerElement.style.top = parent.scrollTop + "px";
    this._spinnerElement.style.left = parent.scrollLeft + "px";
    parent.append(this._spinnerElement);
    this._isShown = true;
  }

  hide() {
    this._spinnerElement.remove();
    this._isShown = false;
  }
}
