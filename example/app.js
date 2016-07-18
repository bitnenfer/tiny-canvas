var canvas = TcCnv(document.getElementById('canvas')),
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
    kittenTexture = TcTex(gl, kittenImage, kittenImage.width, kittenImage.height);
    create();
};
kittenImage.src = 'kittens.png';