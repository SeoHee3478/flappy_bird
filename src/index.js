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
let player = {
  x: 0,
  y: 0,
  speed: 2,
  score: 0,
  inplay: false,
};

function start() {
  console.log("game start");
  player.inplay = true;
  player.score = 0;
  gameArea.innerHTML ="";
  gameMessage.classList.add("hide");
  startBtn.classList.add("hide");
  let bird = document.createElement("div");
  let wing = document.createElement("div");
  bird.setAttribute("class", "bird");
  //bird의 div 요소에 attribute인 class bird를 넣어줌
  wing.setAttribute("class", "wing");
  bird.appendChild(wing);
  gameArea.appendChild(bird);
  //날개퍼덕이기
  wing.pos = 15;
  wing.style.top = wing.pos + "px";
  player.x = bird.offsetLeft;
  //bird의 left 값을 갖는다
  player.y = bird.offsetTop;
  //bird의 Top 값을 갖는다
  window.requestAnimationFrame(playGame);
  //어떤 움직임이있을 것인지 미리 알려줘서 부드럽게 처리해줌
  
}

function playGame() {
  if (player.inplay) {
    let bird = document.querySelector(".bird");
    let wing = document.querySelector(".wing");
    let move = false;
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
      move = true;
    }
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth) {
      player.x += player.speed;
      move = true;
    }
    if ((keys.ArrowUp || keys.Space) && player.y > 0) {
      player.y -= player.speed * 5;
      move = true;
    }
    if (
      keys.ArrowDown &&
      player.y < gameArea.offsetHeight - bird.offsetHeight
    ) {
      player.y += player.speed;
      move = true;
    }
    if (move) {
      wing.pos = wing.pos === 15 ? 25 : 15;
      wing.style.top = wing.pos + "px";
    }
    /*중력*/
    player.y += player.speed * 2;

    bird.style.left = player.x + "px";
    bird.style.top = player.y + "px";
    console.log("game Playing");
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "SCORE : " + player.score;
    //점수 추가
  }
}

function playGameOver() {
  player.inplay = false;
  gameMessage.classList.remove("hide");
  gameMessage.innerHTML =
    "GAME OVER <br/> 당신의 점수는" +
    player.score +
    "점입니다.<br/> 다시 시작하려면 여기를 누르세요!";
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
