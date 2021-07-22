/// <reference path="./assets.d.ts" />

import { Icons } from "./icons";

export class HtmlTemplates {
  static readonly textDialogHtml =  /*html*/`
    <div class="abs-full-size-overlay text-dialog">
      <div class="form">
        <textarea class="text-input" maxlength="1024"></textarea>
        <div class="buttons">
          <div class="panel-button text-ok">
            <img src="${Icons.icon_ok}"/>
          </div>
          <div class="panel-button text-cancel">
            <img src="${Icons.icon_close}"/>
          </div>
        </div>
      </div>
    </div>
  `;

  static readonly stampContextButtonsHtml = /*html*/`
    <div class="context-menu-content row">
      <div class="panel-button stamp-load-image">
        <img src="${Icons.icon_load}"/>
      </div>
      <div class="panel-button stamp-draw-image">
        <img src="${Icons.icon_pen}"/>
      </div>
      <div class="panel-button stamp-delete disabled">
        <img src="${Icons.icon_delete}"/>
      </div>
    </div>
  `;
}

