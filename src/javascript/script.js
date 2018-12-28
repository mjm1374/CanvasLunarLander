var canvas = document.getElementById("game"),
context = canvas.getContext("2d"),
stars = [],
gravity = 0.025,
starColor = ['#111','#111','#111','#111','#111','#111','#111','#25aafc','#ce2c00'],
fuel =  5000;

var spaceship =
{
    color: "#ffffff",
    width: 8,
    height: 42,
    thrust: .045,
    maxThrust = 2,
    terminalV =  -2,
    position:
    {
        x: 100,
        y: 10
    },
    angle: 0,
    velocity: {
      x: 0,
      y: 0
    },
    engineOn: false,
    rotatingLeft: false,
    rotatingRight: false,
}


function updateScore(){
    context.font = "30px hyperspaceregular";
    context.fillStyle = "#40cc00";
    context.fillText("JS Lunar Lander", 10, 40);
    context.font = "12px hyperspaceregular";

    // White text
    context.fillStyle = "#fff";
    context.fillText("Alt: " +  Math.floor(canvas.height - spaceship.position.y), (canvas.width - 120), 20);
    context.fillText("Fuel: " + fuel, (canvas.width - 120), 35);
    context.fillText("Speed H: " + Math.round(spaceship.velocity.x*100)/100, (canvas.width - 120), 50);
    context.fillText("Speed V: " + Math.round(spaceship.velocity.y*100)/100, (canvas.width - 120), 65);

}





function updateSpaceship()
{
    spaceship.position.x += spaceship.velocity.x;
    spaceship.position.y += spaceship.velocity.y;

    if (spaceship.position.y >= (canvas.height + spaceship.height)) {
        spaceship.position.y = 0;
       // spaceship.velocity.y = 0;
    }
    if (spaceship.position.x < 0) {
        spaceship.position.x = canvas.width;
    }
     if (spaceship.position.x > canvas.width) {
        spaceship.position.x = 0;
    }

    if(spaceship.rotatingRight)
    {
        spaceship.angle += Math.PI / 180;
    }
    else if(spaceship.rotatingLeft)
    {
        spaceship.angle -= Math.PI / 180;
    }

    if(spaceship.engineOn && fuel > 0)
    {
        spaceship.velocity.x -= spaceship.thrust * Math.sin(-spaceship.angle);
        spaceship.velocity.y -= spaceship.thrust * Math.cos(spaceship.angle);
        fuel--;

    }
    spaceship.velocity.y += gravity;

       // if(spaceship.velocity.x  >= maxThrust) spaceship.velocity.x  =  maxThrust;
        if(spaceship.velocity.y  >= maxThrust) spaceship.velocity.y  =  maxThrust;
        if(spaceship.velocity.y  <= terminalV) spaceship.velocity.y  = terminalV;

    console.log(fuel);
}

function draw()
{
    // Clear entire screen
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSpaceship();
    drawStars();
    // Begin drawing
    drawSpaceship();
    updateScore();
    //drawSpaceshipHash();

    /* other draw methods (to add later) */

    requestAnimationFrame(draw);
}


draw();