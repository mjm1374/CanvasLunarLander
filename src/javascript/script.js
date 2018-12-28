var canvas = document.getElementById("game"),
context = canvas.getContext("2d"),
stars = [],
gravity = 0.025,
starColor = ['255,255,255','255,255,255','255,255,255','255,255,255','255,255,255','255,255,255','255,255,255','218, 60, 4','41, 60, 255', '255, 5, 0', '255, 156, 0'],
fuel =  5000.
points = [],
lines = [],
counter = 0;
availableZones = [],
zoneCombis = [],
currentCombi = 0,
zoneInfos = [],
landscale = 1.5
view =  new View(0,resetWindowLimit("y"),0,0,0,1);

$('#game').attr('width', resetWindowLimit("x"));
$('#game').attr('height', resetWindowLimit("y"));


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


setupData();
rightedge =  points[points.length - 1].x * landscale ;

for (var i = 0; i<points.length; i++){
    var p = points[i];
    p.x *= landscale;
    p.y *= landscale;
    p.y -= 50;

}

for(var i = 1;i < points.length; i++){
    var p1 = points[i-1];
    var p2 = points[i];
    lines.push(new LandscapeLine(p1, p2));
}

function landscape(){
    var offset = 0;
    var startOffset = offset;
    var i = 0;

		//while(view.left-offset>rightedge) {
		//	offset+=rightedge;
		//}
		//
		//while(view.left-offset<0) {
		//	offset-=rightedge;
		//}

		//var startOffset = offset;
		//
		//var i = 0;
		//
		//while(lines[i].p2.x+offset<view.left) {
		//	i++;
		//	if(i>lines.length) {
		//		i=0;
		//		offset+=rightedge;
		//	}
		//}
        context.save();
        context.beginPath();

		var line = lines[i];
		var offsetY = 0;
		if(Math.random()<0.3) {
			offset+=(0.2/view.scale);
			offsetY = (0.2/view.scale);
		}

        context.moveTo(line.p1.x + offset, line.p1.y + offsetY);

		var zoneInfoIndex = 0;

        while((line = lines[i]).p1.x+offset<view.right) {
            console.log('landscape');

			var point = line.p2;
			context.lineTo(point.x+offset, point.y);

			if((counter%20>10) && (line.multiplier!=1)){
				var infoBox;

				if(!zoneInfos[zoneInfoIndex]) {
					infoBox = zoneInfos[zoneInfoIndex] = new InfoBox(1,50);
					document.body.appendChild(infoBox.domElement);
				} else {
					infoBox = zoneInfos[zoneInfoIndex];
					infoBox.show();
				}
				infoBox.setText(line.multiplier+'x');
				infoBox.setX(((((line.p2.x-line.p1.x)/2)+line.p1.x+offset)*view.scale)+view.x);
				infoBox.setY(((line.p2.y+2) *view.scale)+view.y);
				zoneInfoIndex++;

			}

			i++;
			if(i>=lines.length) {
				i=0;
				offset+=rightedge;
			}


		}


        context.strokeStyle = 'white';


		context.lineWidth = 1/view.scale ;
		context.lineJoin = 'bevel';
		context.stroke();





}




function draw()
{
    // Clear entire screen
    counter++;
    context.clearRect(0, 0, canvas.width, canvas.height);

    updateSpaceship();
    drawStars();
    // Begin drawing
    drawSpaceship();
    updateScore();
    landscape();
    if(spaceship.position.y < 0) drawSpaceshipHash();

    /* other draw methods (to add later) */

    requestAnimationFrame(draw);
}


draw();