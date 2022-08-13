export class DomUtils {
  /**
   * create HTML elements from HTML string
   * @param html HTML string
   * @returns HTML element array
   */
  static htmlToElements(html: string): HTMLElement[] {
    const template = document.createElement("template");
    template.innerHTML = html;
    const nodes: HTMLElement[] = [];
    template.content.childNodes.forEach(x => {
      if (x instanceof HTMLElement) { 
        nodes.push(x);
      }
    });
    return nodes;
  }
  
  /**
   * wrap callback with setTimeout inside Promise<T>
   * @param callback 
   * @returns 
   */
  static async promisify<T>(callback: () => T): Promise<T> {
    return new Promise<T>(resolve => {
      setTimeout(() => {
        const result = callback();
        resolve(result);
      }, 0);
    });
  }
  
  /**
   * calls empty setTimeout to force DOM refresh
   */
  static async runEmptyTimeout() {
    await this.promisify(() => undefined);
  }
  
  /**create a temp download link and click on it */
  static downloadFile(blob: Blob, name?: string) {
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.setAttribute("download", name);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
  
  static async loadImageAsync(url: string, revoke = false): Promise<HTMLImageElement> {  
    const loadedImage = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onerror = (e: string | Event, error?: any) => {
        if (revoke) {        
          URL.revokeObjectURL(url);
        }
        console.log(`Error while loading image: ${error?.message || e.toString()}`);
        resolve(null);
      };
      image.onload = () => {
        if (revoke) {        
          URL.revokeObjectURL(url);
        }
        resolve(image);
      };
      image.src = url;
    });
  
    return loadedImage;
  } 

  static async loadFileDataAsync(src: string | Blob | Uint8Array): Promise<Uint8Array> {    
    let data: Uint8Array;
    if (src instanceof Uint8Array) {
      data = src;
    } else {
      let blob: Blob;  
      if (typeof src === "string") {
        const res = await fetch(src);
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        blob = await res.blob();
      } else {
        blob = src;
      }  
      const buffer = await blob.arrayBuffer();
      data = new Uint8Array(buffer);
    }
    return data;
  }
}
