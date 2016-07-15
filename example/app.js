var renderer = InitRenderer2D(document.getElementById('canvas'));
var t0 = CreateColorTexture(renderer.gl, 100, 100, 0, 255, 0, 255);

var gl = renderer.gl;

function loop() {
    requestAnimationFrame(loop);
    renderer.clear(0, 0, 0);
    renderer.setColor(255, 0, 0);
    renderer.drawImage(t0, 100, 100);
    renderer.drawImage(t0, 200, 100);
    renderer.drawImage(t0, 200, 200);
    renderer.flush();
}
loop();