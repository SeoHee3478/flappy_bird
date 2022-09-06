import "./styles.css";

const score = document.querySelector(".score");
const startBtn = document.querySelector(".startBtn");
const gameArea = document.querySelector(".gameArea");
const gameMessage = document.querySelector(".gameMessage");

startBtn.addEventListener("click", start);
gameMessage.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);
let keys = {};
let bird = document.createElement("div");
let wing = document.createElement("div");
let player = {
  x: 0,
  y: 0,
  speed: 2,
};

function start() {
  console.log("game start");
  gameMessage.classList.add("hide");
  startBtn.classList.add("hide");
  bird.setAttribute("class", "bird");
  //bird의 div 요소에 attribute인 class bird를 넣어줌
  wing.setAttribute("class", "wing");
  bird.appendChild(wing);
  gameArea.appendChild(bird);
  player.x = bird.offsetLeft;
  //bird의 left 값을 갖는다
  player.y = bird.offsetTop;
  //bird의 Top 값을 갖는다
  window.requestAnimationFrame(playGame);
  //어떤 움직임이있을 것인지 미리 알려줘서 부드럽게 처리해줌
}

function playGame() {
  if (keys.ArrowLeft && player.x > 0 ) {
    player.x -= player.speed;
  }
  if (keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth) {
    player.x += player.speed;
  }
  if (keys.ArrowUp && player.y > 0) {
    player.y -= player.speed;
  }
  if (keys.ArrowDown && player.y < gameArea.offsetHeight - bird.offsetHeight) {
    player.y += player.speed;
  }
  bird.style.left = player.x + "px";
  bird.style.top = player.y + "px";
  console.log("game Playing");
  window.requestAnimationFrame(playGame);
}

function pressOn(e) {
  console.log(e.code);
  keys[e.code] = true;
  console.log(keys);
}

function pressOff(e) {
  console.log(e.code);
  keys[e.code] = false;
  console.log(keys);
}
