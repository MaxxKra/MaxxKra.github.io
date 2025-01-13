---
title: HACS - den Home Assistant Community Store installieren
subtitle: Installiere HACS in Home Assistant OS
description: Eine Anleitung wie man HACS in Home Assistant OS installiert
tags: [Home Assistant, HACS]
show_sidebar: false
layout: page
---

<div class="guide-container">

<div id="custom-alert" style="display: none;">
    <div id="custom-alert-content">
        <h4 id="custom-alert-title"></h4>
        <p id="custom-alert-message"></p>
        <button id="close-alert">OK</button>
    </div>
</div>
<div id="custom-decision" style="display: none;">
    <div id="custom-decision-content">
        <h4 id="custom-decision-title"></h4>
        <p id="custom-decision-message"></p>
        <ul id="custom-decision-list"></ul>
        <p id="custom-decision-question" style="font-weight: bold; margin-top: 10px;">
            Möchtest du die Verarbeitung fortsetzen?
        </p>
        <button id="decision-yes">Ja</button>
        <button id="decision-no">Nein</button>
    </div>
</div>
<div style="margin: 0 auto; max-width: 60%;">
    {% include youtube.html video="j54-l1iPa6g" %}
</div>
<br>
<h1 class="custom-title">HACS in Home Assistant OS installieren</h1>
<br>
<p>
    Wenn du Home Assistant als OS, also als Betriebssystem installiert hast, kann der Home Assistant Community Store (HACS) relativ einfach installiert werden.
</p>
<br>
<h4>Was wird dafür benötigt:</h4>

<ul class="styled-list-start">
    <li>Zugriff auf dein Home Assistant als Administrator</li>
    <li>Die IP Adresse deines Home Assistant Systems</li>
    <li>Ein Github Account</li>
    <li>Einen Downloadlink zur HACS Installation</li>
</ul>
<br>
<p>
    Wenn du noch keinen Github Account hast, kannst du mit folgendem Link, kostenlos einen erstellen.<br>
    Folge dazu auf der Seite den Anweisungen nach dem Klick auf <strong>Sign up</strong>
</p>
<button class="custom-button" onclick="window.open('https://github.com', '_blank');">Link zu Github</button>
<br>
<br>
<p>
    Nachdem der Github Account eingerichtet ist, klicke auf folgenden Link um die Installation von HACS zu starten
</p>
<button class="custom-button" onclick="window.open('https://my.home-assistant.io/redirect/_change/?redirect=supervisor_addon%2F%3Faddon%3Dcb646a50_get%26repository_url%3Dhttps%253A%252F%252Fgithub.com%252Fhacs%252Faddons', '_blank');">Link zur HACS Installation</button>
<br>
<br>
<p>
    Im Fenster auf der geöffneten Seite, gib die IP-Adresse deines Home Assistant Systems gefolgt von <strong>:8123</strong> ein und klicke auf <strong>Save</strong>.
</p>
<p>
    Danach kontrolliere nocheinmal die IP-Adresse und bestätige mit <strong>Open link</strong>
</p>
<p>
    Es öffnet sich dein Home Assistant und hier erscheint ein Fenster mit der Frage <strong>"Bist du sicher?"</strong>. Diese kannst du mit <strong>OK</strong> beantworten.
</p>
<p>
    Nun wird das "Get HACS" Addon angezeigt. Hier auf <strong>INSTALLIEREN</strong> klicken und nach der Installation "Beim Booten starten" einschalten. Das Addon starten und im Protokoll auf die Fertigstellungsmeldung warten.<br>
    Danach Home Assistant neu starten.
</p>
<p>
    Nach dem Neustart gehe auf <strong>Einstellungen - Geräte & Dienste</strong> und klicke rechts unten auf <strong>Integration hinzufügen</strong>. Suche nach HACS, wähle es aus, bestätige im folgendem Fenster die angeführten Hinweise und beände mit einem Klick auf <strong>OK</strong>.
</p>
<p>
    Nun kopiere dir den angeführten Schlüssel (key) und öffne den Link. Log dich mit deinem Github Account ein, fügen den Schlüssel ein, klicke auf <strong>Continue</strong> und danach auf <strong>Authorize hacs</strong>.
