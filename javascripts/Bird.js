Bird = function(x,y){
  this.x = x;
  this.y = y;
  this.vel = [0, 0];
  this.picsLoaded = 0;
  this.loaded = false;

  this.img = new Image();
  this.img.src = "./resources/bird.png";
  this.img.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 2){
      this.loaded = true;
    }
    }.bind(this);

  this.imgExplosion = new Image();
  this.imgExplosion.src = "./resources/explosion.png";
  this.imgExplosion.onload = function(){
    this.picsLoaded ++;
    if(this.picsLoaded >= 2){
      this.loaded = true;
    }
    }.bind(this);

  this.boom = new Audio('./resources/boom.mp3');
  this.frameCount = 5;
  this.frameDirection = 1;
  this.frameExplosion = 0;

}

Bird.prototype.move = function(){
  this.x += this.vel[0];
  this.y += this.vel[1];
  this.vel[1] += .4;
}

Bird.prototype.draw = function(ctx){
  this.frameCount += this.frameDirection;
  var spriteSize = 96;
  var x = spriteSize * Math.floor(this.frameCount/10);

  ctx.drawImage(
      this.img,
      x, 192, spriteSize, spriteSize, //(x,y,w,h)
      // hit box 40px x 40px
      this.x - 10, this.y - 10, 60, 60 // destination coordinates (x,y,w,h)
  );

  if(this.frameCount >= 25 || this.frameCount <= 5){
    this.frameDirection *= -1;
  }
}

Bird.prototype.outOfBounds = function () {
  if (this.y > 440) {
    return true;
  }
  return false;
}

Bird.prototype.explode = function (ctx) {
  var x = Math.floor(this.frameExplosion) % 3 * 100;
  var y = Math.floor(Math.floor(this.frameExplosion) / 3) * 100;

  if (this.frameExplosion === 0) {
    this.boom.play();
  }

  ctx.drawImage(
    this.imgExplosion,
    x, y, 100, 100,
    this.x - 75, this.y - 60, 200, 200
  );

  this.frameExplosion += 0.20
}

Bird.prototype.tick = function(ctx){
  this.move();
  this.draw(ctx);
}

Bird.prototype.flap = function () {
  this.vel = [0, -7];
}

Bird.prototype.getBounds = function () {
  return {
    x: this.x,
    y: this.y,
    width: 40,
    height: 40
  };
}
