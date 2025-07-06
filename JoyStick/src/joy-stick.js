const stick = document.getElementById("stick");
let posX = 0;
let posY = 0;
let velX = 0;
let velY = 0;
let jumping = false;
let lastTime = 0;
let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  console.log("keydown", e.code);
});

// 왜 keyup 발생할 때 툭 멈추면서 대시할까?
document.addEventListener("keyup", (e) => {
  keys[e.code] = false;
  console.log("keyup", e.code);
});

// 잘은 모르겠는데 조이스틱 만들었는데?
// 시작 위치만 조정하면 훌륭한 조이스틱이 될 것 같아.
function gameLoop(timestamp) {
  if (!timestamp) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  const range = 7; // 이동 거리
  const returnFactor = 0.9; // 복귀 속도 (1~0 범위에서 0에 가까울수록 빨리 감속)

  if (keys["ArrowRight"]) {
    posX += range;
  }
  if (keys["ArrowLeft"]) {
    posX -= range;
  }
  if (keys["ArrowUp"]) {
    posY += range;
  }
  if (keys["ArrowDown"]) {
    posY -= range;
  }

  posX = posX * returnFactor;
  posY = posY * returnFactor;

  updatePosition();
  requestAnimationFrame(gameLoop);
}

gameLoop();

function updatePosition() {
  const centerX = window.innerWidth / 2 - parseInt(stick.offsetWidth);
  const centerY = window.innerHeight / 2 - parseInt(stick.offsetHeight);

  stick.style.left = `${centerX + posX}px`;
  stick.style.top = `${centerY - posY}px`;
}
