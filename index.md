---
title: Smart Home Bastler
subtitle: Schritt für Schritt ins smarte Zuhause!
layout: page
show_sidebar: true
meeting_title: "2025.2"
meeting_date: "13-02-2025"  # Eingabe im DD-MM-YYYY Format
meeting_time: "18:00"       # Eingabe im HH:mm Format
---
<div class="page-content">
<h1 style="text-align: center;">Herzlich willkommen auf meiner<br>Home Assistant<br>Code Website</h1>
<br>
<p style="text-align: center;">
    Auf dieser Website dreht sich alles um Code-Snippets, Codegeneratoren und Code-Vorlagen für die Einrichtung, die Erweiterung und das Design von Home Assistant.<br>
</p>
<p style="text-align: center;">
    Viel Spaß beim Schmökern, Testen und Designen.
</p>
<br>
<p style="text-align: center;">
    Beste Grüße, Maxx
</p>
<br>
<div style="margin: 20px 0;">
    <h2 style="text-align: center;">Einladung zum {{ page.meeting_title }} Home Assistant-Treffen in Linz<br>
    am <span id="meetingDay" style="margin: 0;"></span> um {{ page.meeting_time }} Uhr</h2>
</div>

<div id="countdown-container" style="text-align: center; padding: 20px;">
    <h2 id="countdown-title" style="color: orange; font-family: 'Keania One', sans-serif;">Das Treffen beginnt in:</h2>
    <div style="display: flex; justify-content: center; align-items: center; padding: 20px;" id="countdown-fields">
        <div id="days-container" style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Keania One', sans-serif;">
            <div id="days" style="font-size: 64px;">00</div>
            <div style="font-size: 20px;">Tagen</div>
        </div>
        <div id="hours-container" style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Keania One', sans-serif;">
            <div id="hours" style="font-size: 64px;">00</div>
            <div style="font-size: 20px;">Stunden</div>
        </div>
        <div id="minutes-container" style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Keania One', sans-serif;">
            <div id="minutes" style="font-size: 64px;">00</div>
            <div style="font-size: 20px;">Minuten</div>
        </div>
    </div>
</div>


<h2 style="text-align: center;">Liebe Home Assistant-Enthusiasten,</h2>
<p style="text-align: center;">
    ich möchte mich herzlich für eure Teilnahme am letzten Treffen bedanken. Eure rege Beteiligung und die inspirierenden Gespräche haben dazu beigetragen, dass unsere Community weiter gewachsen ist. Vielen Dank für euer Engagement!
</p>
<p style="text-align: center;">
    Ich freue mich, euch bereits zum nächsten Treffen einzuladen.<br> 
    Bitte notiert euch den Termin für das {{ page.meeting_title }} – Home Assistant Treffen:
</p>
<div style="background-color: black; padding: 20px;">
    <div style="display: flex; padding: 20px; margin: 0;">
        <div style="flex: 1; color: white; padding: 20px; margin-right: 20px;">
            <h3 style="margin: 0; color: orange;">Termin:</h3>
            <p id="meetingDayDetails" style="margin: 0;"></p>
            <p style="margin: 0;">Uhrzeit: {{ page.meeting_time }} Uhr</p>            
            <h3 style="margin: 10px 0 0; color: orange;">Ort:</h3>
            <p style="margin: 0;">Gemeinschaftszentrum Auweisen</p>
            <p style="margin: 0;">Wüstenrotplatz 2</p>
            <p style="margin: 0;">4030 Linz Auweisen</p>            
            <p style="margin: 10px 0 0;">WIFI und Strom vorhanden</p>
        </div>
        <div style="flex: 2; padding: 20px;">
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe class="gmap_iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=450&amp;hl=en&amp;q=4030%20Linz%20Wüstenrotplatz%203&amp;t=h&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                </div>
                <style>
                    .mapouter {
                        position: relative;
                        text-align: right;
                        width: 100%; /* Volle Breite */
                        height: 450px; /* Feste Höhe */
                    }
                    .gmap_canvas {
                        overflow: hidden;
                        background: none!important;
                        width: 100%; /* Volle Breite */
                        height: 450px; /* Feste Höhe */
                    }
                    .gmap_iframe {
                        width: 100%!important; /* Volle Breite */
                        height: 450px!important; /* Feste Höhe */
                    }
                </style>
            </div>
        </div>
    </div>
</div>
</div>
<style>
    .page-content {
        max-width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #1a1a1a;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        border: 1px solid #1598b3;
        border-radius: 8px;
        box-shadow: 0 4px 4px 6px #1598b380;
    }
</style>

<script>
    function updateMeetingDate() {
        // Parse the meeting date in DD-MM-YYYY format
        var dateParts = "{{ page.meeting_date }}".split("-");
        var meetingDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

        // Format the date in German
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var meetingDayFormatted = meetingDate.toLocaleDateString('de-DE', options);

        // Update meetingDay placeholders
        document.getElementById("meetingDay").innerHTML = meetingDayFormatted;
        var detailsElement = document.getElementById("meetingDayDetails");
        if (detailsElement) {
            detailsElement.innerHTML = meetingDayFormatted;
        }
    }

    function startCountdown() {
        // Parse the meeting date in DD-MM-YYYY format
        var dateParts = "{{ page.meeting_date }}".split("-");
        var timeParts = "{{ page.meeting_time }}".split(":");
        var meetingDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
        var countDownDate = meetingDate.getTime();

        // Update the countdown every 1 second
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            // Update fields dynamically
            if (distance > 0) {
                document.getElementById("countdown-title").innerHTML = "Das Treffen beginnt in:";
                document.getElementById("days-container").style.display = days > 0 ? "block" : "none";
                document.getElementById("hours-container").style.display = hours > 0 ? "block" : "none";
                document.getElementById("minutes-container").style.display = minutes > 0 ? "block" : "none";

                document.getElementById("days").innerHTML = days;
                document.getElementById("hours").innerHTML = hours;
                document.getElementById("minutes").innerHTML = minutes;
            } else {
                clearInterval(x);
                document.getElementById("countdown-title").innerHTML = "Wir basteln bereits an unserem Home Assistant.<br>Stoße dazu und bastle mit!";
                document.getElementById("countdown-fields").style.display = "none";
            }
        }, 1000);
    }

    // Ensure scripts run after DOM is fully loaded
    document.addEventListener("DOMContentLoaded", function () {
        updateMeetingDate();
        startCountdown();
    });
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gugi&family=Keania+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
