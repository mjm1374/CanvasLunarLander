function checkForLanding() {
    console.log('checkForLanding', spaceship.velocity.y);
    if (spaceship.velocity.y <= 0.5) {
        console.log('landed');
        spaceship.velocity.y = 0;
        spaceship.velocity.x = 0;
        spaceship.angle = 0;
        hasLanded = true;
    } else {
        boom();
        hasLanded = true;
    }
}

function boom() {
    console.log('boom');
}

function checkForCollision(lander) {
    //console.log(lander.position.x + "," + lander.position.y);
    var landerX = lander.position.x;
    var landerY = lander.position.y;
    var landerHeight = lander.height / 2;
    var landerWidth = lander.width / 2;
    var landerTheta = lander.angle;
    //build out the 4 corners of the rotated spaceship
    var TLpoints = getRotatedPoints(
        landerX - landerHeight,
        landerY - landerWidth,
        landerX,
        landerY,
        landerTheta
    );
    var TRpoints = getRotatedPoints(
        landerX - landerHeight,
        landerY + landerWidth,
        landerX,
        landerY,
        landerTheta
    );
    var BLpoints = getRotatedPoints(
        landerX + landerHeight,
        landerY - landerWidth,
        landerX,
        landerY,
        landerTheta
    );
    var BRpoints = getRotatedPoints(
        landerX + landerHeight,
        landerY + landerWidth,
        landerX,
        landerY,
        landerTheta
    );

    for (i = 0; i < lines.length; i++) {
        //console.log(lines[i].p1.x);
        var thisLineX1 = lines[i].p1.x;
        var thisLineY1 = lines[i].p1.y;
        var thisLineX2 = lines[i].p2.x;
        var thisLineY2 = lines[i].p2.y;
        // we can probabally get away with just 2 test
        var test1 = lineLine(
            TLpoints.x,
            TLpoints.y,
            BLpoints.x,
            BLpoints.y,
            thisLineX1,
            thisLineY1,
            thisLineX2,
            thisLineY2
        );
        var test2 = lineLine(
            TRpoints.x,
            TRpoints.y,
            BRpoints.x,
            BRpoints.y,
            thisLineX1,
            thisLineY1,
            thisLineX2,
            thisLineY2
        );

        if (test1 == true || test2 == true) {
            //console.log('collision', lines[i].landable);
            return lines[i].landable;
        }
    }
}

// LINE/LINE x 1 to 2 = spaceship side - 3 to y is landscape
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the direction of the lines
    var uA =
        ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB =
        ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        var intersectionX = x1 + uA * (x2 - x1);
        var intersectionY = y1 + uA * (y2 - y1);
        // fill(255,0,0);
        // noStroke();
        // ellipse(intersectionX, intersectionY, 20, 20);

        return true;
    }
    return false;
}

//theta is rotation
function getRotatedPoints(x, y, cx, cy, theta) {
    var tempX = x - cx;
    var tempY = y - cy;

    // now apply rotation
    var rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
    var rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

    // translate back
    x = rotatedX + cx;
    y = rotatedY + cy;
    return {
        x,
        y,
    };
}