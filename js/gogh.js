var canvas, ctx;

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

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');

    var y = 0;
    var w = canvas.width;
    var h = canvas.height;
    var elements = [];

    elements.push(new Sky(canvas));

    function gogh() {
        $(elements).each(function(i, element) {
            element.drawFrame();
        });

        // Request new frame.
        requestAnimFrame(function() {
            gogh();
        });
    }

    gogh();
});
