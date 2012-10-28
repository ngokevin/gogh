function Sky() {
    this.speed = 4;
    this.children = [];

    var color = '#009E8E';
    var childNum = 50;

    // Make few more children to cover the top right since drawing angled.
    for (var i = 0; i < Math.floor(childNum * 4 / 3); i++) {
        this.add(new SkyChild(canvasWidth / childNum * i - canvasWidth / childNum,
                              canvasWidth / childNum,
                              this.speed, fuzzColor(color, 10)));
    }
}

Sky.prototype = {
    drawFrame: function() {
        if (this.children.length == 0) {
            this.done = true;
            return;
        }

        // Draw at 45 degree angle. Put here for optimization.
        ctx.save();
        ctx.rotate(rad(-45));
        ctx.translate(canvasWidth / -2, 0);

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


function SkyChild(x, radius, speed, color) {
    this.x = x;
    this.y = 0;
    this.radius= radius;
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;
    this.angle = Math.sin(rad(45));

    // Factor in canvas rotation and translation.
    this.absY = -1 * (this.x - canvasWidth / 2) * this.angle;

    this.height = canvasHeight * .66 - this.radius;
    this.gradientHeight = canvasHeight * .33;
}

SkyChild.prototype = {
    drawFrame: function() {
        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = ctx.shadowOffsetY = this.radius * this.angle;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        this.update();
    },

    update: function() {
        if (this.absY > this.height) {
            this.done = true;
        }
        this.y += this.speed;

        // Sunset-like gradient.
        if (this.absY > this.gradientHeight) {
            this.color = fuzzColor(this.color, 3, 'rb');
        }

        // Factor in angled speed.
        this.absY += this.speed * this.angle;
    },
};
