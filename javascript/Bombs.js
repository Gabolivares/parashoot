'use strict';

function Bombs(canvas, randomX, proportion) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = randomX ;
    this.y = 0;
    this.velocity = (Math.random() / 10)  + 0.2 ;
    this.direction = 1 * proportion;
    this.color = 'red';
    this.dx = 20 * proportion;
    this.dy = this.dx;
    this.img = new Image();
    this.img.src = './assets/bomb.png';
}

Bombs.prototype.move = function() {
    this.y = this.y + this.direction * this.velocity;
}

Bombs.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.drawImage(this.img, this.x, this.y, this.dx, this.dy);
}