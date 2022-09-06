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
let pipe = {
  startPos: 0,
  spaceBetweenRow: 0, /*기둥과 기둥의 사이*/
  spaceBetweenCol: 0, /*윗 기둥과 아랫기둥 사이의 간격*/
  pipeCount: 0,
};

function start() {
  console.log("game start");
  player.inplay = true;
  player.score = 0;
  gameArea.innerHTML = "";
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

  pipe.startPos = 0;
  pipe.spaceBetweenRow = 400;
  pipe.pipeCount = Math.floor(
    gameArea.offsetWidth / pipe.spaceBetweenRow
  ); /*소수점 아래자리수는 버림*/
  for (let i = 0; i < pipe.pipeCount; i++) {
    makePipe(pipe.startPos * pipe.spaceBetweenRow);
    pipe.startPos++;
  }
  //화면의 넓이에 따라 파이프의 개수를 동적으로 만들어준 것임//

  window.requestAnimationFrame(playGame);
  //어떤 움직임이있을 것인지 미리 알려줘서 부드럽게 처리해줌
}

function makePipe(pipePos) {
  let totalHeight = gameArea.offsetHeight;
  let totalWidth = gameArea.offsetWidth;
  let pipeUp = document.createElement("div");
  pipeUp.classList.add("pipe");
  pipeUp.height = Math.floor(Math.random() * 350);
  pipeUp.style.height = pipeUp.height + "px";
  pipeUp.style.left =
    totalWidth + pipePos + "px"; /*처음 시작될 땐 화면밖에 있음*/
  pipeUp.x = totalWidth + pipePos;
  pipeUp.style.top = "0px";
  pipeUp.style.backgroundColor = "red";

  gameArea.appendChild(pipeUp);

  pipe.spaceBetweenCol = Math.floor(Math.random() * 250) + 150;
  let pipeDown = document.createElement("div");
  pipeDown.classList.add("pipe");
  pipeDown.style.height =
    totalHeight - pipeUp.height - pipe.spaceBetweenCol + "px";
  pipeDown.style.left = totalWidth + pipePos + "px";
  pipeDown.x = totalWidth + pipePos;
  pipeDown.style.bottom = "0px";
  pipeDown.style.backgroundColor = "black";
  gameArea.appendChild(pipeDown);
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
