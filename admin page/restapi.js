 
 function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
      price: event.target.price.value,
      productname: event.target.productname.value,
  };

  // Save data on server
  axios.post(
      "https://crudcrud.com/api/bf68443395db42719c2e189ffc002dd1/appointmentData",
      userDetails
  )
  .then(response => {
      displayProductOnScreen(response.data);
  })
  .catch(error => {
      console.error(error);
  });

  // Clearing the input fields
  event.target.reset();
}

function displayProductOnScreen(productDetails) {
  const productItem = document.createElement("li");
  productItem.textContent = `${productDetails.price} - ${productDetails.productname}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete Product";
  productItem.appendChild(deleteBtn);

  const productList = document.querySelector("ul");
  productList.appendChild(productItem);

  // Delete data from server and screen
  deleteBtn.addEventListener("click", () => {
      const productId = productDetails._id; // Assuming id is present in product details
      axios.delete(`https://crudcrud.com/api/bf68443395db42719c2e189ffc002dd1/appointmentData/${productId}`)
          .then(() => {
              productList.removeChild(productItem);
              updateTotalValue(-productDetails.price); // Update total value after deletion
          })
          .catch(error => {
              console.error(error);
          });
  });
 
updateTotalValue(parseFloat(productDetails.price));

}
 

function updateTotalValue(price) {
    // Get the <h4> element where total value will be displayed
    const totalValueElement = document.querySelector('h4');
    
    // Get the current total value from the element's inner HTML
    let currentValueText = totalValueElement.textContent.split(':')[1].trim();
    
    // Parse the current value as a float, if possible
    let currentValue = parseFloat(currentValueText.replace('Rs ', ''));
    
    // Check if currentValue is a valid number, if not, set it to 0
    if (isNaN(currentValue)) {
      currentValue = 0;
    }
    
    // Add the new price to the current total value
    currentValue += price;
    
    // Update the inner HTML of the <h4> element with the new total value
    totalValueElement.textContent = `Total Value Worth of Product: Rs ${currentValue}`;
}

window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/bf68443395db42719c2e189ffc002dd1/appointmentData")
      .then(response => {
          console.log(response);
          for (const product of response.data) {
              displayProductOnScreen(product);
          }
      })
      .catch(error => {
          console.error(error);
      });
});
