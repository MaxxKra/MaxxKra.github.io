---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
tags: [Home Assistant, Abfallerinnerung, Müllerinnerung, Waste Collection Schedule, Codegenerator, ics Kalender]
show_sidebar: false
layout: page
---
<div class="guide-container">
<h1 class="custom-title">Müllerinnerung Code-Generator</h1>
<br>
<p>
    Mit diesem Code-Generator hast du die Möglichkeit, deine Müllerinnerung vom Anlegen des Kalenders über das Einrichten der Sensoren und Templates bis hin zur Dashboard- und Pop-Up- Karte durchzuführen.
</p>
<!-- Wichtiger Hinweis -->
<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Bevor du startest stelle sicher, dass die hier angeführten Hinweise vorhanden / eingerichtet sind!
    </p>
    <p>
        Ebenfalls ist zu beachten, dass derzeit nur ICS Dateien und ICS-URLs für den Codegenerator genutzt werden können.
    </p>
</div>
<br>
<h4>Was muss vor der Bearbeitung mit dem Code-Generator vorbereitet werden:</h4>

<ul class="styled-list-start">
    <li>Herunterladen und installieren der <strong>Waste Collection Schedule</strong> in HACS</li>
    <li>Anlegen eines <strong>muell</strong> Ordners im <strong>config/www/</strong> Ordner</li>
    <li>Bereitstellung einer ICS Datei oder URL</li>
</ul>
<br>
<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('noISCdropdown', this)">
        Was mache ich, wenn ich keine ICS Datei oder URL habe? <span>&#9660;</span>
    </button>
    <div id="noISCdropdown" class="dropdown-content" style="display: none; padding: 10px; text-align: left; line-height: 1.5;">
        <h3><strong>Verwendung des Codegenerators ohne ICS Datei oder URL</strong></h3>
        <p>
            Wenn du keine ICS Datei oder eine URL zur Einrichtung deines Kalenders in der <strong>Waste Collection Schedule</strong> hast, kannst du den Codegenerator mit einem kleinen Trick trotzdem nutzen.
        </p>
        <p>
            Da in der neuen <strong>Waste Collection Schedule</strong> Integration, die Namen der einzelnen Abholungen frei vergeben werden können, kannst du dir zur Nutzung des Codegenartors eine Helfer-ICS Datei anlegen.
        </p>
        <ol>
            <li>Gehe im Menü <strong>Müllerinnerung Tools</strong> auf <strong>ICS zusammenführen / erstellen</strong></li>
            <li>Wähle die Checkbox <strong>Eigen ICS erstellen</strong></li>
            <li>Trage einen frei gewählten Kalendernamen ein</li>
            <li>Trage einen Eventnamen ein, welcher einem deiner Mülltypen / Abholungen entspricht (z.B. Restabfall)</li>
            <li>Wähle ein Eventdatum (dieses hat keine Relevanz im Codegenerator)</li>
            <li>Klicke auf <strong>Event hinzufügen</strong></li>
        </ol>
        <p>
            Es wird ein Kalender mit deinem Kalendernamen und deinem Eventnamen erstellt.<br>
            Für jede weitere deiner Abholungen (unterschidliche Mülltypen) trage einen neuen Eventnamen und ein Datum ein und bestätige immer mit <strong>Event hinzufügen</strong>
        </p>
        <p>
            Wenn deine Einträge für jeweils einen deiner Mülltypen abgeschlossen sind, klicke auf <strong>Erstellten Kalender herunterladen.</strong>
        </p>
        <p>
            Nun kannst du diesen heruntergeladenen Kalender für den Codegenerator verwenden.
        </p>
        <p>
            <strong>Hinweis:</strong> Verwende für deine Eventnamen (Mülltypen) keine Umlaute und vermeide Leerzeichen. Nimm nur die Allgemeine Bezichnung deiner Mülltypen ohne den Zusatz "Tonne", ausnahme z.B. Gelber Sack oder Gelbe Tonne. 
        </p>
        <p>
            <strong>Viel Erfolg! 🎉</strong>
        </p>
    </div>
</div> 

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
<br>
<button class="custom-button" onclick="showStep(1);">Hinweise gelesen! Vorbereitungen getroffen! Bereit zu starten!</button>
<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ███ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         ██ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██         ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██ 
-->

<div class="content-section" id="step-1" style="display:none;">
<h2 class="custom-title">1. Kalenderdaten Auslesen</h2>

<p>
    Zum Auslesen der verschiedenen Abholungen aus deinem Müllkalender, gib bitte deine URL an oder lade die ICS-Datei hoch und bestätige mit<br>
    <strong>Kalendereinträge extrahieren</strong>.
</p>

<!-- File Upload and URL Input -->
<div class="custom-form-group">
    <label for="icsFile" class="custom-label">ICS-Datei hochladen</label>
    <input type="file" id="icsFile" class="custom-input" accept=".ics" />
</div>

<div class="custom-form-group">
    <label for="calendarUrl" class="custom-label">oder ICS-URL eingeben</label>
    <input type="url" id="calendarUrl" class="custom-input" placeholder="https://example.com/kalender.ics" />
</div>

<button class="custom-button" onclick="extractEntries(); showStep(2);">Kalendereinträge extrahieren!</button>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██      
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
-->

<div class="content-section" id="step-2" style="display:none;">
<h2 class="custom-title">2. Kalenderdaten Umwandeln</h2>

<p>Im nächsten Schritt wähle jene Einträge aus, welche zu deinen Sensoren hinzugefügt werden sollen.<br> 
Zusätzlich hast du die Möglichkeit individuelle Bezeichnungen zu vergeben.
</p>

<div id="umlaut-warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Deine persönlichen Bezeichnungen dürfen keine Umlaute enthalten und Leerzeichen sollen vermieden werden!
    </p>
</div>
<!-- Warnungscontainer -->
<div id="warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Deine Kalender enthält ungültige Einträge wie z.B. <strong>Ä, Ö, Ü, Leerzeichen oder Sonderzeichen </strong>.<br>
        Diese Einträge sollten unbedingt ohne diese Zeichen angepasst werden, um Fehler zu vermeiden.<br>
        Am Besten korrigierst du diese hier über die <strong>Eigenen Bezeichnungen</strong> und in der Waste Collection Schedule gleichermaßen über die <strong>Mülltypen (Alias-Namen)</strong>. 
    </p>
</div>
<div id="url-warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Wenn das Laden der Daten deiner URL nicht funktioniert, wurde die Anfrage von dieser Seite vermutlich abgelehnt.<br>
        In diesem Fall, lade dir die ICS Datei lokal auf deinen Rechner und füge sie als Datei in den Codegenerator ein, um mit der Codeerstellung fortzufahren.<br>
        In der Waste Collection Schedule kannst du versuchen, die URL trotzdem zu verwenden.
    </p>
</div>
<p>
    Wähle deine Bezeichnung so, dass sie kurz und sinnvoll ist. Es ist nicht notwendig, das Wort <strong>Tonne</strong> in die Bezeichnung aufzunehmen, da dies automatisch vom Codegenerator ergänzt wird. 
</p>
<p>
    Beispiel: Aus der Bezeichnung <strong>Papier</strong> wird automatisch <strong>die Papier Tonne</strong>.
</p>
<p>
    Eine Ausnahme bilden <strong>Gelbe Tonne</strong> und <strong>Gelber Sack</strong>, da diese ohne den Zusatz nicht eindeutig wären.
</p>
<p>
Nach den Änderungen klicke auf<br>
<strong>Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</strong>
</p>

<table class="custom-table" id="entry-table">
    <thead>
        <tr>
            <th>Auswählen</th>
            <th>Kalendereintrag</th>
            <th>Eigene Bezeichnung</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->
    </tbody>
</table>

<p>
Es kommt häufig vor, dass Kalendereinträge nicht nur die einfachen Namen sonder mit zusätzlichem Text versehen sind.<br>
In solch einem Fall, kann im nächsten Schritt die eigene Bezeichnung auch als Alias in der Waste Collection Schedule angelegt werden.
</p>

<div id="confirm-step-2" style="text-align: center; margin-top: 20px;">
    <button class="custom-button" onclick="handleStepTransition();">Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ██████  
-->

<div class="content-section" id="step-3" style="display:none;">
<h2 class="custom-title">3. Sensoren Konfiguration</h2>

<p>
    Wenn du eine ICS Datei verwendest, sollte an diesem Punkt diese Datei in deinem <strong>www/muell/</strong> Ordner abgelegt werden.
</p>

<p>
    Nun kann die bereits installierte Integration <strong>Waste Collection Schedule</strong> in Home Assistant - Geräte & Dienste eingerichtet werden.<br>
    Eine detaillierte Beschreibung wie diese einzurichten ist, findest du im <strong>⬇️ Dropdown Menü ⬇️</strong>
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
<h4>Was kann in der Waste Collection Schedule Integration eingerichtet werden:</h4>

<ul class="styled-list-start">
    <li><strong>Kalender</strong> - Anlegen deines Abfallkalenders mittels ICS, URL oder Abfall App</li>
    <li><strong>Mülltypen</strong> - Änderung der Bezeichnungen deiner einzelnen Abholungen (Alias Namen)</li>
    <li><strong>Sensor Nächste Abholung</strong> - Ein Sensor welche die nächste Abholung als Status ausgibt</li>
    <li><strong>Sensor einzelne Abholung</strong> - Sensoren für jeden einzelnen Mülltyp mit "heute", "morgen" oder "in Tragen"</li>
    <li><strong>Sensor Datum</strong> - Sensoren welche das Datum der nächsten Abholung einzelner Mülltypen ausgibt</li>
