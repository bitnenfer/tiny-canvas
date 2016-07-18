/*
 * TinySprite module (https://github.com/bitnenfer/tiny-canvas)
 * Developed by Felipe Alfonso -> https://twitter.com/bitnenfer/
 * 
 *  ----------------------------------------------------------------------
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 * 
 *  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
 * 
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 * 
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 * 
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 * 
 *  ----------------------------------------------------------------------
 * 
 */
function CompileShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function CreateShaderProgram(gl, vsSource, fsSource) {
    var program = gl.createProgram(),
        vShader = CompileShader(gl, vsSource, 35633),
        fShader = CompileShader(gl, fsSource, 35632);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    return program;
}

function CreateBuffer(gl, bufferType, size, usage) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, size, usage);
    return buffer;
}

function CreateTexture(gl, image, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(3553, texture);
    gl.texParameteri(3553, 10242, 33071);
    gl.texParameteri(3553, 10243, 33071);
    gl.texParameteri(3553, 10240, 9728);
    gl.texParameteri(3553, 10241, 9728);
    gl.texImage2D(3553, 0, 6408, 6408, 5121, image);
    gl.bindTexture(3553, null);
    texture.width = width;
    texture.height = height;
    return texture;
}
window['TCShd'] = CompileShader;
window['TCPrg'] = CreateShaderProgram;
window['TCBuf'] = CreateBuffer;
window['TCTex'] = CreateTexture;

