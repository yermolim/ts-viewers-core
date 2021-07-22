import { Vec2 } from "mathador";

export interface BBox {
  /**lower-left corner coords */
  ll: Vec2; 
  /**lower-right corner coords */
  lr: Vec2; 
  /**upper-right corner coords */
  ur: Vec2; 
  /**upper-left corner coords */
  ul: Vec2;
}
