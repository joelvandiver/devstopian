/* tslint:disable */
/* eslint-disable */

/**
 * A circle defined by a center point and radius.
 */
export class Circle {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Area of the circle (πr²).
     */
    area(): number;
    /**
     * Circumference of the circle (2πr).
     */
    circumference(): number;
    /**
     * Returns `true` if the point lies inside the circle.
     */
    contains(p: Point): boolean;
    /**
     * Returns `true` if two circles intersect.
     */
    intersects(other: Circle): boolean;
    /**
     * Create a new `Circle` with the given center and radius.
     */
    constructor(center: Point, radius: number);
    center: Point;
    radius: number;
}

/**
 * The color of a drawn element, in RGBA form.
 */
export class Color {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Create a new `Color` from RGBA components.
     */
    constructor(r: number, g: number, b: number, a: number);
    /**
     * Return the CSS `rgba(…)` string for this color.
     */
    to_css(): string;
    a: number;
    b: number;
    g: number;
    r: number;
}

export class Editor {
    free(): void;
    [Symbol.dispose](): void;
    clear(): string;
    click(x: number, y: number, style: Style): string;
    load_demo_scene(): string;
    constructor(width: number, height: number);
    resize_viewport(width: number, height: number): void;
    set_tool(tool: string): string;
    to_json(): string;
}

/**
 * An infinite line passing through two distinct points.
 */
export class Line {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Perpendicular distance from a point to this line.
     */
    distance_to_point(p: Point): number;
    /**
     * Length of the direction vector (distance between the two defining points).
     */
    length(): number;
    /**
     * Create a new `Line` through `p1` and `p2`.
     */
    constructor(p1: Point, p2: Point);
    /**
     * Slope of the line, or `f64::INFINITY` for vertical lines.
     */
    slope(): number;
    p1: Point;
    p2: Point;
}

/**
 * A 2-dimensional point with floating-point coordinates.
 */
export class Point {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Euclidean distance to another point.
     */
    distance_to(other: Point): number;
    /**
     * Return the midpoint between this point and another.
     */
    midpoint(other: Point): Point;
    /**
     * Create a new `Point` at `(x, y)`.
     */
    constructor(x: number, y: number);
    /**
     * Translate the point by `(dx, dy)`.
     */
    translate(dx: number, dy: number): Point;
    x: number;
    y: number;
}

/**
 * The main scene – a collection of styled geometry elements.
 *
 * From JavaScript you add geometry through the typed helper methods and
 * retrieve the serialized scene via `to_json()` for the renderer to consume.
 */
export class Scene {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Add a circle to the scene.
     */
    add_circle(circle: Circle, style: Style): void;
    /**
     * Add an infinite line to the scene (clipped to the viewport in the renderer).
     */
    add_line(line: Line, width: number, style: Style): void;
    /**
     * Add a point to the scene.
     */
    add_point(point: Point, style: Style): void;
    /**
     * Add a line segment to the scene.
     */
    add_segment(segment: Segment, style: Style): void;
    /**
     * Remove all elements from the scene.
     */
    clear(): void;
    /**
     * Viewport height.
     */
    height(): number;
    /**
     * Returns `true` when there are no elements.
     */
    is_empty(): boolean;
    /**
     * Number of elements in the scene.
     */
    len(): number;
    /**
     * Create an empty scene with the given viewport dimensions.
     */
    constructor(width: number, height: number);
    /**
     * Update the viewport dimensions used by the renderer.
     */
    resize_viewport(width: number, height: number): void;
    /**
     * Serialize the scene to a JSON string so the JavaScript renderer can
     * consume it without needing direct access to the Rust structs.
     */
    to_json(): string;
    /**
     * Viewport width.
     */
    width(): number;
}

/**
 * A line segment between two endpoints.
 */
export class Segment {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Length of the segment.
     */
    length(): number;
    /**
     * Midpoint of the segment.
     */
    midpoint(): Point;
    /**
     * Create a new `Segment` from `start` to `end`.
     */
    constructor(start: Point, end: Point);
    end: Point;
    start: Point;
}

/**
 * Style applied to a drawn element.
 */
