---
title: Müllerinnerungs Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Müllerinnerungs Codegeneratoren
description: Details und Infos zu den Müllerinnerungs Codegeneratoren
show_sidebar: false
layout: page 
---

{% include support_note.html %}

<div class="ics-container">
    <h1 class="ics-header">ICS Code Generator</h1>
    <p class="ics-intro">
        Der ICS Code Generator ermöglicht das Hochladen, Bearbeiten und Zusammenführen von ICS-Kalenderdateien.
    </p>    
    <!-- Abschnitt: Dateien hochladen -->
    <section class="ics-section">
        <h2>1. ICS-Dateien hochladen oder abrufen</h2>
        <p>
            Lade bis zu sechs <code>.ics</code>-Dateien hoch oder gib die URL einer Datei an. 
            Klicke anschließend auf <button class="ics-btn">ICS Datei(en) verarbeiten</button>.
        </p>
        <ul>
            <li>Option 1: Datei direkt vom Computer hochladen.</li>
            <li>Option 2: URL einer Kalenderdatei angeben.</li>
            <li>Automatische Prüfung auf problematische Einträge.</li>
        </ul>
    </section>
    <!-- Abschnitt: Datei bearbeiten -->
    <section class="ics-section">
        <h2>2. Datei anzeigen und bearbeiten</h2>
        <p>
            Nach der Verarbeitung werden die Kalenderdaten in einem Textbereich angezeigt. 
            Bearbeite sie bei Bedarf und speichere die Änderungen.
        </p>
        <ul>
            <li>Untersuche die Inhalte der Datei.</li>
            <li>Klicke auf <button class="ics-btn">Einträge bearbeiten</button>, um Ziffern oder Punkte zu entfernen.</li>
        </ul>
    </section>
    <!-- Abschnitt: Exportieren -->
    <section class="ics-section">
        <h2>3. Datei exportieren</h2>
        <p>
            Nach der Bearbeitung kannst du die Datei herunterladen oder in die Zwischenablage kopieren:
        </p>
        <ul>
            <li>Klicke auf <button class="ics-btn">Bearbeitete Datei kopieren</button>, um den Text zu speichern.</li>
            <li>Nutze <button class="ics-btn">Bearbeitete Datei herunterladen</button>, um eine neue ICS-Datei zu erstellen.</li>
        </ul>
    </section>
    <!-- Hinweis -->
    <div class="ics-note">
        <p><strong>Hinweis:</strong> Problematische Einträge werden hervorgehoben. Überprüfe diese sorgfältig!</p>
    </div>
    <!-- Footer -->
    <footer class="ics-footer">
        <p>Viel Erfolg bei der Nutzung des ICS Code Generators! 🎉</p>
    </footer>
</div>


