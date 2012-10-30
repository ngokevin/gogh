function Tree() {
    this.children = [];

    var color = 'rgb(10, 10, 10)';
    var childNum = randInt(5, 10);

    // Leaf color.
    var leafColor = randColor(['#FB717B', '#FE6C00', '#1DD200', '#FB717B']);

    var startRadius = 8;
    var groundHeight = Math.floor(canvasHeight / 3);

    // Place tree randomly on ground.
    var treeBaseX = randInt(canvasWidth / 3, canvasWidth * 2 / 3);
    var treeBaseY = randInt(canvasHeight - groundHeight / 3,
                            canvasHeight - groundHeight * 2 / 3);

    for (var i = 0; i < childNum; i++) {
        this.add(new TreeChild(treeBaseX + i * startRadius, treeBaseY + randInt(0, 5), 90,
                               startRadius, 2, fuzzColor(color, 10),
                               leafColor, 0));
    }
}

Tree.prototype = {
    drawFrame: function() {
        if (this.children.length == 0) {
            this.done = true;
            return;
        }

        ctx.save();

        var that = this;
        $(this.children).each(function(i, child) {
            child.drawFrame();
            if (child.done) {
                that.remove(child);
            }

            // When branching, create random number of smaller branches at a
            // different angle.
            if (child.branch) {
                for (var i=0; i < randInt(2, 5); i++) {
                    that.add(new TreeChild(child.x, child.y,
                                           child.angle + randInt(-45, 45),
                                           child.radius * .9, child.speed,
                                           fuzzColor(child.color, 10),
                                           child.leafColor,
                                           child.generation + 1));
                }
                that.remove(child);
            }
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


function TreeChild(x, y, angle, radius, speed, color, leafColor, generation) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius= radius;
    this.speed = speed + Math.floor(Math.random() * 5);
    this.color = color;
    this.leafColor = leafColor,

    this.generation = generation;
    this.distance = 0;
}

TreeChild.prototype = {
    drawFrame: function() {
        if (this.radius <= .2) {
            this.done = true;
            return;
        }

        ctx.fillStyle = ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();

        // Leaves.
        if (this.generation >= 2 && Math.random() < .25) {
            ctx.save();

            // Angle the leaves somewhat regular to the branch's angle.
            ctx.translate(this.x, this.y);
            ctx.rotate(rad(this.angle + randInt(60, 120)));

            ctx.fillStyle = fuzzColor(this.leafColor, 130);
            ctx.shadowBlur = 0;

            // Leaf is cut-off arc, bottom-right quadrant, adjust for radius.
            ctx.beginPath();
            ctx.arc(-15, -15, 20, rad(-270), rad(15), true);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
        }

        this.update();
    },

    update: function() {
        // Branch less at bottom and more at top.
        var branchChance;
        if (this.generation == 0) {
            branchChance = (this.distance - canvasHeight / 8) / 100;
        }
        else if (this.generation < 3)
            branchChance = (this.distance - canvasHeight / 14) / 100;

        this.branch = false;
        if (Math.random() < branchChance) {
            this.branch = true;
            return;
        }

        // Continue branch at the angle.
        var oldX = this.x;
        var oldY = this.y;
        this.x += this.speed * Math.cos(rad(this.angle));
        this.y -= this.speed * Math.sin(rad(this.angle));

        // Distance formula for length of branch.
        this.distance += Math.sqrt(Math.abs(oldX - this.x) + Math.abs(oldY - this.y));

        // Decrease radius.
        this.radius *= (0.99 - this.generation / 300);

        // Curve branch.
        this.angle += deg(Math.random() / 5 - 1 / 10);

        // Control speed.
        if (this.speed > this.radius * 1.3) {
            this.speed = this.radius * 1.3;
        }
    },
};
