const stick = document.getElementById("stick");
const stickWrapper = document.querySelector(".stick-field");
let posX = 0;
let posY = 0;
let velX = 0;
let velY = 0;
let jumping = false;
let lastTime = 0;
let keys = {};
let curLoopId;
let initialized = false;

export function initStick() {
  if (initialized) return; // 이미 등록했으면 재등록 방지
  initialized = true;

  document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    console.log("keydown", e.code);
    if (!curLoopId) curLoopId = requestAnimationFrame(gameLoop);
  });

  document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });

  document.addEventListener("DOMContentLoaded", (e) => {
    updatePosition();
  });
}

// 조이스틱 루프
function gameLoop(timestamp) {
  if (!timestamp) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  const range = 5; // 이동 거리
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

  // 중간에 멈추네 쉣.
  if (Math.abs(posX) + Math.abs(posY) < 0.05) {
    curLoopId = null;
    console.log('stop')
    return;
  }

  requestAnimationFrame(gameLoop);
}

function updatePosition() {
  const wrapperRect = stickWrapper.getBoundingClientRect();
  const stickRect = stick.getBoundingClientRect();

  stick.style.left = `${posX + wrapperRect.width / 2 - stickRect.width / 2}px`;
  stick.style.bottom = `${
    posY + wrapperRect.height / 2 - stickRect.height / 2
  }px`;
}
