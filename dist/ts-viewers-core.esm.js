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

import { Vec2, Mat3, getDistance2D } from 'mathador';
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

class CloudCurveData {
    static buildFromPolyline(polylinePoints, maxArcSize) {
        if (!polylinePoints || polylinePoints.length < 2) {
            return null;
        }
        if (isNaN(maxArcSize) || maxArcSize <= 0) {
            throw new Error(`Invalid maximal arc size ${maxArcSize}`);
        }
        const start = polylinePoints[0].clone().truncate(2);
        const curves = [];
        const zeroVec = new Vec2();
        const lengthVec = new Vec2();
        let i;
        let j;
        let lineStart;
        let lineEnd;
        let lineLength;
        let arcCount;
        let arcSize;
        let halfArcSize;
        let arcStart;
        let arcEnd;
        for (i = 0; i < polylinePoints.length - 1; i++) {
            lineStart = polylinePoints[i];
            lineEnd = polylinePoints[i + 1];
            lineLength = Vec2.subtract(lineEnd, lineStart).getMagnitude();
            if (!lineLength) {
                continue;
            }
            lengthVec.set(lineLength, 0);
            const matrix = Mat3.from4Vec2(zeroVec, lengthVec, lineStart, lineEnd);
            arcCount = Math.ceil(lineLength / maxArcSize);
            arcSize = lineLength / arcCount;
            halfArcSize = arcSize / 2;
            for (j = 0; j < arcCount; j++) {
                arcStart = j * arcSize;
                arcEnd = (j + 1) * arcSize;
                const curve = [
                    new Vec2(arcStart, -halfArcSize).applyMat3(matrix).truncate(2),
                    new Vec2(arcEnd, -halfArcSize).applyMat3(matrix).truncate(2),
                    new Vec2(arcEnd, 0).applyMat3(matrix).truncate(2),
                ];
                curves.push(curve);
            }
        }
        return {
            start,
            curves,
        };
    }
    static buildFromEllipse(rx, ry, maxArcSize, matrix) {
        matrix || (matrix = new Mat3());
        const center = new Vec2();
        const ellipseCircumferenceApprox = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
        const segmentsNumber = Math.ceil(ellipseCircumferenceApprox / maxArcSize / 4) * 4;
        const maxSegmentLength = Math.ceil(ellipseCircumferenceApprox / segmentsNumber);
        const points = [];
        const current = new Vec2(center.x + rx, center.y);
        const next = new Vec2();
        let angle = 0;
        let distance;
        points.push(current.clone().applyMat3(matrix).truncate(2));
        for (let i = 0; i < segmentsNumber; i++) {
            distance = 0;
            while (distance < maxSegmentLength) {
                angle += 0.25 / 180 * Math.PI;
                next.set(rx * Math.cos(angle) + center.x, ry * Math.sin(angle) + center.y);
                distance += getDistance2D(current.x, current.y, next.x, next.y);
                current.setFromVec2(next);
            }
            points.push(current.clone().applyMat3(matrix).truncate(2));
        }
        const curveData = this.buildFromPolyline(points, maxArcSize);
        return curveData;
    }
}

