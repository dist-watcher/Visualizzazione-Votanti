// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA83RbCPfhfpHBtD3xTgg55s8LQuc63XIM",
    authDomain: "elezioni-2024.firebaseapp.com",
    databaseURL: "https://elezioni-2024-default-rtdb.firebaseio.com/",
    projectId: "elezioni-2024",
    storageBucket: "elezioni-2024.appspot.com",
    messagingSenderId: "498674638658",
    appId: "1:498674638658:web:e21f992146c3c1e483b2db",
    measurementId: "G-HFNRH9Z04C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get a reference to the votanti list in the database
const votantiRef = ref(database, 'votanti');

// Function to update the summary and votanti list
onValue(votantiRef, (snapshot) => {
    const votantiList = document.getElementById('votanti-list');
    const summary = document.getElementById('summary');
    votantiList.innerHTML = '';

    const votanti = snapshot.val();
    let count = 0;

    for (const votante in votanti) {
        const li = document.createElement('li');
        li.textContent = votante;

        if (votanti[votante].ha_votato) {
            li.classList.add('votato');
            count++;
        } else {
            li.classList.add('non-votato');
        }

        votantiList.appendChild(li);
    }

    const totalVotanti = Object.keys(votanti).length;
    const now = new Date().toLocaleTimeString();
    summary.textContent = `Alle ore ${now}, hanno votato ${count}/${totalVotanti} elettori.`;
});
