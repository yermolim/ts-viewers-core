import { Icons } from "../assets/icons";
import { CanvasSmoothPathEditor } from "../components/canvas-smooth-path-editor";
import { Spinner } from "../components/spinner";
import { DomUtils } from "../common/dom-utils";
import { CustomStampCreationInfo } from "../drawing/stamps";
import { UUID } from "../common/uuid";
import { EventService } from "./event-service";

const stampImageLoaderHtml = /*html*/`
  <div class="abs-full-size-overlay stamp-dialog">
    <div class="form">
      <div class="form-canvas-wrapper">
        <canvas class="abs-ratio-canvas"></canvas>
      </div>
      <div class="stamp-input-row">
        <p>Stamp name:</p>
        <input class="stamp-name-input" type="text" maxlength="128"/>
      </div>
      <div class="stamp-input-row">
        <p>Stamp description:</p>
        <input class="stamp-subject-input" type="text" maxlength="256"/>
      </div>
      <div class="stamp-input-row">
        <p>Width:</p>
        <input class="stamp-width-input" type="text" maxlength="4"/>
        <p>Height:</p>
        <input class="stamp-height-input" type="text" maxlength="4"/>
      </div>
      <div class="buttons">
        <div class="panel-button stamp-ok">
          <img src="${Icons.icon_ok}"/>
        </div>
        <div class="panel-button stamp-cancel">
          <img src="${Icons.icon_close}"/>
        </div>
      </div>
    </div>
  </div>
`;

const stampDesignerHtml = /*html*/`
  <div class="abs-full-size-overlay stamp-dialog">
    <div class="form">
      <div class="form-canvas-wrapper">
      </div>
      <div class="stamp-input-row">
        <p>Stamp name:</p>
        <input class="stamp-name-input" type="text" maxlength="128"/>
      </div>
      <div class="stamp-input-row">
        <p>Stamp description:</p>
        <input class="stamp-subject-input" type="text" maxlength="256"/>
      </div>
      <div class="stamp-input-row">
        <p>Width:</p>
        <input class="stamp-width-input" type="text" maxlength="4"/>
        <p>Height:</p>
        <input class="stamp-height-input" type="text" maxlength="4"/>
      </div>
      <div class="buttons">
        <div class="panel-button stamp-ok">
          <img src="${Icons.icon_ok}"/>
        </div>
        <div class="panel-button stamp-cancel">
          <img src="${Icons.icon_close}"/>
        </div>
      </div>
    </div>
  </div>
`;

//#region custom events
export const customStampEvent = "tsviewer-customstampchange" as const;

export interface CustomStampEventDetail {
  type: "add" | "delete";
  stamp: CustomStampCreationInfo;
}

export class CustomStampEvent extends CustomEvent<CustomStampEventDetail> {
  constructor(detail: CustomStampEventDetail) {
    super(customStampEvent, {detail});
  }
}
//#endregion

/**
 * class used for managing custom data used for stamp annotations
 */
export class CustomStampService {
  private readonly _container: HTMLElement;
  private readonly _eventService: EventService;

  private readonly _customStampsByType = new Map<string, CustomStampCreationInfo>();
  private readonly _fileInput: HTMLInputElement;
  
  private readonly _spinner = new Spinner();

  private _overlay: HTMLElement;

  constructor(container: HTMLElement, eventService: EventService) {
    if (!container) {
      throw new Error("Container is not defined");
    }
    if (!eventService) {
      throw new Error("Event service is not defined");
    }

    this._container = container;
    this._eventService = eventService;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.classList.add("abs-hidden");

    this._fileInput = fileInput;
    this._fileInput.addEventListener("change", this.onFileInput);
    this._container.append(this._fileInput);
  }  

  /**
   * free resources
   */
  destroy() {
    this._fileInput.remove();
    this._spinner.hide();
    this._overlay?.remove();
  }

  /**
   * append custom stamps to the inner collection (without emitting events).
   * @param stamps custom stamp information array
   */
  importCustomStamps(stamps: CustomStampCreationInfo[]) {
    if (stamps?.length) {
      stamps.forEach(x => {
        this._customStampsByType.set(x.type, x);
      });
    }
  }
  
