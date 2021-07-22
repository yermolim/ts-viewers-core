import { v4 as uuidV4 } from "uuid";

export class UUID {
  /* eslint-disable no-bitwise */
  static getRandomUuid(): string {
    // return crypto.getRandomValues(new Uint32Array(4)).join("-");
    return uuidV4();
  }
}