function TinySprite(canvas) {
    var gl = canvas.getContext('webgl'),
        // float + (vec2 * 4) + (char * 4)
        VERTEX_SIZE = 4 + ((4 * 2) * 4) + (4),
        MAX_BATCH = 10922, // floor((2 ^ 16) / 6)
        VERTEX_DATA_SIZE = VERTEX_SIZE * MAX_BATCH * 4,
        VERTICES_PER_QUAD = 6, 
        INDEX_DATA_SIZE = MAX_BATCH * (2 * VERTICES_PER_QUAD),
        width = canvas.width,
        height = canvas.height,
        shader = CreateShaderProgram(
            gl, [
                'precision lowp float;',
                'attribute float a;',
                'attribute vec2 b,c,d,e;',
                'attribute vec4 f;',
                'varying vec2 g;',
                'varying vec4 h;',
                'uniform mat4 i;',
                'void main() {',
                'float q=cos(a);',
                'float w=sin(a);',
                'gl_Position=i*vec4(((vec2(d.x*q-d.y*w,d.x*w+d.y*q)*c)+b),1.0,1.0);',
                'g=e;',
                'h=f;',
                '}'
            ].join('\n'), [
                'precision lowp float;',
                'varying vec2 g;',
                'varying vec4 h;',
                'uniform sampler2D j;',
                'void main(){',
                'gl_FragColor=texture2D(j,g)*h;',
                '}'
            ].join('\n')
        ),
        vertexData = new ArrayBuffer(VERTEX_DATA_SIZE),
        vPositionData = new Float32Array(vertexData),
        vColorData = new Uint32Array(vertexData),
        vIndexData = new Uint16Array(INDEX_DATA_SIZE),
        IBO = CreateBuffer(gl, 34963, vIndexData.byteLength, 35044),
        VBO = CreateBuffer(gl, 34962, vertexData.byteLength, 35048),
        count = 0,
        currentTexture = null,
        renderer = null,
        locRotation, locTranslation, locScale,
        locPosition, locUV, locColor;

    gl.blendFunc(770, 771);
    gl.enable(3042);
    gl.useProgram(shader);
    gl.bindBuffer(34963, IBO);
    for (var indexA = indexB = 0; 
        indexA < MAX_BATCH * VERTICES_PER_QUAD; 
        indexA += VERTICES_PER_QUAD, indexB += 4)
        vIndexData[indexA + 0] = indexB,
        vIndexData[indexA + 1] = indexB + 1,
        vIndexData[indexA + 2] = indexB + 2,
        vIndexData[indexA + 3] = indexB + 0,
        vIndexData[indexA + 4] = indexB + 3,
        vIndexData[indexA + 5] = indexB + 1;

    gl.bufferSubData(34963, 0, vIndexData);
    gl.bindBuffer(34962, VBO);

    locRotation = gl.getAttribLocation(shader, 'a');
    locTranslation = gl.getAttribLocation(shader, 'b');
    locScale = gl.getAttribLocation(shader, 'c');
    locPosition = gl.getAttribLocation(shader, 'd');
    locUV = gl.getAttribLocation(shader, 'e');
    locColor = gl.getAttribLocation(shader, 'f');

    // Rotation
    gl.enableVertexAttribArray(locRotation);
    gl.vertexAttribPointer(locRotation, 1, 5126, 0, VERTEX_SIZE, 0);

    // Translation
    gl.enableVertexAttribArray(locTranslation);
    gl.vertexAttribPointer(locTranslation, 2, 5126, 0, VERTEX_SIZE, 4);

    // Scale
    gl.enableVertexAttribArray(locScale);
    gl.vertexAttribPointer(locScale, 2, 5126, 0, VERTEX_SIZE, 12);

    // Position
    gl.enableVertexAttribArray(locPosition);
    gl.vertexAttribPointer(locPosition, 2, 5126, 0, VERTEX_SIZE, 20);

    // UV
    gl.enableVertexAttribArray(locUV);
    gl.vertexAttribPointer(locUV, 2, 5126, 0, VERTEX_SIZE, 28);

    // Color
    gl.enableVertexAttribArray(locColor);
    gl.vertexAttribPointer(locColor, 4, 5121, 1, VERTEX_SIZE, 36);

    gl.uniformMatrix4fv(gl.getUniformLocation(shader, 'i'), 0,
        new Float32Array([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 1,
            -1, 1, 0, 0
        ])
    );
    gl.activeTexture(33984);
    renderer = {
        'g': gl,
        'c': canvas,
        'col': 0xFFFFFFFF,
        'bkg': function (r, g, b) {
            gl.clearColor(r, g, b, 1);
        },
        'cls': function () {
            gl.clear(16384);
        },
        'img': function (texture, x, y, w, h, r, tx, ty, sx, sy, u0, v0, u1, v1) {
            var x0 = x,
                y0 = y,
                x1 = x + w,
                y1 = y + h,
                x2 = x,
                y2 = y + h,
                x3 = x + w,
                y3 = y,
                offset = 0,
                argb = renderer['col'];

            if (texture != currentTexture ||
                count + 1 >= MAX_BATCH) {
                gl.bufferSubData(34962, 0, vertexData);
                gl.drawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;
                if (texture != currentTexture) {
                    currentTexture = texture;
                    gl.bindTexture(3553, currentTexture);
                }
            }

            offset = count * VERTEX_SIZE;
            // Vertex Order: 
            // rotation | translation | scale | position | uv | color
            // Vertex 1
            vPositionData[offset++] = r;
            vPositionData[offset++] = tx;
            vPositionData[offset++] = ty;
            vPositionData[offset++] = sx;
            vPositionData[offset++] = sy;
            vPositionData[offset++] = x0;
            vPositionData[offset++] = y0;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            // Vertex 2
            vPositionData[offset++] = r;
            vPositionData[offset++] = tx;
            vPositionData[offset++] = ty;
            vPositionData[offset++] = sx;
            vPositionData[offset++] = sy;
            vPositionData[offset++] = x1;
            vPositionData[offset++] = y1;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 3
            vPositionData[offset++] = r;
            vPositionData[offset++] = tx;
            vPositionData[offset++] = ty;
            vPositionData[offset++] = sx;
            vPositionData[offset++] = sy;
            vPositionData[offset++] = x2;
            vPositionData[offset++] = y2;
            vPositionData[offset++] = u0;
            vPositionData[offset++] = v1;
            vColorData[offset++] = argb;

            // Vertex 4
            vPositionData[offset++] = r;
            vPositionData[offset++] = tx;
            vPositionData[offset++] = ty;
            vPositionData[offset++] = sx;
            vPositionData[offset++] = sy;
            vPositionData[offset++] = x3;
            vPositionData[offset++] = y3;
            vPositionData[offset++] = u1;
            vPositionData[offset++] = v0;
            vColorData[offset++] = argb;

            if (++count >= MAX_BATCH) {
                gl.bufferSubData(34962, 0, vertexData);
                gl.drawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
                count = 0;               
            }
        },
        'flush': function () {
            if (count == 0) return;
            gl.bufferSubData(34962, 0, vPositionData.subarray(0, count * VERTEX_SIZE));
            gl.drawElements(4, count * VERTICES_PER_QUAD, 5123, 0);
            count = 0;
        }
    };
    return renderer;
}

window['TS'] = TinySprite;