</ul>
<br>
<p>
    Nun müssen den Sensoren bzw. Abholungen die Tonnenfarben zugeordnet werden.<br>
    Wichtig ist, dass <strong>keine</strong> Farbe zweimal verwendet werden darf.
</p>

<p>
    Mit einem Klick auf den Sensor-Namen in der Tabelle wird dieser in die Zwischenablage kopiert.<br>
    Kopierte Einträge werden mit einem ✔️ gekennzeichnet.<br>
    Dann den Sensor-Namen zusammen mit dem Werte-Template in die Waste Collection Schedule eintragen.
</p>

<h3 class="custom-subtitle" id="sensor-header" style="display:none;">Anzulegende Sensoren und Mülltypen</h3>

<table class="custom-table" id="sensor-table" style="display:none;">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th>Kopiert</th>
            <th>Entity ID</th>
            <th>Tonnen Farbe</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->
    </tbody>
</table>

<h3 class="custom-subtitle" id="template-header" style="display:none;">Werte Templates Sensoren</h3>

<div id="code-output-next" style="display:none;">
    <h4>Werte Template Nächste Abholung</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('next-pickup-template', this)">Kopieren</button>
        <pre id="next-pickup-template" class="language-yaml"><code></code></pre>
    </div>
    <h4>Werte Template einzelne Abholungen</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('individual-pickup-template', this)">Kopieren</button>
        <pre id="individual-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>

<h3 class="custom-subtitle" id="date-sensor-header" style="display:none;">Optionale Datum Sensoren</h3>

<p>
    Wenn du das Datum der einzelnen Abholung benötigst, kannst du dir diesen Sensor ebenfalls anlegen.<br>
    Nutze dazu den Sensor Namen mit dem Zusatz <strong>Datum</strong>, kopiere ihn mit einem Klick aus der Liste 
    und lege diesen Sensor zusammen mit dem <strong>Werte Template Datum einzelne Abholungen</strong> in der Waste Collection Schedule an.
</p>

<table class="custom-table" id="date-sensor-table" style="display: none;">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th>Kopiert</th>
            <th>Entity ID</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->    
    </tbody>
</table>

<div id="code-output-date" style="display:none;">
    <h4>Werte Template Datum einzelne Abholungen</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('date-pickup-template', this)">Kopieren</button>
        <pre id="date-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>
<div id="confirm-step-3" style="text-align: center; margin-top: 20px;">
    <button class="custom-button" onclick="if (validateColors()) { showStep(4); }">
        Sensoren angelegt? Weiter zu den Templates!
    </button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██   ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██   ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██             ██ 
-->

<div class="content-section" id="step-4" style="display:none;">
<h2 class="custom-title">4. Templates Erstellen</h2>

<!-- Hinweisfenster mit Beschreibung -->
<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Vor der Erstellung der Templates solltest du entscheiden, ob du den Text <strong>Du musst heute keine Tonne rausstellen!</strong> bzw. <strong>Du musst morgen keine Tonne rausstellen!</strong> angezeigt bekommen möchtest oder nicht.<br>
        Für eine Anzeige dieses Textes, aktiviere die jeweilige Checkbox ✅.
    </p>
</div>

<p>Eine Beschreibung wie man einen Template-Sensor Helfer in Home Assistant anlegt,findest du im <strong>⬇️ Dropdown Menü ⬇️</strong></p>

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown2', this)">Home Assistant - Template Sensor Helfer anlegen <span>&#9660;</span></button>
    <div id="galleryDropdown2" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_helfer_Template_mullerinnerung %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    <div style="margin: 0 auto; max-width: 60%;">
                        {% include youtube.html video="3fhL_K4o3Dg" %}
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


<!-- Checkboxen für "keine"-Anzeige -->
<div class="custom-form-group">
    <input type="checkbox" id="keineHeute" />
    <label for="keineHeute">Anzeige Text "keine" für Heute</label><br>
    <input type="checkbox" id="keineMorgen" />
    <label for="keineMorgen">Anzeige Text "keine" für Morgen</label>
</div>

<button class="custom-button" onclick="showStep(5); createTemplates()">Templates erstellen</button>

<!-- Output for "Müllabholung Heute" -->
<div id="helper-template-output-heute" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-heute', this)">Kopieren</button>
        <pre id="helper-template-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Heute" -->
<div id="helper-template-output-text-heute" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-heute', this)">Kopieren</button>
        <pre id="helper-template-text-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Output for "Müllabholung Morgen" -->
<div id="helper-template-output-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-morgen', this)">Kopieren</button>
        <pre id="helper-template-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Morgen" -->
<div id="helper-template-output-text-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-morgen', this)">Kopieren</button>
        <pre id="helper-template-text-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>
</div>
<div class="content-section" id="step-5" style="display:none;">
<button class="custom-button" onclick="showStep(6); createImageList();">Templates angelegt? Weiter zu den Dashboard-Karten!</button>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ███████ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██      
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
                                                                              
-->

<div class="content-section" id="step-6" style="display:none;">
<h2 class="custom-title">5. Dashboard-Karten</h2>

<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Bevor du die Dashboard-Karte erstellst, stelle sicher, dass die <strong>"Custom Button Card"</strong> in HACS installiert ist.<br>
        Diese Button Card ist für die korrekte Darstellung der Dashboard-Karte unbedingt notwendig.
    </p>
</div>

<p>
    Hier siehst du eine Zusammenfassung deiner Einstellungen, welche den Zusammenhang deines Sensor-Namens mit den gewählten Tonnenfarben darstellt.<br>
    Die Vorschaubilder können mit einem Klick darauf heruntergeladen werden.
</p>
<p>
    Alle Bilder sollten in Home Assistant im Ordner <strong>www/muell</strong> gespeichert werden.<br>
    <strong>Wichtig ist, dass diese vor dem Erstellen der Dashboard-Karten hinzugefügt werden!</strong>
</p>
<div id="image-list-output"></div>


<div id="example-section" style="margin-top: 20px;">
    <h3 class="custom-title">Dashboard-Karten Optionen</h3>
</div>

<div id="sensor-summary" class="sensor-summary">
    <p>
        Du hast <span id="sensor-count" style="font-weight: bold; color: #4CAF50;">0</span> Sensoren angelegt.
    </p>
</div>

<p class="description-text">
    Mit dieser Checkbox kannst du auswählen, ob die Tonne bei Abholung blinken soll.<br>
    Bei der Anzeige Auswahl wird eingestellt, ob der Text und die optional blinkende Tonne für heute oder morgen angezeigt werden soll.
</p>

<!-- Checkbox für "Tonne blinkend" -->
<div class="custom-form-group">
    <input type="checkbox" id="blinkendCheckbox">
    <label for="blinkendCheckbox">Tonne blinkend</label>
</div>

<!-- Auswahlliste für "Anzeige Heute" und "Anzeige Morgen" -->
<div class="custom-form-group">
    <label for="anzeigeAuswahl" class="custom-label">Anzeige Auswahl:</label>
    <select id="anzeigeAuswahl" class="custom-input">
        <option value="heute">Anzeige Heute</option>
        <option value="morgen">Anzeige Morgen</option>
    </select>
</div>

<p class="description-text">
    Die Dashboard-Karten wurden so konfiguriert, dass sie bis 3 Abholungen/Sensoren einzeilig und ab 5 Abholungen/Sensoren zweizeilig dargestellt werden.<br>
    Für 4 Abholungen/Sensoren kann hier entschieden werden, ob ein- oder mehrzeilig.
</p>

<!-- Auswahlliste für Darstellung -->
<div class="custom-form-group">
    <label for="darstellungAuswahl" class="custom-label">Darstellung bei 4 Abholungen/Sensoren:</label>
    <select id="darstellungAuswahl" class="custom-input">
        <option value="einzeilig">Darstellung Einzeilig</option>
        <option value="mehrzeilig">Darstellung Mehrzeilig</option>
    </select>
</div>

<!-- Checkbox für "Datum anzeigen" -->
<div class="custom-form-group">
    <label for="dateUseCheckbox" class="custom-label">Datum der Abholung anzeigen?</label>
    <input type="checkbox" id="dateUseCheckbox">
    <label for="dateUseCheckbox">Datum anzeigen</label>
</div>

<p class="description-text">
    Das Datum der Abholung kann auf der Karte nur ausgewählt werden, wenn der/die Sensor/Sensoren für diese Entität in der Waste Collection Schedule eingerichtet wurde/wurden.<br>
    Die Entität dieses Sensors soll demnach aus dem Sensor Namen der Abholung und dem Zusatz <strong>Datum</strong> bestehen.<br>
    <strong>Beispiel: "Restabfall Datum" = "sensor.restabfall_datum"</strong>
</p>

<br>

<div class="font-selection">
    <label for="fontSelection" class="custom-label">Schriftart auswählen:</label>
    <p class="description-text">Hier kann eine Schriftart für die Dashboard-Karte gewählt oder eine eigene eingetragen werden.</p>
    <select id="fontSelection" class="custom-input" onchange="toggleCustomFontInput()">
        <option value="Arial Rounded MT" selected>Arial Rounded MT (Standard)</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Custom">Eigene Schriftart</option>
    </select>
    <input type="text" id="customFontInput" class="custom-input" style="display: none; margin-top: 10px;" placeholder="Eigene Schriftart eingeben">
