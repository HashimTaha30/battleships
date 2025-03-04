import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const playerCodes = {
    "Hamza Noor": "HN123",
    "Samer Smahan": "SS456",
    "Moatz Abo Alkhair": "MA789",
    "Braa Abo Klisha": "BK101",
    "Yousef Mohaned": "YM112"
};

let placedTroops = new Set();
let playerId = null;
let currentGameId = "game123"; // Example game ID, should be dynamically generated

function login() {
    let code = document.getElementById("loginCode").value;
    let playerName = Object.keys(playerCodes).find(name => playerCodes[name] === code);

    if (playerName) {
        alert(`Welcome, ${playerName}!`);
        playerId = playerName;
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("gameSection").style.display = "block";
        createBoard("gameBoard", placeTroop);
    } else {
        alert("Invalid login code");
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
        set(ref(db, `games/${currentGameId}/board/${playerId}`), Array.from(placedTroops));
    } else {
        alert("You can only place 12 troops.");
    }
}

function useAttackCode() {
    let coordinate = document.getElementById("attackCoordinate").value;
    let result = document.getElementById("attackResult");
    let hit = false;

    // Check if the coordinate is a hit (check the opponent's board)
    const gameRef = ref(db, `games/${currentGameId}/board`);
    get(gameRef).then(snapshot => {
        snapshot.forEach(playerBoard => {
            if (playerBoard.val().includes(coordinate)) {
                hit = true;
            }
        });

        result.textContent = hit ? "Hit! +5 Points" : "Missed!";
        if (hit) {
            updateScore(playerId);
        }
    });
}

function updateScore(playerName) {
    const scoreRef = ref(db, `games/${currentGameId}/scores/${playerName}`);
    get(scoreRef).then(snapshot => {
        let newScore = snapshot.val() + 5; // Add points for a hit
        set(scoreRef, newScore);
        loadScores();
    });
}

function loadScores() {
    const scoreList = document.getElementById("scoreList");
    const gameRef = ref(db, `games/${currentGameId}`);
    
    onValue(gameRef, (snapshot) => {
        const scores = snapshot.val().scores;
        scoreList.innerHTML = '';  // Clear the list
        
        for (const player in scores) {
            const li = document.createElement("li");
            li.textContent = `${player}: ${scores[player]} points`;
            scoreList.appendChild(li);
        }
    });
}

// Ready Button to start attacking phase
document.getElementById("readyButton").addEventListener("click", () => {
    document.getElementById("gameSection").style.display = "none";
    document.getElementById("attackSection").style.display = "block";
    createBoard("attackBoard", useAttackCode);
});
