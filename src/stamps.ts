import { Quadruple } from "./tuple-types";

export interface StampCreationInfo {
  subject: string;
  bbox: Quadruple;
  rect?: Quadruple;
}

export interface CustomStampCreationInfo extends StampCreationInfo {
  /**image data as a byte array (4 bytes for each pixel: RGBA) */
  imageData: number[];
  /**stamp name to use in PDF file */
  type: string;
  /**stamp name to show in user interface */
  name: string;
}
