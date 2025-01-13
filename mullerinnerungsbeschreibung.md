---
title: Müllerinnerungs Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Müllerinnerungs Codegeneratoren
description: Details und Infos zu den Müllerinnerungs Codegeneratoren
show_sidebar: false
layout: page 
---


<div class="ics-container">
    <h1 class="main-header" style="color: #1598b3; font-size: 2.5em;">Müllerinnerung Tools</h1>
    <p class="main-intro" style="color:#d8d8d8; font-size: 1em;">
        Die Müllerinnerung Tools ermöglichen es, Müllabholungen effizient zu planen, Kalenderdaten zu bearbeiten, Sensoren zu konfigurieren und Dashboards sowie Pop-Up-Karten in Home Assistant zu erstellen. Alles an einem Ort für deine perfekte Organisation!
    </p>
</div>
<div class="ics-container">
    <h1 class="ics-header">1. ICS Code Generator</h1>
    <p class="ics-intro">
        Der ICS Code Generator ermöglicht das Hochladen und Zusammenführen von ICS-Kalenderdateien.
    </p> 
    <!-- Abschnitt: Dateien hochladen -->
    <section class="content-section">
        <h2>1. ICS-Dateien hochladen, auslesen oder zusammenführen</h2>
        <p>
            Lade bis zu sechs <code>.ics</code>-Dateien hoch. 
            Klicke anschließend auf <button class="ics-btn">ICS Datei(en) verarbeiten</button>.
        </p>
        <ul>
            <li>Option 1: Datei direkt vom Computer hochladen.</li>
            <li>Option 2: Kalendereinträge auslesen</li>
            <li>Option 3: Mehrere ICS-Dateien zu einem zusammenführen</li>
            <li>Automatische Prüfung auf problematische Einträge.</li>
        </ul>
    </section>
    <!-- Abschnitt: Datei bearbeiten -->
    <section class="content-section">
        <h2>2. Datei anzeigen und kontrollieren</h2>
        <p>
            Nach der Verarbeitung werden die Kalenderdaten in einem Textbereich angezeigt. 
            Kontrolliere sie und speichere die Änderungen.
        </p>
        <ul>
            <li>Untersuche die Inhalte der Datei.</li>
            <li>Klicke auf <button class="ics-btn">Einträge bearbeiten</button>, um Ziffern oder Punkte zu entfernen.</li>
        </ul>
    </section>
    <!-- Abschnitt: Exportieren -->
    <section class="content-section">
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
        <h3>Viel Erfolg bei der Nutzung des ICS Code Generators! 🎉</h3>
    </footer>
</div>

<div class="ics-container">
    <h1 class="ics-header">2. Eigenen ICS Kalender erstellen</h1>
    <p class="ics-intro">
        Mit diesem Tool <strong>Eigene ICS erstellen</strong> kann ein Kalender mit eigenem Namen, frei definierten Event-Namen und Ereignisdatum erstellt werden. 
    </p>    
    <!-- Abschnitt: Dateien hochladen -->
    <section class="content-section">
        <h2>Funktionsweise</h2>
        <ul>
            <li>1: Trage einen Namen bei <strong>Kalendername</strong> ein</li>
            <li>2: Vergib einen Namen für dein Ereignis bei <strong>Eventname</strong></li>
            <li>3: Wähle ein Datum für das Ereignis oder trage es ein</li>
            <li>4: Klicke auf <strong>Event hinzufügen</strong></li>
        </ul>
        <p>
            Mit jedem Klick wird ein weiteres Event nach deinen Angaben hinzugefügt.
        </p>
        <p>
            Nach Fertigstellung deiner Eingaben kannst du die Datei herunterladen
        </p>
    </section>
    <!-- Footer -->
    <footer class="ics-footer">
        <h3>Viel Erfolg beim Erstellen deines ICS Kalenders! 🎉</h3>
    </footer>
</div>

<div class="ics-container">
  <h1 class="ics-header">3. Müllerinnerung Sensoren Codegenerator</h1>
  
  <section class="content-section">
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

  <section class="content-section">
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

  <section class="content-section">
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
                    <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                        {{ gallery.subtitle | markdownify }}
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

  <section class="content-section">
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
                        {% include youtube.html video="3fhL_K4o3Dg" %}
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

  <section class="content-section">
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