export class Style {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * A sensible default style – black stroke, transparent fill, 1px.
     */
    static default_style(): Style;
    /**
     * Create a new `Style`.
     */
    constructor(stroke: Color, fill: Color, stroke_width: number);
    fill: Color;
    stroke_width: number;
    stroke: Color;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_color_free: (a: number, b: number) => void;
    readonly __wbg_get_color_a: (a: number) => number;
    readonly __wbg_get_color_b: (a: number) => number;
    readonly __wbg_get_color_g: (a: number) => number;
    readonly __wbg_get_color_r: (a: number) => number;
    readonly __wbg_get_style_fill: (a: number) => number;
    readonly __wbg_get_style_stroke: (a: number) => number;
    readonly __wbg_get_style_stroke_width: (a: number) => number;
    readonly __wbg_scene_free: (a: number, b: number) => void;
    readonly __wbg_set_color_a: (a: number, b: number) => void;
    readonly __wbg_set_color_b: (a: number, b: number) => void;
    readonly __wbg_set_color_g: (a: number, b: number) => void;
    readonly __wbg_set_color_r: (a: number, b: number) => void;
    readonly __wbg_set_style_fill: (a: number, b: number) => void;
    readonly __wbg_set_style_stroke: (a: number, b: number) => void;
    readonly __wbg_set_style_stroke_width: (a: number, b: number) => void;
    readonly __wbg_style_free: (a: number, b: number) => void;
    readonly color_new: (a: number, b: number, c: number, d: number) => number;
    readonly color_to_css: (a: number) => [number, number];
    readonly scene_add_circle: (a: number, b: number, c: number) => void;
    readonly scene_add_line: (a: number, b: number, c: number, d: number) => void;
    readonly scene_add_point: (a: number, b: number, c: number) => void;
    readonly scene_add_segment: (a: number, b: number, c: number) => void;
    readonly scene_clear: (a: number) => void;
    readonly scene_height: (a: number) => number;
    readonly scene_is_empty: (a: number) => number;
    readonly scene_len: (a: number) => number;
    readonly scene_new: (a: number, b: number) => number;
    readonly scene_resize_viewport: (a: number, b: number, c: number) => void;
    readonly scene_to_json: (a: number) => [number, number, number, number];
    readonly scene_width: (a: number) => number;
    readonly style_default_style: () => number;
    readonly style_new: (a: number, b: number, c: number) => number;
    readonly __wbg_circle_free: (a: number, b: number) => void;
    readonly __wbg_get_circle_center: (a: number) => number;
    readonly __wbg_get_circle_radius: (a: number) => number;
    readonly __wbg_get_point_x: (a: number) => number;
    readonly __wbg_get_point_y: (a: number) => number;
    readonly __wbg_point_free: (a: number, b: number) => void;
    readonly __wbg_set_circle_center: (a: number, b: number) => void;
    readonly __wbg_set_circle_radius: (a: number, b: number) => void;
    readonly __wbg_set_point_x: (a: number, b: number) => void;
    readonly __wbg_set_point_y: (a: number, b: number) => void;
    readonly circle_area: (a: number) => number;
    readonly circle_circumference: (a: number) => number;
    readonly circle_contains: (a: number, b: number) => number;
    readonly circle_intersects: (a: number, b: number) => number;
    readonly circle_new: (a: number, b: number) => number;
    readonly point_distance_to: (a: number, b: number) => number;
    readonly point_midpoint: (a: number, b: number) => number;
    readonly point_new: (a: number, b: number) => number;
    readonly point_translate: (a: number, b: number, c: number) => number;
    readonly __wbg_editor_free: (a: number, b: number) => void;
    readonly editor_clear: (a: number) => [number, number];
    readonly editor_click: (a: number, b: number, c: number, d: number) => [number, number];
    readonly editor_load_demo_scene: (a: number) => [number, number];
    readonly editor_new: (a: number, b: number) => number;
    readonly editor_resize_viewport: (a: number, b: number, c: number) => void;
    readonly editor_set_tool: (a: number, b: number, c: number) => [number, number, number, number];
    readonly editor_to_json: (a: number) => [number, number, number, number];
    readonly __wbg_get_line_p1: (a: number) => number;
    readonly __wbg_get_line_p2: (a: number) => number;
    readonly __wbg_line_free: (a: number, b: number) => void;
    readonly __wbg_segment_free: (a: number, b: number) => void;
    readonly __wbg_set_line_p1: (a: number, b: number) => void;
    readonly __wbg_set_line_p2: (a: number, b: number) => void;
    readonly line_distance_to_point: (a: number, b: number) => number;
    readonly line_length: (a: number) => number;
    readonly line_new: (a: number, b: number) => number;
    readonly line_slope: (a: number) => number;
    readonly segment_length: (a: number) => number;
    readonly segment_midpoint: (a: number) => number;
    readonly segment_new: (a: number, b: number) => number;
    readonly __wbg_set_segment_end: (a: number, b: number) => void;
    readonly __wbg_set_segment_start: (a: number, b: number) => void;
    readonly __wbg_get_segment_end: (a: number) => number;
    readonly __wbg_get_segment_start: (a: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
