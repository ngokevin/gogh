function Ground() {
    this.children = [];

    var color = 'rgb(40, 220, 100)';
    var childNum = randInt(10, 15);

    var height = Math.floor(canvas.height / 4);
    for (var i = 0; i < childNum; i++) {
        this.add(new GroundChild(height / childNum * i + canvas.height - height,
                                 height / childNum, 3,
                                 fuzzColor(color, 10)));
    }
}

Ground.prototype = {
    drawFrame: function() {
        if (this.children.length == 0) {
            this.done = true;
            return;
        }

        var that = this;
        $(this.children).each(function(i, child) {
            if (child.done) {
                that.remove(child);
            }
            child.drawFrame();
        });
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
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;
}

GroundChild.prototype = {
    drawFrame: function() {
        ctx.save();

        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = this.radius;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, rad(360), true);
        ctx.fill();

        ctx.restore();
        this.update();
    },

    update: function() {
        if (this.x > canvas.width) {
            this.done = true;
        }
        this.x += this.speed;
    },
};
