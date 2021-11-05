"use strict";

function Game(canvas, proportion) {
  this.player = null;
  this.enemies = [];
  this.isGameOver = false;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.onGameOver = null;
  this.level = 0;
  this.proportion = proportion
  this.kills = 0;
  this.clouds = [];
  this.bombs = [];

}

Game.prototype.startGame = function () {
  // inicializar player y enemies
  this.player = new Player(this.canvas, this.proportion);
  const loop = () => {
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
  const randomX = Math.random() * (this.canvas.width - 60 * this.proportion) + 30 * this.proportion;
  if (Math.random() > 0.993 - this.level / 700) {
    const newEnemy = new Enemy(this.canvas, randomX, this.proportion);
    this.enemies.push(newEnemy);
  }
  if (Math.random() > 0.997 - this.level / 700) {
    const newCloud = new Clouds(this.canvas, randomX, this.proportion);
    this.clouds.push(newCloud);
  }
  if (Math.random() > 0.9985 - this.level / 700) {
    const newBomb = new Bombs(this.canvas, randomX, this.proportion);
    this.bombs.push(newBomb);
  }
  this.clouds.forEach(function (cloud) {
    cloud.move();
  });
  this.bombs.forEach(function (bomb) {
    bomb.move();
  });
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
  this.ctx.fillStyle = 'black';
  this.ctx.fillText(`level: ${this.level}`, this.canvas.width - 50, 30);
  this.ctx.fillText(`kills: ${this.kills}`, this.canvas.width - 100, 30);
  this.ctx.fillText(`lives: ${this.player.lives}`, this.canvas.width - 150, 30);
  this.player.bullets.forEach(function (bullet) {
    bullet.draw();
  });
  this.clouds.forEach(function (enemy) {
    enemy.draw();
  });
  this.player.draw();
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  });
  this.bombs.forEach(function (bomb) {
    bomb.draw();
  });
};

Game.prototype.checkCollition = function () {
  const bullets = this.player.bullets.length ? this.player.bullets : [{}]

  bullets.forEach((bullet, indexBullet) => {
    this.bombs.forEach((bomb, index) => {
      // Check colition bullet - bomb
      const colitionBulletBomb = (
        bullet.x + bullet.dx >= bomb.x
      ) && (bullet.x <= bomb.x + bomb.dx
        ) && (bullet.y + bullet.dy >= bomb.y
        ) && (bullet.y <= bomb.y + bomb.dy)
      // Check colition player - bomb
      const colitionPlayerBomb = (
        this.player.x + this.player.dx >= bomb.x
      ) && (this.player.x <= bomb.x + bomb.dx
        ) && (this.player.y + this.player.dy >= bomb.y
        ) && (this.player.y <= bomb.y + bomb.dy)
      

      console.log(colitionPlayerBomb)

      if (bomb.y >= this.canvas.height) {
        this.bombs.splice(index, 1);
      }
      if (colitionBulletBomb) {
        this.bombs.splice(index, 1);
        this.player.bullets.splice(indexBullet, 1);
        this.player.lives--;
      }
      if (colitionPlayerBomb) {
        this.player.lives = 0
      }

    })

    this.enemies.forEach((enemy, index) => {
      // Check colition bullet - enemy
      const colitionBulletEnemy = (
        bullet.x + bullet.dx >= enemy.x
      ) && (bullet.x <= enemy.x + enemy.dx
        ) && (bullet.y + bullet.dy >= enemy.y
        ) && (bullet.y <= enemy.y + enemy.dy)
      // Check colition enemy - player
      const colitionPlayerEnemy = (
        this.player.x + this.player.dx >= enemy.x
      ) && (this.player.x <= enemy.x + enemy.dx
        ) && (this.player.y + this.player.dy >= enemy.y
        ) && (this.player.y <= enemy.y + enemy.dy)


        var rightLeft = this.player.x + this.player.dx >= enemy.x;
        var leftRight = this.player.x <= enemy.x + enemy.dx;
        var bottomTop = this.player.y + this.player.dy >= enemy.y;
        var topBottom = this.player.y <= enemy.y + enemy.dy;
        if (rightLeft && leftRight && bottomTop && topBottom) {
          this.isGameOver = true;
        }

      if (colitionBulletEnemy) {
        this.enemies.splice(index, 1);
        this.player.bullets.splice(indexBullet, 1);
        this.kills++;
        if (this.kills % 10 === 0) {
          this.level++;
        }
      }
      
      if (colitionPlayerEnemy) {
        this.player.lives = 0
        }
      

      if (enemy.y >= this.canvas.height - (16 * this.proportion)) {
        this.enemies.splice(index, 1);
        this.player.lives--;
      }
      if (colitionPlayerEnemy) {
        this.player.lives = 0
      }
    })
    if (bullet.y <= 0) {
      this.player.bullets.splice(indexBullet, 1);
    }
  })

  if (this.player.lives === 0) {
    this.isGameOver = true;
  }
}; //mayor {}

Game.prototype.gameOberCallback = function (callback) {
  this.onGameOver = callback;
};
