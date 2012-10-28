function Tree() {
    this.children = [];

    var color = 'rgb(10, 10, 10)';
    var childNum = randInt(5, 10);

    var startRadius = 8;
    var groundHeight = Math.floor(canvas.height / 3);
    var treeBaseX = randInt(canvas.width / 3, canvas.width * 2 / 3);
    var treeBaseY = randInt(canvas.height - groundHeight / 3,
                            canvas.height - groundHeight * 2 / 3);
    for (var i = 0; i < childNum; i++) {
        this.add(new TreeChild(treeBaseX + i * startRadius, treeBaseY, 90,
                               startRadius, 2, fuzzColor(color, 10), 0));
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
            // Branch.
            if (child.branch) {
                for (var i=0; i < 2 + Math.round(Math.random() * 2); i++) {
                    that.add(new TreeChild(child.x, child.y,
                                           child.angle + randInt(-45, 45),
                                           child.radius * .9, child.speed,
                                           fuzzColor(child.color, 10),
                                           child.generation + 1));
                }
                that.remove(child);
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


function TreeChild(x, y, angle, radius, speed, color, generation) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius= radius;
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;

    this.generation = generation;
    this.distance = 0;
}

TreeChild.prototype = {
    drawFrame: function() {
        if (this.radius <= .2) {
            this.done = true;
            return;
        }

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
        // Random chance of branching.
        var branchChance;
        if (this.generation == 0) {
            branchChance = (this.distance - canvas.height / 8) / 100;
        }
        else if (this.generation < 3)
            branchChance = (this.distance - canvas.height / 14) / 100;

        this.branch = false;
        if (Math.random() < branchChance) {
            this.branch = true;
        }

        var oldX = this.x;
        var oldY = this.y;
        this.x += this.speed * Math.cos(rad(this.angle));
        this.y -= this.speed * Math.sin(rad(this.angle));
        this.distance += Math.sqrt(Math.abs(oldX - this.x) + Math.abs(oldY - this.y));

        this.radius *= (0.99 - this.generation / 250);
        this.angle += deg(Math.random() / 5 - 1 / 10);
        if (this.speed > this.radius * 1.3) {
            this.speed = this.radius * 1.3;
        }
    },
};
