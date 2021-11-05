'use strict';

function Clouds(canvas, randomX) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = randomX ;
    this.y = 0;
    this.velocity = 0.5 ;
    this.direction = 1;
    this.color = 'blue';
    this.dx = 50;
    this.dy = this.dx;
    this.img = new Image();
    this.img.src = './assets/cloud.png';
}

Clouds.prototype.move = function() {
    this.y = this.y + this.direction * this.velocity;
}

Clouds.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
}