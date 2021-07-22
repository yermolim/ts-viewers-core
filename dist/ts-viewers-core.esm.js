/**
 * MIT License
 *
 * Copyright (c) 2021-present Volodymyr Yermolenko (yermolim@gmail.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { v4 } from 'uuid';

class ByteUtils {
    static parseIntFromBytes(bytes) {
        if (!(bytes === null || bytes === void 0 ? void 0 : bytes.length)) {
            return 0;
        }
        if (bytes.length === 1) {
            return bytes[0];
        }
        const hex = Array.from(bytes, (byte) => ("0" + (byte & 0xFF).toString(16)).slice(-2)).join("");
        return parseInt(hex, 16);
    }
    static int8ToBytes(int) {
        const buffer = new ArrayBuffer(1);
        const view = new DataView(buffer);
        view.setInt8(0, int);
        return new Uint8Array(buffer);
    }
    static int16ToBytes(int, le = false) {
        const buffer = new ArrayBuffer(2);
        const view = new DataView(buffer);
        view.setInt16(0, int, le);
        return new Uint8Array(buffer);
    }
    static int32ToBytes(int, le = false) {
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setInt32(0, int, le);
        return new Uint8Array(buffer);
    }
    static int32ArrayToBytes(ints, le = false) {
        const buffer = new ArrayBuffer(ints.length * 4);
        const view = new DataView(buffer);
        for (let i = 0; i < ints.length; i++) {
            view.setInt32(i * 4, ints[i], le);
        }
        return new Uint8Array(buffer);
    }
    static bytesToInt32Array(bytes, le = false) {
        if (!(bytes === null || bytes === void 0 ? void 0 : bytes.length)) {
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
    static xorBytes(bytes, n) {
        const result = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) {
            result[i] = bytes[i] ^ n;
        }
        return result;
    }
    static arraysEqual(a, b) {
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
    static findSubarrayIndex(arr, sub) {
        if ((arr === null || arr === void 0 ? void 0 : arr.length) && (sub === null || sub === void 0 ? void 0 : sub.length)) {
            let j;
            outer_loop: for (let i = 0; i <= arr.length; i++) {
                let overlap = false;
                for (j = 0; j < sub.length; j++) {
                    if (i + j < arr.length) {
                        if (arr[i + j] !== sub[j]) {
                            continue outer_loop;
                        }
                        overlap = true;
                    }
                    else if (overlap) {
                        return i;
                    }
                    else {
                        break outer_loop;
                    }
                }
            }
        }
        return -1;
    }
    static hexStringToBytes(hexString) {
        const bytes = new Uint8Array(hexString.length / 2);
        for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
            bytes[j] = parseInt(hexString.substr(i, 2), 16);
        }
        return bytes;
    }
    static getBit(n, bitPosition) {
        return (n & (1 << bitPosition)) === 0 ? 0 : 1;
    }
    static setBit(n, bitPosition) {
        return n | (1 << bitPosition);
    }
    static clearBit(n, bitPosition) {
        const mask = ~(1 << bitPosition);
        return n & mask;
    }
    static updateBit(n, bitPosition, bitValue) {
        const bitValueNormalized = bitValue ? 1 : 0;
        const clearMask = ~(1 << bitPosition);
        return (n & clearMask) | (bitValueNormalized << bitPosition);
    }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DomUtils {
    static htmlToElements(html) {
        const template = document.createElement("template");
        template.innerHTML = html;
        const nodes = [];
        template.content.childNodes.forEach(x => {
            if (x instanceof HTMLElement) {
                nodes.push(x);
            }
        });
        return nodes;
    }
    static promisify(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                setTimeout(() => {
                    const result = callback();
                    resolve(result);
                }, 0);
            });
        });
    }
    static runEmptyTimeout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.promisify(() => undefined);
        });
    }
    static downloadFile(blob, name) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("download", name);
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }
    static loadImageAsync(url, revoke = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedImage = yield new Promise((resolve, reject) => {
                const image = new Image();
                image.onerror = (e) => {
                    if (revoke) {
                        URL.revokeObjectURL(url);
                    }
                    console.log(`Error while loading image: ${e}`);
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
        });
    }
}

class EventService {
    constructor(container) {
        this._eventMap = new Map();
        if (!container) {
            throw new Error("Container is not defined");
        }
        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.width = "0";
        element.style.height = "0";
        element.style.zIndex = "-1000";
        container.append(element);
        this._element = element;
    }
    get element() {
        return this._element;
    }
    destroy() {
        this.removeAllListeners();
        this._element.remove();
        this._element = null;
    }
    addListener(key, listener, options) {
        if (!this._element) {
            return;
        }
        this._element.addEventListener(key, listener, options);
        if (this._eventMap.has(key)) {
            this._eventMap.get(key).add(listener);
        }
        else {
            this._eventMap.set(key, new Set().add(listener));
        }
    }
    removeListener(key, listener) {
        if (!this._element) {
            return;
        }
        this._element.removeEventListener(key, listener);
        if (this._eventMap.has(key)) {
            this._eventMap.get(key).delete(listener);
        }
    }
    removeAllListenersForKey(key) {
        if (!this._element) {
            return;
        }
        if (this._eventMap.has(key)) {
            const listeners = this._eventMap.get(key);
            listeners.forEach(x => this._element.removeEventListener(key, x));
            this._eventMap.delete(key);
        }
    }
    removeAllListeners() {
        if (!this._element) {
            return;
        }
        this._eventMap.forEach((v, k) => {
            v.forEach(x => this._element.removeEventListener(k, x));
        });
        this._eventMap.clear();
    }
    getListenersByKey(key) {
        const listenerSet = this._eventMap.get(key);
        return listenerSet
            ? [...listenerSet]
            : [];
    }
    hasListenersForKey(key) {
        const listenerSet = this._eventMap.get(key);
        return !!(listenerSet === null || listenerSet === void 0 ? void 0 : listenerSet.size);
    }
    dispatchEvent(e) {
        if (!this._element) {
            return;
        }
        if (!this.hasListenersForKey(e.type)) {
            return;
        }
        this._element.dispatchEvent(e);
    }
}

class LinkedListNode {
    constructor(data) {
        this.data = data;
    }
}
class LinkedList {
    constructor(head) {
        this._length = 0;
        if (head) {
            this.push(head);
        }
    }
    get head() {
        return this._head.data;
    }
    get length() {
        return this._length;
    }
    get tail() {
        return this.get(this._length - 1);
    }
    push(value) {
        const node = new LinkedListNode(value);
        let current;
        if (!this._head) {
            this._head = node;
        }
        else {
            current = this._head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this._length++;
    }
    insert(value, n) {
        if (n < 0 || n > this._length - 1) {
            return null;
        }
        const node = new LinkedListNode(value);
        let previous;
        let current = this._head;
        let i = 0;
        if (!n) {
            this._head = node;
        }
        else {
            while (i++ < n) {
                previous = current;
                current = current.next;
            }
            previous.next = node;
        }
        node.next = current;
        this._length++;
        return node.data;
    }
    replace(value, n) {
        if (n < 0 || n > this._length - 1) {
            return null;
        }
        const node = new LinkedListNode(value);
        let previous;
        let current = this._head;
        let i = 0;
        if (!n) {
            this._head = node;
        }
        else {
            while (i++ < n) {
                previous = current;
                current = current.next;
            }
            previous.next = node;
        }
        node.next = current.next;
        return current.data;
    }
    remove(n) {
        if (n < 0 || n > this._length - 1) {
            return null;
        }
        let previous;
        let current = this._head;
        let i = 0;
        if (!n) {
            this._head = current.next;
        }
        else {
            while (i++ < n) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this._length--;
        return current.data;
    }
    clear() {
        this._head = null;
        this._length = 0;
    }
    get(n) {
        if (n < 0 || n > this._length - 1) {
            return null;
        }
        let current = this._head;
        let i = 0;
        while (i++ < n) {
            current = current.next;
        }
        return current.data;
    }
    pop() {
        return this.remove(this._length - 1);
    }
    has(value, comparator) {
        if (!this._length) {
            return false;
        }
        comparator || (comparator = (a, b) => a === b);
        let current = this._head;
        let i = 0;
        while (i < this._length) {
            if (comparator(value, current.data)) {
                return true;
            }
            current = current.next;
            i++;
        }
        return false;
    }
    findIndex(value, comparator) {
        if (!this._length) {
            return -1;
        }
        comparator || (comparator = (a, b) => a === b);
        let current = this._head;
        let i = 0;
        while (i < this._length) {
            if (comparator(value, current.data)) {
                return i;
            }
            current = current.next;
            i++;
        }
        return -1;
    }
    *[Symbol.iterator]() {
        let current = this._head;
        while (current) {
            yield current.data;
            current = current.next;
        }
    }
}

class UUID {
    static getRandomUuid() {
        return v4();
    }
}

export { ByteUtils, DomUtils, EventService, LinkedList, LinkedListNode, UUID };
