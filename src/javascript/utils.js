// ----- Utiliies  ---------------------------------------------------------------------------------------------------------



$(window).resize(function() {
	xLimit = resetWindowLimit("x");
	yLimit = resetWindowLimit("y");
});

function resetWindowLimit(whatDim) {

	var newDim, newDimx, newDimy;
	newDimx = window.innerHeight;
	newDimy = window.innerHeight;


	if (whatDim == "x") {
		newDim = window.innerWidth;
	} else {
		newDim = window.innerHeight;
	}

	return newDim;
}


function getRandomFloat(min, max) {
	return Math.random() * (max - min) + min;
}



// ----- Paint SpaceShip  ---------------------------------------------------------------------------------------------------------




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

       // if(spaceship.velocity.x  >= spaceship.maxThrust) spaceship.velocity.x  =  spaceship.maxThrust;
        if(spaceship.velocity.y  >= spaceship.maxThrust) spaceship.velocity.y  =  spaceship.maxThrust;
        if(spaceship.velocity.y  <= spaceship.terminalV) spaceship.velocity.y  = spaceship.terminalV;

    //console.log(fuel);
}



function drawSpaceship()
{
    context.save();
    context.beginPath();
    context.translate(spaceship.position.x, spaceship.position.y);
    context.rotate(spaceship.angle);
    context.rect(spaceship.width * -0.5, spaceship.height * -0.5, spaceship.width, spaceship.height);
    context.fillStyle = spaceship.color;
    context.fill();
    context.closePath();

    // Draw the flame if engine is on
    if(spaceship.engineOn && fuel > 0)
    {
        context.beginPath();
        context.moveTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.lineTo(spaceship.width * 0.5, spaceship.height * 0.5);
        context.lineTo(0, spaceship.height * 0.5 + Math.random() * 10);
        context.lineTo(spaceship.width * -0.5, spaceship.height * 0.5);
        context.closePath();
        context.fillStyle = "orange";
        context.fill();
    }
    context.restore();
}


function drawSpaceshipHash()
{
    context.save();
    context.beginPath();
    context.moveTo(spaceship.position.x, 0);
    context.lineTo(spaceship.position.x, 10);
    context.strokeStyle = '#ff0000';
    context.stroke();

}




// ----- Stars  ---------------------------------------------------------------------------------------------------------

for (var i = 0; i < 500; i++) {

  stars[i] = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.sqrt(Math.random() * 2)/2,
    alpha: 1.0,
    decreasing: true,
    dRatio: Math.random() * 0.05,
    color: starColor[Math.floor(getRandomFloat(0,9))]
  };
}



function drawStars()
{
  context.save();
  context.fillStyle = "#111";
  context.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(" + star.color + ","  + star.alpha + ")";
    if (star.decreasing == true)
    {
      star.alpha -= star.dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += star.dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }
    context.fill();
  }
  context.restore();
}



// ----- Score & Data ---------------------------------------------------------------------------------------------------------

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



