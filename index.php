<?php
    include "db-connection.php";
?>
<?php


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management JCK</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo" style="font-weight: 750;"><span style="color: rgb(0, 0, 0);">DBIT</span> EventSync</div>
        <nav class="navBar">
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="login.php">Sign In</a></li>
                <li><a href="sign-up.php">Sign Up</a></li>
            </ul>
        </nav>
    </header>
    <!-- Hero Section -->
    <section class="hero">
        <div class="overlay"></div>
        </div>
        <div class="content">
            <h1 id="bold" style="color:rgb(0, 0, 0); text-shadow: 2px 2px 2px rgb(255, 255, 255);">Plan, Organize & Manage Events with Ease</h1>
            <p id="para" style="color: rgb(0, 0, 0); font-weight: 750;">Your gateway to seamless event management</p>
            <button id="cta-button" onclick="window.location.href='create-event.html'">Create Event</button>
        </div>
    </section>

    <!-- Main Content Section -->
    <section class="about">
        <div class="container">
            <h2>Why Choose EventSync?</h2>
            <p>We provide the best tools to manage all your events smoothly, allowing you to focus on what really matters. From Festival events to Competion events, we have got you covered.</p>
            <div class="features">
                <div class="feature-box">
                    <h3>Easy Setup</h3>
                    <p>Quickly set up your event with our user-friendly platform.</p>
                </div>
                <div class="feature-box">
                    <h3>Real-Time Updates</h3>
                    <p>Receive live updates about your ongoing events anytime.</p>
                </div>
                <div class="feature-box">
                    <h3>Customizable Options</h3>
                    <p>Tailor each event to your needs with customizable features.</p>
                </div>
            </div>
        </div>
    </section>

    <script src="scripts.js"></script>
       
</body>
</html>
