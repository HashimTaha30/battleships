// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2l_bt2MxCPMJGl9ImOjp2FBU-skkkSNw",
    authDomain: "battleship-10733.firebaseapp.com",
    databaseURL: "https://battleship-10733-default-rtdb.firebaseio.com",
    projectId: "battleship-10733",
    storageBucket: "battleship-10733.firebasestorage.app",
    messagingSenderId: "137222756550",
    appId: "1:137222756550:web:c62b2691c35d4ea6061fc7",
    measurementId: "G-0S248X0JM1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// Example player codes
const playerCodes = {
    "Hamza Noor": "HN123",
    "Samer Smahan": "SS456",
    "Moatz Abo Alkhair": "MA789",
    "Braa Abo Klisha": "BK101",
    "Yousef Mohaned": "YM112",
    "Admin": "ADMIN4444"
};

// Player scores
let playerScores = {
    "Hamza Noor": 0,
    "Samer Smahan": 0,
    "Moatz Abo Alkhair": 0,
    "Braa Abo Klisha": 0,
    "Yousef Mohaned": 0
};

let placedTroops = new Set();

// Login Function
function login() {
    const code = document.getElementById("loginCode").value;
    let playerName = Object.keys(playerCodes).find(name => playerCodes[name] === code);

    if (playerName) {
        document.getElementById("loginSection").style.display = "none";
        if (playerName === "Admin") {
            document.getElementById("adminSection").style.display = "block";
            updateAdminPanel();
        } else {
            document.getElementById("gameSection").style.display = "block";
            createBoard("gameBoard", placeTroop);
        }
    } else {
        alert("Invalid login code");
    }
}

// Create the game board (troop placement phase)
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

// Place troops on the board
function placeTroop(event) {
    if (placedTroops.size < 12) {
        event.target.classList.add("placed");
        placedTroops.add(event.target.dataset.coord);
    } else {
        alert("You can only place 12 troops.");
    }
}

// Admin panel - update player scores
function updateAdminPanel() {
    const scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    for (let player in playerScores) {
        let li = document.createElement("li");
        li.textContent = `${player}: ${playerScores[player]} points`;
        scoreList.appendChild(li);
    }
}

// Attack code functionality
function useAttackCode() {
    const coordinate = document.getElementById("attackCode").value;
    const result = document.getElementById("attackResult");
    const hit = placedTroops.has(coordinate);
    result.textContent = hit ? "Hit! +5 Points" : "You have hit nothing.";
    if (hit) playerScores["Hamza Noor"] += 5; // Example: scoring for a specific player
    updateAdminPanel();
}
