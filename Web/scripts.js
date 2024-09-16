// Import Firebase modules (using ES6 modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ8195XWTLdVSpiuF9tXT27LgJhT8hxkk",
    authDomain: "eventsyncdb.firebaseapp.com",
    databaseURL: "https://eventsyncdb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eventsyncdb",
    storageBucket: "eventsyncdb.appspot.com",
    messagingSenderId: "284286225167",
    appId: "1:284286225167:web:f3528f45449e790d49cc7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("Firebase initialized", app); // app should not be undefined or null


// Function to save event details
function event_details_save() {
    // Collecting form data
    var eventDate = document.getElementById("eventDate").value;
    var eventTime = document.getElementById("eventTime").value;
    var eventVenue = document.getElementById("eventVenue").value;
    var eventOrganizer = document.getElementById("eventOrganizer").value;
    var eventName = document.getElementById("eventName").value;
    var eventDescription = document.getElementById("eventDescription").value;
    var eventCategory = document.getElementById("eventCategory").value;
    var eventWhoCanRegister = document.getElementById("eventWhoCanRegister").value;

    // Log the form values to ensure they are captured correctly
    console.log({
        eventDate,
        eventTime,
        eventVenue,
        eventOrganizer,
        eventName,
        eventDescription,
        eventCategory,
        eventWhoCanRegister
    });

    // Firebase database reference
    const eventRef = ref(db, "Event_Details/" + eventName);

    // Saving data to Firebase
    set(eventRef, {
        eventDate: eventDate,
        eventTime: eventTime,
        eventVenue: eventVenue,
        eventOrganizer: eventOrganizer,
        eventDescription: eventDescription,
        eventCategory: eventCategory
    })
    .then(() => {
        // If the data was saved successfully, show a success message
        alert("Event has been saved!");
        console.log("Event saved successfully!");
    })
    .catch((error) => {
        // Log the error if saving failed
        alert("Failed to save event: " + error.message);
        console.error("Error saving event:", error);
    });
}
