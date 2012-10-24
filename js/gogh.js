var canvas, ctx;

$(document).ready(function() {
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                return window.setTimeout(callback, 1000 / 60);
            };
    })();
    window.cancelRequestAnimFrame = ( function() {
        return window.cancelAnimationFrame          ||
            window.webkitCancelRequestAnimationFrame    ||
            window.mozCancelRequestAnimationFrame       ||
            window.oCancelRequestAnimationFrame     ||
            window.msCancelRequestAnimationFrame        ||
            clearTimeout
    } )();

    canvas = $('#canvas').get(0);
    ctx = canvas.getContext('2d');

    var y = 0;
    var w = canvas.width;
    var h = canvas.height;
    var elements = [];

    elements.push([new Sky()]);
    elements.push([new Ground()]);

    var request, done;

    // Draw specified groups at a time.
    $(elements).each(function(i, element) {
        done = false;
        console.log(element);
        gogh(element);
    });

    function gogh(elements) {
        var elementDone = 0;
        $(elements).each(function(i, element) {
            element.drawFrame();
            if (element.done) {
                elementDone++;
            }
        });

        if (elementDone == elements.length) {
            done = true;
        }

        // Request new frame.
        request = requestAnimFrame(function() {
            gogh(elements);
        });
    }

    setInterval(function() {
        if (done) {
            cancelRequestAnimFrame(request);
        }
    }, 100);
});
