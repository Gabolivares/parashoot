'use strict';

function Enemy(canvas, randomX) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = randomX ;
    this.y = 0;
    this.velocity = (Math.random() / 10)  + 0.2 ;
    this.direction = 1;
    this.color = 'red';
    this.dx = 20;
    this.dy = this.dx;
    this.img = new Image();
    this.img.src = './assets/parachute.png';
}

Enemy.prototype.move = function() {
    this.y = this.y + this.direction * this.velocity;
}

Enemy.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
}