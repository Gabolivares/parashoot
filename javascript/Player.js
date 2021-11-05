"use strict";

function Player(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.x = this.canvas.width / 2 - 10;
  this.y = this.canvas.height - 20;
  this.dx = 20;
  this.dy = 20;
  this.lives = 10;
  this.velocity = 7;
  this.direction = 0;
  this.color = "green";
  this.bullets = [];
  this.img = new Image();
  this.img.src = './assets/plane.png';
}

Player.prototype.move = function () {
  this.x = this.x + this.direction * this.velocity;
  if(this.x < 0){
      this.x = this.canvas.width - 20
  }
  if(this.x > this.canvas.width - 20){
    this.x =  0
}

};

Player.prototype.draw = function () {
  this.ctx.fillStyle = this.color;
  this.ctx.drawImage(this.img,this.x, this.y, this.dx, this.dy);
};

Player.prototype.setDirection = function (newDirection) {
  this.direction = newDirection;
};


Player.prototype.shoot = function () {
    var newBullet = new Bullet(this.canvas, this.x + 9);
    console.log(newBullet)
    this.bullets.push(newBullet);
  };
