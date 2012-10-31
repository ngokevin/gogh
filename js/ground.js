function Ground() {
    this.speed = 9;
    this.children = [];

    var color = randColor(['#138900', '#A54600']);
    var childNum = 25;

    var height = Math.floor(canvasHeight * groundHeightPer);
    for (var i = 0; i < childNum; i++) {
        // Draw ground at the bottom, starting from where sky will stop.
        this.add(new GroundChild(height / childNum * i + canvasHeight - height,
                                 height / childNum, this.speed,
                                 fuzzColor(color, 12)));
    }
}

Ground.prototype = {
    drawFrame: function() {
        if (this.children.length == 0) {
            this.done = true;
            return;
        }

        ctx.save();

        var that = this;
        $(this.children).each(function(i, child) {
            if (child.done) {
                that.remove(child);
            }
            child.drawFrame();
        });

        ctx.restore();
    },

    add: function(child) {
        this.children.push(child);
    },

    remove: function(child) {
        var index = this.children.indexOf(child);
        this.children.splice(index, 1);
    }
};


function GroundChild(y, radius, speed, color) {
    this.x = 0;
    this.y = y;
    this.radius= radius;
    this.speed = speed;
    this.color = color;
}

GroundChild.prototype = {
    drawFrame: function() {
        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = this.radius;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        this.update();
    },

    update: function() {
        if (this.x > canvasWidth) {
            this.done = true;
        }
        this.x += this.speed;
    },
};
