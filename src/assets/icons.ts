/// <reference path="./assets.d.ts" />

import icon_arrow from "./icons/arrow.png";
import icon_arrow_up from "./icons/arrow-up.png";
import icon_arrow_down from "./icons/arrow-down.png";
import icon_arrow_left from "./icons/arrow-left.png";
import icon_arrow_right from "./icons/arrow-right.png";
import icon_back from "./icons/back.png";
import icon_caret from "./icons/caret.png";
import icon_circle from "./icons/circle.png";
import icon_clockwise from "./icons/clockwise.png";
import icon_compare from "./icons/compare.png";
import icon_counter_clockwise from "./icons/counter-clockwise.png";
import icon_close from "./icons/close.png";
import icon_close2 from "./icons/close2.png";
import icon_cloudy from "./icons/line-cloudy.png";
import icon_delete from "./icons/delete.png";
import icon_download from "./icons/download.png";
import icon_fit_page from "./icons/fit-page.png";
import icon_fit_viewer from "./icons/fit-viewer.png";
import icon_geometric from "./icons/geometric.png";
import icon_hand from "./icons/hand.png";
import icon_line from "./icons/line.png";
import icon_load from "./icons/load.png";
import icon_minus from "./icons/minus.png";
import icon_ok from "./icons/ok.png";
import icon_pen from "./icons/pen.png";
import icon_plus from "./icons/plus.png";
import icon_pointer from "./icons/pointer.png";
import icon_polygon from "./icons/polygon.png";
import icon_polyline from "./icons/polyline.png";
import icon_popup from "./icons/popup.png";
import icon_popup2 from "./icons/popup2.png";
import icon_sidebar from "./icons/sidebar.png";
import icon_square from "./icons/square.png";
import icon_stamp from "./icons/stamp.png";
import icon_straight from "./icons/line-straight.png";
import icon_text from "./icons/text.png";
import icon_text2 from "./icons/text2.png";
import icon_text_free from "./icons/text-free.png";
import icon_text_callout from "./icons/text-callout.png";
import icon_text_highlight from "./icons/text-highlight.png";
import icon_text_squiggly from "./icons/text-squiggly.png";
import icon_text_strikeout from "./icons/text-strikeout.png";
import icon_text_underline from "./icons/text-underline.png";

export class Icons {
  static readonly icon_arrow = icon_arrow;
  static readonly icon_arrow_up = icon_arrow_up;
  static readonly icon_arrow_down = icon_arrow_down;
  static readonly icon_arrow_left = icon_arrow_left;
  static readonly icon_arrow_right = icon_arrow_right;
  static readonly icon_back = icon_back;
  static readonly icon_caret = icon_caret;
  static readonly icon_circle = icon_circle;
  static readonly icon_clockwise = icon_clockwise;
  static readonly icon_counter_clockwise = icon_counter_clockwise;
  static readonly icon_compare = icon_compare;
  static readonly icon_close = icon_close;
  static readonly icon_close2 = icon_close2;
  static readonly icon_cloudy = icon_cloudy;
  static readonly icon_delete = icon_delete;
  static readonly icon_download = icon_download;
  static readonly icon_fit_page = icon_fit_page;
  static readonly icon_fit_viewer = icon_fit_viewer;
  static readonly icon_geometric = icon_geometric;
  static readonly icon_hand = icon_hand;
  static readonly icon_line = icon_line;
  static readonly icon_load = icon_load;
  static readonly icon_minus = icon_minus;
  static readonly icon_ok = icon_ok;
  static readonly icon_pen = icon_pen;
  static readonly icon_plus = icon_plus;
  static readonly icon_pointer = icon_pointer;
  static readonly icon_polygon = icon_polygon;
  static readonly icon_polyline = icon_polyline;
  static readonly icon_popup = icon_popup;
  static readonly icon_popup2 = icon_popup2;
  static readonly icon_sidebar = icon_sidebar;
  static readonly icon_square = icon_square;
  static readonly icon_stamp = icon_stamp;
  static readonly icon_straight = icon_straight;
  static readonly icon_text = icon_text;
  static readonly icon_text2 = icon_text2;
  static readonly icon_text_free = icon_text_free;
  static readonly icon_text_callout = icon_text_callout;
  static readonly icon_text_highlight = icon_text_highlight;
  static readonly icon_text_squiggly = icon_text_squiggly;
  static readonly icon_text_strikeout = icon_text_strikeout;
  static readonly icon_text_underline = icon_text_underline;
  
  static readonly geometricIcons = {
    square: `<img src="${Icons.icon_square}"/>`,
    circle: `<img src="${Icons.icon_circle}"/>`,
    line: `<img src="${Icons.icon_line}"/>`,
    arrow: `<img src="${Icons.icon_arrow}"/>`,
    polyline: `<img src="${Icons.icon_polyline}"/>`,
    polygon: `<img src="${Icons.icon_polygon}"/>`,
  } as const;

  static readonly textIcons = {
    note: `<img src="${Icons.icon_popup2}"/>`,
    freeText: `<img src="${Icons.icon_text_free}"/>`,
    freeTextCallout: `<img src="${Icons.icon_text_callout}"/>`,
    strikeout: `<img src="${Icons.icon_text_strikeout}"/>`,
    squiggly: `<img src="${Icons.icon_text_squiggly}"/>`,
    underline: `<img src="${Icons.icon_text_underline}"/>`,
    highlight: `<img src="${Icons.icon_text_highlight}"/>`,
  } as const;

  static readonly lineTypeIcons = {  
    straight: `<img src="${Icons.icon_straight}"/>`,
    cloudy: `<img src="${Icons.icon_cloudy}"/>`,
  } as const;

  static readonly editIcons = {  
    close: `<img src="${Icons.icon_close}"/>`,
    ok: `<img src="${Icons.icon_ok}"/>`,
    back: `<img src="${Icons.icon_back}"/>`,
    delete: `<img src="${Icons.icon_delete}"/>`,
  } as const;
}
