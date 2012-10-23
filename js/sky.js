SkyCollection = function(canvas) {
    this.canvas = canvas;
    this.strokes = [];
};

SkyCollection.prototype = {
    draw: function(color) {
        if (!color) {
            color = 'rgb(80, 40, 200)';
        }
    },

    nextFrame: function() {
        $(this.strokes).each(function(i, stroke) {
            stroke.nextFrame();
        });
    },

    add: function(stroke) {
        this.strokes.add(stroke);
        stroke.collection = this;
    }

    remove: function(stroke) {
        var index = this.strokes.indexOf(stroke);
        this.strokes.splice(index, 1);
    }
};

SkyStroke = function() {
    this.speed =
};

SkyStroke.prototype = {

    nextFrame: function() {

    },

    update: function() {

    },

    die: function() {
        var index = this.collection.indexof(this);
        this.collection.splice(index, 1);
    },

};
