//function to handle product submission
function handleProductSubmit(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const productname = event.target.productname.value;
    const obj = {
        price,
        productname
    };
   
 // Post request
 axios.post("https://crudcrud.com/api/8ad5c56de7d945adaf79243f4d2c9653/appointmentData", obj)
 .then((response) => {
     showNewUserOnScreen(response.data);
 })
 .catch((error) => {
     console.log(error);
 });
 event.target.reset();
}
// Function to display user data on screen
function showNewUserOnScreen(obj) {
    const parentElement = document.getElementById('productDetails');
    parentElement.innerHTML += `<li id="${obj._id}">${obj.price} - ${obj.productname}
    <button onclick="removeUser('${obj._id}')">Delete Product</button> 
    </li>`;
}
// Function to remove a user
function removeUser(productId) {
    axios.delete(`https://crudcrud.com/api/8ad5c56de7d945adaf79243f4d2c9653/appointmentData/${productId}`)
        .then((response) => {
            removeUserFromScreen(productId);
        })
        .catch((error) => {
            console.log(error);
        });
}

// Function to remove user data from screen
function removeUserFromScreen(productId) {
    const parentElement = document.getElementById('productDetails');
    const deletedElement = document.getElementById(productId);
    if (deletedElement) {
        parentElement.removeChild(deletedElement);
    }
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