<div class="guide-container">
  <h1 class="guide-title">Müllerinnerung Sensoren Codegenerator</h1>
  
  <section class="guide-section">
    <h2 class="section-title">1. Kalenderdaten auslesen</h2>
    <p>
      <strong>Datei hochladen oder URL eingeben:</strong><br>
      Lade deine <code>.ics</code>-Datei hoch oder gib die URL deines Müllkalenders ein. Klicke anschließend auf 
      <button class="highlight-button">Kalendereinträge extrahieren</button>.
    </p>
    <p>
      <strong>Einträge überprüfen:</strong><br>
      Die Kalendereinträge werden geladen und angezeigt.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">2. Kalenderdaten umwandeln</h2>
    <p>
      <strong>Einträge prüfen und anpassen:</strong><br>
      Wähle die Einträge aus, die du als Sensor nutzen möchtest, und passe die Bezeichnungen an. 
      Achte darauf, keine Umlaute oder Leerzeichen zu verwenden.
    </p>
    <p>
      Kontrolliere deine ausgewählten Kalendereinträge und ändere die Bezeichnungen nach deinen Wünschen.
    </p>
    <p>
      <strong>Weiter zu Sensoren:</strong><br>
      Bestätige mit 
      <button class="highlight-button">Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</button>.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">3. Sensoren Konfiguration</h2>
    <p>
      <strong>Integration installieren:</strong><br>
      Nun sollte die "Waste Collection Schedule" Integration installiert werden.<br>
      Eine Anleitung, wie genau das funktioniert, findest du im 🔽 Dropdown Menü 🔽
    </p>
    <div class="dropdown">
        <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown', this)">Waste Collection Schedule Integration und Sensor Einrichtung <span>&#9660;</span></button>
        <div id="galleryDropdown" class="dropdown-content" style="display: none;">
            {% assign gallery_images = site.data.gallery_mull_helfer %}
            <div class="columns is-multiline">
                {% for gallery in gallery_images %}
                    <div class="column is-12">
                        <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    </div>
                    {% for image in gallery.images %}
                        <div class="column is-3-desktop is-6-tablet">
                            <div class="card">
                                <div class="card-image">
                                    {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        {{ image.description | markdownify }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {% endfor %}
                {% endfor %}
            </div>
        </div>
    </div>
    <p>
      <strong>Sensoren definieren:</strong><br>
      Die Sensoren werden aus den Kalendereinträgen erstellt. Wähle für jeden Sensor die Farbe der Tonne aus. 
      Beachte: Jede Farbe darf nur einmal verwendet werden.
    </p>
    <p>
      <strong>Kopieroption:</strong><br>
      Klicke auf den Sensor-Namen, um ihn in die Zwischenablage zu kopieren.<br> 
      Kopiere dir die Werte Templates und lege die Sensoren in der WCS Integration an.
      Wenn alle Sensoren angelegt sind, klicke auf <button class="highlight-button">Sensoren angelegt? Weiter zu den Templates!</button>.
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">4. Templates erstellen</h2>
    <p>
      <strong>Optionen festlegen:</strong><br>
      Entscheide, ob die Meldungen <em>"Keine Tonne rausstellen"</em> angezeigt werden sollen. 
      Aktiviere hierfür die Checkboxen für "Heute" und/oder "Morgen".
    </p>
    <p>
      <strong>Templates generieren:</strong><br>
      Um die Templates zu generieren, klicke auf <button class="highlight-button">Templates erstellen</button>.<br>
      Die Templates für die Müllabholungen werden erstellt. Kopiere die Überschriften mit einem Klick darauf und die YAML-Templates mithilfe der 
      <button class="highlight-button">Copy</button>-Buttons.
    </p>
    <p>
      <strong>Helfer Templates anlegen</strong><br>
      Gehe in Home Assistant auf <strong>Einstellungen</strong> - <strong>Geräte&Dienste</strong> - <strong>Helfer</strong><br>
      Lege dort die 4 Helfer Templates an. Eine detaillierte Beschreibung findest du im 🔽 Dropdown Menü 🔽.
    </p>
    <div class="dropdown">
        <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown2', this)">Home Assistant - Template Sensor Helfer anlegen <span>&#9660;</span></button>
        <div id="galleryDropdown2" class="dropdown-content" style="display: none;">
            {% assign gallery_images = site.data.gallery_helfer_Template_mullerinnerung %}
            <div class="columns is-multiline">
                {% for gallery in gallery_images %}
                    <div class="column is-12">
                        <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    </div>
                    {% for image in gallery.images %}
                        <div class="column is-3-desktop is-6-tablet">
                            <div class="card">
                                <div class="card-image">
                                    {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        {{ image.description | markdownify }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {% endfor %}
                {% endfor %}
            </div>
        </div>
    </div>
    <p>
      Wenn die Templates angelegt sind, klicke auf <button class="highlight-button">Templates angelegt? Weiter zu den Dashboard-Karten</button>.<br>  
    </p>
  </section>

  <section class="guide-section">
    <h2 class="section-title">5. Dashboard-Karten</h2>
    <p>
      <strong>Vorbereitung:</strong><br>
      Stelle sicher, dass die <strong>"Custom Button Card"</strong> installiert ist und die Tonnenbilder im Ordner <code>www/muell</code> gespeichert sind.<br>
      Die Bilder der einzelnen Tonnen, kannst du dir mit einem Klick auf das Vorschaubild herunterladen.
    </p>
    <p>
      <strong>Kartenoptionen:</strong><br>
      Wähle Schriftarten, Darstellung und Animationseffekte. Passe den Stil der Karte optional an (z. B. Hintergrund, Rahmen).
    </p>
    <p>
      <strong>Code generieren:</strong><br>
      Klicke auf 
      <button class="highlight-button">Beispiel anzeigen & Code generieren</button>, um den YAML-Code und die Vorschaukarten zu erstellen.
    </p>
    <p>
      <strong>Karte am Dashboard einfügen</strong><br>
      Kopiere dir den YAML-Code und gehe in Home Assistant auf dein Dashboard.<br>
      Erstelle eine neue Karte und suche nach <strong>Manuell</strong>. Nun füge den kopierten Code ein und klicke auf Speichern.
    </p>
  </section>

  <footer class="guide-footer">
    <h2>Viel Erfolg bei der Einrichtung! 🎉</h2>
  </footer>
</div>

<style>
    .ics-container {
        max-width: 100%;
        margin-bottom: 100px;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        line-height: 1.6;
    }

    .ics-header {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 20px;
    }

    .ics-intro {
        text-align: center;
        color: #555;
        margin-bottom: 20px;
    }

    .ics-section {
        margin-bottom: 30px;
    }

    .ics-section h2 {
        color: #4CAF50;
        font-size: 1.5em;
        margin-bottom: 10px;
    }

    .ics-section ul {
        margin: 10px 0 0 20px;
        padding: 0;
        list-style-type: disc;
    }

    .ics-section ul li {
        margin-bottom: 10px;
    }

    .ics-btn {
        background-color: #4CAF50;
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
    }

    .ics-btn:hover {
        background-color: #45a049;
    }

    .ics-note {
        margin-top: 20px;
        padding: 15px;
        background-color: #ff9982;
        border: 1px solid #ff0000;
        border-radius: 8px;
    }

    .ics-note p {
        color: #383838;
        font-weight: bold;
        margin: 0;
    }

    .ics-footer {
        text-align: center;
        margin-top: 20px;
        color: #555;
        font-size: 1.1em;
    }


    body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    margin: 0;
    padding: 20px;
    }
    .guide-container {
    max-width: 100%;
    margin: auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .guide-title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    }
    .guide-section {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    }
    .section-title {
    color: #4CAF50;
    font-size: 1.4em;
    margin-bottom: 10px;
    }
    p {
    margin: 10px 0;
    }
    .highlight-button {
    background: #4CAF50;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    }
    .highlight-button:hover {
    background: #45a049;
    }
    code {
    background: #f4f4f4;
    padding: 2px 4px;
    border-radius: 4px;
    }
    .guide-footer {
    text-align: center;
    margin-top: 20px;
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
        background-color: #ffffff;
        border: 1px solid #f39c12;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
</style>

<script>
    function toggleDropdown(dropdownId, toggleButton) {
        var dropdownContent = document.getElementById(dropdownId);
        if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
            dropdownContent.style.display = "block";
            toggleButton.classList.add("rotated"); // Klasse hinzufügen
        } else {
            dropdownContent.style.display = "none";
            toggleButton.classList.remove("rotated"); // Klasse entfernen
        }
    }
</script>


