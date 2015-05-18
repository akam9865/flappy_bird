Game = function(canvas){
  this.startGame(canvas);
  this.interval = setInterval(this.checkLoaded.bind(this), 50);

  // this.context.canvas.addEventListener("mousedown", this.clickFunc.bind(this));
  // this.tick();
}

Game.prototype.checkLoaded = function(){
  if(this.bird.loaded && this.level.loaded){
    window.clearInterval(this.interval);
    this.tick();
    this.context.canvas.addEventListener("mousedown", this.clickFunc.bind(this));
  }
}

Game.prototype.startGame = function (canvas) {
  this.context = canvas.getContext('2d');
  this.bird = new Bird(200, 200);
  this.level = new Level();
  this.interval;
  this.score = 0;
  this.playing = false;
  document.getElementById('score').innerHTML = this.score;

  // this.context.canvas.addEventListener("mouseup", this.play.bind(this));
}

Game.prototype.clickFunc = function(){
  if (this.playing){
    this.bird.flap.bind(this.bird)();
  } else{
    window.clearInterval(this.interval);
    this.startGame(this.context.canvas);
    this.play();
    this.playing = true;
  }
}

Game.prototype.tick = function () {
  this.context.clearRect(0, 0, 640, 480);
  this.level.tick(this.context);
  this.bird.tick(this.context);
  var birdBounds = this.bird.getBounds();
  if (this.level.collidesWith(birdBounds) || this.bird.outOfBounds()) {
    window.clearInterval(this.interval);
    this.gameOver();
  }

  if (this.level.passedPipe(birdBounds)) {
    this.score++;
    document.getElementById('score').innerHTML = this.score;
  }
}

Game.prototype.play = function () {
  this.interval = setInterval(this.tick.bind(this), 1000 / 60);
}

Game.prototype.deathAnimation = function () {
  this.context.clearRect(0, 0, 640, 480);
  this.level.drawBackground(this.context);
  this.level.drawPipes(this.context);
  this.bird.explode(this.context);
}

Game.prototype.gameOver = function () {
  this.playing = false;
  this.interval = setInterval(this.deathAnimation.bind(this), 1000 / 60);
  this.score = 0;
};
