function InitRenderer2D(canvas) {
    var gl = canvas.getContext('webgl'),
        width = canvas.width,
        height = canvas.height,
        shader = CreateShaderProgram(
            gl,
            ExpandGLSL(
                [
                    // IN Vertex Position
                    'at v2 a;',
                    // IN Texture Coordinates
                    'at v2 b;',
                    // IN Vertex Color
                    'at v4 c;',
                    // OUT Texture Coordinates
                    'va v2 d;',
                    // OUT Vertex Color
                    'va v4 e;',
                    // CONST View Matrix
                    'un m4 m;',
                    'void main(){',
                    'gl=m*v4(a,1.0,1.0);',
                    'd=b;',
                    'e=c;',
                    '}'
                ],
                35633
            ),
            ExpandGLSL(
                [
                    // OUT Texture Coordinates
                    'va v2 d;',
                    // OUT Vertex Color
                    'va v4 e;',
                    // CONST Single Sampler2D
                    'un s2 f;',
                    'void main(){',
                    'gl=t2(f,d);',
                    '}'
                ],
                0
            )
        ),
        vertexData = new ArrayBuffer(800000),
        vPositionData = new Float32Array(vertexData),
        vTexCoordData = new Float32Array(vertexData),
        vColorData = new Uint32Array(vertexData),
        vIndexData = new Uint16Array(60000),
        IBO = CreateBuffer(gl, 34963, vIndexData.byteLength, 35044),
        VBO = CreateBuffer(gl, 34962, vertexData.byteLength, 35048),
        count = 0,
        argb = 0xFFFFFFFF,
        mat = new Float32Array([1, 0, 0, 1, 0, 0]),
        stack = new Float32Array(192),
        stackp = 0,
        cos = Math.cos,
        sin = Math.sin,
        currentTexture = null,
        renderer = null,
        sampler2DLocation = shader.unif('f'),
        checkFlushState = function (texture) {
            if (texture != currentTexture ||
                count > 10000)
                renderer.flush(),
                currentTexture = texture,
                currentTexture.bind(sampler2DLocation, 0);
        };

    shader.use();
    for (var x = y = 0; x < 60000; x += 6, y += 4)
        vIndexData[x + 0] = y + 0, vIndexData[x + 1] = y + 1,
        vIndexData[x + 2] = y + 2, vIndexData[x + 3] = y + 0,
        vIndexData[x + 4] = y + 2, vIndexData[x + 5] = y + 3;
    IBO.upload(vIndexData);
    VBO.bind();
    VBO.typedef(shader.attr('a'), 2, 5126, 0, 20, 0);
    VBO.typedef(shader.attr('b'), 2, 5126, 0, 20, 8);
    VBO.typedef(shader.attr('c'), 4, 5121, 1, 20, 16);
    gl.uniformMatrix4fv(shader.unif('m'), 0,
        new Float32Array([
            2 / width, 0, 0, 0,
            0, -2 / height, 0, 0,
            0, 0, 1, 1, -1, 1, 0, 0
        ])
    );
    renderer = {
        gl: gl,
        identity: function () {
            mat[0] = 1;
            mat[1] = 0;
            mat[2] = 0;
            mat[3] = 1;
            mat[4] = 0;
            mat[5] = 0;
        },
        clear: function (r, g, b) {
            gl.clearColor(r, g, b, 1);
            gl.clear(16384);
        },
        transform: function (a, b, c, d, e, f) {
            var g = a * mat[0] + a * mat[2],
                h = b * mat[1] + b * mat[3],
                i = c * mat[0] + c * mat[2],
                j = d * mat[1] + d * mat[3],
                k = e * mat[0] + e * mat[2] + mat[4],
                l = f * mat[1] + f * mat[3] + mat[5];

            mat[0] = g, mat[1] = h, mat[2] = i, mat[3] = j, mat[4] = k, mat[5] = l;
        },
        translate: function (x, y) {
            renderer.transform(1, 0, 0, 1, x, y);
        },
        scale: function (x, y) {
            renderer.transform(y, 0, 0, x, 0, 0);
        },
        rotate: function (r) {
            renderer.transform(cos(r), -sin(r), sin(r), cos(r), 0, 0);
        },
        pushMatrix: function () {
            stack[stackp + 0] = mat[0];
            stack[stackp + 1] = mat[1];
            stack[stackp + 2] = mat[2];
            stack[stackp + 3] = mat[3];
            stack[stackp + 4] = mat[4];
            stack[stackp + 5] = mat[5];
            stackp += 6;
        },
        popMatrix: function () {
            stackp -= 6;
            mat[0] = stack[stackp + 0];
            mat[1] = stack[stackp + 1];
            mat[2] = stack[stackp + 2];
            mat[3] = stack[stackp + 3];
            mat[4] = stack[stackp + 4];
            mat[5] = stack[stackp + 5];
        },
        setColor: function (r, g, b, a) {
            argb = (a << 24 | r << 16 | g << 8 | b);
        },
        drawImage: function (texture, x, y) {
            renderer.drawImageUV(texture, x, y, 0, 0, 1, 1);
        },
        drawImageUV: function (texture, x, y, u0, v0, u1, v1) {
            var w = texture.width,
                h = texture.height,
                x0 = x,
                x1 = x + w,
                x2 = x1,
                x3 = x,
                y0 = y,
                y1 = y,
                y2 = y + h,
                y3 = y2,
                a = mat[0],
                b = mat[1],
                c = mat[2],
                d = mat[3],
                e = mat[4],
                f = mat[5],
                offset = count * 20;

            checkFlushState(texture);

            vPositionData[offset + 0] = x0 * a + y0 * c + e;
            vPositionData[offset + 1] = x0 * b + y0 * d + f;
            vPositionData[offset + 2] = u0;
            vPositionData[offset + 3] = v0;
            vPositionData[offset + 5] = x1 * a + y1 * c + e;
            vPositionData[offset + 6] = x1 * b + y1 * d + f;
            vPositionData[offset + 7] = u1;
            vPositionData[offset + 8] = v0;
            vPositionData[offset + 10] = x2 * a + y2 * c + e;
            vPositionData[offset + 11] = x2 * b + y2 * d + f;
            vPositionData[offset + 12] = u1;
            vPositionData[offset + 13] = v1;
            vPositionData[offset + 15] = x3 * a + y3 * c + e;
            vPositionData[offset + 16] = x3 * b + y3 * d + f;
            vPositionData[offset + 17] = u0;
            vPositionData[offset + 18] = v1;

            vColorData[offset + 4] = argb;
            vColorData[offset + 9] = argb;
            vColorData[offset + 14] = argb;
            vColorData[offset + 19] = argb;

            ++count;
        },
        flush: function () {
            if (count > 0) {
                VBO.upload(vPositionData.subarray(0, count * 20));
                gl.drawElements(4, count * 6, 5123, 0);
                count = 0;
            }
        }
    };
    return renderer;
}