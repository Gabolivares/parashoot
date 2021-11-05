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
    <h2>Game Page</h2>
    <canvas id="canvas" width="400" height="400"></canvas>
    </div>
`);
  const canvas = document.querySelector("#canvas");
  var game = new Game(canvas);
  game.gameOberCallback((stats) => dictionary.toGameOver(dictionary, stats));
  document.addEventListener("keydown", function (event) {
    console.log(event.keyCode);
    if (event.keyCode === 37) {
      game.player.setDirection(-1);
    } else if (event.keyCode === 39) {
      game.player.setDirection(1);
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
