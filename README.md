![TinyCanvas](http://voidptr.io/dev/extra/shin.png "Shin Logo")

Tiny-Canvas
====

Tiny-Canvas is composed by two minimal and lightweight rendering modules. One called TinyCanvas and the other one called TinySprite. Both of this modules use WebGL as a rendering backend for high performance. None of them falls back to canvas to keep the size of the library as small as possible. Tiny-Canvas modules are great if you have limited space (ex: Limited size contests) and want to have WebGL features like custom shaders.

The main difference between TinyCanvas and TinySprite is that the first one implements a simple matrix stack to enable multiple layers of transformation, this would allow an easy implementation of a scene graph type of structure. TinySprite is mostly useful if you are working on a single layer of transformation. This means that TinySprite is a bit faster than TinyCanvas but less flexible.

Modules size
-----

TinyCanvas zipped size is: 1560 bytes

TinyCanvas compiled size is: 3203 bytes

TinyCanvas full size is: 10103 bytes

---

TinySprite zipped size is: 1400 bytes

TinySprite compiled size is: 3155 bytes

TinySprite full size is: 9609 bytes

Examples
-----

[Small KittenMark Example (TinyCanvas)](https://raw.githack.com/bitnenfer/tiny-canvas/master/example/index_canvas.html)

[Small KittenMark Example (TinySprite)](https://raw.githack.com/bitnenfer/tiny-canvas/master/example/index_sprite.html)

TinyCanvas Module
-----

TinyCanvas module is instanced using the construction function TC or TinyCanvas if working with unminified version.
The function requires as a parameter a HTML Canvas element.

```
var canvas = TC(document.getElementsByClassName('canvas')[0]);
``` 

TinyCanvas Properties:

- `g : WebGLRenderingContext` : Reference to the WebGL Context used by the renderer.
- `c : HTMLCanvasElement` : Reference to the HTML Canvas Element used by the renderer.
- `col: Number` : Integer number representing the current tint color on the canvas. It's represented like ARGB (ex: 0xFFFFFFFF).

TinyCanvas Methods:

- `bkg(red : Number, green : Number, blue : Number) : void`: Sets the background color. Maps to glClearColor. It requires normilized to 1.0 values.
- `cls() : void`: Clear the current frame buffer.
- `trans(x : Number, y : Number) : void`: Applies translate transformation to current matrix.
- `scale(x : Number, y : Number) : void`: Applies scale transformation to current matrix.
- `rot(radians : Number) : void`: Applies rotation transformation to current matrix.
- `push() : void`: Pushes the current matrix into the matrix stack.
- `pop() : void`: Pops the matrix stack into the current matrix.
- `img(
    texture : WebGLTexture, 
    x : Number, 
    y : Number, 
    width : Number, 
    height : Number, 
    u0 : Number, 
    v0 : Number, 
    u1 : Number, 
    v1 : Number) : void`: 
    Batches texture rendering properties. NOTE: If you are not drawing a tile of a texture then you can set u0 = 0, v0 = 0, u1 = 1 and v1 = 1.
- `flush() : void`: Pushes the current batch information to the GPU for rendering.

TinySprite Module
-----

TinySprite module is instanced using the construction function TS or TinySprite if working with unminified version.
The function requires as a parameter a HTML Canvas element.

```
var canvas = TS(document.getElementsByClassName('canvas')[0]);
``` 

TinySprite Properties:

- `g : WebGLRenderingContext` : Reference to the WebGL Context used by the renderer.
- `c : HTMLCanvasElement` : Reference to the HTML Canvas Element used by the renderer.
- `col: Number` : Integer number representing the current tint color on the canvas. It's represented like ARGB (ex: 0xFFFFFFFF).

TinySprite Methods:

- `bkg(red : Number, green : Number, blue : Number) : void`: Sets the background color. Maps to glClearColor. It requires normilized to 1.0 values.
- `cls() : void`: Clear the current frame buffer.
- `img(
    texture : WebGLTexture, 
    x : Number, 
    y : Number, 
    width : Number, 
    height : Number, 
    rotation: Number,
    translateX: Number,
    translateY: Number,
    scaleX: Number,
    scaleY: Number,
    u0 : Number, 
    v0 : Number, 
    u1 : Number, 
    v1 : Number) : void`: 
    Batches texture rendering properties. It's very similar to TinyCanvas `img` method but here you must pass the transformation parameters drawing function. This is because TinySprite doesn't have a matrix stack. NOTE: If you are not drawing a tile of a texture then you can set u0 = 0, v0 = 0, u1 = 1 and v1 = 1.
- `flush() : void`: Pushes the current batch information to the GPU for rendering.

Utility Functions
-----

Tiny-Canvas comes with a couple of utility functions for easy creation of some WebGL primitives.

- `TCPrg(gl : WebGLRenderingContext, vsSrouce : String, fsSource : String) : WebGLProgram` : Compiles a vertex and fragment shader and then links them to program. 

- `TCBuf(gl : WebGLRenderingContext, bufferType : Number, size : Number, usage : Number) : WebGlBuffer` : Creates and allocates a buffer object.

- `TCTex(gl : WebGLRenderingContext, image : (Image | ArrayBuffer), width : Number, height: Number) : WebGLTexture`

---

Developed by [Felipe Alfonso](https://twitter.com/bitnenfer/).

The license for this software is [WTFPL](http://www.wtfpl.net/).