</p>

<p>
    Zurück auf Home Assistant ist der Home Assistant Community Store fertig installiert und eingerichtet.<br>
    Wenn in der Seitenleiste das Symbol fehlen sollte, kann es mit einem Refresh des Browsers behoben werden.
</p>
<br>
<h3 class="custom-title">Danke und gutes Gelingen!</h3>

{% include support_note.html %}
</div>



<style>
    .guide-container {
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

    .content-section {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }

    .content-section h2 {
        color: #5bacff;
        font-size: 1.75em;
        margin-bottom: 10px;
    }

    .content-section ul {
        margin: 10px 0 0 20px;
        padding: 0;
        list-style-type: disc;
    }

    .content-section ul li {
        margin-bottom: 10px;
    }

    .guide-footer {
        text-align: center;
    }
    /* Wichtiges Hinweis-Container */
    .important-container {
        background-color: rgb(255, 255, 255);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid rgb(255, 0, 0);
    }
    .important-container h3 {
        color: #d12700;
        font-weight: bold;
        text-shadow: 0 0 1px rgb(0, 0, 0);
    }
    .important-container p {
        color: #383838;
        font-family: Arial Black;
    }
    .important-container strong {
        color:rgb(255, 0, 0);
        text-transform: uppercase;
    }
    /* Hinweise */
    .note-container {
        background-color: rgb(255, 255, 255);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 8px solid #0062ff;
    }
    .note-container h3 {
        color: #0062ff;
        font-weight: bold;
        text-shadow: 0 0 1px rgb(0, 0, 0);
    }
    .note-container p {
        color: #383838;
    }
    .note-container strong {
        color: #0062ff;
        text-transform: uppercase;
    }
    /* Titel und Untertitel */
    .custom-title, .custom-subtitle {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    /* Beschreibungstext */
    .description-text {
        margin: 15px 0;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
    }
    #custom-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Dunkles Overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    #custom-alert-content {
        background-color: #fff;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        animation: fadeIn 0.3s ease-in-out;
    }
    #custom-alert-title {
        margin-bottom: 10px;
        font-size: 18px;
        color: #333;
        font-weight: bold;
    }
    #custom-alert-message {
        margin-bottom: 15px;
        font-size: 16px;
        color: #666;
    }
    #close-alert {
        background-color: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    #close-alert:hover {
        background-color: #218838;
    }
    /* Animation */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    #custom-decision {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }    
    #custom-decision-content {
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
        max-width: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }    
    #custom-decision h4 {
        margin: 0 0 10px;
    }    
    #custom-decision p {
        margin: 0 0 20px;
    }    
    #custom-decision button {
        margin: 0 5px;
        padding: 10px 20px;
        border: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        border-radius: 5px;
    }    
    #custom-decision button:hover {
        background-color: #0056b3;
    }
    #custom-decision-list {
        text-align: left;
        max-height: 300px;
        overflow-y: auto;
        margin: 10px 0;
        padding: 0;
        list-style: none;
    }    
    #custom-decision-list li {
        margin: 5px 0;
    }
    #custom-decision-question {
        font-size: 1.1em;
        text-align: center;
        margin-top: 10px;
    }
    .custom-title-inline {
        display: flex; /* Elemente nebeneinander anordnen */
        align-items: baseline; /* Ausrichtung an der Grundlinie */
        gap: 10px; /* Abstand zwischen den Elementen */
    }    
    .custom-title-inline h4 {
        margin: 0;
        padding: 0;
        font-size: 24px; /* Größere Schriftgröße für die Überschrift */
        line-height: 1.2; /* Für saubere vertikale Ausrichtung */
    }    
    .custom-title-inline p {
        margin: 0;
        padding: 0;
        font-size: 16px; /* Kleinere Schriftgröße für den Text */
        line-height: 1.2; /* Passend zur `h4` */
    }

    .dropdown {
        margin: 20px 0;
        text-align: center;
    }

    .dropdown-toggle {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        background-color: #f39c12;
        color: #ffffff;
        padding: 10px 5px;
        border: none;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: inline-block;
    }

    .dropdown-toggle.rotated {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg); /* Text von unten nach oben */
        padding: 20px 30px;
        width: 200px;
        height: auto;
    }

    .dropdown-toggle span {
        float: right;
    }

    .dropdown-content {
        padding: 20px;
        background-color: #1a1a1a;
        border: 1px solid #f39c12;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    /* Formulareingabefelder und Buttons */
    .custom-form-group {
        margin-top: 20px;
    }
    .custom-label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .custom-input, .custom-button, select {
        width: 100%;
        background-color: #e9e9e9;
        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
        border: 1px solid #c9c9c9;
    }
    .custom-button {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .custom-button:hover {
        background-color: #45a049;
    }
    /* Tabellen für Kalender- und Sensorkonfigurationen */
    .custom-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .custom-table th, .custom-table td {
        border: 1px solid #c9c9c9;
        padding: 8px;
        text-align: center;
        vertical-align: middle;
    }
    .custom-table select {
        vertical-align: middle;
    }
    /* Code Container */
    .code-container {
        position: relative;
        background-color: #e9e9e9;
        border: 1px solid #c9c9c9;
        border-radius: 5px;
        padding: 15px;
        margin-top: 5px;
        margin-bottom: 30px;
        overflow: auto;
        max-height: 300px;
    }
    .code-container code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 0.95em;
        line-height: 1.5;
        color: #333;
    }
    /* Stil für den Copy-Button */
    .copy-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: #007acc;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 0.85em;
        cursor: pointer;
        z-index: 10;
    }
    .copy-button:hover {
        background: #005a9c;
    }
    .copy-button.copied {
        background: #72dd8b; /* Grüner Hintergrund */
        color: white;       /* Weiße Schrift */
        content: '✔️';      /* Symbol */
        padding: 8px 12px;
    }
    /* Button Container */
    .button-container {
        text-align: center;
        margin-top: 25px;
    }        /* Styling für die Auswahllisten */
    .custom-select-group {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* Überschriften werden oben ausgerichtet */
        margin-top: 30px;
        gap: 20px;
    }
    .styled-list-start {
        counter-reset: list-counter; /* Initialisiert den Zähler */
        padding-left: 0; /* Entfernt Einrückung */
        margin: 20px 0; /* Abstand zur Umgebung */
    }

    .styled-list-start li {
        counter-increment: list-counter; /* Erhöht den Zähler */
        position: relative;
        margin: 10px 30px; /* Abstand zwischen den Einträgen */
        font-size: 1em;
        line-height: 1.6;
        color: #333; /* Dunkler Text */
        background-color: #fff; /* Neutraler Hintergrund */
        border-left: 3px solid #007acc; /* Farbliche Linie am linken Rand */
        border-radius: 6px; /* Leicht abgerundete Kanten */
        padding: 10px 60px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Leichter Schatten für visuelle Tiefe */
        width: 90%;
    }

    .styled-list-start li::before {
        content: counter(list-counter); /* Fügt die Nummerierung hinzu */
        position: absolute;
        left: 10px; /* Platzierung der Nummer links */
        top: 50%; /* Vertikale Ausrichtung */
        transform: translateY(-50%);
        font-weight: bold;
        color: #007acc; /* Gleiche Farbe wie die Linie */
        font-size: 1.2em;
        background-color: #e6f3ff; /* Heller Hintergrund für die Nummer */
        padding: 5px 15px;
        border-radius: 50%; /* Rundes Design für die Nummerierung */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Leichter Schatten für Nummer */
        text-align: center;
    }

</style>

<script>
    function copyCode(elementId, button) {
        const codeElement = document.getElementById(elementId);
        const codeText = codeElement.innerText || codeElement.textContent;

        navigator.clipboard.writeText(codeText)
            .then(() => {
                // Ändert den Button-Text und Stil
                button.classList.add('copied');
                button.textContent = "Kopiert ✔️";
            })
            .catch(err => {
                console.error("Fehler beim Kopieren des Codes: ", err);
                alert("Beim Kopieren des Codes ist ein Fehler aufgetreten.");
            });
    }
</script>
