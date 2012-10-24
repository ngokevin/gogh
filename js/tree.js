function Tree() {
    this.children = [];

    var color = 'rgb(10, 10, 10)';
    var childNum = randInt(1, 5);

    var startRadius = 5;
    var groundHeight = Math.floor(canvas.height / 3);
    var treeBaseX = randInt(canvas.width / 3, canvas.width * 2 / 3);
    var treeBaseY = randInt(canvas.height - groundHeight / 3,
                            canvas.height - groundHeight * 2 / 3);
    for (var i = 0; i < childNum; i++) {
        this.add(new TreeChild(treeBaseX + i * startRadius, treeBaseY, 90,
                               startRadius, 4, fuzzColor(color, 10)));
    }
}

Tree.prototype = {
    drawFrame: function() {
        if (this.children.length == 0) {
            this.done = true;
            return;
        }

        var that = this;
        $(this.children).each(function(i, child) {
            child.drawFrame();
            if (child.done) {
                that.remove(child);
            }
            if (child.branch) {
                that.add(new TreeChild(child.x, child.y,
                                       child.angle + randInt(-45, 45),
                                       child.radius - 1, child.speed - 1,
                                       fuzzColor(child.color, 10)));

            }
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


function TreeChild(x, y, angle, radius, speed, color) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius= radius;
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;
}

TreeChild.prototype = {
    drawFrame: function() {
        ctx.save();

        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, rad(360), true);
        ctx.fill();

        ctx.restore();
        this.update();
    },

    update: function() {
        if (this.radius < 1) {
            this.done = true;
        }

        // Random chance of branching.
        if (Math.random() < 1 / 30) {
            this.angle = randInt(rad(0), rad(180));
            this.branch = true;
            this.radius--;
        }

        this.x += this.speed * Math.cos(rad(this.angle));
        this.y -= this.speed * Math.sin(rad(this.angle));
    },
};
