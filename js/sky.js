function Sky() {
    this.children = [];

    var color = 'rgb(130, 60, 240)';
    var childNum = randInt(15, 25);

    // Make few more children to cover the top right since drawing angled.
    for (var i = 0; i < Math.floor(childNum * 4 / 3); i++) {
        this.add(new SkyChild(canvas.width / childNum * i,
                              canvas.width / childNum, 5,
                              fuzzColor(color, 10)));
    }
}

Sky.prototype = {
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


function SkyChild(x, radius, speed, color) {
    this.x = x;
    this.y = 0;
    this.radius= radius;
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;

    this.angle = Math.sin(rad(45));

    // Factor in canvas rotation and translation.
    this.absY = -1 * (this.x - canvas.width / 2) * this.angle;
}

SkyChild.prototype = {
    drawFrame: function() {
        ctx.save();

        ctx.rotate(rad(-45));
        ctx.translate(canvas.width / -2, 0);

        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = ctx.shadowOffsetY = this.radius * this.angle;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, rad(360), true);
        ctx.fill();

        ctx.restore();
        this.update();
    },

    update: function() {
        if (this.absY > .66 * canvas.height) {
            this.done = true;
        }
        this.y += this.speed;

        // Sunset-like gradient.
        if (this.absY > .33 * canvas.height) {
            this.color = fuzzColor(this.color, 3, 'rb');
        }

        // Factor in angled speed.
        this.absY += this.speed * this.angle;
    },
};
