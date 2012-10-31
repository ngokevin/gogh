function Mountain() {
    this.children = [];

    // Set physical properties of mountain,
    var skyHeight = (1 - groundHeightPer) * canvasHeight;
    var width = randInt(Math.floor(.3 * canvasWidth),
                                Math.floor(.5 * canvasWidth))
    var height = randInt(Math.floor(.3 * skyHeight),
                          Math.floor(.8 * skyHeight))
    var angle = randInt(30, 60);

    // Mountain's location, the farthest left point.
    this.x = randInt(this.width / -2, canvasWidth + this.width / 2);

    var childNum = 30;
    var speed = 4;
    var radius = height / childNum;
    var color = randColor(['#1046A9', '#29477F']);

    var maxY;
    for (var i = 0; i < childNum; i++) {
        maxY = radius * Math.sin(rad(angle))

        this.add(new MountainChild(this.x + radius * i - radius,
                                   skyHeight, maxY, this.angle, radius,
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
    this.y = 0;  // Start from base of mountain.
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
        ctx.shadowOffsetX = ctx.shadowOffsetY = this.radius * this.angle;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        this.update();
    },

    update: function() {
        if (this.y >= maxY) {
            this.done = true;
        }
        this.y += this.speed * Math.sin(rad(this.angle));
        this.x += this.speed * Math.cos(rad(this.angle));

        // Sunset-like gradient.
        if (this.y > this.gradientHeight) {
            this.color = fuzzColor(this.color, 3, 'rb');
        }
    },
};
