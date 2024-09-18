let events = JSON.parse(localStorage.getItem('events')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('eventForm')) {
        document.getElementById('eventForm').addEventListener('submit', createEvent);
    }

    if (document.getElementById('ongoingEventsList')) {
        displayOngoingEvents();
    }

    if (document.getElementById('signUpForm')) {
        document.getElementById('signUpForm').addEventListener('submit', handleSignUp);
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }

    if (document.getElementById('futureEventsList')) {
        displayFutureEvents();
    }
});


function handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('signUpForm'));

    fetch('sign-up-handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const trimmedData = data.trim();
        const resultElement = document.getElementById('resultMessage');

        // Display the message returned from the PHP script
        resultElement.innerHTML = trimmedData;
        resultElement.style.color = trimmedData.includes('successful') ? 'green' : 'red'; // Set color based on success or failure
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('resultMessage');
        resultElement.textContent = 'An unexpected error occurred.';
        resultElement.style.color = 'red';
    });
}




// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('loginForm'));

    fetch('login-handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const trimmedData = data.trim();
        const resultElement = document.getElementById('resultMessage');

        if (trimmedData === 'Login successful') {
            // Display a clickable URL instead of redirecting
            resultElement.innerHTML = 'Login successful! <a href="index2.html">Go to Homepage</a>';
            resultElement.style.color = 'green'; // Change color for success message
        } else {
            // Show the error message on the page
            resultElement.textContent = trimmedData;
            resultElement.style.color = 'red'; // Highlight error
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('resultMessage');
        resultElement.textContent = 'An unexpected error occurred.';
        resultElement.style.color = 'red';
    });
}





// Function to create an event with AJAX and localStorage for thumbnail
function createEvent(e) {
    e.preventDefault();

    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventOrganizer = document.getElementById('eventOrganizer').value;
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventCategory = document.getElementById('eventCategory').value;
    const eventWhoCanRegister = Array.from(document.getElementById('eventWhoCanRegister').selectedOptions).map(option => option.value);

    // Save the thumbnail to localStorage
    const eventThumbnail = document.getElementById('eventThumbnail').files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem('eventThumbnail', event.target.result); // Store the thumbnail as a base64 string in localStorage
    };
    reader.readAsDataURL(eventThumbnail);

    // Create a FormData object to send the form data via AJAX
    const formData = new FormData();
    formData.append('eventDate', eventDate);
    formData.append('eventTime', eventTime);
    formData.append('eventVenue', eventVenue);
    formData.append('eventOrganizer', eventOrganizer);
    formData.append('eventName', eventName);
    formData.append('eventDescription', eventDescription);
    formData.append('eventCategory', eventCategory);
    formData.append('eventWhoCanRegister', eventWhoCanRegister.join(', ')); // Convert array to string

    // Send the form data to PHP using fetch (AJAX)
    fetch('create-event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Event created successfully!');
        window.location.href = 'index2.html'; // Redirect after successful creation
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to create event.');
    });
}

// Function to display future events
function displayFutureEvents() {
    const today = new Date();
    const futureEvents = events.filter(event => new Date(event.date) > today);
    const eventList = document.getElementById('futureEventsList');
    eventList.innerHTML = ''; // Clear existing list

    futureEvents.forEach(event => {
        const eventBlock = document.createElement('div');
        eventBlock.classList.add('event-block');
        eventBlock.innerHTML = `
            <img src="${event.thumbnail}" alt="${event.name} Thumbnail">
            <h2>${event.name}</h2>
            <p>${event.description}</p>
            <button onclick="showEventDetails(${event.id})">View Details</button>
            <button onclick="deleteEvent(${event.id})">Delete</button>
        `;
        eventList.appendChild(eventBlock);
    });
}

// Function to show event details
function showEventDetails(eventId) {
    const event = events.find(event => event.id === eventId);
    if (event) {
        alert(`
            Event Name: ${event.name}
            Date: ${new Date(event.date).toLocaleDateString()}
            Time: ${event.time}
            Venue: ${event.venue}
            Organizer: ${event.organizer}
            Description: ${event.description}
            Category: ${event.category}
            Who Can Register: ${event.whoCanRegister.join(', ')}
        `);
    } else {
        alert('Event not found!');
    }
}

// Function to delete an event
function deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this event?')) {
        // Remove the event from the array
        events = events.filter(event => event.id !== eventId);
        // Update localStorage
        localStorage.setItem('events', JSON.stringify(events));
        // Reload the page to refresh the event list
        location.reload();
    }
}
