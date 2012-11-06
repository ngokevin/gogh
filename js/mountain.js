function Mountain() {
    this.children = [];

    // Set physical properties of mountain (isosceles),
    var skyHeight = (1 - groundHeightPer) * canvasHeight + 14;
    var angle = randInt(25, 60);
    var peakAngle = 180 - angle * 2;
    var height = randInt(Math.floor(.3 * skyHeight),
                         Math.floor(.8 * skyHeight))
    var width = Math.tan(rad(peakAngle / 2)) * 2 * height;

    // Mountain's location, the farthest left point.
    var x = randInt(canvasWidth * .33 / 2, canvasWidth * .66 / 2);

    var speed = 2;
    var radius = randInt(3, 5);
    var diameter = 2 * radius;
    var color = randColor(['rgb(185, 185, 205)', 'rgb(195, 195, 215)', 'rgb(205, 205, 225)']);

    var maxY;
    var childNum = width / (diameter);
    for (var i = 0; i < childNum; i++) {
        // Create the triangle by having strokes go at the angle until
        // hitting a certain Y point. The math was misbehaving hence the magic
        // number.
        maxY = (skyHeight - height) + i * diameter * Math.cos(rad(peakAngle / 1.5));

        // Start growing whiter at a percentage height of mountain for snow
        // caps.
        // gradientHeight = (skyHeight - height) +  height * .66;
        gradientHeight = maxY * 1.66;

        // x, y, maxY, angle, radius, speed, color
        this.add(new MountainChild(x + i * diameter,
                                   skyHeight, maxY, angle, radius,
                                   speed + Math.floor(Math.random() * 5),
                                   gradientHeight, color));
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


function MountainChild(x, y, maxY, angle, radius, speed, gradientHeight,
                       color) {
    this.x = x;
    this.y = y + randInt(0, 2);
    this.maxY = maxY;
    this.angle = angle;
    this.radius= radius;
    this.speed = speed
    this.gradientHeight = gradientHeight;
    this.color = color;
}

MountainChild.prototype = {
    drawFrame: function() {
        ctx.save()

        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = ctx.shadowOffsetY = this.radius;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        ctx.restore()

        this.update();
    },

    update: function() {
        if (this.y <= this.maxY) {
            this.done = true;
        }

        this.y -= this.speed * Math.sin(rad(this.angle));
        this.x += this.speed * Math.cos(rad(this.angle));

        // Sunset-like gradient.
        if (this.y < this.gradientHeight) {
            this.color = fuzzColor(this.color, 3, 'rgb');
        }
    },
};
