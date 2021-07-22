// Generated by dts-bundle-generator v5.9.0

import { Mat3, Vec2 } from 'mathador';

export declare class Icons {
	static readonly icon_arrow: any;
	static readonly icon_arrow_up: any;
	static readonly icon_arrow_down: any;
	static readonly icon_arrow_left: any;
	static readonly icon_arrow_right: any;
	static readonly icon_back: any;
	static readonly icon_caret: any;
	static readonly icon_circle: any;
	static readonly icon_clockwise: any;
	static readonly icon_counter_clockwise: any;
	static readonly icon_close: any;
	static readonly icon_close2: any;
	static readonly icon_cloudy: any;
	static readonly icon_delete: any;
	static readonly icon_download: any;
	static readonly icon_fit_page: any;
	static readonly icon_fit_viewer: any;
	static readonly icon_geometric: any;
	static readonly icon_hand: any;
	static readonly icon_line: any;
	static readonly icon_load: any;
	static readonly icon_minus: any;
	static readonly icon_ok: any;
	static readonly icon_pen: any;
	static readonly icon_plus: any;
	static readonly icon_pointer: any;
	static readonly icon_polygon: any;
	static readonly icon_polyline: any;
	static readonly icon_popup: any;
	static readonly icon_popup2: any;
	static readonly icon_sidebar: any;
	static readonly icon_square: any;
	static readonly icon_stamp: any;
	static readonly icon_straight: any;
	static readonly icon_text: any;
	static readonly icon_text2: any;
	static readonly icon_text_free: any;
	static readonly icon_text_callout: any;
	static readonly icon_text_highlight: any;
	static readonly icon_text_squiggly: any;
	static readonly icon_text_strikeout: any;
	static readonly icon_text_underline: any;
}
export declare class ByteUtils {
	static parseIntFromBytes(bytes: Uint8Array): number;
	static int8ToBytes(int: number): Uint8Array;
	static int16ToBytes(int: number, le?: boolean): Uint8Array;
	static int32ToBytes(int: number, le?: boolean): Uint8Array;
	static int32ArrayToBytes(ints: number[], le?: boolean): Uint8Array;
	static bytesToInt32Array(bytes: Uint8Array, le?: boolean): Int32Array;
	static xorBytes(bytes: Uint8Array, n: number): Uint8Array;
	static arraysEqual(a: Uint8Array, b: Uint8Array): boolean;
	static findSubarrayIndex(arr: Uint8Array, sub: Uint8Array): number;
	static hexStringToBytes(hexString: string): Uint8Array;
	static getBit(n: number, bitPosition: number): 1 | 0;
	static setBit(n: number, bitPosition: number): number;
	static clearBit(n: number, bitPosition: number): number;
	static updateBit(n: number, bitPosition: number, bitValue: boolean): number;
}
export declare class ContextMenu {
	private _container;
	private _shown;
	private _content;
	set content(value: HTMLElement[]);
	private _enabled;
	get enabled(): boolean;
	set enabled(value: boolean);
	constructor();
	destroy(): void;
	show(pointerPosition: Vec2, parent: HTMLElement): void;
	hide(): void;
	clear(): void;
	private onPointerDownOutside;
	private setContextMenuPosition;
}
export declare type Double = readonly [
	x: number,
	y: number
];
export declare type Quadruple = readonly [
	x1: number,
	y1: number,
	x2: number,
	y2: number
];
export declare type Hextuple = readonly [
	a: number,
	b: number,
	d: number,
	e: number,
	g: number,
	h: number
];
export declare type Octuple = readonly [
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	x3: number,
	y3: number,
	x4: number,
	y4: number
];
export interface SmoothPathData {
	positions: Vec2[];
}
export interface SmoothPathOptions {
	bufferSize?: number;
	id?: number;
}
export declare abstract class SmoothPath {
	private static readonly _defaultBufferSize;
	protected readonly _id: number;
	get id(): number;
	protected readonly _bufferSize: number;
	get bufferSize(): number;
	protected _currentPath: SmoothPathData;
	protected _paths: SmoothPathData[];
	get paths(): SmoothPathData[];
	get pathCount(): number;
	protected _positionBuffer: Vec2[];
	protected _currentPathString: string;
	constructor(options?: SmoothPathOptions);
	endPath(): void;
	addPosition(pos: Vec2): void;
	protected appendPositionToBuffer(pos: Vec2): void;
	protected getAverageBufferPosition(offset: number): Vec2;
	protected updateCurrentPath(): string;
}
export interface CanvasSmoothPathData extends SmoothPathData {
	path: Path2D;
	strokeWidth: number;
	color: Quadruple;
}
export interface CanvasSmoothPathOptions extends SmoothPathOptions {
	canvasWidth: number;
	canvasHeight: number;
}
export declare class CanvasSmoothPathEditor extends SmoothPath {
	private static readonly _defaultStrokeWidth;
	private static readonly _colors;
	protected readonly _container: HTMLElement;
	protected readonly _canvas: HTMLCanvasElement;
	get canvas(): HTMLCanvasElement;
	get ctx(): CanvasRenderingContext2D;
	get canvasSize(): [
		w: number,
		h: number
	];
	set canvasSize(value: [
		w: number,
		h: number
	]);
	protected readonly _contextMenu: ContextMenu;
	protected _strokeWidth: number;
	protected _color: Quadruple;
	protected _currentPath: CanvasSmoothPathData;
	protected _paths: CanvasSmoothPathData[];
	get paths(): CanvasSmoothPathData[];
	constructor(container: HTMLElement, options: CanvasSmoothPathOptions);
	destroy(): void;
	getImageData(): Uint8ClampedArray;
	newPath(startPosition: Vec2): void;
	removePath(path: Path2D): void;
	removeLastPath(): void;
	removeAllPaths(): void;
	protected updateCurrentPath(): string;
	protected refreshEditor(): void;
	protected drawPaths(): void;
	protected convertClientCoordsToCanvas(clX: number, clY: number): [
		caX: number,
		caY: number
	];
	protected onContextMenu: (event: MouseEvent) => void;
	protected onPointerDown: (e: PointerEvent) => void;
	protected onPointerMove: (e: PointerEvent) => void;
	protected onPointerUp: (e: PointerEvent) => void;
	protected fillContextMenu(): void;
	protected buildColorPicker(): HTMLElement;
	protected buildWidthSliderWithButtons(): HTMLElement;
}
export declare class Loader {
	static readonly loaderHtml = "\n  <div class=\"abs-full-size-overlay\">\n    <div class=\"loader\">\n      <div></div>\n      <div></div>\n      <div></div>\n    </div>\n  </div>\n  ";
	protected readonly _loaderElement: HTMLElement;
	protected _isShown: boolean;
	constructor();
	show(parent: HTMLElement, zIndex?: number): void;
	hide(): void;
}
export declare class DomUtils {
	static htmlToElements(html: string): HTMLElement[];
	static promisify<T>(callback: () => T): Promise<T>;
	static runEmptyTimeout(): Promise<void>;
	static downloadFile(blob: Blob, name?: string): void;
	static loadImageAsync(url: string, revoke?: boolean): Promise<HTMLImageElement>;
}
export interface BBox {
	ll: Vec2;
	lr: Vec2;
	ur: Vec2;
	ul: Vec2;
}
export declare type CurveData = [
	control1: Vec2,
	control2: Vec2,
	end: Vec2
];
export declare class CloudCurveData {
	start: Vec2;
	curves: CurveData[];
	static buildFromPolyline(polylinePoints: Vec2[], maxArcSize: number): CloudCurveData;
	static buildFromEllipse(rx: number, ry: number, maxArcSize: number, matrix?: Mat3): CloudCurveData;
}
export interface SvgSmoothPathData extends SmoothPathData {
	path: SVGPathElement;
}
export interface SvgSmoothPathOptions extends SmoothPathOptions {
	bufferSize?: number;
	strokeWidth?: number;
	color?: Quadruple;
	id?: number;
}
export declare class SvgSmoothPath extends SmoothPath {
	private static readonly _defaultStrokeWidth;
	private static readonly _defaultColor;
	protected _strokeWidth: number;
	get strokeWidth(): number;
	protected _color: Quadruple;
	get color(): Quadruple;
	protected _group: SVGGraphicsElement;
	get group(): SVGGraphicsElement;
	protected _currentPath: SvgSmoothPathData;
	protected _paths: SvgSmoothPathData[];
	get paths(): SvgSmoothPathData[];
	constructor(options?: SvgSmoothPathOptions);
	newPath(startPosition: Vec2): void;
	removePath(path: SVGPathElement): void;
	removeLastPath(): void;
	protected updateCurrentPath(): string;
}
export declare class SvgTempPath {
	protected readonly _path: SVGPathElement;
	get path(): SVGGElement;
	constructor();
	set(fill: string, stroke: string, w: number, points: Vec2[], close?: boolean): void;
	insertAfter(element: Element): void;
	remove(): void;
}
export declare type ListenerLike = (this: HTMLElement, e: any) => any;
export declare class EventService {
	private _element;
	get element(): HTMLElement;
	private readonly _eventMap;
	constructor(container: HTMLElement);
	destroy(): void;
	addListener<K extends keyof HTMLElementEventMap>(key: K, listener: (this: HTMLElement, e: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	removeListener(key: keyof HTMLElementEventMap, listener: ListenerLike): void;
	removeAllListenersForKey(key: keyof HTMLElementEventMap): void;
	removeAllListeners(): void;
	getListenersByKey(key: keyof HTMLElementEventMap): ListenerLike[];
	hasListenersForKey(key: keyof HTMLElementEventMap): boolean;
	dispatchEvent<K extends keyof HTMLElementEventMap>(e: HTMLElementEventMap[K]): void;
}
export declare class LinkedListNode<T> {
	data: T;
	next: LinkedListNode<T>;
	constructor(data: T);
}
export declare class LinkedList<T> {
	private _head;
	get head(): T;
	private _length;
	get length(): number;
	get tail(): T;
	constructor(head?: T);
	push(value: T): void;
	insert(value: T, n: number): T;
	replace(value: T, n: number): T;
	remove(n: number): T;
	clear(): void;
	get(n: number): T;
	pop(): T;
	has(value: T, comparator?: (a: T, b: T) => boolean): boolean;
	findIndex(value: T, comparator?: (a: T, b: T) => boolean): number;
	[Symbol.iterator](): Generator<T, void, unknown>;
}
export declare class UUID {
	static getRandomUuid(): string;
}

export {};
