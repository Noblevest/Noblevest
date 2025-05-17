// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  /* your config here */
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Load all deposits
function loadAllDeposits() {
  const table = document.getElementById("allDepositsTable");
  const depositsRef = ref(db, "deposits");

  onValue(depositsRef, (snapshot) => {
    table.innerHTML = ""; // Clear existing
    snapshot.forEach((userSnap) => {
      const uid = userSnap.key;
      userSnap.forEach((entry) => {
        const data = entry.val();
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${data.amount}</td>
          <td>${data.method}</td>
          <td>${data.status}</td>
          <td>${
            data.timestamp ? new Date(data.timestamp).toLocaleString() : ""
          }</td>
          <td>
            <button onclick="updateStatus('${uid}', '${
          entry.key
        }', 'approved')">✅</button>
            <button onclick="updateStatus('${uid}', '${
          entry.key
        }', 'declined')">❌</button>
          </td>
        `;
        table.appendChild(tr);
      });
    });
  });
}

// Update deposit/withdrawal status
window.updateStatus = function (uid, key, newStatus) {
  const refPath = ref(db, `deposits/${uid}/${key}`);
  update(refPath, { status: newStatus });
};

// Same function for withdrawals if needed...
