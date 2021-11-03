"use strict";

function Game(canvas) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.level = 0;
  this.kills = 0;
}

Game.prototype.startGame = function () {
  // inicializar player y enemies
  this.player = new Player(this.canvas);
  console.log("Cargando Loop");
  var loop = () => {
    if (Math.random() > 0.993 - this.level / 700) {
      var randomX = Math.random() * (this.canvas.width - 16) + 16;
      var newEnemy = new Enemy(this.canvas, randomX);
      this.enemies.push(newEnemy);
    }
    this.update();
    this.clear(this.canvas);
    this.draw();
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver(this);
    }
  };
  loop();
};

Game.prototype.update = function () {
  this.player.move();
  this.enemies.forEach(function (enemy) {
    enemy.move();
  });
  this.player.bullets.forEach(function (bullet) {
    bullet.move();
  });
  this.checkCollition();
  if (this.player.y <= 0) {
    this.player.direction = 0;
  } else if (this.player.y >= this.canvas.height - this.player.dy) {
    this.player.direction = 0;
  }
};

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.draw = function () {
  this.ctx.font = "12px Arial";
  this.ctx.fillStyle = 'white';
  this.ctx.fillText(`level: ${this.level}`, this.canvas.width - 50, 30);
  this.ctx.fillText(`kills: ${this.kills}`,  this.canvas.width - 100, 30);
  this.ctx.fillText(`lives: ${this.player.lives}`,  this.canvas.width - 150, 30);
  this.player.draw();
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  });
  this.player.bullets.forEach(function (bullet) {
    bullet.draw();
  });
};

Game.prototype.checkCollition = function () {
  this.enemies.forEach((enemy, index) => {
    var rightLeft = this.player.x + this.player.dx >= enemy.x;
    var leftRight = this.player.x <= enemy.x + enemy.dx;
    var bottomTop = this.player.y + this.player.dy >= enemy.y;
    var topBottom = this.player.y <= enemy.y + enemy.dy;
    this.player.bullets.forEach((bullet, indexBullet) => {
      var rightLeftB = bullet.x + bullet.dx >= enemy.x;
      var leftRightB = bullet.x <= enemy.x + enemy.dx;
      var bottomTopB = bullet.y + bullet.dy >= enemy.y;
      var topBottomB = bullet.y <= enemy.y + enemy.dy;
      if (rightLeftB && leftRightB && bottomTopB && topBottomB) {
        this.enemies.splice(index, 1);
        this.player.bullets.splice(indexBullet, 1);
        this.kills++;
        if (this.kills % 10 === 0) {
          this.level++;
        }
      }
    });
    if (enemy.y >= this.canvas.height - 16) {
      this.enemies.splice(index, 1);
      this.player.lives--;
      console.log("colicion");
      if (this.player.lives === 0) {
        this.isGameOver = true;
      }
    }
    if (rightLeft && leftRight && bottomTop && topBottom) {
      this.isGameOver = true;
    }
  });
};

Game.prototype.gameOberCallback = function (callback) {
  this.onGameOver = callback;
};
