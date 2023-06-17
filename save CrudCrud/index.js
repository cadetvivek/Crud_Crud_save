// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
  
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
  
    // Create data object
    var data = {
      name: name,
      email: email,
      number: number
    };
  
    // Get existing data from local storage
    var existingData = JSON.parse(localStorage.getItem('formData')) || [];
  
    // Add new data to existing data
    existingData.push(data);
  
    // Store updated data in local storage
    localStorage.setItem('formData', JSON.stringify(existingData));
  
    // Clear form inputs
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('number').value = '';
  
    // Refresh data list
    displayData();
  }
  
  // Function to display data from local storage and API
  function displayData() {
    var dataList = document.getElementById('dataList');
    dataList.innerHTML = '';
  
    // Get data from local storage
    var storedData = JSON.parse(localStorage.getItem('formData')) || [];
  
    // Iterate over stored data and create list items
    storedData.forEach(function(item, index) {
      var li = document.createElement('li');
      li.innerHTML = `
        <span><strong>Name:</strong> ${item.name}</span><br>
        <span><strong>Email:</strong> ${item.email}</span><br>
        <span><strong>Phone:</strong> ${item.number}</span><br>
        <button class="editButton" data-index="${index}">Edit</button>
        <button class="deleteButton" data-index="${index}">Delete</button>
      `;
      dataList.appendChild(li);
    });
  
    // Add event listeners to edit and delete buttons
    var editButtons = document.getElementsByClassName('editButton');
    var deleteButtons = document.getElementsByClassName('deleteButton');
  
    for (var i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', handleEdit);
      deleteButtons[i].addEventListener('click', handleDelete);
    }
  
    // Make a GET request to the CRUD API
    fetch("https://restful-booker.herokuapp.com/booking/123", {
       
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any required headers such as authentication tokens
      }
    })
      .then(response => response.json())
      .then(apiData => {
        // Combine local data and API data
        var combinedData = storedData.concat(apiData);
  
        // Clear the local storage
        localStorage.removeItem('formData');
  
        // Store the combined data in local storage
        localStorage.setItem('formData', JSON.stringify(combinedData));
  
        // Refresh data list to include API data
        displayData();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  
  // Rest of your code...
  
  // Display existing data on page load
  displayData();
  