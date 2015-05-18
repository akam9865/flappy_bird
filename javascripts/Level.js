var CONSTANTS = {

}

var NMBERS = {
  0: [348, 191],
  1: [348, 191],
  2: [348, 191],
  3: [365, 191],
  4: [382, 191],
  5: [399, 191],
  6: [348, 222],
  7: [365, 222],
  8: [382, 222],
  9: [399, 222]
}
Level = function(){
  this.pipes = [];
  this.CONSTANTS = {
    width: 120,
    gap: 150,
    speed: -5
  };
  this.createPipe();
  this.activePipe = this.pipes[0];
  this.score = 0;
  this.picsLoaded = 0;
  this.loaded = false;

  this.brImg = new Image();
  this.brImg.src = "./resources/trees.png";
  this.brImg.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 4){
      this.loaded = true;
    }
    }.bind(this);
  this.pipeImg = new Image();
  this.pipeImg.src = "./resources/pipe.png"
  this.pipeImg.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 4){
      this.loaded = true;
    }
    }.bind(this);
  this.pipeFlippedImg = new Image();
  this.pipeFlippedImg.src = "./resources/pipeFlipped.png"
  this.pipeFlippedImg.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 4){
      this.loaded = true;
    }
    }.bind(this);
  this.numbersImg = new Image();
  this.numbersImg.src = "./resources/numbers.png"
  this.numbersImg.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 4){
      this.loaded = true;
    }
    }.bind(this);
  this.scroll = 0;
  this.bgX = 0;
}


Level.prototype.createPipe = function(){
  if(!this.pipes.length){
    this.pipes.push({'x': 700, 'height': 240})
    this.createPipe();
  }
  var x = this.pipes[this.pipes.length - 1].x + 320;
  var height = Math.floor(( 480 - this.CONSTANTS.gap )* Math.random());
  this.pipes.push({'x': x, 'height': height});
}

Level.prototype.moveBackground = function () {
  this.bgX += 0.2 * this.CONSTANTS.speed;
}

Level.prototype.drawBackground = function(ctx){
  ctx.drawImage(
      this.brImg,
      85, 430, 1500, 540, //(x,y,w,h)
      this.bgX, 0, 1000, 480 // destination coordinates (x,y,w,h)
  );

  ctx.drawImage(
      this.brImg,
      85, 430, 1500, 540, //(x,y,w,h)
      this.bgX + 1000, 0, 1000, 480 // destination coordinates (x,y,w,h)
  );

  if (this.bgX < -1000) {
    this.bgX = 0;
  }
}

Level.prototype.drawPipes = function (ctx) {
  var that = this;
  this.pipes.forEach(function (pipe) {

    ctx.drawImage(
      that.pipeImg,
      0, 0, 138, 793,
      pipe.x, pipe.height + that.CONSTANTS.gap, that.CONSTANTS.width, 793
    );

    ctx.drawImage(
      that.pipeFlippedImg,
      0, 0, 138, 793,
      pipe.x, pipe.height - 793, that.CONSTANTS.width, 793
    );
  })

  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.rect(this.x, this.y, 40, 30);
  ctx.fill();
}

Level.prototype.movePipes = function(){
  var that = this;
  this.pipes.forEach(function(pipe){
    pipe.x += that.CONSTANTS.speed;
  });

  if (this.pipes[0].x < -1 * this.CONSTANTS.width) {
    this.pipes.shift();
    this.createPipe();
  }
}

Level.prototype.tick = function (ctx) {
  this.movePipes();
  this.moveBackground();
  this.drawBackground(ctx);
  this.drawPipes(ctx);
  this.drawScore(ctx);
}

Level.prototype.passedPipe = function (bounds) {
  if (bounds.x > this.activePipe.x + this.CONSTANTS.width) {
    this.activePipe = this.pipes[1];
    return true;
  }
  return false;
}

Level.prototype.drawScore = function (ctx) {
  this.score
  ctx.drawImage(
    this.numbersImg,
    348, 191, 14, 21,
    310, 80, 24, 36
  )
}

Level.prototype.collidesWith = function(bounds){
  if(this.activePipe.x <= bounds.x + bounds.width && this.activePipe.x + this.CONSTANTS.width >= bounds.x){
    if(this.activePipe.height >= bounds.y || this.activePipe.height + this.CONSTANTS.gap <= bounds.y + bounds.height){
      return true;
    }
  }

  return false;
}
