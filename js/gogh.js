$(document).ready(function() {
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var y = 0;
    var canvas = $('#canvas').get(0);
    var ctx = canvas.getContext('2d');
    var w = canvas.width;
    var h = canvas.height;

    function gogh() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render stage.
        ctx.fillStyle = ctx.shadowColor = 'rgb(80, 40, 200)';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(w / 2, y);
        ctx.lineTo(w / 2, y + 20);
        ctx.lineTo(w / 2 + 20, y + 20);
        ctx.lineTo(w / 2 + 20, y);
        ctx.fill();

        // Update stage.
        y += 20;

        // Request new frame.
        requestAnimFrame(function() {
            gogh();
        });
    }

    gogh();
});
