const playerCodes = {
    "Hamza Noor": "HN123",
    "Samer Smahan": "SS456",
    "Moatz Abo Alkhair": "MA789",
    "Braa Abo Klisha": "BK101",
    "Yousef Mohaned": "YM112",
    "Admin": "ADMIN4444"
};

let playerScores = {
    "Hamza Noor": 0,
    "Samer Smahan": 0,
    "Moatz Abo Alkhair": 0,
    "Braa Abo Klisha": 0,
    "Yousef Mohaned": 0
};

let placedTroops = new Set();
const attackCodes = new Set([
    "ATK004", "ATK023", "ATK003", "ATK094", "ATK005",
    "ATK054", "ATK0345", "ATK008", "ATK009", "ATK010",
    "ATK031", "ATK012", "ATK013", "ATK014", "ATK015",
    "ATK056", "ATK017", "ATK018", "ATK019", "ATK020",
    "ATK021", "ATK022", "ATK0234", "ATK024", "ATK025"
]);

function login(playerName) {
    document.getElementById("playerListSection").style.display = "none";
    if (playerName === "Admin") {
        document.getElementById("adminSection").style.display = "block";
        updateAdminPanel();
    } else {
        document.getElementById("gameSection").style.display = "block";
        createBoard("gameBoard", placeTroop);
    }
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

function readyUp() {
    if (placedTroops.size === 12) {
        alert("You are ready to start the attack phase!");
        document.getElementById("attackSection").style.display = "block";
        document.getElementById("gameSection").style.display = "none";
        createBoard("attackBoard", null);  // No troop placement allowed here
    } else {
        alert("Please place all 12 troops before proceeding.");
    }
}

function useAttackCode() {
    let code = document.getElementById("attackCode").value;
    let coordinate = document.getElementById("attackCoordinate").value;
    let result = document.getElementById("attackResult");

    if (!attackCodes.has(code)) {
        result.textContent = "Invalid or already used attack code!";
        return;
    }

    attackCodes.delete(code);  // Remove the used code

    let hit = placedTroops.has(coordinate);
    result.textContent = hit ? "Hit! +5 Points" : "You have hit nothing.";
    if (hit) playerScores["Hamza Noor"] += 5;
    updateAdminPanel();
    updateScoresDisplay();
}

function updateAdminPanel() {
    let scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    for (let player in playerScores) {
        let li = document.createElement("li");
        li.textContent = `${player}: ${playerScores[player]} points`;
        scoreList.appendChild(li);
    }
}

function updateScoresDisplay() {
    document.getElementById("scoreHamzaNoor").textContent = playerScores["Hamza Noor"];
    document.getElementById("scoreSamerSmahan").textContent = playerScores["Samer Smahan"];
    document.getElementById("scoreMoatzAboAlkhair").textContent = playerScores["Moatz Abo Alkhair"];
    document.getElementById("scoreBraaAboKlisha").textContent = playerScores["Braa Abo Klisha"];
    document.getElementById("scoreYousefMohaned").textContent = playerScores["Yousef Mohaned"];
}
