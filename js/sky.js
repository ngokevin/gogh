function SkyCollection(canvas) {
    this.canvas = canvas;
    this.strokes = [];

    var color = 'rgb(80, 40, 200)';
    var strokeNum = 15;

    for (var i = 0; i < strokeNum; i++) {
        this.strokes.push(new SkyStroke(canvas.width / strokeNum * i,
                                        canvas.width / strokeNum / 2, 3,
                                        color));
    }
}

SkyCollection.prototype = {
    drawFrame: function() {
        var collection = this;
        $(this.strokes).each(function(i, stroke) {
            if (stroke.dead) {
                collection.remove(stroke);
            }
            stroke.drawFrame();
        });
    },

    add: function(stroke) {
        this.strokes.add(stroke);
        stroke.collection = this;
    },

    remove: function(stroke) {
        var index = this.strokes.indexOf(stroke);
        this.strokes.splice(index, 1);
    }
};


function SkyStroke(x, width, speed, color) {
    this.x = x;
    this.y = 0;
    this.width = width;
    this.speed = speed;
    this.color = color;
}

SkyStroke.prototype = {
    drawFrame: function() {
        ctx.save();
        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.restore();
        this.update();
    },

    update: function() {
        this.y += this.speed;
        if (this.y > canvas.width) {
            this.dead = true;
        }
    },
};
