var canvas = TcCnv(document.getElementById('canvas')),
    bunnyTexture = null,
    fpsMeter = new FPSMeter({
        graph: 1,
        heat: 1,
        theme: 'dark',
        interval: 50
    }),
    gl = canvas.g,
    bunnyImage = new Image(),
    gravity = 0.5,
    random = Math.random,
    maxX = canvas.c.width,
    minX = 0,
    maxY = canvas.c.height,
    minY = 0,
    addBunny = false,
    startBunnyCount = 2,
    count = 0,
    amount = 100,
    currentFrame = (random() * 5) | 0,
    bunnys = [],
    counter = document.getElementById('bunny-count'),
    frames = [
        [2, 47, 26, 37],
        [2, 86, 26, 37],
        [2, 125, 26, 37],
        [2, 164, 26, 37],
        [2, 2, 26, 43]
    ];

canvas.bkg(0.68, 0.68, 0.65);

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
        var bunny = new Sprite(0, 0, bunnyTexture, frame[0], frame[1], frame[2], frame[3]);
        bunny.speedX = Math.random() * 10;
        bunny.speedY = (Math.random() * 10) - 5;
        bunnys[count++] = bunny;
    }
    counter.innerHTML = count + " BUNNIES";
    mainLoop();
}

function update() {
    if (addBunny) {
        if (count < 200000) {
            var frame = frames[currentFrame];
            for (var i = 0; i < amount; i++) {
                var bunny = new Sprite(0, 0, bunnyTexture, frame[0], frame[1], frame[2], frame[3]);
                bunny.speedX = Math.random() * 10;
                bunny.speedY = (Math.random() * 10) - 5;
                bunny.rotation = (Math.random() - 0.5);
                bunnys[count++] = bunny;
            }
            counter.innerHTML = count + " BUNNIES";
        }
    }
    for (var i = 0; i < count; i++) {
        var bunny = bunnys[i];
        bunny.positionX += bunny.speedX;
        bunny.positionY += bunny.speedY;
        bunny.speedY += gravity;

        if (bunny.positionX > maxX) {
            bunny.speedX *= -1;
            bunny.positionX = maxX;
        } else if (bunny.positionX < minX) {
            bunny.speedX *= -1;
            bunny.positionX = minX;
        }
        if (bunny.positionY > maxY) {
            bunny.speedY *= -0.85;
            bunny.positionY = maxY;
            bunny.spin = (random() - 0.5) * 0.2
            if (random() > 0.5) {
                bunny.speedY -= random() * 6;
            }
        } else if (bunny.positionY < minY) {
            bunny.speedY = 0;
            bunny.positionY = minY;
        }
    }
}

function draw() {
    canvas.cls();
    for (var i = 0; i < count; i++) {
        var bunny = bunnys[i];
        canvas.push();
        canvas.trans(bunny.positionX, bunny.positionY);
        canvas.rot(bunny.rotation);
        canvas.img(
            bunny.texture, -bunny.halfWidth,
            0,
            bunny.width,
            bunny.height,
            bunny.u0,
            bunny.v0,
            bunny.u1,
            bunny.v1
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
    addBunny = true;
    currentFrame = (random() * 4) | 0;
};
canvas.c.onmouseup = function (evt) {
    addBunny = false;
};
canvas.c.ontouchstart = function (evt) {
    addBunny = true;
    currentFrame = (currentFrame + 1) % 5;
};
canvas.c.ontouchend = function (evt) {
    addBunny = false;
};
bunnyImage.onload = function () {
    bunnyTexture = TcTex(gl, bunnyImage, bunnyImage.width, bunnyImage.height);
    create();
};
bunnyImage.src = 'bunnys.png';