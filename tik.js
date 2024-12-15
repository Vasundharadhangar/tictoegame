let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let themeBtn = document.querySelector("#theme-btn");

let scoreXDisplay = document.querySelector("#score-x");
let scoreODisplay = document.querySelector("#score-o");

let turnO = true;
let count = 0;
let timer;
let timeLimit = 10; 

let scoreX = 0;
let scoreO = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.style.backgroundColor = "#ffffc7";
  });
  clearInterval(timer);
  startTimer();
};

const startTimer = () => {
  clearInterval(timer);
  let time = timeLimit;
  msg.innerText = `Time Left: ${time}s`;

  timer = setInterval(() => {
    time--;
    msg.innerText = `Time Left: ${time}s`;
    if (time <= 0) {
      clearInterval(timer);
      turnO = !turnO;
      msg.innerText = "Time's up! Turn switched.";
      startTimer();
    }
  }, 1000);
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
    clearInterval(timer);
    startTimer();
  });
})

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      boxes[pattern[0]].style.backgroundColor = "#90ee90";
      boxes[pattern[1]].style.backgroundColor = "#90ee90";
      boxes[pattern[2]].style.backgroundColor = "#90ee90";
      return true;
    }
  }
};

const showWinner = (winner) => {
  if (winner === "X") scoreX++;
  else scoreO++;
  scoreXDisplay.innerText = scoreX;
  scoreODisplay.innerText = scoreO;
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

startTimer();
