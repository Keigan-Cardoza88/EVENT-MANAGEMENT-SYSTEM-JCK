// Handle dropdown display for account login options
document.addEventListener("DOMContentLoaded", function() {
    const accountButton = document.querySelector('.account-button');
    const dropdownContent = document.querySelector('.dropdown-content');

    accountButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown if clicked outside
    window.onclick = function(event) {
        if (!event.target.matches('.account-button')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    }
});

// Redirection logic for account login buttons based on user type
function handleLoginRedirect(accountType) {
    let loginUrl = '';
    
    switch (accountType) {
        case 'user':
            loginUrl = 'user_dashboard.html';
            break;
        case 'head':
            loginUrl = 'head_dashboard.html';
            break;
        case 'faculty':
            loginUrl = 'faculty_dashboard.html';
            break;
    }

    // Redirect to the respective dashboard based on account type
    window.location.href = loginUrl;
}

// Bind the login buttons to their respective account dashboards
document.addEventListener('DOMContentLoaded', function() {
    const loginButtons = document.querySelectorAll('.login-options button');
    const userButton = loginButtons[0];
    const headButton = loginButtons[1];
    const facultyButton = loginButtons[2];

    // Attach click event listeners to buttons
    userButton.addEventListener('click', function() {
        handleLoginRedirect('user');
    });

    headButton.addEventListener('click', function() {
        handleLoginRedirect('head');
    });

    facultyButton.addEventListener('click', function() {
        handleLoginRedirect('faculty');
    });
});

// Form handling and submission logic for event creation (Head account)
document.addEventListener('DOMContentLoaded', function() {
    const createEventForm = document.querySelector('form');

    if (createEventForm) {
        createEventForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way
            
            const formData = new FormData(createEventForm);
            const url = createEventForm.action;

            // Send form data to the backend via a POST request
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    alert('Event created successfully!');
                    window.location.href = 'head_dashboard.html';
                } else {
                    alert('There was an error creating the event.');
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        });
    }
});

// Approval or rejection logic for faculty event approval
document.addEventListener('DOMContentLoaded', function() {
    const approvalForms = document.querySelectorAll('.event form');

    approvalForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            const formData = new FormData(form);
            const url = form.action;

            // Send the approval form data to the backend via POST
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    alert('Event status updated successfully!');
                    window.location.reload(); // Reload the page to reflect changes
                } else {
                    alert('There was an error updating the event status.');
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