  /**
   * get the copy of the inner custom stamp collection
   * @returns copy of the inner custom stamp collection
   */
  getCustomStamps(): CustomStampCreationInfo[] {
    return [...this._customStampsByType.values()];
  }
  
  /**
   * add a new custom stamp to the inner collection (emits a corresponding event)
   * @param stamp information about the custom stamp
   */
  addCustomStamp(stamp: CustomStampCreationInfo) {
    this._customStampsByType.set(stamp.type, stamp);
    this._eventService.dispatchEvent(new CustomStampEvent({
      type: "add",
      stamp: stamp,
    }));
  }
  
  /**
   * delete a custom stamp from the inner collection by its type (emits a corresponding event)
   * @param type 
   */
  removeCustomStamp(type: string) {
    const stamp = this._customStampsByType.get(type);
    if (!stamp) {
      return;
    }
    this._customStampsByType.delete(type);
    this._eventService.dispatchEvent(new CustomStampEvent({
      type: "delete",
      stamp: stamp,
    }));
  }

  /**
   * start the chain of creating a custom stamp from a loaded image
   */
  startLoadingImage() {
    this._fileInput.click();
  }
  
  /**
   * start the chain of creating a custom stamp from a pen drawing
   */
  startDrawing() {
    this.openDesignerOverlayAsync();
  }

  private onFileInput = () => {
    const files = this._fileInput.files;    
    if (files.length === 0) {
      return;
    }

    this.openImageLoaderOverlayAsync(files[0]);
    this._fileInput.value = null;
  };

