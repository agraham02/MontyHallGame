let isPlaying = false;
let switched = false;
let allowInteraction = false;
let firstChoice = true;

let switchedWins = 0;
let switchedLoses = 0;
let keptWins = 0;
let keptLoses = 0;

const doorContainer = document.getElementsByClassName("door-container")[0];
const doorContainerChildren = [...doorContainer.children];

const switchedWinContainer = document.getElementById("switchedWinContainer");
const switchedLosesContainer = document.getElementById("switchedLosesContainer");
const keptWinContainer = document.getElementById("keptWinContainer");
const keptLosesContainer = document.getElementById("keptLosesContainer");

const switchedWinsDOM = document.getElementById("switchedWins");
const switchedLosesDOM = document.getElementById("switchedLoses");
const keptWinsDOM = document.getElementById("keptWins");
const keptLosesDOM = document.getElementById("keptLoses");

const switchedWinPercentageDOM = document.getElementById("switchedWinPercentage");
const switchedLossPercentageDOM = document.getElementById("switchedLossPercentage");
const keptWinPercentageDOM = document.getElementById("keptWinPercentage");
const keptLossPercentageDOM = document.getElementById("keptLossPercentage");

doorContainerChildren.forEach(child => {
    child.addEventListener("click", e => chooseDoor(e.target));
});

function chooseDoor(door) {
    console.log("chooseDoor()")
    if (!isPlaying) {
        startGame();
        return;
    }

    if (!door.classList.contains("closed") || !allowInteraction) {
        return;
    }

    if (firstChoice) {
        firstChoice = false;
        door.classList.add("chosen");
        door.style.border = "6px solid green";
        revealGoat();
        return;
    }
    else {
        if (door.classList.contains("chosen")) {
            switched = false;
        }
        else {
            switched = true;
        }
        evaluateResults(door);
    }
}

function evaluateResults(door) {   
    console.log("evaluateResults()") 
    isPlaying = false;
    if (door.textContent == "Car") {
        if (switched) {
            console.log("Won: Switched");
            switchedWins++;
        }
        else {
            console.log("Won: Kept");
            keptWins++;
        }
    }
    else {
        if (switched) {
            console.log("Loss: Switched");
            switchedLoses++;
        }
        else {
            console.log("Loss: Kept");
            keptLoses++;
        }
    }
    console.log("GameOver\n");
    computeStats();
}

function revealGoat() {   
    console.log("revealGoat()") 
    for (const element of doorContainerChildren) {
        console.log(element);
        if (element.textContent == "Goat" && !element.classList.contains("chosen")) {
            element.style.border = "6px solid red";
            element.classList.remove("closed");
            return;
        }
    }
}

function startGame() {
    console.log("startGame()")
    isPlaying = true;
    switched = false;
    allowInteraction = true;
    firstChoice = true;
    resetDoors()
    
    console.log("Game started");
}

function resetDoors() {
    console.log("resetDoors()")
    const randomIndex = Math.floor(Math.random() * 3);
    console.log(randomIndex);
    doorContainerChildren.forEach(child => {
        child.textContent = "Goat";
        child.classList.add("closed");
        child.classList.remove("chosen");
        child.style.border = "6px solid black";
    });
    doorContainerChildren[randomIndex].textContent = "Car";
}

function computeStats() {
    let switchedWinPercentage = Math.floor((switchedWins / (switchedWins + switchedLoses) || 0) * 100);
    let switchedLossPercentage = Math.ceil((switchedLoses / (switchedWins + switchedLoses) || 0) * 100);
    let keptWinPercentage = Math.floor((keptWins / (keptWins + keptLoses) || 0) * 100);
    let keptLossPercentage = Math.ceil((keptLoses / (keptWins + keptLoses) || 0) * 100);
    switchedWinsDOM.textContent = switchedWins;
    switchedLosesDOM.textContent = switchedLoses;
    keptWinsDOM.textContent = keptWins;
    keptLosesDOM.textContent = keptLoses;

    if (switchedWinPercentage > 2) {
    }
    if (switchedLossPercentage > 2) {        
    }
    if (keptWinPercentage > 2) {        
    }
    if (keptLossPercentage > 2) {        
    }

    switchedWinContainer.style.width = `${switchedWinPercentage >= 10 ? switchedWinPercentage : 10}%`;
    switchedLosesContainer.style.width = `${switchedLossPercentage >= 10 ? switchedLossPercentage : 10}%`;
    keptWinContainer.style.width = `${keptWinPercentage >= 10 ? keptWinPercentage : 10}%`;
    keptLosesContainer.style.width = `${keptLossPercentage >= 10 ? keptLossPercentage : 10}%`;

    switchedWinPercentageDOM.textContent = `${switchedWinPercentage}%`;
    switchedLossPercentageDOM.textContent = `${switchedLossPercentage}%`;
    keptWinPercentageDOM.textContent = `${keptWinPercentage}%`;
    keptLossPercentageDOM.textContent = `${keptLossPercentage}%`;
}

startGame();