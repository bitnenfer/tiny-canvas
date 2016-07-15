function ExpandGLSL(source, type) {
    return 'precision mediump float;\n' +
        source
        .join('\n')
        .replace(/at/g, 'attribute')
        .replace(/va/g, 'varying')
        .replace(/un/g, 'uniform')
        .replace(/bo/g, 'bool')
        .replace(/si/g, 'int')
        .replace(/ui/g, 'uint')
        .replace(/fl/g, 'float')
        .replace(/dl/g, 'double')
        .replace(/v2/g, 'vec2')
        .replace(/v3/g, 'vec3')
        .replace(/v4/g, 'vec4')
        .replace(/bv2/g, 'bvec2')
        .replace(/bv3/g, 'bvec3')
        .replace(/bv4/g, 'bvec4')
        .replace(/iv2/g, 'ivec2')
        .replace(/iv3/g, 'ivec3')
        .replace(/iv4/g, 'ivec4')
        .replace(/uv2/g, 'uvec2')
        .replace(/uv3/g, 'uvec3')
        .replace(/uv4/g, 'uvec4')
        .replace(/dv2/g, 'dvec2')
        .replace(/dv3/g, 'dvec3')
        .replace(/dv4/g, 'dvec4')
        .replace(/m23/g, 'mat2x3')
        .replace(/m24/g, 'mat2x4')
        .replace(/m32/g, 'mat3x2')
        .replace(/m34/g, 'mat3x4')
        .replace(/m42/g, 'mat4x2')
        .replace(/m43/g, 'mat4x3')
        .replace(/m2/g, 'mat2')
        .replace(/m3/g, 'mat3')
        .replace(/m4/g, 'mat4')
        .replace(/gl/g, type == 35633 ? 'gl_Position' : 'gl_FragColor')
        .replace(/t2/g, 'texture2D')
        .replace(/s2/g, 'sampler2D');
}

function CompileShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    // No space for error checking.
    // Make sure shaders are correct.
    return shader;
}

function CreateShaderProgram(gl, vsSource, fsSource) {
    var program = gl.createProgram(),
        vShader = CompileShader(gl, vsSource, 35633),
        fShader = CompileShader(gl, fsSource, 35632);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    // No space for error checking.
    // Make sure shaders are correct.
    program.use = function () {
        gl.useProgram(program)
    };
    program.attr = function (name) {
        return gl.getAttribLocation(program, name)
    };
    program.unif = function (name) {
        return gl.getUniformLocation(program, name)
    };
    return program;
}

function CreateBuffer(gl, bufferType, size, usage) {
    var buffer = gl.createBuffer();
    gl.bindBuffer(bufferType, buffer);
    gl.bufferData(bufferType, size, usage);
    buffer.bind = function () {
        gl.bindBuffer(bufferType, buffer)
    };
    buffer.typedef = function (location, componentSize, type, normalize, stride, offset) {
        gl.vertexAttribPointer(location, componentSize, type, normalize, stride, offset);
    };
    buffer.upload = function (data) {
        gl.bindBuffer(bufferType, buffer);
        gl.bufferSubData(bufferType, 0, data);
    };
    return buffer;
}

function CreateTexture(gl, image, width, height) {
    var texture = gl.createTexture();
    gl.bindTexture(3553, texture);
    gl.texParameteri(3553, 10242, 33071);
    gl.texParameteri(3553, 10243, 33071);
    gl.texParameteri(3553, 10240, 9728);
    gl.texParameteri(3553, 10241, 9728);
    gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, image);
    gl.bindTexture(3553, null);
    texture.bind = function (location, index) {
        index = index || 0;
        gl.uniform1i(location || 0, index);
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    texture.width = width;
    texture.height = height;
    return texture;
}

function CreateColorTexture(gl, width, height, r, g, b, a) {
    var texture = gl.createTexture(),
        pixels = new Uint8Array(width * height * 4);
    for (var i = 0; i < width * height * 4; i += 4)
        pixels[i] = r, pixels[i + 1] = g, pixels[i + 2] = b, pixels[i + 3] = a;
    gl.bindTexture(3553, texture);
    gl.texParameteri(3553, 10242, 33071);
    gl.texParameteri(3553, 10243, 33071);
    gl.texParameteri(3553, 10240, 9728);
    gl.texParameteri(3553, 10241, 9728);
    gl.texImage2D(3553, 0, 6408, width, height, 0, 6408, 5121, pixels);
    gl.bindTexture(3553, null);
    texture.bind = function (location, index) {
        index = index || 0;
        gl.uniform1i(location || 0, index);
        gl.activeTexture(gl.TEXTURE0 + index);
        gl.bindTexture(gl.TEXTURE_2D, texture);
    };
    texture.width = width;
    texture.height = height;
    return texture;
}