</div>

<!-- Checkbox für "Style anpassen" -->
<div class="custom-form-group">
    <label for="styleUseCheckbox" class="custom-label">Karten Design anpassen?</label>
    <input type="checkbox" id="styleUseCheckbox">
    <label for="styleUseCheckbox">Style ändern</label>
</div>

<!-- Versteckter Container mit 3 Auswahllisten -->
<div id="styleOptions" class="style-options">
    <div class="important-container">
        <h3>❗Wichtig</h3>
        <p>
            Wenn der Style geändert wird, muss <strong>card-mod</strong> und <strong>Vertical Stack In Card</strong> in HACS installiert werden.<br>
            Nur mit diesen Dashboard-Integrationen ist eine Änderung des Hintergrund und des Rahmens möglich.
        </p>
    </div>
    <div class="custom-select-group">
        <!-- Hintergrund -->
        <div class="custom-background-select">
            <label class="custom-label" for="backgroundSelect">Hintergrund:</label>
            <select id="backgroundSelect" class="custom-input">
                <option value="transparent">Transparent</option>
                <option value=" ">Standard</option>
            </select>
        </div>
        <!-- Rahmen Aussehen -->
        <div class="custom-border-style-select">
            <label class="custom-label" for="borderStyleSelect">Rahmen Aussehen:</label>
            <select id="borderStyleSelect" class="custom-input">
                <option value="none">Keinen Rahmen</option>
                <option value=" ">Standard Rahmen</option>
                <option value="1px solid var(--primary-color)">Dicker Rahmen Theme Farbe</option>
            </select>
        </div>
        <!-- Rahmen Form -->
        <div class="custom-border-shape-select">
            <label class="custom-label" for="borderShapeSelect">Rahmen Form:</label>
            <select id="borderShapeSelect" class="custom-input">
                <option value="0px">Eckig</option>
                <option value="12px">Abgerundet</option>
            </select>
        </div>
    </div>
</div>

<p class="description-text">
    Wenn alle Einstellungen getroffen wurden, klicke auf <strong>Beispiel anzeigen & Code generieren</strong><br>
    Du kannst nachträglich jederzeit Einstellungen ändern und den Code neu generieren.
</p>


<!-- Button zur Aktualisierung -->
<div class="button-container">
    <button id="update-example-and-code" class="custom-button">Beispiel anzeigen & Code generieren</button>
</div>


</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██       
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██    ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██████  
                                                                                    
-->

<div class="content-section" id="step-7" style="display:none;">

<div id="dashboard-options" class="dashboard-options">
    <!-- YAML-Ausgabefenster -->
    <div id="yaml-output-container" class="yaml-output-container">
        <h4 class="custom-title">Generierter YAML-Code</h4>
        <div class="yaml-code-container">
            <button class="copy-button" onclick="copyCode('yaml-code-output', this)">Kopieren</button>
            <pre id="yaml-code-output" class="language-yaml"><code></code></pre>
        </div>
    </div>
    <!-- Beispielbild -->
    <div id="example-card-container" class="example-card-container">
        <h4 class="custom-title">Beispielkarte</h4>
        <div class="example-image-wrapper">
            <img id="example-image" src="" alt="Beispielkarte">
        </div>
    </div>
</div>

<h4>Besteht noch Interesse an einer Dashboard Pop-Up Erinnerung?</h4><br>
<button class="custom-button" onclick="showStep(8);">Ja! Weiter zu der Pop-Up Karte</button>
</div>

<div class="content-section" id="step-8" style="display:none;">
<br>
<h2 class="custom-title">6. Pop-Up-Karte</h2>

<br>

<h4>Zur Anzeige eines Pop-Up auf deinem Home Assistant Dashboard sind mehrere Schritte notwendig:</h4>

<ul class="styled-list">
    <li>Herunterladen und Speichern des Hintergrund-Bilds</li>
    <li>Anlegen einer Helfer-Taste und eines Helfer-Zeitplans</li>
    <li>Erstellung des YAML-Codes für die Pop-Up Karte</li>
    <li>Speichern der Pop-Up Karte auf jedem notwendigen Dashboard</li>
    <li>Einrichtung der Browser ID via Browser_Mod</li>
    <li>Einrichtung der Automatisierung für das Pop-Up</li>
</ul>

<div id="popup-background-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.1 Hintergrund-Bild</h3>
</div>

<div class="two-column-container">
    <!-- Linke Spalte -->
    <div class="left-column">
        <p>
            Für das Pop-Up ist ein Hintergrundbild notwendig. Dieses kannst du dir hier mit einem Klick auf das Bild herunterladen und in Home Assistant in deinen <strong>"muell"</strong>-Ordner speichern.
            Achte darauf, das Bild vor dem ersten Erstellen der Dashboard-Karte abzuspeichern, da ansonsten durch den Home Assistant Cache längere Zeit Fehler angezeigt werden können.
        </p>
    </div>

    <!-- Rechte Spalte -->
    <div class="right-column">
        <a href="/img/muell/popup_background.png" download>
            <img src="/img/muell/popup_background.png" alt="Hintergrundbild für Pop-Up" style="max-width: 300px;">
        </a>
    </div>
</div>


<div id="popup-helper-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.2 Helfer anlegen</h3>
</div>
<p>
    Für das Öffnen des Pop-Ups ist ein Helfer-Taster erforderlich, und für die Automatisierung wird ein Helfer-Zeitplan benötigt.<br>
    Diese beiden Helfer tragen die Bezeichnungen <strong>Müllerinnerung Taster</strong> und <strong>Müllerinnerung Zeitplan</strong>. Sie müssen mit genau diesen Namen angelegt werden, um die Funktionalität des Pop-Ups sicherzustellen.
</p>
<p>
 Wie man die notwendigen Helfer anlegt, findest du in den folgenden ⬇️ Dropdowns ⬇️
</p>
<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown3', this)">Helfer-Taster einrichten <span>&#9660;</span></button>
    <div id="galleryDropdown3" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_helfer_taster %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    <div style="margin: 0 auto; max-width: 60%;">
                        {% include youtube.html video="7HlL8uKRyC0" %}
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
<br>
<p>
    Klicke auf den Namen eines Helfers in der Tabelle, um ihn in die Zwischenablage zu kopieren. Nach dem Kopieren wird ein ✔️ angezeigt.<br>
    Lege diese Helfer in Home Assistant an und fahre anschließend mit dem nächsten Schritt fort.
</p>

<table class="custom-table" id="helper-table">
    <thead>
        <tr>
            <th>Helfer Name</th>
            <th>Name kopiert</th>
            <th>Helfer Entity-ID</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Taster">Müllerinnerung Taster</td>
            <td class="status" id="status-taster">❌</td>
            <td>input_button.mullerinnerung_taster</td>
        </tr>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Zeitplan">Müllerinnerung Zeitplan</td>
            <td class="status" id="status-zeitplan">❌</td>
            <td>schedule.mullerinnerung_zeitplan</td>
        </tr>
    </tbody>
</table>


<div id="popup-code-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.3 Pop-Up Code erstellen</h3>
</div>

<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Soll das Pop-Up für die Abholung Morgen erinnern, muss im vorherigen Abschnitt des Codegenerators unter <strong>Anzeige Auswahl</strong> - <strong>Anzeige Morgen</strong> gewählt werden!!
    </p>
</div>
<br>
<p>
    Mit einem Klick auf <strong>Pop-Up erstellen</strong> wird der Code für das Pop-Up nach deinen zuvor gewählten Einstellungen und Angaben erstellt. 
</p>

<div class="button-container">
    <button id="popup-code" class="custom-button">Pop-Up erstellen</button>
</div>

<p>
    Den generierten Code kannst du mit <strong>Kopieren</strong> in die Zwischenablage kopieren.
</p>

<div id="popup-options" class="dashboard-options">
    <!-- YAML-Ausgabefenster -->
    <div id="popup-output-container" class="yaml-output-container">
        <h4 class="custom-title">Generierter Pop-Up-Code</h4>
        <div class="yaml-code-container">
            <button class="copy-button" onclick="copyCode('popup-code-output', this)">Kopieren</button>
            <pre id="popup-code-output" class="language-yaml"><code></code></pre>
        </div>
    </div>
    <!-- Beispielbild -->
    <div id="example-popup-container" class="example-card-container" style="display: none;">
        <h4 class="custom-title">Pop-Up Beispiel</h4>
        <div class="example-image-wrapper">
            <img id="example-popup" src="/img/muell/popupCard_example.png" alt="Pop-Up Beispiel">
        </div>
    </div>
</div>

<div id="popup-code-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.4 Pop-Up auf Dashboard speichern</h3>
</div>

<p>
    Der kopierte Pop-Up Code wird nun auf jedes Dashboard gespeichert auf welchem es agezeigt werden soll.<br>
    Dazu füge entweder eine neue Karte, einen neuen Abschnitt oder eine neue Zeile in einen Stapel hinzu und suche dann nach <strong>Manuell</strong>. <br>
    Füge hier den kopierten Code ein und bestätige mit <strong>Speichern</strong> bzw. <strong>Fertig</strong>.
</p>
<br>
<p>
    Bedenke, dass das Pop-Up nur angezeigt wird wenn der More-Info Dialog des Müllerinnerung Taster aufgerufen wird.<br>
    Um das zu erreichen, ist eine Browser ID sowie eine Automatisierung notwendig. 
</p>

<div id="popup-code-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.5 Browser ID einrichten</h3>
</div>

