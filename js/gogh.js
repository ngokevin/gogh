var canvas, ctx, canvasHeight, canvasWidth;

$(document).ready(function() {
     window.requestAnimFrame = (function() {
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 30);
                };
    })();

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');
    canvasHeight = canvas.height;
    canvasWidth = canvas.width;

    var elements = [];
    // elements.push([new Ground(), new Sky()]);
    elements.push([new Tree()]);

    gogh(elements);

    function gogh(elements) {
        if (elements.length == 0) {
            return;
        }

        // Draw frames from each element in group.
        var done = 0;
        $(elements[0]).each(function(i, element) {
            element.drawFrame();
            if (element.done) {
                done++;
            }
        });

        // Done drawing element group, remove from elements.
        if (done == elements[0].length) {
            elements.splice(0, 1);
        }

        request = requestAnimFrame(function() {
            gogh(elements);
        });
    }
});
