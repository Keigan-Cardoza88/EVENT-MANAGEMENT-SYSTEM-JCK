var firebaseConfig = {
    apiKey: "AIzaSyBJ8195XWTLdVSpiuF9tXT27LgJhT8hxkk",
    authDomain: "eventsyncdb.firebaseapp.com",
    databaseURL: "https://eventsyncdb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eventsyncdb",
    storageBucket: "eventsyncdb.appspot.com",
    messagingSenderId: "284286225167",
    appId: "1:284286225167:web:f3528f45449e790d49cc7a"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var db = firebase.database()

function event_details_save() {
    var eventDate = document.getElementById("eventDate").value
    var eventTime = document.getElementById("eventTime").value
    var eventVenue = document.getElementById("eventVenue").value
    var eventOrganizer = document.getElementById("eventOrganizer").value
    var eventName = document.getElementById("eventName").value
    var eventDescription = document.getElementById("eventDescription").value
    var eventCategory = document.getElementById("eventCategory").value
    var eventWhoCanRegister = document.getElementById(eventWhoCanRegister).value

    db.ref("Event_Details/" + eventName).set({
        eventDate : eventDate,
        eventTime : eventTime,
        eventVenue : eventVenue,
        eventOrganizer : eventOrganizer,
        eventDescription : eventDescription,
        eventCategory : eventCategory
    })
    alert("Event Has Been Saved :)")
}