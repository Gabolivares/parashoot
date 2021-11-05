'use strict';

function Bullet(canvas, playerX, playerY, proportion) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.x = playerX;
    this.y = playerY;
    this.velocity = 3 * proportion;
    this.direction = -1;
    this.color = 'red';
    this.dx = 2 * proportion;
    this.dy = this.dx * 2 * proportion;
}

Bullet.prototype.move = function () {
    this.y = this.y + this.direction * this.velocity;
}

Bullet.prototype.draw = function () {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.dx, this.dy);
}