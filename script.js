/* initialize variables */
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;
let currentRoom = "Entrance";
/* incomplete */
let inventory = [];

let hintsUsed = 0;
let roomsSolved = 0;
let progressPerc = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let pauseCount = 0;
const pauseMenu = document.getElementById("pause-menu");
const stats = document.getElementById("stats");

/* create nested objects and properties */
const rooms = {
  Entrance: {
    description: "<p>You are at the entrance. A door leads into the next room.</p>",
    puzzle: "What is the sum of 2 + 2?</p>",
    answer: "4",
    hint: "It's the number of legs on a chair.",
    nextRoom: "Room1"
  },
  Room1: {
    description: "<p>You have entered Room 1. A riddle awaits you.</p>",
    puzzle: "What has keys but can't open locks?</p>",
    answer: "Piano",
    hint: "It's a musical instrument.",
    nextRoom: "TreasureRoom"
  },
  TreasureRoom: {
    description: "<p>Congratulations! You've found the treasure room.</p>",
    puzzle: "What is the most common gas in the Earth's atmosphere?</p>",
    answer: "Nitrogen",
    hint: "It's not oxygen!",
  }
};

/* add active buttons */
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("hint-button").addEventListener("click", useHint);
document.getElementById("answer-button").addEventListener("click", submitAnswer);
document.getElementById("pause-button").addEventListener("click", pauseGame);
/* add pause menu buttons */
document.getElementById("play-button").addEventListener("click", playGame);
document.getElementById("quit-button").addEventListener("click", quitGame);
/* incomplete */
document.getElementById("options-button").addEventListener("click", showOptions);

document.getElementById("stats-button").addEventListener("click", showStats);
document.getElementById("close-stats-button").addEventListener("click", closeStats);

/* define functions */
function startGame() {
  /* enable/disable buttons */
  document.getElementById("start-button").disabled = true;
  document.getElementById("hint-button").disabled = false;
  document.getElementById("answer-button").disabled = false;
  document.getElementById("answer-input").disabled = false;
  document.getElementById("pause-button").disabled = false;
  /* set timer */
  timerInterval = setInterval(updateTimer, 1000);
  updateRoom(currentRoom);
}

function updateTimer() {
  if (timeLeft > 0) {
    /* count down the timer */
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
  } else {
    /* end game */
    clearInterval(timerInterval);
    alert("Time's up! Game Over.");
    resetGame();
  }
}

/* go to next room */
function updateRoom(room) {
  document.getElementById("room-name").innerText = room;
  document.getElementById("room-description").innerHTML = rooms[room].description;
  document.getElementById("room-description").innerHTML += `<p>Puzzle: ${rooms[room].puzzle}`;
}

/* check if hint used */
function useHint() {
  if (hintsUsed < 1) {
    hintsUsed++;
    timeLeft -= 30;
    document.getElementById("hints").innerText = hintsUsed;
    alert(rooms[currentRoom].hint);
  } else {
    alert("You've already used your hint!");
  }
}

function submitAnswer() {
  /* submit answer */
  const playerAnswer = document.getElementById("answer-input").value.trim();
  /* check answer */
  if (playerAnswer.toLowerCase() === rooms[currentRoom].answer.toLowerCase()) {
    correctAnswers++;
    roomsSolved++;
    progressPerc += Math.trunc((100/3)*100)/100;
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("rooms").innerText = roomsSolved;
    document.getElementById("progress").innerText = progressPerc;
    alert("Correct! You may proceed to the next room.");
    currentRoom = rooms[currentRoom].nextRoom || "<p>TreasureRoom";
    updateRoom(currentRoom);
    document.getElementById("answer-input").value = ""; // Clear input
  } else {
    incorrectAnswers++;
    document.getElementById("incorrect").innerText = incorrectAnswers;
    alert("Incorrect answer. Try again!");
  }
}

function resetGame() {
  /* end timer */
  clearInterval(timerInterval);
  timeLeft = 600;
  /* reset variables */
  currentRoom = "Entrance";
  updateRoom(currentRoom);
  /* incomplete */
  inventory = [];

  hintsUsed = 0;
  roomsSolved = 0;
  progressPerc = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  pauseCount = 0;
  /* update displayed stats */
  document.getElementById("hints").innerText = hintsUsed;
  document.getElementById("rooms").innerText = roomsSolved;
  document.getElementById("correct").innerText = correctAnswers;
  document.getElementById("incorrect").innerText = incorrectAnswers;
  document.getElementById("pauses").innerText = pauseCount;
  /* enable/disable buttons */
  document.getElementById("start-button").disabled = false;
  document.getElementById("hint-button").disabled = true;
  document.getElementById("answer-button").disabled = true;
  document.getElementById("answer-input").disabled = true;
  document.getElementById("pause-button").disabled = true;
  document.getElementById("time").innerText = timeLeft;
}

function pauseGame() {
  /* pause menu covers screen */
  pauseMenu.style.zIndex = "1";
  pauseMenu.style.opacity = "1";
  pauseMenu.style.height = "100%;";
  pauseCount++;
  document.getElementById("pauses").innerText = pauseCount;
}

function playGame() {
  /* screen uncovered */
  pauseMenu.style.zIndex = "0";
  pauseMenu.style.opacity = "0";
  /* reset timer */
  clearInterval(timerInterval);
  timeLeft = 600;
  document.getElementById("time").innerText = timeLeft;
  timerInterval = setInterval(updateTimer, 1000);
}

function quitGame() {
  /* screen uncovered */
  pauseMenu.style.zIndex = "0";
  pauseMenu.style.opacity = "0";
  /* end game */
  document.getElementById("pause-button").disabled = true;
  resetGame();
}

/* incomplete */
/* show Options screen */
function showOptions() {
  options.style.zIndex = "1";
  options.style.opacity = "1";
}

/* hide Options screen */
function closeOptions() {
  options.style.zIndex = "0";
  options.style.opacity = "0";
}


/* show Statistics screen */
function showStats() {
  stats.style.zIndex = "1";
  stats.style.opacity = "1";
}

/* hide Statistics screen */
function closeStats() {
  stats.style.zIndex = "0";
  stats.style.opacity = "0";
}