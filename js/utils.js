function fuzzColor(baseColor, fuzz, rgb) {
    // Makes baseColor (string) slightly different shade based on fuzz value.
    var r, g, b;
    var color = Color(baseColor);
    if (!rgb) {
        r = g = b = true;
    } else {
        r = rgb.indexOf('r') >= 0;
        b = rgb.indexOf('b') >= 0;
        g = rgb.indexOf('g') >= 0;
    }

    if (r) {
        color = color.red(color.red() + Math.random() * fuzz);
    }
    if (g) {
        color = color.green(color.green() + Math.random() * fuzz);
    }
    if (b) {
        color = color.blue(color.blue() + Math.random() * fuzz);
    }
    return color.rgbString();
}


function randInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randColor(colors) {
    // Given list of colors, choose a random color.
    var color;
    var rand = Math.random();
    for (var i=0; i < colors.length; i++) {
        if (rand <= i / colors.length + 1 / colors.length) {
            return colors[i];
        }
    }
    return colors([colors.length - 1]);
}


function rad(deg) {
    // Degrees to radians.
    return deg * Math.PI / 180;
}


function deg(rad) {
    // Radians to degrees.
    return rad * 180 / Math.PI;
}
