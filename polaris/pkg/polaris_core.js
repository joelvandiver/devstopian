/* @ts-self-types="./polaris_core.d.ts" */

/**
 * A circle defined by a center point and radius.
 */
export class Circle {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CircleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_circle_free(ptr, 0);
    }
    /**
     * Area of the circle (πr²).
     * @returns {number}
     */
    area() {
        const ret = wasm.circle_area(this.__wbg_ptr);
        return ret;
    }
    /**
     * Circumference of the circle (2πr).
     * @returns {number}
     */
    circumference() {
        const ret = wasm.circle_circumference(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns `true` if the point lies inside the circle.
     * @param {Point} p
     * @returns {boolean}
     */
    contains(p) {
        _assertClass(p, Point);
        const ret = wasm.circle_contains(this.__wbg_ptr, p.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Returns `true` if two circles intersect.
     * @param {Circle} other
     * @returns {boolean}
     */
    intersects(other) {
        _assertClass(other, Circle);
        const ret = wasm.circle_intersects(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Create a new `Circle` with the given center and radius.
     * @param {Point} center
     * @param {number} radius
     */
    constructor(center, radius) {
        _assertClass(center, Point);
        var ptr0 = center.__destroy_into_raw();
        const ret = wasm.circle_new(ptr0, radius);
        this.__wbg_ptr = ret >>> 0;
        CircleFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {Point}
     */
    get center() {
        const ret = wasm.__wbg_get_circle_center(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get radius() {
        const ret = wasm.__wbg_get_circle_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Point} arg0
     */
    set center(arg0) {
        _assertClass(arg0, Point);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_circle_center(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set radius(arg0) {
        wasm.__wbg_set_circle_radius(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Circle.prototype[Symbol.dispose] = Circle.prototype.free;

/**
 * The color of a drawn element, in RGBA form.
 */
export class Color {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Color.prototype);
        obj.__wbg_ptr = ptr;
        ColorFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ColorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_color_free(ptr, 0);
    }
    /**
     * Create a new `Color` from RGBA components.
     * @param {number} r
     * @param {number} g
     * @param {number} b
     * @param {number} a
     */
    constructor(r, g, b, a) {
        const ret = wasm.color_new(r, g, b, a);
        this.__wbg_ptr = ret >>> 0;
        ColorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Return the CSS `rgba(…)` string for this color.
     * @returns {string}
     */
    to_css() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.color_to_css(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {number}
     */
    get a() {
        const ret = wasm.__wbg_get_color_a(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get b() {
        const ret = wasm.__wbg_get_color_b(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get g() {
        const ret = wasm.__wbg_get_color_g(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get r() {
        const ret = wasm.__wbg_get_color_r(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set a(arg0) {
        wasm.__wbg_set_color_a(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set b(arg0) {
        wasm.__wbg_set_color_b(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set g(arg0) {
        wasm.__wbg_set_color_g(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set r(arg0) {
        wasm.__wbg_set_color_r(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Color.prototype[Symbol.dispose] = Color.prototype.free;

export class Editor {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        EditorFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_editor_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    clear() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.editor_clear(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {Style} style
     * @returns {string}
     */
    click(x, y, style) {
        let deferred2_0;
        let deferred2_1;
        try {
            _assertClass(style, Style);
            var ptr0 = style.__destroy_into_raw();
            const ret = wasm.editor_click(this.__wbg_ptr, x, y, ptr0);
            deferred2_0 = ret[0];
            deferred2_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    load_demo_scene() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.editor_load_demo_scene(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        const ret = wasm.editor_new(width, height);
        this.__wbg_ptr = ret >>> 0;
        EditorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {number} width
     * @param {number} height
     */
    resize_viewport(width, height) {
        wasm.editor_resize_viewport(this.__wbg_ptr, width, height);
    }
    /**
     * @param {string} tool
     * @returns {string}
     */
    set_tool(tool) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(tool, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.editor_set_tool(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @returns {string}
     */
    to_json() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.editor_to_json(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
}
if (Symbol.dispose) Editor.prototype[Symbol.dispose] = Editor.prototype.free;

/**
 * An infinite line passing through two distinct points.
 */
export class Line {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_line_free(ptr, 0);
    }
    /**
     * @returns {Point}
     */
    get p1() {
        const ret = wasm.__wbg_get_line_p1(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * @returns {Point}
     */
    get p2() {
        const ret = wasm.__wbg_get_line_p2(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * Perpendicular distance from a point to this line.
     * @param {Point} p
     * @returns {number}
     */
    distance_to_point(p) {
        _assertClass(p, Point);
        const ret = wasm.line_distance_to_point(this.__wbg_ptr, p.__wbg_ptr);
        return ret;
    }
    /**
     * Length of the direction vector (distance between the two defining points).
     * @returns {number}
     */
    length() {
        const ret = wasm.line_length(this.__wbg_ptr);
        return ret;
    }
    /**
     * Create a new `Line` through `p1` and `p2`.
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1, p2) {
        _assertClass(p1, Point);
        var ptr0 = p1.__destroy_into_raw();
        _assertClass(p2, Point);
        var ptr1 = p2.__destroy_into_raw();
        const ret = wasm.line_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        LineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Slope of the line, or `f64::INFINITY` for vertical lines.
     * @returns {number}
     */
    slope() {
        const ret = wasm.line_slope(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {Point} arg0
     */
    set p1(arg0) {
        _assertClass(arg0, Point);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_line_p1(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Point} arg0
     */
    set p2(arg0) {
        _assertClass(arg0, Point);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_line_p2(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Line.prototype[Symbol.dispose] = Line.prototype.free;

/**
 * A 2-dimensional point with floating-point coordinates.
 */
export class Point {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Point.prototype);
        obj.__wbg_ptr = ptr;
        PointFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_point_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_point_x(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_point_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * Euclidean distance to another point.
     * @param {Point} other
     * @returns {number}
     */
    distance_to(other) {
        _assertClass(other, Point);
        const ret = wasm.point_distance_to(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Return the midpoint between this point and another.
     * @param {Point} other
     * @returns {Point}
     */
    midpoint(other) {
        _assertClass(other, Point);
        const ret = wasm.point_midpoint(this.__wbg_ptr, other.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * Create a new `Point` at `(x, y)`.
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        const ret = wasm.point_new(x, y);
        this.__wbg_ptr = ret >>> 0;
        PointFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Translate the point by `(dx, dy)`.
     * @param {number} dx
     * @param {number} dy
     * @returns {Point}
     */
    translate(dx, dy) {
        const ret = wasm.point_translate(this.__wbg_ptr, dx, dy);
        return Point.__wrap(ret);
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_point_x(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_point_y(this.__wbg_ptr, arg0);
    }
}
if (Symbol.dispose) Point.prototype[Symbol.dispose] = Point.prototype.free;

/**
 * The main scene – a collection of styled geometry elements.
 *
 * From JavaScript you add geometry through the typed helper methods and
 * retrieve the serialized scene via `to_json()` for the renderer to consume.
 */
export class Scene {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SceneFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_scene_free(ptr, 0);
    }
    /**
     * Add a circle to the scene.
     * @param {Circle} circle
     * @param {Style} style
     */
    add_circle(circle, style) {
        _assertClass(circle, Circle);
        var ptr0 = circle.__destroy_into_raw();
        _assertClass(style, Style);
        var ptr1 = style.__destroy_into_raw();
        wasm.scene_add_circle(this.__wbg_ptr, ptr0, ptr1);
    }
    /**
     * Add an infinite line to the scene (clipped to the viewport in the renderer).
     * @param {Line} line
     * @param {number} width
     * @param {Style} style
     */
    add_line(line, width, style) {
        _assertClass(line, Line);
        var ptr0 = line.__destroy_into_raw();
        _assertClass(style, Style);
        var ptr1 = style.__destroy_into_raw();
        wasm.scene_add_line(this.__wbg_ptr, ptr0, width, ptr1);
    }
    /**
     * Add a point to the scene.
     * @param {Point} point
     * @param {Style} style
     */
    add_point(point, style) {
        _assertClass(point, Point);
        var ptr0 = point.__destroy_into_raw();
        _assertClass(style, Style);
        var ptr1 = style.__destroy_into_raw();
        wasm.scene_add_point(this.__wbg_ptr, ptr0, ptr1);
    }
    /**
     * Add a line segment to the scene.
     * @param {Segment} segment
     * @param {Style} style
     */
    add_segment(segment, style) {
        _assertClass(segment, Segment);
        var ptr0 = segment.__destroy_into_raw();
        _assertClass(style, Style);
        var ptr1 = style.__destroy_into_raw();
        wasm.scene_add_segment(this.__wbg_ptr, ptr0, ptr1);
    }
    /**
     * Remove all elements from the scene.
     */
    clear() {
        wasm.scene_clear(this.__wbg_ptr);
    }
    /**
     * Viewport height.
     * @returns {number}
     */
    height() {
        const ret = wasm.scene_height(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns `true` when there are no elements.
     * @returns {boolean}
     */
    is_empty() {
        const ret = wasm.scene_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Number of elements in the scene.
     * @returns {number}
     */
    len() {
        const ret = wasm.scene_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Create an empty scene with the given viewport dimensions.
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        const ret = wasm.scene_new(width, height);
        this.__wbg_ptr = ret >>> 0;
        SceneFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Update the viewport dimensions used by the renderer.
     * @param {number} width
     * @param {number} height
     */
    resize_viewport(width, height) {
        wasm.scene_resize_viewport(this.__wbg_ptr, width, height);
    }
    /**
     * Serialize the scene to a JSON string so the JavaScript renderer can
     * consume it without needing direct access to the Rust structs.
     * @returns {string}
     */
    to_json() {
        let deferred2_0;
        let deferred2_1;
        try {
            const ret = wasm.scene_to_json(this.__wbg_ptr);
            var ptr1 = ret[0];
            var len1 = ret[1];
            if (ret[3]) {
                ptr1 = 0; len1 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred2_0 = ptr1;
            deferred2_1 = len1;
            return getStringFromWasm0(ptr1, len1);
        } finally {
            wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
        }
    }
    /**
     * Viewport width.
     * @returns {number}
     */
    width() {
        const ret = wasm.scene_width(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) Scene.prototype[Symbol.dispose] = Scene.prototype.free;

/**
 * A line segment between two endpoints.
 */
export class Segment {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SegmentFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_segment_free(ptr, 0);
    }
    /**
     * @returns {Point}
     */
    get end() {
        const ret = wasm.__wbg_get_segment_end(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * @returns {Point}
     */
    get start() {
        const ret = wasm.__wbg_get_segment_start(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * Length of the segment.
     * @returns {number}
     */
    length() {
        const ret = wasm.segment_length(this.__wbg_ptr);
        return ret;
    }
    /**
     * Midpoint of the segment.
     * @returns {Point}
     */
    midpoint() {
        const ret = wasm.segment_midpoint(this.__wbg_ptr);
        return Point.__wrap(ret);
    }
    /**
     * Create a new `Segment` from `start` to `end`.
     * @param {Point} start
     * @param {Point} end
     */
    constructor(start, end) {
        _assertClass(start, Point);
        var ptr0 = start.__destroy_into_raw();
        _assertClass(end, Point);
        var ptr1 = end.__destroy_into_raw();
        const ret = wasm.segment_new(ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        SegmentFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Point} arg0
     */
    set end(arg0) {
        _assertClass(arg0, Point);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_segment_end(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {Point} arg0
     */
    set start(arg0) {
        _assertClass(arg0, Point);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_segment_start(this.__wbg_ptr, ptr0);
    }
}
if (Symbol.dispose) Segment.prototype[Symbol.dispose] = Segment.prototype.free;

/**
 * Style applied to a drawn element.
 */
export class Style {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Style.prototype);
        obj.__wbg_ptr = ptr;
        StyleFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StyleFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_style_free(ptr, 0);
    }
    /**
     * @returns {Color}
     */
    get fill() {
        const ret = wasm.__wbg_get_style_fill(this.__wbg_ptr);
        return Color.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get stroke_width() {
        const ret = wasm.__wbg_get_style_stroke_width(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {Color}
     */
    get stroke() {
        const ret = wasm.__wbg_get_style_stroke(this.__wbg_ptr);
        return Color.__wrap(ret);
    }
    /**
     * @param {Color} arg0
     */
    set fill(arg0) {
        _assertClass(arg0, Color);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_style_fill(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} arg0
     */
    set stroke_width(arg0) {
        wasm.__wbg_set_style_stroke_width(this.__wbg_ptr, arg0);
    }
    /**
     * @param {Color} arg0
     */
    set stroke(arg0) {
        _assertClass(arg0, Color);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_style_stroke(this.__wbg_ptr, ptr0);
    }
    /**
     * A sensible default style – black stroke, transparent fill, 1px.
     * @returns {Style}
     */
    static default_style() {
        const ret = wasm.style_default_style();
        return Style.__wrap(ret);
    }
    /**
     * Create a new `Style`.
     * @param {Color} stroke
     * @param {Color} fill
     * @param {number} stroke_width
     */
    constructor(stroke, fill, stroke_width) {
        _assertClass(stroke, Color);
        var ptr0 = stroke.__destroy_into_raw();
        _assertClass(fill, Color);
        var ptr1 = fill.__destroy_into_raw();
        const ret = wasm.style_new(ptr0, ptr1, stroke_width);
        this.__wbg_ptr = ret >>> 0;
        StyleFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) Style.prototype[Symbol.dispose] = Style.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./polaris_core_bg.js": import0,
    };
}

const CircleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_circle_free(ptr >>> 0, 1));
const ColorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_color_free(ptr >>> 0, 1));
const EditorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_editor_free(ptr >>> 0, 1));
const LineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_line_free(ptr >>> 0, 1));
const PointFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_point_free(ptr >>> 0, 1));
const SceneFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_scene_free(ptr >>> 0, 1));
const SegmentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_segment_free(ptr >>> 0, 1));
const StyleFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_style_free(ptr >>> 0, 1));

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('polaris_core_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
