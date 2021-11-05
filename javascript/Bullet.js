'use strict';

function Bullet(canvas, playerX) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = playerX ;
    this.y = this.canvas.height - 40;
    this.velocity =3;
    this.direction = -1;
    this.color = 'red';
    this.dx = 2;
    this.dy = this.dx;
}

Bullet.prototype.move = function() {
    this.y = this.y + this.direction * this.velocity;
}

Bullet.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}