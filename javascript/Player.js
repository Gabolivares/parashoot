"use strict";

function Player(canvas, proportion) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.x = this.canvas.width / 2 - 10;
  this.y = this.canvas.height - 20;
  this.dx = 20 * proportion;
  this.dy = 20 * proportion;
  this.lives = 10;
  this.velocity = 10 * proportion;
  this.velocityX = 1 * proportion;
  this.directionX = 0;
  this.directionY = 0;
  this.proportion = proportion
  this.color = "green";
  this.bullets = [];
  this.img = new Image();
  this.img.src = './assets/plane.png';
}

Player.prototype.move = function () {
  this.x = this.x + this.directionX * this.velocityX;
  if (this.x < 0) {
    this.x = 0
  }
  if (this.x > this.canvas.width - this.dx) {
    this.x = this.canvas.width - this.dx
  }
  this.y = this.y + this.directionY * this.velocity;
  if (this.y < 0) {
    this.y = 0
  }
  if (this.y > this.canvas.height - this.dx) {
    this.y = this.canvas.height - this.dx
  }
  this.directionY = 0;
};

Player.prototype.draw = function () {
  this.ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
};

Player.prototype.setDirectionX = function (newDirection) {
  this.directionX = newDirection;
  this.directionY = 0;
};

Player.prototype.setDirectionY = function (newDirection) {
  this.directionY = newDirection;
  this.directionX = 0;
};

Player.prototype.shoot = function () {
  var newBullet = new Bullet(this.canvas, this.x + (9 * this.proportion), this.y + (9 * this.proportion), this.proportion);
  this.bullets.push(newBullet);
};