class SmoothPath {
    constructor(options) {
        this._paths = [];
        this._positionBuffer = [];
        this._bufferSize = (options === null || options === void 0 ? void 0 : options.bufferSize) || SmoothPath._defaultBufferSize;
        this._id = options === null || options === void 0 ? void 0 : options.id;
    }
    get id() {
        return this._id;
    }
    get bufferSize() {
        return this._bufferSize;
    }
    get paths() {
        return this._paths.slice();
    }
    get pathCount() {
        return this._paths.length;
    }
    endPath() {
        if (this._currentPath && this._currentPath.positions.length > 1) {
            this._paths.push(this._currentPath);
        }
        this._positionBuffer = null;
        this._currentPath = null;
        this._currentPathString = null;
    }
    addPosition(pos) {
        this.appendPositionToBuffer(pos);
        this.updateCurrentPath();
    }
    appendPositionToBuffer(pos) {
        const buffer = this._positionBuffer;
        buffer.push(pos);
        this._positionBuffer = buffer
            .slice(Math.max(0, buffer.length - this._bufferSize), buffer.length);
    }
    getAverageBufferPosition(offset) {
        const len = this._positionBuffer.length;
        if (len >= this._bufferSize) {
            let totalX = 0;
            let totalY = 0;
            let pos;
            let i;
            let count = 0;
            for (i = offset; i < len; i++) {
                count++;
                pos = this._positionBuffer[i];
                totalX += pos.x;
                totalY += pos.y;
            }
            return new Vec2(totalX / count, totalY / count);
        }
        return null;
    }
    updateCurrentPath() {
        let pos = this.getAverageBufferPosition(0);
        if (!pos) {
            return null;
        }
        this._currentPathString += " L" + pos.x + " " + pos.y;
        this._currentPath.positions.push(pos);
        let tmpPath = "";
        for (let offset = 2; offset < this._positionBuffer.length; offset += 2) {
            pos = this.getAverageBufferPosition(offset);
            tmpPath += " L" + pos.x + " " + pos.y;
        }
        return tmpPath;
    }
}
SmoothPath._defaultBufferSize = 8;

class SvgSmoothPath extends SmoothPath {
    constructor(options) {
        super(options);
        this._paths = [];
        this._strokeWidth = (options === null || options === void 0 ? void 0 : options.strokeWidth) || SvgSmoothPath._defaultStrokeWidth;
        this._color = (options === null || options === void 0 ? void 0 : options.color) || SvgSmoothPath._defaultColor;
        this._group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    }
    get strokeWidth() {
        return this._strokeWidth;
    }
    get color() {
        return this._color;
    }
    get group() {
        return this._group;
    }
    get paths() {
        return this._paths.slice();
    }
    newPath(startPosition) {
        const [r, g, b, a] = this._color || [0, 0, 0, 1];
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", `rgba(${r * 255},${g * 255},${b * 255},${a})`);
        path.setAttribute("stroke-width", this._strokeWidth + "");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        const pathString = "M" + startPosition.x + " " + startPosition.y;
        path.setAttribute("d", pathString);
        this._positionBuffer = [startPosition];
        this._currentPath = { path, positions: [new Vec2(startPosition.x, startPosition.y)] };
        this._currentPathString = pathString;
        this._group.append(path);
    }
    removePath(path) {
        if (!path) {
            return;
        }
        path.remove();
        this._paths = this._paths.filter(x => x.path !== path);
    }
    removeLastPath() {
        const pathData = this._paths.pop();
        pathData === null || pathData === void 0 ? void 0 : pathData.path.remove();
    }
    updateCurrentPath() {
        const tmpPath = super.updateCurrentPath();
        if (tmpPath) {
            this._currentPath.path.setAttribute("d", this._currentPathString + tmpPath);
        }
        return tmpPath;
    }
}
SvgSmoothPath._defaultStrokeWidth = 3;
SvgSmoothPath._defaultColor = [0, 0, 0, 0.8];

class SvgTempPath {
    constructor() {
        this._path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    }
    get path() {
        return this._path;
    }
    set(fill, stroke, w, points, close = false) {
        let d = "";
        if ((points === null || points === void 0 ? void 0 : points.length) > 1) {
            d += `M${points[0].x},${points[0].y} `;
            for (let i = 1; i < points.length; i++) {
                d += `L${points[i].x},${points[i].y} `;
            }
            if (close) {
                d += "Z";
            }
        }
        this._path.classList.add("annotation-temp-copy");
        this._path.setAttribute("d", d);
        this._path.style.fill = fill;
        this._path.style.stroke = stroke;
        this._path.style.strokeWidth = w + "";
    }
    insertAfter(element) {
        element.after(this._path);
    }
    remove() {
        this._path.setAttribute("d", "");
        this._path.remove();
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

export { ByteUtils, CloudCurveData, DomUtils, EventService, LinkedList, LinkedListNode, SmoothPath, SvgSmoothPath, SvgTempPath, UUID };
