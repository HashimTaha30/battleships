// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2l_bt2MxCPMJGl9ImOjp2FBU-skkkSNw",
    authDomain: "battleship-10733.firebaseapp.com",
    databaseURL: "https://battleship-10733-default-rtdb.firebaseio.com",
    projectId: "battleship-10733",
    storageBucket: "battleship-10733.appspot.com",
    messagingSenderId: "137222756550",
    appId: "1:137222756550:web:c62b2691c35d4ea6061fc7",
    measurementId: "G-0S248X0JM1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Predefined Player Codes
const playerCodes = {
    "Hamza Noor": "HN123",
    "Samer Smahan": "SS456",
    "Moatz Abo Alkhair": "MA789",
    "Braa Abo Klisha": "BK101",
    "Yousef Mohaned": "YM112",
    "Admin": "ADMIN4444"
};

// Login Function
function login() {
    const code = document.getElementById("loginCode").value.trim();
    const loginError = document.getElementById("loginError");

    let playerName = Object.keys(playerCodes).find(name => playerCodes[name] === code);

    if (playerName) {
        loginError.textContent = "";
        document.getElementById("loginSection").style.display = "none";

        if (playerName === "Admin") {
            document.getElementById("attackSection").style.display = "block"; // Admin View
        } else {
            document.getElementById("gameSection").style.display = "block"; // Player View
        }
    } else {
        loginError.textContent = "Invalid login code. Try again!";
    }
}

// Attack Code Functionality
function useAttackCode() {
    const attackCode = document.getElementById("attackCode").value.trim();
    const attackResult = document.getElementById("attackResult");

    if (attackCode === "SECRET123") {
        attackResult.textContent = "Hit! Enemy troop destroyed!";
    } else {
        attackResult.textContent = "Missed! Try again.";
    }
}
