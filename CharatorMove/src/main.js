const character = document.getElementById("character");
let posX = 100;
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

  const speed = 0.3; // ms당 이동 속도
  const acceleration = 0.05; // 가속도
  const friction = 0.9; // 감속 속도 (1~0 범위에서 0에 가까울수록 빨리 감속)

  if (keys["ArrowRight"]) {
    velX += delta * acceleration;
  }
  if (keys["ArrowLeft"]) {
    velX -= delta * acceleration;
  }
  if (keys["ArrowUp"]) {
    velY += delta * acceleration;
  }
  if (keys["ArrowDown"]) {
    velY -= delta * acceleration;
  }

  velX *= friction
  velY *= friction

  posX += velX;
  posY += velY;

  updatePosition();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// 키다운이 이상한데 쓰로틀로 해결
function throttle(callback, delay) {
  let last = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - last >= delay) {
      last = now;
      callback.apply(this, args);
    }
  };
}

function jump() {
  jumping = true;
  character.style.bottom = "50px";
  setTimeout(() => {
    character.style.bottom = "0px";
    jumping = false;
  }, 80);
}

function updatePosition() {
  character.style.left = `${posX}px`;
  character.style.bottom = `${posY}px`;
}
