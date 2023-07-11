var game = new Game(false, false);

var every_sec = 0;
var restartFromSpaceKeyEnabled = true;
let img;

function preload() {
  this.img = loadImage("https://diegoal3mx.github.io/Dinosaur-Game-P5js/imgs/dinosaur-sprite.png");
  this.game.sprite = this.img;
}

function setup(){
  createCanvas((displayWidth+(displayWidth*(1/3))),720);
  frameRate(60);
  start();
}

function start(){
  this.game.load_game(width);
  loop();
}

function restart(){
  let tempScore = this.game.getHighScore();
  let tempDebug = this.game.debug;
  this.game = new Game(true, tempDebug);
  this.game.highScore = tempScore;
  this.game.sprite = this.img;
  start();
}

function draw(){
  checkIfKeyIsPressed();
  if(this.game.night){
    background(32,33,36);
  }
  else{
    background(255);
  }
  this.game.update();
  this.game.display();

  if(this.game.started){
    this.game.despawn_entities();
    if(millis() - this.every_sec > 1000 && this.game.score>=30){
      this.every_sec = millis();
      this.game.spawn_entities();
    }
  }

}

function checkIfKeyIsPressed(){
  if (keyIsPressed) {
    if (key === "ArrowUp") {
      this.game.keyPressed("UP");
    }
    else if (key === "ArrowDown") {
      this.game.keyPressed("DOWN");
    }
    else if (key === " ") {
      if (!this.game.player.isAlive() && this.restartFromSpaceKeyEnabled) {
        setTimeout(() => {
          restart();
        }, 200);
      } 
      else if (this.game.player.isAlive() && this.game.started) {
        this.game.keyPressed("UP");
        this.restartFromSpaceKeyEnabled = false;
      } 
      else {
        this.game.player.jump();
      }
    }
  }
}

function keyPressed(){
  if (key === "D" || key === "d") {
    this.game.keyPressed("D");
  }
}
  
function keyReleased() {
  if (key === "ArrowDown") {
    this.game.keyReleased("DOWN");
  } 
  else if (key === " ") {
    this.restartFromSpaceKeyEnabled = true;
    if (!this.game.player.isAlive()) {
      setTimeout(() => {
        restart();
      }, 200);
    }
  }
}