// ----- Landscape



	function setupData() {
		points.push(new Vector(0.5, 355.55));
		points.push(new Vector(5.45, 355.55));
		points.push(new Vector(6.45, 359.4));
		points.push(new Vector(11.15, 359.4));
		points.push(new Vector(12.1, 363.65));
		points.push(new Vector(14.6, 363.65));
		points.push(new Vector(15.95, 375.75));
		points.push(new Vector(19.25, 388));
		points.push(new Vector(19.25, 391.9));
		points.push(new Vector(21.65, 400));
		points.push(new Vector(28.85, 404.25));
		points.push(new Vector(30.7, 412.4));
		points.push(new Vector(33.05, 416.7));
		points.push(new Vector(37.9, 420.5));
		points.push(new Vector(42.7, 420.5));
		points.push(new Vector(47.4, 416.65));
		points.push(new Vector(51.75, 409.5));
		points.push(new Vector(56.55, 404.25));
		points.push(new Vector(61.3, 400));
		points.push(new Vector(63.65, 396.15));
		points.push(new Vector(68, 391.9));
		points.push(new Vector(70.3, 388));
		points.push(new Vector(75.1, 386.1));
		points.push(new Vector(79.85, 379.95));
		points.push(new Vector(84.7, 378.95));
		points.push(new Vector(89.05, 375.65));
		points.push(new Vector(93.75, 375.65));
		points.push(new Vector(98.5, 376.55));
		points.push(new Vector(103.2, 379.95));
		points.push(new Vector(104.3, 383.8));
		points.push(new Vector(107.55, 388));
		points.push(new Vector(108.95, 391.9));
		points.push(new Vector(112.4, 396.15));
		points.push(new Vector(113.3, 400));
		points.push(new Vector(117.1, 404.25));
		points.push(new Vector(121.95, 404.25));
		points.push(new Vector(125.3, 396.3));
		points.push(new Vector(128.6, 394.2));
		points.push(new Vector(132.45, 396.15));
		points.push(new Vector(135.75, 399.9));
		points.push(new Vector(138.15, 408.15));
		points.push(new Vector(144.7, 412.4));
		points.push(new Vector(146.3, 424.8));
		points.push(new Vector(149.55, 436.65));
		points.push(new Vector(149.55, 441.05));
		points.push(new Vector(154.35, 444.85));
		points.push(new Vector(163.45, 444.85));
		points.push(new Vector(168.15, 441.05));
		points.push(new Vector(172.95, 436.75));
		points.push(new Vector(175.45, 432.9));
		points.push(new Vector(179.7, 428.6));
		points.push(new Vector(181.95, 424.8));
		points.push(new Vector(186.7, 422.5));
		points.push(new Vector(189.15, 412.4));
		points.push(new Vector(191.55, 404.35));
		points.push(new Vector(196.35, 402.4));
		points.push(new Vector(200.7, 398.1));
		points.push(new Vector(205.45, 391.9));
		points.push(new Vector(210.15, 383.8));
		points.push(new Vector(212.55, 375.75));
		points.push(new Vector(216.85, 371.8));
		points.push(new Vector(219.3, 367.55));
		points.push(new Vector(220.65, 363.65));
		points.push(new Vector(224, 359.4));
		points.push(new Vector(228.8, 359.4));
		points.push(new Vector(233.55, 355.55));
		points.push(new Vector(237.85, 348.45));
		points.push(new Vector(242.65, 343.2));
		points.push(new Vector(245, 335.15));
		points.push(new Vector(247.35, 322.8));
		points.push(new Vector(247.3, 314.5));
		points.push(new Vector(248.35, 306.55));
		points.push(new Vector(252.2, 296.5));
		points.push(new Vector(256.55, 294.55));
		points.push(new Vector(257.95, 290.4));
		points.push(new Vector(261.25, 285.95));
		points.push(new Vector(265.95, 285.95));
		points.push(new Vector(267, 290.25));
		points.push(new Vector(271.75, 290.25));
		points.push(new Vector(273.25, 294.55));
		points.push(new Vector(275.2, 294.55));
		points.push(new Vector(278.95, 296.5));
		points.push(new Vector(282.25, 300.3));
		points.push(new Vector(284.7, 308.45));
		points.push(new Vector(291.85, 312.65));
		points.push(new Vector(298.55, 330.8));
		points.push(new Vector(303.25, 331.8));
		points.push(new Vector(308, 335.05));
		points.push(new Vector(309, 338.9));
		points.push(new Vector(312.35, 343.2));
		points.push(new Vector(313.8, 347.05));
		points.push(new Vector(317.05, 351.4));
		points.push(new Vector(321.9, 351.4));
		points.push(new Vector(322.85, 363.8));
		points.push(new Vector(326.6, 375.75));
		points.push(new Vector(326.6, 379.95));
		points.push(new Vector(330.9, 379.95));
		points.push(new Vector(332.4, 383.8));
		points.push(new Vector(335.8, 388));
		points.push(new Vector(338.1, 396.15));
		points.push(new Vector(340.45, 400.1));
		points.push(new Vector(345.3, 404.25));
		points.push(new Vector(346.25, 416.65));
		points.push(new Vector(349.6, 428.7));
		points.push(new Vector(349.6, 432.85));
		points.push(new Vector(350.95, 436.75));
		points.push(new Vector(354.3, 441.05));
		points.push(new Vector(359, 441.05));
		points.push(new Vector(361.4, 449.1));
		points.push(new Vector(363.95, 453));
		points.push(new Vector(368.2, 457.2));
		points.push(new Vector(372.9, 461));
		points.push(new Vector(410.2, 461));
		points.push(new Vector(412.55, 449.1));
		points.push(new Vector(417.4, 441.05));
		points.push(new Vector(419.7, 432.9));
		points.push(new Vector(422.05, 432.9));
		points.push(new Vector(425.45, 424.8));
		points.push(new Vector(428.8, 422.35));
		points.push(new Vector(433.45, 416.65));
		points.push(new Vector(438.25, 415.15));
		points.push(new Vector(442.6, 412.4));
		points.push(new Vector(447.4, 412.4));
		points.push(new Vector(448.8, 416.65));
		points.push(new Vector(454.55, 430.55));
		points.push(new Vector(455.5, 434.8));
		points.push(new Vector(459.25, 438.6));
		points.push(new Vector(462.6, 440.9));
		points.push(new Vector(466, 444.85));
		points.push(new Vector(468.35, 452.9));
		points.push(new Vector(475.55, 457.3));
		points.push(new Vector(484.7, 457.3));
		points.push(new Vector(494.7, 458.2));
		points.push(new Vector(503.75, 461.1));
		points.push(new Vector(522.2, 461.1));
		points.push(new Vector(524.75, 453));
		points.push(new Vector(527.1, 441.05));
		points.push(new Vector(527.1, 432.9));
		points.push(new Vector(531.9, 432.9));
		points.push(new Vector(534.15, 424.8));
		points.push(new Vector(538.6, 420.5));
		points.push(new Vector(540.9, 416.65));
		points.push(new Vector(542.35, 412.5));
		points.push(new Vector(545.7, 408));
		points.push(new Vector(550.45, 408));
		points.push(new Vector(552.85, 398.1));
		points.push(new Vector(554.75, 389.95));
		points.push(new Vector(559.55, 388));
		points.push(new Vector(564.35, 391.9));
		points.push(new Vector(573.35, 391.9));
		points.push(new Vector(578.1, 388));
		points.push(new Vector(579.55, 379.95));
		points.push(new Vector(582.9, 369.4));
		points.push(new Vector(587.75, 367.55));
		points.push(new Vector(588.65, 363.8));
		points.push(new Vector(592.05, 359.5));
		points.push(new Vector(596.85, 355.55));






		availableZones.push(new LandingZone(0, 4));
		availableZones.push(new LandingZone(13, 3));
		availableZones.push(new LandingZone(25, 4));
		availableZones.push(new LandingZone(34, 4));
		availableZones.push(new LandingZone(63, 5));
		availableZones.push(new LandingZone(75, 4));
		availableZones.push(new LandingZone(106, 5));
		availableZones.push(new LandingZone(111, 2));
		availableZones.push(new LandingZone(121, 5));
		availableZones.push(new LandingZone(133, 2));
		availableZones.push(new LandingZone(148, 3));


		zoneCombis.push([2,3,7,9]);
		zoneCombis.push([7,8,9,10]);
		zoneCombis.push([2,3,7,9]);
		zoneCombis.push([1,4,7,9]);
		zoneCombis.push([0,5,7,9]);
		zoneCombis.push([6,7,8,9]);
		zoneCombis.push([1,4,7,9]);





	}