<section class="content-section">
    <h2 class="section-title">6. Pop-Up Karte</h2>
    <p>
        Die Pop-Up Karte zeigt Müllabholungen prominent an und blendet dazu ein individuelles Pop-Up ein. 
        Diese Funktion hilft, wichtige Informationen direkt auf dem Dashboard sichtbar zu machen.
    </p>
    <h3>6.1 Hintergrundbild hinzufügen</h3>
    <p>
        Für das Pop-Up wird ein Hintergrundbild benötigt:
    </p>
    <ul>
        <li>Lade das <strong>Hintergrundbild</strong> herunter.</li>
        <li>Speichere es in Home Assistant unter <code>www/muell</code>.</li>
        <li>Vergewissere dich, dass das Bild vor der Einrichtung des Pop-Ups gespeichert ist, um Cache-Probleme zu vermeiden.</li>
    </ul>
    <h3>6.2 Helfer erstellen</h3>
    <p>
        Für die Pop-Up Karte werden zwei Helfer benötigt:
    </p>
    <ul>
        <li><strong>Müllerinnerung Taster:</strong> Zum manuellen Auslösen des Pop-Ups.</li>
        <li><strong>Müllerinnerung Zeitplan:</strong> Zum automatischen Öffnen des Pop-Ups anhand eines Zeitplans.</li>
    </ul>
    <p>
        Lege die Helfer mit den entsprechenden Namen in Home Assistant an. Detaillierte Anleitungen dazu findest du im
    </p>
    <div class="dropdown">
        <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown4', this)">Helfer-Zeitplan einrichten <span>&#9660;</span></button>
        <div id="galleryDropdown4" class="dropdown-content" style="display: none;">
            {% assign gallery_images = site.data.gallery_helfer_zeitplan %}
            <div class="columns is-multiline">
                {% for gallery in gallery_images %}
                    <div class="column is-12">
                        <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                        <div style="margin: 0 auto; max-width: 60%;">
                            {% include youtube.html video="_oR8JQHNYqY" %}
                        </div>
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
    <h3>6.3 YAML-Code für das Pop-Up generieren</h3>
    <p>
        Generiere den Code für das Pop-Up basierend auf deinen Einstellungen:
    </p>
    <ul>
        <li>Wähle die Anzeige für <strong>Heute</strong> oder <strong>Morgen</strong>.</li>
        <li>Klicke auf <button class="highlight-button">Pop-Up erstellen</button>, um den YAML-Code zu generieren.</li>
        <li>Kopiere den Code in die Zwischenablage.</li>
    </ul>
    <h3>6.4 Pop-Up Karte auf Dashboards einfügen</h3>
    <p>
        Füge die Pop-Up Karte auf deinen Home Assistant Dashboards hinzu:
    </p>
    <ul>
        <li>Erstelle eine neue Karte.</li>
        <li>Wähle den Typ <strong>Manuell</strong>.</li>
        <li>Füge den kopierten YAML-Code ein und speichere die Änderungen.</li>
    </ul>
    <h3>6.5 Browser Mod und Browser ID einrichten</h3>
    <p>
        Um das Pop-Up nur auf bestimmten Geräten anzuzeigen, richte die Browser ID ein:
    </p>
    <ul>
        <li>Installiere die <strong>Browser Mod Integration</strong>.</li>
        <li>Registriere die Browser, auf denen das Pop-Up erscheinen soll.</li>
        <li>Weise den Browsern eine ID zu.</li>
    </ul>
    <p>
        Weitere Informationen findest du im 
    </p>
    <div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown5', this)">Browser Mod und Browser ID einrichten <span>&#9660;</span></button>
        <div id="galleryDropdown5" class="dropdown-content" style="display: none;">
            {% assign gallery_images = site.data.gallery_browser_mod_id %}
            <div class="columns is-multiline">
                {% for gallery in gallery_images %}
                    <div class="column is-12">
                        <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    </div>
                    <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                        {{ gallery.subtitle | markdownify }}
                        <div style="margin: 0 auto; max-width: 60%;">
                            {% include youtube.html video="_GxgMv0LSLI" %}
                        </div>
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
    <div id="browserModDropdown" class="dropdown-content" style="display: none;">
        <p>Video- und Bildanleitungen zur Einrichtung von Browser Mod und Browser ID.</p>
    </div>
    <h3>6.6 Automatisierung erstellen</h3>
    <p>
        Damit das Pop-Up automatisch angezeigt wird, lege eine Automatisierung an:
    </p>
    <ul>
        <li>Lade das bereitgestellte <strong>Blueprint</strong> herunter und installiere es in Home Assistant.</li>
        <li>Erstelle eine Automatisierung mit dem Namen <strong>Müllerinnerung Pop-Up</strong>.</li>
        <li>Verknüpfe die Automatisierung mit dem <strong>Müllerinnerung Taster</strong> und dem <strong>Müllerinnerung Zeitplan</strong>.</li>
    </ul>
</section>


  <footer class="guide-footer">
    <h3>Viel Erfolg bei der Einrichtung! 🎉</h3>
    <br>
    {% include support_note.html %}
  </footer>


</div>

<style>

    .main-header {
        text-align: center;
        color: #1598b3;
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    .main-intro {
        text-align: center;
        color: #a9a9a9;
        margin-bottom: 20px;
        font-size: 1em
    }
    .ics-container {
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

    .ics-header {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 20px;
    }

    .ics-intro {
        text-align: center;
        color: #a9a9a9;
        margin-bottom: 20px;
    }

    .content-section {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }

    .content-section h2 {
        color: #4CAF50;
        font-size: 1.5em;
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
    }

    .guide-container {
    max-width: 100%;
    margin: auto;
    padding: 20px;
    background-color: #1a1a1a;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 4px 6px rgba(255, 255, 255, 0.3);
    }

    .guide-title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
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
        background-color: #1a1a1a;
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