<p>
    Mit Browser Mod und dessen Browser ID ist es möglich, Aktionen auf Dashboards von registrierten Browsern auszuführen.<br>
    In diesem Fall geht es um das Öffnen eines Pop-Ups.<br>

    Nicht vergessen, jeden Browser zu registrieren auf welchem das Pop-Up angezeigt werden soll.
</p>
<br>
<p>
    Wie man Browser Mod und die Browser ID einrichtet, erfährst du im ⬇️ Dropdown ⬇️
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

<div id="popup-code-section" style="margin: 60px 0 30px;">
    <h3 class="custom-title">6.6 Pop-Up Automatisierung</h3>
</div>

<p>
    Um das Pop-Up automatisch bzw. über einen Tastendruck des Helfer-Taster zu öffnen, wird eine Automatisierung angelegt.
</p>
<br>
<p>
    Zur einfachen Einrichtung dieser Automatisierung habe ich ein Blueprint erstellt. Dieses kann mit einem Klick auf das Blueprint in der Tabelle herunter geladen und in Home Assistant installiert werden.
</p>

<table class="custom-table" id="blueprint-table">
    <thead>
        <tr>
            <th>Blueprint</th>
            <th>Blueprint kopiert</th>
            <th>Beschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="https://gist.github.com/MaxxKra/3dbc1164e0d037bda67911fccead5f36">Blueprint Pop-Up öffnen</td>
            <td class="status" id="status-blueprint">❌</td>
            <td>Ein Blueprint für die Automatisierung zum Öffnen eines Pop-Ups</td>
        </tr>
    </tbody>
</table>
<br>
<table class="custom-table" id="automation-table">
    <thead>
        <tr>
            <th>Automatisierung Name</th>
            <th>Name kopiert</th>
            <th>Entity ID Automatisierung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Pop-Up">Müllerinnerung Pop-Up</td>
            <td class="status" id="status-automation">❌</td>
            <td>automation.mullerinnerung_pop_up</td>
        </tr>
    </tbody>
</table>
<br>
<p>
    Wie man das Blueprint installiert und die Automatisierung einrichtet, siehst du im ⬇️ Dropdown ⬇️
</p>
<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown6', this)">Blueprint Installation und Einrichtung <span>&#9660;</span></button>
    <div id="galleryDropdown6" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_blueprint_popup %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                    {{ gallery.subtitle | markdownify }}
                    <div style="margin: 0 auto; max-width: 60%;">
                        {% include youtube.html video="WP8SMkcWKlM" %}
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
<br>
<p>
    Nach der Installation der Automatisierung sollte das Pop-Up auf deinen gewählten Dashboards durch den eingerichteten Zeitplan automatisch geöffnet werden.
</p>
</div>
<div class="content-section" id="support-section;">
<h4 class="custom-title">
    Ich hoffe dieser Codegenerator konnte dir bei der Einrichtung deiner Müllerinnerung helfen.<br>
    Über Feedback und Unterstützung würde ich mich auf jeden Fall freuen.
</h4>
<br>
<h3 class="custom-title">Danke und gutes Gelingen! 🎉</h3>
<br>
{% include support_note.html %}
</div>
</div>

<!--
 ██████ ███████ ███████ 
██      ██      ██      
██      ███████ ███████ 
██           ██      ██ 
 ██████ ███████ ███████ 
                                                                              
