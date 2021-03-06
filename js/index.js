let target;
let targetInc = 1;
const TARGET_SIZE = 600;
const MAX_GAMES = 3;
const thumbs = [];
let buffer;
let canvas;

let showingResults = false;

let userScores = [];

function setup() {
    canvas = createCanvas(TARGET_SIZE, TARGET_SIZE);
    canvas.parent("sketch");
    background(50);

    // let resultsCanvas = createCanvas(100, 600);
    // canvas.parent("resultsSketch");

    buffer = createGraphics(width, height);
    target = new Target(width / 2, height / 2, TARGET_SIZE, buffer);

    target.calculateArrows(5);

    let targetCounter = document.getElementById("targetCounter");
    targetCounter.innerHTML = "1 out of " + MAX_GAMES;

    // noLoop();
}

function draw() {
    background(50);
    target.paint();

    target.paintArrows();

    image(buffer, 0, 0);
}

function submitGuess(g) {
    console.log("GUESS:", g);
    console.log("Actual:", target.totalScore);

    userScores.push({ actualScore: target.totalScore, userGuess: g });
    buffer = createGraphics(width, height);

    target = new Target(width / 2, height / 2, TARGET_SIZE, buffer);

    target.calculateArrows(5);

    let typingBox = document.getElementById("typingBox");

    typingBox.value = "";

    let targetCounter = document.getElementById("targetCounter");

    thumbs.push(buffer);

    targetInc++;
    if (targetInc > MAX_GAMES) {
        targetInc = 0;

        showingResults = true;

        let targetContainer = document.getElementById("targetContainer");

        targetContainer.style.display = "none";

        let resultsContainer = document.getElementById("resultsContainer");

        resultsContainer.classList.remove("displayHidden");

        // canvas.parent("resultsSketch");

        showResults();

        userScores = [];
    }

    targetCounter.innerHTML = targetInc + " out of " + MAX_GAMES;
}

function showResults() {
    let resultsContainer = document.getElementById("resultsList");

    resultsContainer.textContent = "";

    for (let i = 0; i < userScores.length; i++) {
        let node = document.createElement("div");
        node.innerHTML = i + 1 + ". Actual: " + userScores[i].actualScore + ", Guess: " + userScores[i].userGuess;

        if (userScores[i].actualScore == userScores[i].userGuess) {
            node.style.color = "green";
        } else {
            node.style.color = "red";
        }

        resultsContainer.appendChild(node);
    }
}

document.addEventListener("keydown", (e) => {
    if (showingResults) return;

    if (e.key === "Enter") {
        return submitGuess(+document.getElementById("typingBox").value);
    }
});

function newgame() {
    let targetCounter = document.getElementById("targetCounter");
    targetCounter.innerHTML = "1 out of " + MAX_GAMES;
    targetInc = 0;

    buffer = createGraphics(width, height);

    target = new Target(width / 2, height / 2, TARGET_SIZE, buffer);

    target.calculateArrows(5);

    let targetContainer = document.getElementById("targetContainer");

    targetContainer.style.display = "flex";

    let resultsContainer = document.getElementById("resultsContainer");

    resultsContainer.classList.add("displayHidden");

    showingResults = false;
}

function startGame() {
    let targetContainer = document.getElementById("targetContainer");

    targetContainer.classList.remove("blurred");

    let startGameButton = document.getElementById("startGameButton");

    startGameButton.classList.add("displayHidden");
}