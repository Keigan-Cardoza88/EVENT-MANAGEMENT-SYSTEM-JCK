// Placeholder to store events from localStorage
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

// Handle sign-up form submission
function handleSignUp(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('signUpForm'));

    // Send data to the PHP script
    fetch('sign-up.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('Sign-Up Response:', data); // Log the response for debugging
        alert(data); // Display the response from PHP
        if (data.trim() === 'Registration successful') {
            document.getElementById('signUpForm').reset(); // Clear the form
            window.location.href = 'head-index.php'; // Redirect on success
        }
    })
    .catch(error => console.error('Error:', error)); // Log any errors
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('loginForm'));

    // Send data to the PHP script
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('Login Response:', data); // Log the response for debugging
        alert(data); // Display the response from PHP
        if (data.trim() === 'Login successful') {
            document.getElementById('loginForm').reset(); // Clear the form
            window.location.href = 'head-index.php'; // Redirect on success
        }
    })
    .catch(error => console.error('Error:', error)); // Log any errors
}

// Function to create an event
function createEvent(e) {
    e.preventDefault();

    const eventDate = new Date(document.getElementById('eventDate').value);
    const eventTime = document.getElementById('eventTime').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventOrganizer = document.getElementById('eventOrganizer').value;
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventCategory = document.getElementById('eventCategory').value;
    const eventThumbnail = document.getElementById('eventThumbnail').files[0].name;
    const eventWhoCanRegister = Array.from(document.getElementById('eventWhoCanRegister').selectedOptions).map(option => option.value);

    const newEvent = {
        id: Date.now(), // Unique ID for each event
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        organizer: eventOrganizer,
        name: eventName,
        description: eventDescription,
        category: eventCategory,
        thumbnail: eventThumbnail,
        whoCanRegister: eventWhoCanRegister
    };

    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));  // Save events to localStorage

    alert('Event created successfully!');
    window.location.href = 'index.html'; // Redirect after creating the event
}

// Function to display ongoing events
function displayOngoingEvents() {
    const today = new Date();
    const ongoingEvents = events.filter(event => new Date(event.date).toDateString() === today.toDateString());
    const eventList = document.getElementById('ongoingEventsList');
    eventList.innerHTML = ''; // Clear existing list

    ongoingEvents.forEach(event => {
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