-->

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
        color: #1598b3;
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

    .content h1 {
        color: #1598b3
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
        color: #d1d1d1;
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
    .copy-confirmation {
        font-size: 24px; /* Gleiche Schriftgröße wie `h4` */
        color: green; /* Bestätigungsfarbe */
        margin-left: 10px; /* Abstand zur Überschrift */
        display: none; /* Standardmäßig versteckt */
    } 
    .dropdown {
        margin: 0 0 20px;
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
    /* Sensor-Zusammenfassung */
    .sensor-summary {
        margin-top: 15px;
        font-size: 18px;
        line-height: 1.5;
        text-align: left;
    }
    /* Formulareingabefelder und Buttons */
    .custom-form-group {
        margin-top: 20px;
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
        background-color: #9fb9fb;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
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
        color: #d1d1d1;
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
    /* Dashboard Optionen Container */
    .dashboard-options {
        display: flex;
        justify-content: space-between;
        align-items: flex-start; /* Überschriften werden oben ausgerichtet */
        margin: 50px 0;
        gap: 20px;
    }
    /* YAML-Code Container */
    .yaml-output-container,
    .example-card-container {
        width: 48%;
        display: flex;
        flex-direction: column;
    }
    /* YAML-Code Header und Container */
    .yaml-output-container h4,
    .example-card-container h4 {
        margin-bottom: 15px; /* Einheitlicher Abstand zur nächsten Sektion */
    }
    /* YAML-Code */
    .yaml-code-container {
        position: relative;
        background-color: #9fb9fb;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 8px;
        padding: 15px;
        max-height: 400px;
        overflow: auto; /* Ermöglicht Scrollen */
    }
    /* Beispielkarte Container */
    .example-card-container {
        padding: 0px;
        text-align: center;
    }
    /* Bild im Beispielkarten-Container */
    .example-image-wrapper {
        width: 100%;
        height: 400px; /* Gleiche Höhe wie das YAML-Fenster */
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000000;
        overflow: hidden; /* Verhindert das Überlaufen von Bildern */
    }
    .example-image-wrapper img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; /* Skaliert das Bild proportional */
    }
    .style-options {
        display: none; /* Standardmäßig ausgeblendet */
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 20px;
        gap: 20px;
    }
    .custom-background-select,
    .custom-border-style-select,
    .custom-border-shape-select {
        width: 30%;
        display: flex;
        flex-direction: column;
    }
    .custom-background-select h4,
    .custom-border-style-select h4,
    .custom-border-shape-select h4 {
        margin-bottom: 15px;
    }

    .two-column-container {
        display: flex;
        gap: 20px; /* Abstand zwischen den Spalten */
        align-items: center;
        margin-top: 20px;
    }

    .left-column {
        flex: 1; /* Linke Spalte nimmt den restlichen Platz ein */
    }

    .right-column {
        flex-shrink: 0; /* Rechte Spalte bleibt in ihrer festen Größe */
        text-align: center;
    }

    .right-column img {
        max-width: 300px; /* Maximale Breite für das Bild */
        height: auto; /* Bildverhältnis beibehalten */
        cursor: pointer; /* Zeigt den Download-Link an */
    }
    .styled-list {
        list-style: none; /* Entfernt die Standard-Aufzählungspunkte */
        counter-reset: list-counter; /* Initialisiert den Zähler */
        padding-left: 0; /* Entfernt Einrückung */
        margin: 20px 0; /* Abstand zur Umgebung */
    }
    .styled-list li strong {
        color: #007acc; /* Gleiche Farbe wie die Linie */
    }

    .styled-list li {
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
        width: 55%;
    }

    .styled-list li::before {
        content: "6." counter(list-counter); /* Fügt "6." + die Zählernummer hinzu */
        position: absolute;
        left: 10px; /* Platzierung der Nummer links */
        top: 50%; /* Vertikale Ausrichtung */
        transform: translateY(-50%);
        font-weight: bold;
        color: #007acc; /* Gleiche Farbe wie die Linie */
        font-size: 1.2em;
        background-color: #e6f3ff; /* Heller Hintergrund für die Nummer */
        padding: 5px 10px;
        border-radius: 50%; /* Rundes Design für die Nummerierung */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Leichter Schatten für Nummer */
        text-align: center;
    }
    .styled-list-start {
        counter-reset: list-counter; /* Initialisiert den Zähler */
        padding-left: 0; /* Entfernt Einrückung */
        margin: 20px 0; /* Abstand zur Umgebung */
    }
    .styled-list-start li strong {
        color: #007acc; /* Gleiche Farbe wie die Linie */
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

<!--
███████  ██████ ██████  ██ ██████  ████████ ███████ 
██      ██      ██   ██ ██ ██   ██    ██    ██      
███████ ██      ██████  ██ ██████     ██    █████   
     ██ ██      ██   ██ ██ ██         ██    ██      
███████  ██████ ██   ██ ██ ██         ██    ███████ 
                                                                              
-->

<script>
    document.addEventListener("DOMContentLoaded", function() {
        try {
            const nextPickupTemplate = `{% raw %}{{ value.types | join(", ") }}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const individualPickupTemplate = `{% raw %}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const datePickupTemplate = `{% raw %}{{value.date.strftime("%d.%m.%Y")}}{% endraw %}`;
            
            document.getElementById("next-pickup-template").textContent = nextPickupTemplate;
            document.getElementById("individual-pickup-template").textContent = individualPickupTemplate;
            document.getElementById("date-pickup-template").textContent = datePickupTemplate;

        } catch (error) {
            console.error("Error during DOMContentLoaded setup:", error);
        }
    });
    function showStep(stepNumber) {
        // Alle Abschnitte anzeigen, die kleiner oder gleich der aktuellen Schritt-Nummer sind
        for (let i = 1; i <= 8; i++) {
            const step = document.getElementById(`step-${i}`);
            if (step) {
                if (i <= stepNumber) {
                    step.style.display = "block"; // Zeigt die vorherigen und den aktuellen Step an
                    step.classList.remove("completed"); // Entfernt die "abgeschlossen"-Markierung, wenn sie gesetzt war
                } else {
                    step.style.display = "none"; // Versteckt die zukünftigen Schritte
                }
            }
        }
    
        // Automatisch scrollen, um den ausgewählten Schritt in den Fokus zu bringen
        const currentStep = document.getElementById(`step-${stepNumber}`);
        if (currentStep) {
            currentStep.scrollIntoView({ behavior: "smooth" });
        }
    }

    function showCustomAlert(title, message) {
        const alertBox = document.getElementById("custom-alert");
        const alertTitle = document.getElementById("custom-alert-title");
        const alertMessage = document.getElementById("custom-alert-message");
    
        alertTitle.textContent = title;   // Überschrift setzen
        alertMessage.textContent = message; // Nachricht setzen
        alertBox.style.display = "flex"; // Fenster anzeigen
    
        document.getElementById("close-alert").onclick = function () {
            alertBox.style.display = "none"; // Fenster schließen
        };
    }

async function extractEntries() {
    try {
        const fileInput = document.getElementById('icsFile');
        const urlInput = document.getElementById('calendarUrl');
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');

        // Alle Warncontainer ausblenden
        const warningContainer = document.getElementById("warning-container");
        const umlautWarningContainer = document.getElementById("umlaut-warning-container");
        const urlWarningContainer = document.getElementById("url-warning-container");

        warningContainer.style.display = "none";
        umlautWarningContainer.style.display = "none";
        urlWarningContainer.style.display = "none";

        entryTableBody.innerHTML = "Lade und verarbeite Daten...";

        let icsData;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            icsData = await file.text();
        } else if (urlInput.value) {
            const icsUrl = urlInput.value;
            try {
                const response = await fetch(icsUrl);
                if (!response.ok) {
                    throw new Error(`ICS-Datei konnte nicht geladen werden: ${response.status} ${response.statusText}`);
                }
                icsData = await response.text();
            } catch (error) {
                // Zeige den URL-Warncontainer bei einem Fehler
                urlWarningContainer.style.display = "block";
                console.error("Fetch error:", error);
                entryTableBody.innerHTML = `<tr><td colspan="3">Fehler beim Laden der URL: ${error.message}</td></tr>`;
                return;
            }
        } else {
            entryTableBody.innerHTML = "<tr><td colspan='3'>Bitte eine ICS-Datei hochladen oder eine URL eingeben.</td></tr>";
            return;
        }
    
        const summaryEntries = new Set();
        const invalidEntries = [];
        const lines = icsData.split("\n");
    
        for (let line of lines) {
            if (line.startsWith("SUMMARY")) {
                const summaryText = line.split(":").slice(1).join(":").trim();
                summaryEntries.add(summaryText);
    
                // Überprüfen, ob Ziffern, Punkte oder unerlaubte Zeichen enthalten sind
                if (/\d|\.|[äöüßÄÖÜ]|\s|[()!?]/.test(summaryText)) {
                    invalidEntries.push(summaryText);
                }
            }
        }
    
        // Zeige den Warnungscontainer bei ungültigen Einträgen
        if (invalidEntries.length > 0) {
            const warningContainer = document.getElementById("warning-container");
            const umlautWarningContainer = document.getElementById("umlaut-warning-container");
            warningContainer.style.display = "block"; // Container einblenden
            umlautWarningContainer.style.display = "none"; // Umlaut-Warnung ausblenden
        }
    
        entryTableBody.innerHTML = "";
        let idCounter = 0;
        summaryEntries.forEach(entry => {
            const row = document.createElement("tr");
    
            // Checkbox
            const checkboxCell = document.createElement("td");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "entry-checkbox";
            checkbox.id = `entry-checkbox-${idCounter}`;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);
    
            // Summary Entry
            const summaryCell = document.createElement("td");
            summaryCell.textContent = entry;
            summaryCell.id = `summary-${idCounter}`;
            
            // Markiere ungültige Einträge
            if (invalidEntries.includes(entry)) {
                summaryCell.style.color = "red"; // Färbe ungültige Einträge rot
                summaryCell.title = "Ungültiger Eintrag - bitte anpassen"; // Tooltip
            }
            row.appendChild(summaryCell);
    
            // Custom Name Input
            const customNameCell = document.createElement("td");
            const customNameInput = document.createElement("input");
            customNameInput.type = "text";
            customNameInput.placeholder = "Eigene Bezeichnung";
            customNameInput.className = "entry-custom-name";
            customNameInput.id = `custom-name-${idCounter}`;
            customNameCell.appendChild(customNameInput);
            row.appendChild(customNameCell);
    
            entryTableBody.appendChild(row);
            idCounter++;
        });
    
    } catch (error) {
        console.error("Error in extractEntries:", error);
    }
}



    // Funktion zum Anzeigen des benutzerdefinierten Dialogs
    function showCustomDecision(title, message, invalidEntries) {
        return new Promise((resolve) => {
            const decisionElement = document.getElementById('custom-decision');
            const titleElement = document.getElementById('custom-decision-title');
            const messageElement = document.getElementById('custom-decision-message');
            const listElement = document.getElementById('custom-decision-list');
            const yesButton = document.getElementById('decision-yes');
            const noButton = document.getElementById('decision-no');
            const questionElement = document.getElementById('custom-decision-question');
    
            // Setze Titel und Nachricht
            titleElement.textContent = title;
            messageElement.textContent = message;
    
            // Leere die Liste und füge neue Einträge hinzu
            listElement.innerHTML = "";
            invalidEntries.forEach((entry) => {
                const listItem = document.createElement('li');
                listItem.textContent = entry;
                listElement.appendChild(listItem);
            });
    
            // Setze Frage (kann falls nötig angepasst werden)
            questionElement.textContent = "Möchtest du die Verarbeitung fortsetzen?";
    
            // Event-Listener für Buttons
            yesButton.onclick = () => {
                decisionElement.style.display = 'none';
                resolve(true);
            };
    
            noButton.onclick = () => {
                decisionElement.style.display = 'none';
                resolve(false);
            };
    
            // Dialog anzeigen
            decisionElement.style.display = 'flex';
        });
    }
    function checkEntries() {
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        const umlautPattern = /[äöüÄÖÜß]/;
        const selectedEntries = Array.from(entryTableBody.querySelectorAll("tr")).filter(row => {
            return row.querySelector(".entry-checkbox").checked;
        });

        // Warnung, wenn keine Checkbox ausgewählt wurde
        if (selectedEntries.length === 0) {
            showCustomAlert("Keine Auswahl getroffen!", "Bitte wähle mindestens einen Eintrag aus!");
            return false; // Fehler: keine Auswahl getroffen
        }

        let umlautWarning = false;

        selectedEntries.forEach(row => {
            const customName = row.querySelector(".entry-custom-name").value.trim(); // Eigene Bezeichnung
            const summaryText = row.querySelector("td:nth-child(2)").textContent.trim(); // Kalendereintrag (SUMMARY)

            // Prüfe auf Umlaute in der eigenen Bezeichnung
            if (umlautPattern.test(customName)) {
                umlautWarning = true;
            }

            // Prüfe auf Umlaute im Kalendereintrag, wenn keine eigene Bezeichnung eingetragen wurde
            if (customName === "" && umlautPattern.test(summaryText)) {
                umlautWarning = true;
            }
        });

        if (umlautWarning) {
            showCustomAlert("Umlaute entdeckt!", "Bitte eigene Kalendereinträge kontrollieren und eigene Bezeichnungen anpassen!");
            return false; // Fehler
        }

        // Alles in Ordnung
        generateSensorTable(selectedEntries);
        generateDateSensorTable(selectedEntries);
        document.getElementById("template-header").style.display = "block";
        document.getElementById("sensor-header").style.display = "block";
        document.getElementById("date-sensor-header").style.display = "block";
        document.getElementById("code-output-next").style.display = "block";
        document.getElementById('code-output-date').style.display = 'block';
        return true;
    }
    function handleStepTransition() {
        const isValid = checkEntries(); // Prüft, ob die Eingaben korrekt sind
        if (isValid) {
            showStep(3); // Nur wenn keine Fehler vorliegen, wird zu Schritt 3 gewechselt
        }
    }

    function generateSensorTable(selectedEntries) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const sensorTable = document.getElementById('sensor-table');
        sensorTableBody.innerHTML = "";

        // Add standard row for "Nächste Abholung"
        const standardRow = document.createElement("tr");

        // Sensor Name
        const standardNameCell = document.createElement("td");
        standardNameCell.textContent = "Nächste Abholung";
        standardNameCell.style.cursor = "pointer";
        standardNameCell.onclick = () => {
            toggleCopyStatus(standardCopyStatusCell);
            copyToClipboards("Nächste Abholung", standardCopyStatusCell); // Name wird kopiert
        };
        standardRow.appendChild(standardNameCell);

        // Kopiert-Status
        const standardCopyStatusCell = document.createElement("td");
        standardCopyStatusCell.innerHTML = '<span class="copy-checkmark">❌</span>'; // Standardmäßig ❌
        standardCopyStatusCell.style.textAlign = "center";
        standardRow.appendChild(standardCopyStatusCell);

        // Entity ID
        const standardSensorCell = document.createElement("td");
        standardSensorCell.textContent = "sensor.nachste_abholung";
        standardRow.appendChild(standardSensorCell);

        // Farbe (leer für die Standardzeile)
        const standardColorCell = document.createElement("td");
        standardColorCell.textContent = "-"; // No color selection for "Nächste Abholung"
        standardRow.appendChild(standardColorCell);

        sensorTableBody.appendChild(standardRow);

        // Add rows for selected entries
        selectedEntries.forEach((row) => {
            const customName = row.querySelector(".entry-custom-name").value || row.querySelector("td:nth-child(2)").textContent;
            const sensorName = `sensor.${customName.toLowerCase().replace(/\s+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
                return {
                    'ä': 'a', 'ö': 'o', 'ü': 'u',
                    'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ss'
                }[match];
            })}`;

            const sensorRow = document.createElement("tr");

            // Sensor Name
            const customNameCell = document.createElement("td");
            customNameCell.textContent = customName;
            customNameCell.style.cursor = "pointer";
            customNameCell.onclick = () => {
                toggleCopyStatus(copyStatusCell); // Status ändern
                copyToClipboards(customName, copyStatusCell); // Name kopieren
            };
            sensorRow.appendChild(customNameCell);

            // Kopiert-Status
            const copyStatusCell = document.createElement("td");
            copyStatusCell.innerHTML = '<span class="copy-checkmark">❌</span>'; // Standardmäßig ❌
            copyStatusCell.style.textAlign = "center";
            sensorRow.appendChild(copyStatusCell);

            // Entity ID
            const sensorNameCell = document.createElement("td");
            sensorNameCell.textContent = sensorName;
            sensorRow.appendChild(sensorNameCell);

            // Farbe Auswahlfeld
            const colorCell = document.createElement("td");
            const colorSelect = document.createElement("select");
            colorSelect.className = "color-select";
            ["Farbe wählen", "Schwarz", "Blau", "Rot", "Gelb", "Grün", "Braun", "Sack", "Schwarz-Blau", "Schwarz-Rot", "Schwarz-Gelb", "Schwarz-Grün", "Schwarz-Braun"].forEach(color => {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                colorSelect.appendChild(option);
            });
            colorCell.appendChild(colorSelect);
            sensorRow.appendChild(colorCell);

            sensorTableBody.appendChild(sensorRow);
        });

        sensorTable.style.display = "table";
    }

    // Funktion zum Umschalten des Kopierstatus
    function toggleCopyStatus(statusCell) {
        const checkmark = statusCell.querySelector(".copy-checkmark");
        if (checkmark) {
            checkmark.textContent = checkmark.textContent === "❌" ? "✔️" : "❌"; // Umschalten zwischen ❌ und ✔️
        }
    }

    function generateDateSensorTable(selectedEntries) {
        const dateSensorTableBody = document.getElementById('date-sensor-table').querySelector('tbody');
        const dateSensorTable = document.getElementById('date-sensor-table');
        dateSensorTableBody.innerHTML = "";

        // Add rows for selected entries
        selectedEntries.forEach((row) => {
            const customName = row.querySelector(".entry-custom-name").value || row.querySelector("td:nth-child(2)").textContent;
            const sensorName = `sensor.${customName.toLowerCase().replace(/\s+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
                return {
                    'ä': 'a', 'ö': 'o', 'ü': 'u',
                    'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ss'
                }[match];
            })}_datum`;

            const sensorRow = document.createElement("tr");

            // Sensor Name
            const customNameCell = document.createElement("td");
            customNameCell.textContent = `${customName} Datum`;
            customNameCell.style.cursor = "pointer";
            customNameCell.onclick = () => {
                toggleCopyStatus(copyStatusCell); // Richtige Zelle für den Status
                copyToClipboards(`${customName} Datum`, copyStatusCell); // Name wird kopiert
            };
            sensorRow.appendChild(customNameCell);

            // Kopiert-Status
            const copyStatusCell = document.createElement("td");
            copyStatusCell.innerHTML = '<span class="copy-checkmark">❌</span>'; // Standardmäßig ❌
            copyStatusCell.style.textAlign = "center";
            sensorRow.appendChild(copyStatusCell);

            // Entity ID
            const sensorNameCell = document.createElement("td");
            sensorNameCell.textContent = sensorName;
            sensorRow.appendChild(sensorNameCell);

            dateSensorTableBody.appendChild(sensorRow);
        });

        dateSensorTable.style.display = "table";
    }

    function copyToClipboards(textToCopy, statusCell) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const checkmark = statusCell.querySelector(".copy-checkmark");
            if (checkmark) {
                checkmark.style.display = "inline"; // Häkchen dauerhaft anzeigen
            }
        }).catch(err => {
            console.error("Fehler beim Kopieren:", err);
        });
    }

    function validateColors() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // überspringe die Standardreihe "Nächste Abholung"

        let colorNotSelected = false;
        const selectedColors = new Set();
        let duplicateColor = false;

        rows.forEach(row => {
            // Suche nach dem Dropdown in der Spalte Tonnen Farbe
            const selectElement = row.cells[3]?.querySelector("select");

            if (!selectElement) {
                console.error("Kein Dropdown-Element in der Spalte 'Tonnen Farbe' gefunden!");
                return; // Überspringe die aktuelle Zeile, wenn kein Dropdown gefunden wurde
            }

            const color = selectElement.value;
            console.log(`Ausgewählte Farbe in der Zeile: "${color}"`); // Debugging-Ausgabe

            if (!color || color.trim() === "" || color === "Farbe wählen") {
                colorNotSelected = true; // Wenn keine Farbe ausgewählt wurde
            } else {
                if (selectedColors.has(color)) {
                    duplicateColor = true; // Wenn die Farbe doppelt ist
                } else {
                    selectedColors.add(color); // Farbe zu den ausgewählten hinzufügen
                }
            }
        });

        if (colorNotSelected) {
            showCustomAlert("Keine Tonnen-Farben?", "Die Farben der Tonne sollten zugeordnet werden!");
            return false; // Rückgabe `false`, wenn eine Farbe fehlt
        }

        if (duplicateColor) {
            showCustomAlert("Doppelte Farbe erkannt!", "Jede Farbe darf nur einmal ausgewählt werden!");
            return false; // Rückgabe `false`, wenn Farben doppelt sind
        }

        return true; // Rückgabe `true`, wenn alles korrekt ist
    }

    function createTemplates() {
        // Zugriff auf die Tabelle der Sensoren
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // überspringe die Standardreihe "Nächste Abholung"

        // Template für "Heute" erstellen
        createTemplate("Heute", "helper-template-heute", "helper-template-output-heute");

        // Template für "Morgen" erstellen
        createTemplate("Morgen", "helper-template-morgen", "helper-template-output-morgen");

        // Prüfen, ob die Checkboxen für "keine"-Anzeige aktiviert sind
        const heuteCheckbox = document.getElementById("keineHeute").checked;
        const morgenCheckbox = document.getElementById("keineMorgen").checked;

        let textHeute, textMorgen;

        // Texte für "Heute"
        if (heuteCheckbox) {
            textHeute = `{% raw %}{% if states.sensor.mullabholung_heute.state != 'keine' %}\nDu musst heute {{ states.sensor.mullabholung_heute.state }} rausstellen!\n{% else %}\nDu musst heute keine Tonne rausstellen!\n{% endif %}{% endraw %}`;
        } else {
            textHeute = `{% raw %}{% if states.sensor.mullabholung_heute.state != 'keine' %}\nDu musst heute {{ states.sensor.mullabholung_heute.state }} rausstellen!\n{% else %}\n\n{% endif %}{% endraw %}`;
        }

        // Texte für "Morgen"
        if (morgenCheckbox) {
            textMorgen = `{% raw %}{% if states.sensor.mullabholung_morgen.state != 'keine' %}\nDu musst morgen {{ states.sensor.mullabholung_morgen.state }} rausstellen!\n{% else %}\nDu musst morgen keine Tonne rausstellen!\n{% endif %}{% endraw %}`;
        } else {
            textMorgen = `{% raw %}{% if states.sensor.mullabholung_morgen.state != 'keine' %}\nDu musst morgen {{ states.sensor.mullabholung_morgen.state }} rausstellen!\n{% else %}\n\n{% endif %}{% endraw %}`;
        }

        // Setzen Sie den Text für "Müllabholung Text Heute"
        const textHeuteElement = document.getElementById("helper-template-text-heute");
        textHeuteElement.innerHTML = `<code class="language-yaml">${textHeute}</code>`;
        document.getElementById("helper-template-output-text-heute").style.display = "block";

        // Setzen Sie den Text für "Müllabholung Text Morgen"
        const textMorgenElement = document.getElementById("helper-template-text-morgen");
        textMorgenElement.innerHTML = `<code class="language-yaml">${textMorgen}</code>`;
        document.getElementById("helper-template-output-text-morgen").style.display = "block";
    }

    function copyTitleToClipboard(element) {
        const textToCopy = element.textContent.trim(); // Text der Überschrift
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Suche nach dem Symbol in der gleichen Zeile wie die Überschrift
            const confirmationIcon = element.parentElement.querySelector('.copy-confirmation');
            if (confirmationIcon) {
                // Umschalten zwischen ❌ und ✔️
                confirmationIcon.textContent = "✔️";
            }
        }).catch(err => {
            console.error("Fehler beim Kopieren in die Zwischenablage:", err);
        });
    }

    function createTemplate(day, templateId, outputId) {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1);
        
        let hasSack = false;
        const sensorAssignments = [];
        
        rows.forEach(row => {
            const customName = row.cells[0].textContent.trim();
            const sensorName = "states.sensor." + customName.toLowerCase().replace(/\s+/g, "_") + ".state";
            const templateName = customName.replace(/Gelber/g, "Gelben").replace(/\s+/g, "").replace(/Sack/g, "").replace(/Tonne/g, "")
            const color = row.cells[3].querySelector("select").value;
    
            if (color === "Sack") {
                hasSack = true;
            }
    
            sensorAssignments.push({ customName, sensorName, templateName, color });
        });
    
        // Generiere das Template für den angegebenen Tag ("Heute" oder "Morgen")
        let templateText = "{% raw %}\n";
    
        // Setzen der Variablen
        sensorAssignments.forEach(({ customName, sensorName }) => {
            templateText += "{% set " + customName.toUpperCase().replace(/\s+/g, "") + " = " + sensorName + " %}\n";
        });
    
        templateText += generateConditionsAsText(sensorAssignments, hasSack, day);
    
        templateText += "\n{% endraw %}";
    
        // Setze den Inhalt in das entsprechende <pre> Element
        const templateElement = document.getElementById(templateId);
        templateElement.innerHTML = `<code class="language-yaml">${templateText}</code>`;
        document.getElementById(outputId).style.display = "block";
    }    
    
