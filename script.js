/* initialize variables */
let currentRoom = "Entrance";
let timeLeft = 600; // 10 minutes in seconds
let hintsUsed = 0;
let inventory = [];
let timerInterval;

/* create nested objects */
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

document.getElementById("pause-button").addEventListener("click", pauseGame);
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("hint-button").addEventListener("click", useHint);
document.getElementById("answer-button").addEventListener("click", submitAnswer);

/* pause menu covers screen */
function pauseGame() {
  const pauseMenu = document.getElementById("pause-menu");
  pauseMenu.style.zIndex = "1";
  pauseMenu.style.height = "1000px";
}

function startGame() {
    document.getElementById("start-button").disabled = true;
    document.getElementById("hint-button").disabled = false;
    document.getElementById("answer-button").disabled = false;
    document.getElementById("answer-input").disabled = false;

    timerInterval = setInterval(updateTimer, 1000);
    updateRoom(currentRoom);
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;
    } else {
        clearInterval(timerInterval);
        alert("Time's up! Game Over.");
        resetGame();
    }
}

function updateRoom(room) {
  document.getElementById("room-name").innerText = room;
  document.getElementById("room-description").innerHTML = rooms[room].description;
  document.getElementById("room-description").innerHTML += `<p>Puzzle: ${rooms[room].puzzle}`;
}

function useHint() {
    if (hintsUsed < 1) {
        hintsUsed++;
        timeLeft -= 30;
        alert(rooms[currentRoom].hint);
    } else {
        alert("You've already used your hint!");
    }
}

function submitAnswer() {
    const playerAnswer = document.getElementById("answer-input").value.trim();
    if (playerAnswer.toLowerCase() === rooms[currentRoom].answer.toLowerCase()) {
        alert("Correct! You may proceed to the next room.");
        currentRoom = rooms[currentRoom].nextRoom || "<p>TreasureRoom";
        updateRoom(currentRoom);
        document.getElementById("answer-input").value = ""; // Clear input
    } else {
        alert("Incorrect answer. Try again!");
    }
}

function resetGame() {
    clearInterval(timerInterval);
    currentRoom = "Entrance";
    timeLeft = 600;
    hintsUsed = 0;
    inventory = [];
    document.getElementById("start-button").disabled = false;
    document.getElementById("hint-button").disabled = true;
    document.getElementById("answer-button").disabled = true;
    document.getElementById("answer-input").disabled = true;
    document.getElementById("time").innerText = timeLeft;
    updateRoom(currentRoom);
}
