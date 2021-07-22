/* eslint-disable no-bitwise */
export class ByteUtils {
  
  static parseIntFromBytes(bytes: Uint8Array): number {
    if (!bytes?.length) {
      return 0;
    }
    if (bytes.length === 1) {
      return bytes[0];
    }
    const hex = Array.from(bytes, (byte) => 
      ("0" + (byte & 0xFF).toString(16)).slice(-2)).join("");
    return parseInt(hex, 16);
  }
  
  static int8ToBytes(int: number): Uint8Array {
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setInt8(0, int);
    return new Uint8Array(buffer);
  }
  
  static int16ToBytes(int: number, le = false): Uint8Array {
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer);
    view.setInt16(0, int, le);
    return new Uint8Array(buffer);
  }
  
  static int32ToBytes(int: number, le = false): Uint8Array {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, int, le);
    return new Uint8Array(buffer);
  }
  
  static int32ArrayToBytes(ints: number[], le = false): Uint8Array {
    const buffer = new ArrayBuffer(ints.length * 4);
    const view = new DataView(buffer);
    for (let i = 0; i < ints.length; i++) {
      view.setInt32(i * 4, ints[i], le);
    }
    return new Uint8Array(buffer);
  }
  
  static bytesToInt32Array(bytes: Uint8Array, le = false): Int32Array {
    if (!bytes?.length) {
      return null;
    }  
  
    const buffer = new ArrayBuffer(Math.ceil(bytes.length / 4) * 4);
    const view = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
      view.setUint8(i, bytes[i]);
    }
  
    const result = new Int32Array(buffer.byteLength / 4);
    for (let j = 0; j < result.length; j++) {
      result[j] = view.getInt32(j * 4, le);
    }
    return result;
  }
  
  /**apply exclusive OR operator with the number value to every byte in the array*/
  static xorBytes(bytes: Uint8Array, n: number): Uint8Array {
    const result = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++){
      result[i] = bytes[i] ^ n;
    }
    return result;
  }
  
  static arraysEqual(a: Uint8Array, b: Uint8Array): boolean {  
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  
  static findSubarrayIndex(arr: Uint8Array, sub: Uint8Array): number { 
    if (arr?.length && sub?.length) {
      let j: number; 
      outer_loop:
      for (let i = 0; i <= arr.length; i++) {
        let overlap = false;
        for (j = 0; j < sub.length; j++) {
          if (i + j < arr.length) {
            if (arr[i + j] !== sub[j]) {
              continue outer_loop;
            }
            overlap = true;
          } else if (overlap) {
            return i;
          } else {
            break outer_loop;
          }
        }          
      }
    }
    return -1;
  }
  
  /**
   * convert "hex" string to byte array
   * @param hexString string like "03A8EF". the string length must be a multiple of two
   * @returns byte array
   */
  static hexStringToBytes(hexString: string): Uint8Array {    
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
      bytes[j] = parseInt(hexString.substr(i, 2), 16);
    } 
    return bytes;
  }
  
  //#region bit functions
  static getBit(n: number, bitPosition: number) {
    return (n & (1 << bitPosition)) === 0 ? 0 : 1;
  }
  
  static setBit(n: number, bitPosition: number) {
    return n | (1 << bitPosition);
  }
  
  static clearBit(n: number, bitPosition: number) {
    const mask = ~(1 << bitPosition);
    return n & mask;
  }
  
  static updateBit(n: number, bitPosition: number, bitValue: boolean) {
    const bitValueNormalized = bitValue ? 1 : 0;
    const clearMask = ~(1 << bitPosition);
    return (n & clearMask) | (bitValueNormalized << bitPosition);
  }
  //#endregion
}
