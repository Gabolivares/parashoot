const createGameOverPage = (dictionary, states) => {
  const dome = dictionary.buildDom(`
    <div class="go-container" >
        <h2>Game Over</h2>
        <p>Level: ${states.level}</p>
  
        <p>Kills: ${states.kills}</p>
        <button class="back-btn">Back home</button>
    </div>
`);
  const backButton = dome.querySelector(".back-btn");
  backButton.addEventListener("click", () => dictionary.toHomePage(dictionary));
};

const createGamePage = (dictionary) => {
  const dome = dictionary.buildDom(`
  <div class="go-container" >
    <canvas id="canvas" width="${window.innerWidth - 40}" height="${window.innerHeight - 40}"></canvas>
    </div>
`);
  const proportion = (window.innerWidth - 40) / 400
  const canvas = document.querySelector("#canvas");
  var game = new Game(canvas, proportion);
  game.gameOberCallback((stats) => dictionary.toGameOver(dictionary, stats));
  document.addEventListener("keydown", function (event) {
    if (event.keyCode === 37) {
      game.player.setDirectionX(-1);
    } else if (event.keyCode === 39) {
      game.player.setDirectionX(1);
    } else if (event.keyCode === 38) {
      game.player.setDirectionY(-1);
    } else if (event.keyCode === 40) {
      game.player.setDirectionY(1);
    } else if (event.keyCode === 32) {
      game.player.shoot();
    }
  });
  game.startGame();
};

const createHomePage = (dictionary) => {
  const dome = dictionary.buildDom(`
        <div class="go-container" >
            <h2>Gameiros Game</h2>
            <button class="go-btn">go go go!</button>
        </div>
    `);
  const goButton = dome.querySelector(".go-btn");
  goButton.addEventListener("click", () => dictionary.toGame(dictionary));
};

const main = () => {
  const root = document.querySelector("#root");
  const buildDom = (html) => {
    root.innerHTML = html;
    return root;
  };

  createHomePage({
    buildDom,
    toGame: createGamePage,
    toGameOver: createGameOverPage,
    toHomePage: createHomePage,
  });
};

window.addEventListener("load", main);
