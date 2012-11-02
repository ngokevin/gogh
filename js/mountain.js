function Mountain() {
    this.children = [];

    // Set physical properties of mountain,
    var skyHeight = (1 - groundHeightPer) * canvasHeight;
    var angle = randInt(30, 60);
    var peakAngle = 180 - angle * 2;
    var height = randInt(Math.floor(.3 * skyHeight),
                          Math.floor(.8 * skyHeight))
    var width = Math.tan(rad(peakAngle / 2)) * 2 * height;

    // Mountain's location, the farthest left point.
    // var x = randInt(width / -3, canvasWidth + width / 3);
    var x = randInt(0, canvasWidth / 2);

    var speed = 4;
    var radius = randInt(3, 5);
    var color = randColor(['#1046A9', '#29477F']);

    var maxY;
    var childNum = width / (radius * 2);
    for (var i = 0; i < childNum; i++) {
        maxY = height + i * radius * Math.cos(rad(peakAngle / 2));

        this.add(new MountainChild(x + i * radius,
                                   skyHeight, maxY, angle, radius,
                                   speed + Math.floor(Math.random() * 5),
                                   fuzzColor(color, 10)));
    }
}

Mountain.prototype = {
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


function MountainChild(x, y, maxY, angle,
                       radius, speed, color) {
    this.x = x;
    this.y = y;
    this.maxY = maxY;
    this.angle = angle;
    this.radius= radius;
    this.speed = speed
    this.color = color;

    this.gradientHeight = canvasHeight * .33;
}

MountainChild.prototype = {
    drawFrame: function() {
        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = ctx.shadowOffsetY = this.radius;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        this.update();
    },

    update: function() {
        if (this.y <= this.maxY) {
            this.done = true;
        }

        this.y -= this.speed * Math.sin(rad(this.angle));
        this.x += this.speed * Math.cos(rad(this.angle));

        // Sunset-like gradient.
        if (this.y > this.gradientHeight) {
            this.color = fuzzColor(this.color, 3, 'rb');
        }
    },
};
