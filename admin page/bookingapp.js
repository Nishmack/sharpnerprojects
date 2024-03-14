// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const obj = {
        username,
        email,
        phone
    };

    // Post request
    axios.post("https://crudcrud.com/api/8ad5c56de7d945adaf79243f4d2c9653/appointmentData", obj)
        .then((response) => {
            showNewUserOnScreen(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        event.target.reset()
}

// Function to display user data on screen
function showNewUserOnScreen(obj) {
    const parentElement = document.getElementById('userDetails');
    parentElement.innerHTML += `<li id="${obj._id}">${obj.username} - ${obj.email} - ${obj.phone} 
    <button onclick="removeUser('${obj._id}')">Delete</button> 
    <button onclick="editUser('${obj.username}','${obj.email}','${obj.phone}','${obj._id}')">Edit</button></li>`;
}

// Function to remove a user
function removeUser(userId) {
    axios.delete(`https://crudcrud.com/api/8ad5c56de7d945adaf79243f4d2c9653/appointmentData/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Function to remove user data from screen
function removeUserFromScreen(userId) {
    const parentElement = document.getElementById('userDetails');
    const deletedElement = document.getElementById(userId);
    if (deletedElement) {
        parentElement.removeChild(deletedElement);
    }
}
//function to edit
function editUser(username,email,phone,userId){
    document.getElementById('username').value=username;
    document.getElementById('email').value=email;
    document.getElementById('phone').value=phone;
    removeUser(userId)
}
// Function to run on page load
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/8ad5c56de7d945adaf79243f4d2c9653/appointmentData")
        .then((response) => {
            response.data.forEach((userData) => {
                showNewUserOnScreen(userData);
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