  // TODO: move to the separate class
  private async openImageLoaderOverlayAsync(file: File) {
    // show spinner while an image is being loaded
    this._spinner.show(this._container, 10);
    
    // load the image
    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const url = URL.createObjectURL(file);  
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = (e: any) => {
        console.log(e);        
        reject();
      };
      img.src = url;
    });
    let image: HTMLImageElement;
    try {
      image = await imagePromise;   
    } catch {
      // cancel the operation if the image cannot be loaded
      this._spinner.hide();
      return;
    }
    const imageWidth = image.width;
    const imageHeight = image.height;
    const imageRatio = image.width / image.height;

    // build an overlay
    const overlay = DomUtils.htmlToElements(stampImageLoaderHtml)[0];

    // select the overlay elements
    const canvas = overlay.querySelector("canvas") as HTMLCanvasElement;
    const cancelButton = overlay.querySelector(".stamp-cancel");
    const okButton = overlay.querySelector(".stamp-ok");   
    const nameInput = overlay.querySelector(".stamp-name-input") as HTMLInputElement;   
    const subjectInput = overlay.querySelector(".stamp-subject-input") as HTMLInputElement;   
    const widthInput = overlay.querySelector(".stamp-width-input") as HTMLInputElement;   
    const heightInput = overlay.querySelector(".stamp-height-input") as HTMLInputElement; 

    // declare the variables that will be used to create a stamp creation information
    // and set the default values
    let stampName = "Custom stamp";
    let stampSubject = "image stamp";
    let stampWidth = 64;
    let stampHeight = +(64 / imageRatio).toFixed();
    nameInput.value = stampName;    
    widthInput.value = stampWidth + "";
    heightInput.value = stampHeight + "";    

    // append the overlay to the parent container
    this._overlay = overlay;
    this._container.append(overlay);

    // set the image to the canvas
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    // get the image data
    const imgData = ctx.getImageData(0, 0, image.width, image.height).data;

    // form validation
    const validate = () => {
      if (!stampName
        || (!stampHeight || isNaN(stampHeight))
        || (!stampWidth || isNaN(stampWidth))) {
        okButton.classList.add("disabled");
      } else {
        okButton.classList.remove("disabled");
      }
    };    
    nameInput.addEventListener("input", () => {
      stampName = nameInput.value;
      validate();
    });
    subjectInput.addEventListener("input", () => {
      stampSubject = subjectInput.value;
      validate();
    });
    widthInput.addEventListener("input", () => {
      stampWidth = +(+widthInput.value)?.toFixed();
      validate();
    });
    heightInput.addEventListener("input", () => {
      stampHeight = +(+heightInput.value)?.toFixed();
      validate();
    });

    // function to hide the overlay
    const hide = () => {
      overlay.remove();
      this._overlay = null;
    };

    cancelButton.addEventListener("click", hide);
    okButton.addEventListener("click", () => {
      // create a stamp creation information and add it to inner collection
      const imageDataArray = new Array<number>(imgData.length);
      for (let i = 0; i < imgData.length; i++) {
        imageDataArray[i] = imgData[i];
      }
      const stamp: CustomStampCreationInfo = {
        type: "/" + UUID.getRandomUuid(),
        name: stampName,
        subject: stampSubject,
        rect: [0, 0, stampWidth, stampHeight],
        bbox: [0, 0, imageWidth, imageHeight],
        imageData: imageDataArray,
      };
      this.addCustomStamp(stamp);
      hide();
    });

    this._spinner.hide();
  }
  
  // TODO: move to the separate class
  private async openDesignerOverlayAsync() {
    // show spinner while an image is being loaded
    this._spinner.show(this._container, 10);
    
    // load the image

    // build an overlay
    const overlay = DomUtils.htmlToElements(stampDesignerHtml)[0];

    // select the overlay elements
    const canvasContainer = overlay.querySelector(".form-canvas-wrapper") as HTMLElement;
    const cancelButton = overlay.querySelector(".stamp-cancel") as HTMLDivElement;
    const okButton = overlay.querySelector(".stamp-ok") as HTMLDivElement;   
    const nameInput = overlay.querySelector(".stamp-name-input") as HTMLInputElement;   
    const subjectInput = overlay.querySelector(".stamp-subject-input") as HTMLInputElement;   
    const widthInput = overlay.querySelector(".stamp-width-input") as HTMLInputElement;   
    const heightInput = overlay.querySelector(".stamp-height-input") as HTMLInputElement;

    // declare the variables that will be used to create a stamp creation information
    // and set the default values
    let stampName = "Custom stamp";
    let stampSubject = "drawing stamp";
    let stampWidth = 64;
    let stampHeight = 64;
    nameInput.value = stampName;    
    widthInput.value = stampWidth + "";
    heightInput.value = stampHeight + "";   
     
    // init drawing canvas
    const editor = new CanvasSmoothPathEditor(canvasContainer, {
      canvasWidth: stampWidth,
      canvasHeight: stampHeight,
    }); 

    // append the overlay to the parent container
    this._overlay = overlay;
    this._container.append(overlay);

    const updateCanvasSize = () => {
      editor.canvasSize = [stampWidth, stampHeight];
    };

    // form validation
    const validate = () => {
      if (!stampName
        || (!stampHeight || isNaN(stampHeight))
        || (!stampWidth || isNaN(stampWidth))) {
        okButton.classList.add("disabled");
      } else {
        updateCanvasSize();
        okButton.classList.remove("disabled");
      }
    };    
    nameInput.addEventListener("input", () => {
      stampName = nameInput.value;
      validate();
    });
    subjectInput.addEventListener("input", () => {
      stampSubject = subjectInput.value;
      validate();
    });
    widthInput.addEventListener("input", () => {
      stampWidth = +(+widthInput.value)?.toFixed();
      validate();
    });
    heightInput.addEventListener("input", () => {
      stampHeight = +(+heightInput.value)?.toFixed();
      validate();
    });

    // function to hide the overlay
    const hide = () => {
      overlay.remove();
      this._overlay = null;
    };

    cancelButton.addEventListener("click", hide);
    okButton.addEventListener("click", () => {
      // get the image data
      const imgData = editor.getImageData();
      // create a stamp creation information and add it to inner collection
      const imageDataArray = new Array<number>(imgData.length);
      for (let i = 0; i < imgData.length; i++) {
        imageDataArray[i] = imgData[i];
      }
      const stamp: CustomStampCreationInfo = {
        type: "/" + UUID.getRandomUuid(),
        name: stampName,
        subject: stampSubject,
        rect: [0, 0, stampWidth, stampHeight],
        bbox: [0, 0, stampWidth, stampHeight],
        imageData: imageDataArray,
      };
      this.addCustomStamp(stamp);
      hide();
    });

    this._spinner.hide();
  }
}