{% raw %}
    function generateConditionsAsText(assignments, hasSack, conditionDay) {
        let yaml = `{% if `;

        // Hole alle Kombinationen und sortiere sie nach Länge (absteigend)
        const combinations = getAllCombinations(assignments).sort((a, b) => b.length - a.length);

        combinations.forEach((combination, index) => {
            const condition = combination
                .map(a => `${a.customName.toUpperCase().replace(/\s+/g, "")} == "${conditionDay}"`)
                .join(" and ");
            const output = generateOutputText(combination, hasSack);

            if (index === 0) {
                yaml += `${condition} %}\n`;
            } else {
                yaml += `{% elif ${condition} %}\n`;
            }
            yaml += `    ${output}\n`;
        });

        yaml += "{% else %}keine {% endif %}"; // Abschluss des Bedingungsblocks

        return yaml;
    }
{% endraw %}
    
    function generateOutputText(assignments, hasSack) {
        // Sortiere "Sack"-Einträge an den Anfang
        const formattedNames = assignments.map(({ templateName, color }) => {
            if (hasSack && color === "Sack") {
                return { text: "den " + templateName + " Sack", order: 0 };
            }
            return { text: "die " + templateName, order: 1 };
        });
    
        // Sortiere nach der Reihenfolge: Sack zuerst, dann die anderen
        formattedNames.sort((a, b) => a.order - b.order);
    
        // Extrahiere die Texte aus den Objekten und erstelle die finale Liste
        const sortedTexts = formattedNames.map(item => item.text);
    
        // Füge "und" vor dem letzten Eintrag hinzu, wenn es mehrere gibt
        if (sortedTexts.length > 1) {
            sortedTexts[sortedTexts.length - 1] = "und " + sortedTexts[sortedTexts.length - 1];
        }
    
        // Wenn nur "Sack" enthalten ist, füge kein "Tonne" hinzu
        if (sortedTexts.length === 1 && hasSack && assignments[0].color === "Sack") {
            return sortedTexts[0];
        }
    
        // Verbinde alle Einträge mit Komma und füge "Tonne" am Ende hinzu
        return sortedTexts.join(", ") + " Tonne";
    }


    function getAllCombinations(arr) {
        const result = [];
        const f = function(prefix = [], arr) {
            result.push(prefix);
            for (let i = 0; i < arr.length; i++) {
                f(prefix.concat(arr[i]), arr.slice(i + 1));
            }
        };
        f([], arr);
        return result.filter(comb => comb.length > 0);
    }

    function copyCode(elementId, button) {
        const codeElement = document.getElementById(elementId);
        const codeText = codeElement.innerText || codeElement.textContent;

        navigator.clipboard.writeText(codeText)
            .then(() => {
                // Zeigt das benutzerdefinierte Fenster
                showCustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!");

                // Button-Text und Stil dauerhaft ändern
                button.classList.add('copied'); // Füge die CSS-Klasse hinzu
                button.innerHTML = "Kopiert ✔️";       // Ändere den Button-Inhalt auf das Symbol
                button.style.backgroundColor = "#72dd8b"; // Grüner Hintergrund
                button.style.color = "white";             // Weiße Schrift
                
            })
            .catch(err => {
                console.error("Fehler beim Kopieren des Codes: ", err);
                showCustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten.");
            });
    }


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


    function createImageList() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")).slice(1); // Überspringe die Standardreihe "Nächste Abholung"
        
        // Tabelle für die Ausgabe erstellen
        let imageTable = '<table class="custom-table"><thead><tr><th>Sensor Name</th><th>Bilder Name</th><th>Entity ID</th><th>Bild Vorschau</th></tr></thead><tbody>';
        
        // Mapping von Farben zu Bilddateinamen
        const colorToImageMap = {
            "Schwarz": "schwarz.png",
            "Blau": "blau.png",
            "Rot": "rot.png",
            "Gelb": "gelb.png",
            "Grün": "gruen.png",
            "Braun": "braun.png",
            "Sack": "sack.png",
            "Schwarz-Blau": "schwarz-blau.png",
            "Schwarz-Rot": "schwarz-rot.png",
            "Schwarz-Gelb": "schwarz-gelb.png",
            "Schwarz-Grün": "schwarz-gruen.png",
            "Schwarz-Braun": "schwarz-braun.png"
        };
        
        // Zeilen der Tabelle durchlaufen und Bildnamen sowie Bildvorschau zuordnen
        let sensorCount = 0; // Zähler für die Anzahl der Sensoren
        rows.forEach(row => {
            const sensorName = row.cells[0].textContent.trim(); // Sensor Name
            const selectedColor = row.cells[3].querySelector("select").value; // Farbauswahl
            const entityID = row.cells[2].textContent.trim(); // Entity ID

            if (colorToImageMap[selectedColor]) {
                sensorCount++; // Zähler inkrementieren
                const imageName = colorToImageMap[selectedColor];
                const imagePath = `/img/muell/${imageName}`;
                
                // Tabellenzeile erstellen
                imageTable += `
                    <tr>
                        <td>${sensorName}</td>
                        <td>${imageName}</td>
                        <td>${entityID}</td>
                        <td>
                            <a href="${imagePath}" download="${imageName}">
                                <img src="${imagePath}" alt="${imageName}" style="width: 50px; height: auto; cursor: pointer;" title="Bild herunterladen">
                            </a>
                        </td>
                    </tr>`;
            }
        });
        
        imageTable += '</tbody></table>';
        
        // Tabelle im HTML anzeigen
        const outputContainer = document.getElementById('image-list-output');
        if (!outputContainer) {
            const newOutputContainer = document.createElement('div');
            newOutputContainer.id = 'image-list-output';
            document.body.appendChild(newOutputContainer);
        }
        document.getElementById('image-list-output').innerHTML = imageTable;

        // Sensor-Zusammenfassung anzeigen
        const sensorSummary = document.getElementById('sensor-summary');
        const sensorCountElement = document.getElementById('sensor-count');
        
        if (sensorCount === 1) {
            sensorCountElement.textContent = "einen Sensor";
        } else {
            sensorCountElement.textContent = `${sensorCount} Sensoren`;
        }

        sensorSummary.style.display = "block"; // Zusammenfassung einblenden
        sensorSummary.innerHTML = `Du hast <span style="font-weight: bold; color: #4CAF50;">${sensorCount === 1 ? "einen Sensor" : `${sensorCount} Sensoren`}</span> angelegt.`;
    }

    function updateExampleCard() {
        const darstellungAuswahl = document.getElementById("darstellungAuswahl").value;
        const sensorTableBody = document.getElementById("sensor-table").querySelector("tbody");
        const sensorCount = sensorTableBody.querySelectorAll("tr").length - 1; // Exclude the header row

        let imagePath = "/img/muell/";

        if (sensorCount === 1) {
            imagePath += "exampleCard_1.png";
        } else if (sensorCount === 2) {
            imagePath += "exampleCard_2.png";
        } else if (sensorCount === 3) {
            imagePath += "exampleCard_3.png";
        } else if (sensorCount === 4) {
            if (darstellungAuswahl === "einzeilig") {
                imagePath += "exampleCard_4_1.png";
            } else if (darstellungAuswahl === "mehrzeilig") {
                imagePath += "exampleCard_4_2.png";
            }
        } else if (sensorCount === 5) {
            imagePath += "exampleCard_5.png";
        } else {
            imagePath += "exampleCard_6.png";
        }

        const exampleImage = document.getElementById("example-image");
        exampleImage.src = imagePath;
        exampleImage.style.display = "block"; // Show the image
    }

    function toggleCustomFontInput() {
        const fontSelection = document.getElementById("fontSelection").value;
        const customFontInput = document.getElementById("customFontInput");

        if (fontSelection === "Custom") {
            customFontInput.style.display = "block";
        } else {
            customFontInput.style.display = "none";
        }
    }
    // Event Listener für die Checkbox
    document.getElementById("dateUseCheckbox").addEventListener("change", function () {
        const dateOptionsDiv = document.getElementById("dateOptions");
        if (this.checked) {
            // Zeige den Container, wenn die Checkbox angehakt ist
            dateOptionsDiv.date.display = "contents";
        } else {
            // Verstecke den Container, wenn die Checkbox nicht angehakt ist
            dateOptionsDiv.date.display = "none";
        }
    });

    function getSelectedFont() {
        const fontSelection = document.getElementById("fontSelection").value;
        const customFontInput = document.getElementById("customFontInput");

        // Falls "Eigene Schriftart" gewählt wurde, die Eingabe verwenden
        if (fontSelection === "Custom" && customFontInput.value.trim() !== "") {
            return customFontInput.value.trim();
        }
        return fontSelection;
    }
    // Event Listener für die Checkbox
    document.getElementById("styleUseCheckbox").addEventListener("change", function () {
        const styleOptionsDiv = document.getElementById("styleOptions");
        if (this.checked) {
            // Zeige den Container, wenn die Checkbox angehakt ist
            styleOptionsDiv.style.display = "contents";
        } else {
            // Verstecke den Container, wenn die Checkbox nicht angehakt ist
            styleOptionsDiv.style.display = "none";
        }
    });

    // Initialzustand festlegen
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("styleOptions").style.display = "none";
    });


    function generateCardYAML() {
        const imageTableBody = document.getElementById('image-list-output').querySelector('tbody'); // Tabelle aus createImageList
        const rows = Array.from(imageTableBody.querySelectorAll("tr"));
        const sensorCount = rows.length;

        const blinkend = document.getElementById("blinkendCheckbox").checked; // blinkende Tonne?
        const dateUsed = document.getElementById("dateUseCheckbox").checked; // Datum angezeigt?
        const styleUsed = document.getElementById("styleUseCheckbox").checked; // Style geändert
        const styleUnused = !document.getElementById("styleUseCheckbox").checked; // Style nicht geändert
        const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value; // Anzeige "heute" oder "morgen",
        const darstellung = document.getElementById("darstellungAuswahl").value; // Karte einzeilig oder mehrzeilig
        const selectedFont = getSelectedFont(); // Ausgewählte Schriftart
        const StyleHintergrund = document.getElementById("backgroundSelect").value; // Gewählter Hintergrund
        const StyleRahmenStil = document.getElementById("borderStyleSelect").value; // Gewählter Rahmen
        const StyleRahmenEcke = document.getElementById("borderShapeSelect").value; // Gewählte Rahmen Form

        let yaml = "";

        // Für den Fall, dass 1 Sensor erstellt wurde
        if (sensorCount === 1) {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensor aus der Tabelle entnehmen
            const sensorEntity = rows[0].cells[2].textContent.trim(); // Entity ID
            const imageName = rows[0].cells[1].textContent.trim(); // Bildname

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensorEntity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${imageName}\n`; // Bildname aus Tabelle
            yaml += `            size: 100px\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${imageName}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensorEntity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensorEntity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;
        }

        // Für den Fall, dass 2 Sensoren erstellt wurden
        else if (sensorCount === 2) {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensor1 = {
                entity: rows[0].cells[2].textContent.trim(),
                image: rows[0].cells[1].textContent.trim(),
            };
            const sensor2 = {
                entity: rows[1].cells[2].textContent.trim(),
                image: rows[1].cells[1].textContent.trim(),
            };

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            // YAML für den ersten Sensor
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor1.entity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${sensor1.image}\n`;
            yaml += `            size: 40%\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor1.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor1.entity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor1.entity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;

            // YAML für den zweiten Sensor
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor2.entity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${sensor2.image}\n`;
            yaml += `            size: 40%\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor2.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor2.entity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor2.entity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;
        }

        else if (sensorCount === 3) {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        // Für den Fall, dass 4 Sensoren erstellt wurden und Darstellung "Einzeilig"
        else if (sensorCount === 4 && darstellung === "einzeilig") {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 80%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        else if (sensorCount === 4 && darstellung === "mehrzeilig") {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 2).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(2, 4).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        else if (sensorCount === 5) {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 3).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(3, 5).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }


        else if (sensorCount === 6) {
            const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 3).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(3, 6).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        // Setze den generierten YAML-Code in das `pre`-Tag
        const yamlOutput = document.getElementById("yaml-code-output");
        yamlOutput.innerHTML = `<code>${yaml}</code>`;
    }

    // Update both the example card and YAML code
    document.getElementById("update-example-and-code").addEventListener("click", () => {
        updateExampleCard();
        generateCardYAML();
        showStep(7);
    });



//   █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██████   //
//  ██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██        //
//  ███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████   //
//  ██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██    ██  //
//  ██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██████   //
                                                                                    


// Funktion zum Kopieren in die Zwischenablage
function copyToClipboard(helperName, statusId) {
    navigator.clipboard.writeText(helperName)
        .then(() => {
            // Erfolgreich kopiert, ändere den Status auf ✔️
            const statusElement = document.getElementById(statusId);
            statusElement.textContent = "✔️";
        })
        .catch(err => {
            console.error("Fehler beim Kopieren:", err);
        });
}

// Eventlistener für die Helfernamen
document.querySelectorAll(".copyable").forEach(element => {
    element.addEventListener("click", () => {
        const helperName = element.getAttribute("data-helper"); // Name des Helfers
        const statusId = element.nextElementSibling.id; // ID des Status-Felds
        copyToClipboard(helperName, statusId);
    });
});



function generatePopupYAML() {
    const imageTableBody = document.getElementById('image-list-output').querySelector('tbody');
    const rows = Array.from(imageTableBody.querySelectorAll("tr"));
    const sensorCount = rows.length;

    const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value;
    const selectedFont = getSelectedFont();
    const entityText = `sensor.mullabholung_text_${anzeigeAuswahl}`;
    const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

    // Dynamisches Sammeln der Sensordaten
    const sensors = rows.map((row, index) => ({
        entity: row.cells[2]?.textContent.trim() || "",
        image: row.cells[1]?.textContent.trim() || "",
        index: index + 1 // 1-basiert
    }));

    let yaml = "";

    yaml += `type: custom:popup-card\n`;
    yaml += `dismissable: true\n`;
    yaml += `size: normal\n`;
    yaml += `entity: input_button.mullerinnerung_taster\n`;
    yaml += `style: |-\n`;
    yaml += `  --popup-max-width: 1500px;\n`;
    yaml += `  --popup-min-width: 1000px;\n`;
    yaml += `title: Nicht vergessen!\n`;
    yaml += `card:\n`;
    yaml += `  type: picture-elements\n`;
    yaml += `  elements:\n`;

    // Titelbereich
    yaml += `    - type: custom:button-card\n`;
    yaml += `      entity: ${entityText}\n`;
    yaml += `      show_icon: false\n`;
    yaml += `      show_name: false\n`;
    yaml += `      show_state: true\n`;
    yaml += `      styles:\n`;
    yaml += `        card:\n`;
    yaml += `          - background: transparent\n`;
    yaml += `          - border: none\n`;
    yaml += `        state:\n`;
    yaml += `          - font-size: 2em\n`;
    yaml += `          - font-family: ${selectedFont}\n`;
    yaml += `          - color: var(--primary-color)\n`;
    yaml += `          - white-space: unset\n`;
    yaml += `          - text-overflow: unset\n`;
    yaml += `          - word-break: break-word\n`;
    yaml += `          - text-shadow: 1px 1px 2px black, 0 0 25px white, 0 0 5px grey\n`;
    yaml += `      style:\n`;
    yaml += `        left: 50%\n`;
    yaml += `        top: 13%\n`;
    yaml += `        width: 90%\n`;

    // Dynamisches Hinzufügen der Sensoren
    sensors.forEach(sensor => {
        if (sensor.entity && sensor.image) {
            yaml += `    - type: custom:button-card\n`;
            yaml += `      entity: ${sensor.entity}\n`;
            yaml += `      show_icon: false\n`;
            yaml += `      show_name: false\n`;
            yaml += `      show_state: false\n`;
            yaml += `      show_entity_picture: true\n`;
            yaml += `      size: 100%\n`;
            yaml += `      state:\n`;
            yaml += `        - value: ${valueText}\n`;
            yaml += `          entity_picture: /local/muell/${sensor.image}\n`;
            yaml += `      styles:\n`;
            yaml += `        card:\n`;
            yaml += `          - background: transparent\n`;
            yaml += `          - border: none\n`;

            // Dynamische Positionierung basierend auf dem Index
            let position = getPositionByIndex(sensor.index); // Funktion zur Berechnung der Position
            yaml += `      style:\n`;
            yaml += `        left: ${position.left}%\n`;
            yaml += `        top: ${position.top}%\n`;
            yaml += `        width: ${position.width}%\n`;
        }
    });

    yaml += `  image: /local/muell/popup_background.png\n`;
    yaml += `grid_options:\n`;
    yaml += `  columns: 24\n`;
    yaml += `  rows: auto\n`;

    // Setze den generierten YAML-Code in das `pre`-Tag
    const popupOutput = document.getElementById("popup-code-output");
    popupOutput.innerHTML = `<code>${yaml}</code>`;
}

// Funktion zur Berechnung der Position basierend auf dem Index
function getPositionByIndex(index) {
    const positions = {
        1: { left: 27, top: 75, width: 22 },
        2: { left: 57, top: 75, width: 22 },
        3: { left: 87, top: 75, width: 22 },
        4: { left: 12, top: 79, width: 23 },
        5: { left: 42, top: 79, width: 23 },
        6: { left: 72, top: 79, width: 23 }
    };
    return positions[index] || { left: 50, top: 50, width: 20 }; // Standardposition
}

// Update both the example card and YAML code
document.getElementById("popup-code").addEventListener("click", () => {
    generatePopupYAML(); // YAML generieren

    // Beispielbild anzeigen
    const exampleContainer = document.getElementById("example-popup-container");
    exampleContainer.style.display = "block";
});


</script>


