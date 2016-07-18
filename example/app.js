var canvas = TC(document.getElementById('canvas')),
    kittenTexture = null,
    fpsMeter = new FPSMeter({
        graph: 1,
        heat: 1,
        theme: 'dark',
        interval: 50
    }),
    gl = canvas.g,
    kittenImage = new Image(),
    gravity = 0.5,
    random = Math.random,
    maxX = canvas.c.width,
    minX = 0,
    maxY = canvas.c.height,
    minY = 0,
    add = false,
    startBunnyCount = 2,
    count = 0,
    amount = 100,
    kittens = [],
    counter = document.getElementById('kitten-count'),
    frames = [
        [0, 0, 32, 32],
        [0, 32, 32, 32],
        [0, 64, 32, 32],
        [0, 96, 32, 32]
    ],
    currentFrame = 0;

function Sprite(x, y, texture, frameX, frameY, frameW, frameH) {
    this.positionX = x;
    this.positionY = y;
    this.width = frameW;
    this.height = frameH;
    this.texture = texture;
    this.speedX = 0;
    this.speedY = 0;
    this.rotation = 0;
    this.u0 = frameX / texture.width;
    this.v0 = frameY / texture.height;
    this.u1 = this.u0 + (frameW / texture.width);
    this.v1 = this.v0 + (frameH / texture.height);
    this.halfWidth = frameW / 2;
}

function create() {
    var frame = frames[currentFrame];
    for (var i = 0; i < startBunnyCount; i++) {
        var kitten = new Sprite(0, 0, kittenTexture, frame[0], frame[1], frame[2], frame[3]);
        kitten.speedX = Math.random() * 10;
        kitten.speedY = (Math.random() * 10) - 5;
        kittens[count++] = kitten;
    }
    counter.innerHTML = count + " KITTENS";

    canvas.bkg(0.227, 0.227, 0.227);
    mainLoop();
}

function update() {
    if (add) {
        if (count < 200000) {
            var frame = frames[currentFrame];
            for (var i = 0; i < amount; i++) {
                var kitten = new Sprite(0, 0, kittenTexture, frame[0], frame[1], frame[2], frame[3]);
                kitten.speedX = Math.random() * 10;
                kitten.speedY = (Math.random() * 10) - 5;
                kitten.rotation = (Math.random() - 0.5);
                kittens[count++] = kitten;
            }
            counter.innerHTML = count + " KITTENS";
        }
    }
    for (var i = 0; i < count; i++) {
        var kitten = kittens[i];
        kitten.positionX += kitten.speedX;
        kitten.positionY += kitten.speedY;
        kitten.speedY += gravity;

        if (kitten.positionX > maxX) {
            kitten.speedX *= -1;
            kitten.positionX = maxX;
        } else if (kitten.positionX < minX) {
            kitten.speedX *= -1;
            kitten.positionX = minX;
        }
        if (kitten.positionY > maxY) {
            kitten.speedY *= -0.85;
            kitten.positionY = maxY;
            kitten.spin = (random() - 0.5) * 0.2
            if (random() > 0.5) {
                kitten.speedY -= random() * 6;
            }
        } else if (kitten.positionY < minY) {
            kitten.speedY = 0;
            kitten.positionY = minY;
        }
    }
}

function draw() {
    canvas.cls();
    for (var i = 0; i < count; i++) {
        var kitten = kittens[i];
        canvas.push();
        canvas.trans(kitten.positionX, kitten.positionY);
        canvas.rot(kitten.rotation);
        canvas.img(
            kitten.texture, -kitten.halfWidth,
            0,
            kitten.width,
            kitten.height,
            kitten.u0,
            kitten.v0,
            kitten.u1,
            kitten.v1
        );
        canvas.pop();
    }
    canvas.flush();
}

function mainLoop() {
    requestAnimationFrame(mainLoop);
    fpsMeter.tick();
    update();
    draw();
}

canvas.c.onmousedown = function (evt) {
    add = true;
    currentFrame = (currentFrame + 1) % frames.length;    
};
canvas.c.onmouseup = function (evt) {
    add = false;
};
canvas.c.ontouchstart = function (evt) {
    add = true;
    currentFrame = (currentFrame + 1) % frames.length;
};
canvas.c.ontouchend = function (evt) {
    add = false;
};
kittenImage.onload = function () {
    kittenTexture = TCTex(gl, kittenImage, kittenImage.width, kittenImage.height);
    create();
};
kittenImage.src = 'data:image/png;base64,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';