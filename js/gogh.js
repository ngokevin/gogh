var canvas, ctx;

$(document).ready(function() {
     window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
    })();

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');

    var elements = [];
    elements.push([new Sky()]);
    elements.push([new Ground()]);

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
