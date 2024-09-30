let events = JSON.parse(localStorage.getItem('events')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('eventForm')) {
        document.getElementById('eventForm').addEventListener('submit', createEvent);
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

    if (document.getElementById('deleteEventForm')) {
        document.getElementById('deleteEventForm').addEventListener('submit', handleDeleteEvent);
    }

    // Setup sidebar toggle functionality
    if (document.getElementById('sidebar-toggle')) {
        document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
    }

    if (document.getElementById('close-sidebar')) {
        document.getElementById('close-sidebar').addEventListener('click', toggleSidebar);
    }

    document.getElementById('searchEventForm').addEventListener('submit', searchEvent);
    document.getElementById('modifyEventForm').addEventListener('submit', modifyEvent);
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

        resultElement.innerHTML = trimmedData;
        resultElement.style.color = trimmedData.includes('successful') ? 'green' : 'red';
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('resultMessage');
        resultElement.textContent = 'An unexpected error occurred.';
        resultElement.style.color = 'red';
    });
}

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
            resultElement.innerHTML = 'Login successful! <a href="index2.html">Go to Head Interface</a>';
            resultElement.style.color = 'green';
        } else {
            resultElement.textContent = trimmedData;
            resultElement.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('resultMessage');
        resultElement.textContent = 'An unexpected error occurred.';
        resultElement.style.color = 'red';
    });
}

function createEvent(e) {
    e.preventDefault();

    const eventStartDate = document.getElementById('eventStartDate').value;
    const eventEndDate = document.getElementById('eventEndDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventOrganizer = document.getElementById('eventOrganizer').value;
    const eventName = document.getElementById('eventName').value;
    const eventDescription = document.getElementById('eventDescription').value;
    const eventCategory = document.getElementById('eventCategory').value;
    const eventWhoCanRegister = Array.from(document.getElementById('eventWhoCanRegister').selectedOptions).map(option => option.value);
    const eventDuration = document.getElementById('eventDuration').value;
    const eventOrganizerEmail = document.getElementById('eventOrganizerEmail').value;
    const eventOrganizerPhone = document.getElementById('eventOrganizerPhone').value;

    const eventThumbnail = document.getElementById('eventThumbnail').files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem('eventThumbnail', event.target.result);
    };
    reader.readAsDataURL(eventThumbnail);

    const formData = new FormData();
    formData.append('eventStartDate', eventStartDate);
    formData.append('eventEndDate', eventEndDate);
    formData.append('eventTime', eventTime);
    formData.append('eventVenue', eventVenue);
    formData.append('eventOrganizer', eventOrganizer);
    formData.append('eventName', eventName);
    formData.append('eventDescription', eventDescription);
    formData.append('eventCategory', eventCategory);
    formData.append('eventWhoCanRegister', eventWhoCanRegister.join(', '));
    formData.append('eventDuration', eventDuration);
    formData.append('eventOrganizerEmail', eventOrganizerEmail);
    formData.append('eventOrganizerPhone', eventOrganizerPhone);

    fetch('create-event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Event created successfully!');
        window.location.href = 'index2.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to create event.');
    });
}

function displayFutureEvents() {
    const today = new Date();
    const futureEvents = events.filter(event => new Date(event.date) > today);
    const eventList = document.getElementById('futureEventsList');
    eventList.innerHTML = '';

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

function searchEvent(e) {
    e.preventDefault();
    const searchName = document.getElementById('eventSearchInput').value;

    fetch('modify-events.php', {
        method: 'POST',
        body: new URLSearchParams({ searchName })
    })
    .then(response => response.json())
    .then(events => {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';  // Clear previous results

        if (events.length > 0) {
            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.innerHTML = `
                    <p><strong>${event.event_name}</strong> - ${event.event_organizer}</p>
                    <button onclick="populateEventForm(${event.event_id}, '${event.event_name}', '${event.event_organizer}', '${event.event_venue}', '${event.event_start_date}', '${event.event_end_date}', '${event.event_time}', '${event.event_duration}', '${event.event_organizer_email}', '${event.event_organizer_phone}')">Modify</button>
                `;
                searchResults.appendChild(eventDiv);
            });
        } else {
            searchResults.innerHTML = 'No events found matching your search';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('searchResults').textContent = 'An error occurred while searching.';
    });
}

function populateEventForm(eventId, eventName, eventOrganizer, eventVenue, eventStartDate, eventEndDate, eventTime, eventDuration, eventOrganizerEmail, eventOrganizerPhone) {
    document.getElementById('eventName').value = eventName;
    document.getElementById('eventOrganizer').value = eventOrganizer;
    document.getElementById('eventVenue').value = eventVenue;
    document.getElementById('eventStartDate').value = eventStartDate;
    document.getElementById('eventEndDate').value = eventEndDate;
    document.getElementById('eventTime').value = eventTime;
    document.getElementById('eventDuration').value = eventDuration;
    document.getElementById('eventOrganizerEmail').value = eventOrganizerEmail;
    document.getElementById('eventOrganizerPhone').value = eventOrganizerPhone;

    document.getElementById('modifyEventForm').style.display = 'block';
    document.getElementById('modifyEventForm').dataset.eventId = eventId;
}

function modifyEvent(e) {
    e.preventDefault();

    const formData = new URLSearchParams(new FormData(document.getElementById('modifyEventForm')));
    formData.append('eventId', document.getElementById('modifyEventForm').dataset.eventId);

    fetch('modify-events.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data.includes('successfully')) {
            window.location.href = 'index2.html';
        }
    })
    .catch(error => console.error('Error:', error));
}

function handleDeleteEvent(e) {
    e.preventDefault();
    
    const formData = new FormData(document.getElementById('deleteEventForm'));

    fetch('delete-event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = data;

        const deleteMoreCheckbox = document.getElementById('deleteMore');
        if (deleteMoreCheckbox) {
            deleteMoreCheckbox.addEventListener('change', function() {
                const additionalOptions = document.getElementById('additionalOptions');
                if (this.checked) {
                    additionalOptions.innerHTML = "<p><a href='delete-event.html'>Delete more events</a></p>";
                } else {
                    additionalOptions.innerHTML = "<p><a href='index2.html'>Go to Home</a></p>";
                }
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const searchResults = document.getElementById('searchResults');
        searchResults.textContent = 'An unexpected error occurred.';
    });
}

// Function to toggle the sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';  // Hide the sidebar
        body.classList.remove('sidebar-open'); // Optionally remove any additional styles
    } else {
        sidebar.style.left = '0px';  // Show the sidebar
        body.classList.add('sidebar-open'); // Optionally add styles for open state
    }
}
