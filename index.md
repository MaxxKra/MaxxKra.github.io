---
title: Smart Home Bastler
subtitle: Schritt für Schritt ins smarte Zuhause!
layout: page
show_sidebar: true
meeting_title: "2025.02"
meeting_date: "10-01-2025"  # Eingabe im DD-MM-YYYY Format
meeting_time: "18:00"       # Eingabe im HH:mm Format
---

# Herzlich willkommen auf meiner Home Assistant Code Website

Auf dieser Website dreht sich alles um Code-Snippets, Codegeneratoren und Code-Vorlagen für die Einrichtung, die Erweiterung und das Design von Home Assistant.
Viel Spaß beim Schmökern, Testen und Designen.

Beste Grüße, Maxx

<div style="margin: 20px 0;">
    <h2>Einladung zum {{ page.meeting_title }} Home Assistant-Treffen in Linz<br>
    am <span id="meetingDay"></span> um {{ page.meeting_time }} Uhr</h2>
</div>

<div id="countdown-container" style="text-align: center; padding: 20px;">
    <h2 id="countdown-title" style="color: orange; font-family: 'Keania One', sans-serif;">Das Treffen beginnt in:</h2>
    <div style="display: flex; justify-content: center; align-items: center; padding: 20px;" id="countdown-fields">
        <div id="days-container" style="flex: 1; background-color: black; padding: 20px; margin: 0 5px; text-align: center; color: orange; font-family: 'Keania One', sans-serif;">
            <div id="days" style="font-size: 64px;">00</div>
            <div style="font-size: 20px;">Tage</div>
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

<script>
    // Parse the meeting date in DD-MM-YYYY format
    var dateParts = "{{ page.meeting_date }}".split("-");
    var timeParts = "{{ page.meeting_time }}".split(":");
    var meetingDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);

    // Set the date we're counting down to
    var countDownDate = meetingDate.getTime();

    // Get the day of the week from the date
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById("meetingDay").innerHTML = meetingDate.toLocaleDateString('de-DE', options); // Wochentag anzeigen

    // Update the countdown every 1 second
    var x = setInterval(function() {
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
            document.getElementById("countdown-title").innerHTML = "Das Treffen hat bereits begonnen!";
            document.getElementById("countdown-fields").style.display = "none";
        }
    }, 1000);
</script>

## Liebe Home Assistant-Enthusiasten,

ich möchte mich herzlich für eure Teilnahme am letzten Treffen bedanken. Eure rege Beteiligung und die inspirierenden Gespräche haben dazu beigetragen, dass unsere Community weiter gewachsen ist. Vielen Dank für euer Engagement!

Ich freue mich, euch bereits zum nächsten Treffen einzuladen. Bitte notiert euch den Termin für das {{ page.meeting_title }} – Home Assistant Treffen:

<div style="background-color: black; padding: 20px;">
    <div style="display: flex; padding: 20px; margin: 0;">
        <div style="flex: 1; color: white; padding: 20px; margin-right: 20px;">
            <h3 style="margin: 0; color: orange;">Termin:</h3>
            <span id="meetingDay"></span>
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

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gugi&family=Keania+One&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
