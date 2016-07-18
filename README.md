Tiny-Canvas
====

Tiny-Canvas is a lightweight minimal implementation of a batched and stack matrix based canvas similar to HTML5 Canvas2D.
As a backend Tiny-Canvas uses a WebGL renderer. It doesn't fallback to canvas to limit the size of the file.
Tiny-Canvas is great if you have limited space (ex: Limited size contests) and want to have WebGL features like custom shaders.

The zipped size is: 1578 bytes

The compiled size is: 3156 bytes

The full size is: 8816 bytes

[Small KittenMark Example](https://raw.githack.com/bitnenfer/tiny-canvas/master/example/index.html)

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
- `img(texture : WebGLTexture, x : Number, y : Number, width : Number, height : Number, u0 : Number, v0 : Number, u1 : Number, v1 : Number) : void`: Batches texture rendering properties. If you are not drawing a tile of a texture then you can set u0 = 0, v0 = 0, u1 = 1 and v1 = 1.
- `flush() : void`: Pushes the current batch information to the GPU for rendering.

Developed by [Felipe Alfonso](https://twitter.com/bitnenfer/).

The license for this software is [WTFPL](http://www.wtfpl.net/).