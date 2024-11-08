
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
        import {
            getFirestore,
            collection,
            addDoc,
            getDocs,
            deleteDoc,
            updateDoc,
            doc
        } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
            apiKey: "AIzaSyD9KJDhRxH9grk5iPu7RViRhlyRlIZF3Co",
            authDomain: "pdtn-4f7ce.firebaseapp.com",
            projectId: "pdtn-4f7ce",
            storageBucket: "pdtn-4f7ce.appspot.com",
            messagingSenderId: "38496665841",
            appId: "1:38496665841:web:e4498510fb51bab1862950",
            measurementId: "G-3ZBXV0C0EP",
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const usersCollection = collection(db, "products3");
        let editIndex = null;

        async function renderTable() {
            const tableBody = document.getElementById('tableBody');
            tableBody.innerHTML = '';
            const querySnapshot = await getDocs(usersCollection);
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${userData.name}</td>
                    <td>${userData.age}</td>
                    <td>${userData.weight}</td>
                    <td>
                        <button onclick="editUser('${doc.id}', '${userData.name}', ${userData.age}, ${userData.weight})">Edit</button>
                        <button onclick="deleteUser('${doc.id}')">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }

        document.getElementById("userForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const weight = document.getElementById('weight').value;

            if (editIndex) {
                // Update existing document
                const userDoc = doc(db, "products3", editIndex);
                await updateDoc(userDoc, { name, age, weight });
                editIndex = null;
            } else {
                // Add new document
                await addDoc(usersCollection, { name, age, weight });
            }

            document.getElementById("userForm").reset();
            renderTable();
        });

        window.editUser = (id, name, age, weight) => {
            document.getElementById("name").value = name;
            document.getElementById("age").value = age;
            document.getElementById("weight").value = weight;
            editIndex = id;
        };

        window.deleteUser = async (id) => {
            const userDoc = doc(db, "products3", id);
            await deleteDoc(userDoc);
            renderTable();
        };

        renderTable();

