/* initialize variables */
let timeLeft = 600; // 10 minutes in seconds
let currentRoom = "Entrance";
let timerInterval;
let hintsUsed = 0;
let totalHintsUsed = 0;
let roomsSolved = 0;
let calcProgressPerc = 0;
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
    roomName: "Entrance",
    nextRoom: "Room1"
  },
  Room1: {
    description: "<p>You have entered Room 1. A riddle awaits you.</p>",
    puzzle: "What has keys but can't open locks?</p>",
    answer: "Piano",
    hint: "It's a musical instrument.",
    roomName: "Room 1",
    nextRoom: "Room2"
  },
  Room2: {
    description: "<p>You have entered Room 2. A simpler riddle awaits.</p>",
    puzzle: "What has to be broken before you can use it?</p>",
    answer: "Egg",
    hint: "What do you want for breakfast?",
    roomName: "Room 2",
    nextRoom: "Room3"
  },
  Room3: {
    description: "<p>You have entered Room 3. A new riddle is here.</p>",
    puzzle: "I’m tall when I’m young, and I’m short when I’m old. What am I?</p>",
    answer: "Candle",
    hint: "It gives off light and melts over time.",
    roomName: "Room 3",
    nextRoom: "Room4"
  },
  Room4: {
    description: "<p>You have entered Room 4. Another riddle awaits.</p>",
    puzzle: "What has a head, a tail, and is brown, but has no legs?</p>",
    answer: "Penny",
    hint: "Can I give you my two cents?",
    roomName: "Room 4",
    nextRoom: "Room5"
  },
  Room5: {
    description: "<p>You have entered Room 5. A curious riddle awaits.</p>",
    puzzle: "The more you take, the more you leave behind. What am I?</p>",
    answer: "Footsteps",
    hint: "Think about walking.",
    roomName: "Room 5",
    nextRoom: "Room6"
  },
  Room6: {
    description: "<p>You have entered Room 6. A tricky riddle awaits.</p>",
    puzzle: "What can travel around the world while staying in the same spot?</p>",
    answer: "Stamp",
    hint: "It's small, useful for letters, and loves envelopes.",
    roomName: "Room 6",
    nextRoom: "Room7"
  },
  Room7: {
    description: "<p>You have entered Room 7.</p>",
    puzzle: "I am not alive, but I grow; I don’t have lungs, but I need air; I don’t have a mouth, and I can drown. What am I?</p>",
    answer: "Fire",
    hint: "That's hot!",
    roomName: "Room 7",
    nextRoom: "Room8"
  },
  Room8: {
    description: "<p>You have entered Room 8. A classic riddle is here.</p>",
    puzzle: "What has an eye but cannot see?</p>",
    answer: "Needle",
    hint: "You use it for sewing.",
    roomName: "Room 8",
    nextRoom: "Room9"
  },
  Room9: {
    description: "<p>You have entered Room 9. The final riddle awaits you.</p>",
    puzzle: "What is the most common gas in the Earth's atmosphere?</p>",
    answer: "Nitrogen",
    hint: "It's not oxygen!",
    roomName: "Room 9",
    nextRoom: "TreasureRoom"
  },
  TreasureRoom: {
    description: "<p>Congratulations! You've found the treasure room.</p>",
    roomName: "Treasure Room"
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
  if (currentRoom !== "TreasureRoom") {
    document.getElementById("room-name").innerText = rooms[room].roomName;
    document.getElementById("room-description").innerHTML = rooms[room].description + `<p>Puzzle: ${rooms[room].puzzle}`;
    hintsUsed = 0;
  }
  else {
    document.getElementById("room-name").innerText = rooms[room].roomName;
    document.getElementById("room-description").innerHTML = rooms[room].description;
    /* end timer */
    clearInterval(timerInterval);
    /* change active buttons */
    document.getElementById("start-button").addEventListener("click", restartGame);
    /* enable/disable buttons */
    document.getElementById("start-button").disabled = false;
    document.getElementById("hint-button").disabled = true;
    document.getElementById("answer-button").disabled = true;
    document.getElementById("answer-input").disabled = true;
    document.getElementById("pause-button").disabled = true;
  }
}

/* check if hint used */
function useHint() {
  if (hintsUsed < 1) {
    hintsUsed++;
    totalHintsUsed++;
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
    /* calculate the percentage of game completion */
    calcProgressPerc += ((100/3)*100/100);
    progressPerc = Math.trunc(calcProgressPerc);
    document.getElementById("correct").innerText = correctAnswers;
    document.getElementById("rooms").innerText = roomsSolved;
    document.getElementById("progress").innerText = progressPerc;
    alert("Correct! You may proceed to the next room.");
    currentRoom = rooms[currentRoom].nextRoom;
    updateRoom(currentRoom);
    document.getElementById("answer-input").value = ""; // Clear input
  } else {
    incorrectAnswers++;
    document.getElementById("incorrect").innerText = incorrectAnswers;
    alert("Incorrect answer. Try again!");
  }
}

function resetGame() {
  /* reset variables */
  timeLeft = 600;
  currentRoom = "Entrance";
  updateRoom(currentRoom);
  hintsUsed = 0;
  totalHintsUsed = 0;
  roomsSolved = 0;
  calcProgressPerc = 0;
  progressPerc = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  pauseCount = 0;
  /* enable/disable buttons */
  document.getElementById("start-button").disabled = false;
  document.getElementById("hint-button").disabled = true;
  document.getElementById("answer-button").disabled = true;
  document.getElementById("answer-input").disabled = true;
  document.getElementById("pause-button").disabled = true;
  document.getElementById("time").innerText = timeLeft;
  /* end timer */
  clearInterval(timerInterval);
}

function restartGame() {
  /* reset variables */
  timeLeft = 600;
  currentRoom = "Entrance";
  hintsUsed = 0;
  totalHintsUsed = 0;
  roomsSolved = 0;
  calcProgressPerc = 0;
  progressPerc = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  pauseCount = 0;
  /* enable/disable buttons */
  document.getElementById("start-button").disabled = true;
  document.getElementById("hint-button").disabled = false;
  document.getElementById("answer-button").disabled = false;
  document.getElementById("answer-input").disabled = false;
  document.getElementById("pause-button").disabled = false;
  document.getElementById("time").innerText = timeLeft;
  /* set timer */
  timerInterval = setInterval(updateTimer, 1000);
  updateRoom(currentRoom);
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

/* show Statistics screen */
function showStats() {
  stats.style.zIndex = "1";
  stats.style.opacity = "1";
  /* update displayed stats */
  document.getElementById("hints").innerText = totalHintsUsed;
  document.getElementById("rooms").innerText = roomsSolved;
  document.getElementById("correct").innerText = correctAnswers;
  document.getElementById("incorrect").innerText = incorrectAnswers;
  document.getElementById("pauses").innerText = pauseCount;
}

/* hide Statistics screen */
function closeStats() {
  stats.style.zIndex = "0";
  stats.style.opacity = "0";
}