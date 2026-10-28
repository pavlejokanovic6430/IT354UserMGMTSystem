/*

Copied code for working with an API

const API_URL = 'http://localhost:3000';

// Funkcija koja prikazuje greške
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Funkcija koja fetchuje i prikazuje korisnike
async function fetchUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP greška! status: ${response.status}`);
        }
        const users = await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `ID: ${user.id}, Ime: ${user.name}, Email: ${user.email}`;
            userList.appendChild(li);
        });
    } catch (error) {
        showError(`Neuspešno učitavanje korisnika: ${error.message}`);
    }
}

// Dodaj novog korisnika
document.getElementById('addUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        });
        if (!response.ok) {
            throw new Error(`HTTP greška! status: ${response.status}`);
        }
        await fetchUsers();
        e.target.reset();
    } catch (error) {
        showError(`Neuspešno dodavanje korisnika: ${error.message}`);
    }
});

// Ažuriranje korisnika
document.getElementById('updateUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        if (!response.ok) {
            throw new Error(`HTTP greška! status: ${response.status}`);
        }
        await fetchUsers();
        e.target.reset();
    } catch (error) {
        showError(`Neuspešno ažuriranje korisnika: ${error.message}`);
    }
});

// Brisanje korisnika
document.getElementById('deleteUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('deleteId').value;
    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP greška! status: ${response.status}`);
        }
        await fetchUsers();
        e.target.reset();
    } catch (error) {
        showError(`Neušpešno brisanje korisnika: ${error.message}`);
    }
});

// Registrovanje osluškivača događaja na dugme osveži listu
document.getElementById('refreshButton').addEventListener('click', fetchUsers);

// Fečuj korisnike kad se strana učita 
fetchUsers();
*/






//Code that works without an API

let userList = [];
let ID = 1;

const addUserForm = document.getElementById("add-user-form");
const changeUserForm = document.getElementById("change-user-form");
const deleteUserForm = document.getElementById("delete-user-form");
const userListForm = document.getElementById("user-list-form")

addUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const object = {ID: ID++, ime: document.getElementById("addIme").value, email: document.getElementById("addEmail").value, color: document.getElementById("addColor").value};
    userList.push(object);

    refreshUsers();

    addUserForm.reset();
})

changeUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updateID = document.getElementById("updateID").value;
    for(let object of userList){
        if(object.ID == updateID){
            object.ime = document.getElementById("updateIme").value;
            object.email = document.getElementById("updateEmail").value;
            object.color = document.getElementById("updateColor").value;
        }
    }

    changeUserForm.reset();
})

deleteUserForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const deleteId = document.getElementById("deleteID").value;
    for(let object of userList){
        if(object.ID == deleteId){
            userList.splice(userList.indexOf(object), 1);
        }
    }
})

userListForm.addEventListener("submit", (e) => {
    e.preventDefault();
    refreshUsers();
});

function refreshUsers() {
    const ul = document.getElementById("user-list")
    ul.innerHTML = "";
    for (const object of userList) {
        const li = document.createElement("li");
        li.textContent = `ID: ${object.ID} ime: ${object.ime} email: ${object.email} color: ${object.color}`;
        li.style.backgroundColor = object.color;
        ul.appendChild(li);
    }
}