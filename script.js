let selectedPlayer = null;
let placedTroops = new Set();
let playerScores = {
    "Hamza Noor": 0,
    "Samer Smahan": 0,
    "Moatz Abo Alkhair": 0,
    "Braa Abo Klisha": 0,
    "Yousef Mohaned": 0
};

function selectPlayer(playerName) {
    selectedPlayer = playerName;
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    createBoard("gameBoard", placeTroop);
}

function createBoard(boardId, clickHandler) {
    const board = document.getElementById(boardId);
    board.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coord = `${i},${j}`;
            cell.textContent = `${i},${j}`;
            if (clickHandler) cell.addEventListener("click", clickHandler);
            board.appendChild(cell);
        }
    }
}

function placeTroop(event) {
    if (placedTroops.size < 12) {
        event.target.classList.add("placed");
        placedTroops.add(event.target.dataset.coord);
    } else {
        alert("You can only place 12 troops.");
    }
}

function startGame() {
    console.log(`${selectedPlayer} has started the game!`);
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("attackSection").style.display = "block";
    createBoard("attackBoard", attackCell);
}

function attackCell(event) {
    const coordinate = event.target.dataset.coord;
    if (placedTroops.has(coordinate)) {
        event.target.classList.add("hit");
        playerScores[selectedPlayer] += 5;
    } else {
        event.target.classList.add("miss");
    }
    updateScore();
}

function useAttackCode() {
    let result = document.getElementById("attackResult");
    let coordinate = document.getElementById("attackCoordinate").value;
    let targetPlayer = document.getElementById("targetPlayer").value;
    
    // Check if attack coordinate exists in placedTroops for target player
    let hit = placedTroops.has(coordinate);
    result.textContent = hit ? `${targetPlayer}: Hit! +5 Points` : `${targetPlayer}: Missed!`;

    if (hit) {
        playerScores[selectedPlayer] += 5;
    }

    updateScore();
}

function updateScore() {
    let scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    for (let player in playerScores) {
        let li = document.createElement("li");
        li.textContent = `${player}: ${playerScores[player]} points`;
        scoreList.appendChild(li);
    }
}
