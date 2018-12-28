

function Vector(x,y) {

    this.x= x || 0;
    this.y = y || 0;

};



function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");

    this.sound.style.display = "none";
    document.body.appendChild(this.sound);

    this.play = function(){
      this.sound.play();
    }

    this.stop = function(){
      this.sound.pause();
    }

    this.loop = function(){
      this.sound.setAttribute("loop", "loop");
    }

    this.reset = function(){
      this.sound.currentTime = 0;
    }
}


function LandscapeLine(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.landable = (p1.y==p2.y);
    this.multiplier = 1;

}

function LandingZone(linenum, multi) {
    this.lineNum = linenum;
    this.multiplier = multi;
}

function View(left, right, x, y, offset, scale){
    this.left = left;
    this.right =  right;
    this.x = x;
    this.y = y;
    this.offset =  offset;
    this.scale =  scale;





}