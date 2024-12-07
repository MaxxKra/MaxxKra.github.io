---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
tags: [Home Assistant, Abfallerinnerung, Müllerinnerung, Waste Collection Schedule, Codegenerator, ics Kalender]
show_sidebar: false
layout: page
---
<div class="guide-container">
<h1 class="custom-title">Müllkalender Code-Generator</h1>

<!-- Wichtiger Hinweis -->
<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Vor dem Erstellen der Codes stelle sicher, dass die Integration <strong>"Waste Collection Schedule"</strong> in HACS heruntergeladen und installiert ist.<br>
        Mit der neuesten Version dieser Integration kannst du die Sensoren usw. direkt in Home Assistant unter Geräte & Dienste einrichten.<br> 
        Im weiteren Verlauf dieser Code-Generierung werden alle notwendigen Angaben für diese Integration für dich bereitgestellt.
    </p>
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
<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ███ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         ██ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██         ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██ 
                                                                               
-->

<div id="step-1">
<h2 class="custom-title">1. Kalenderdaten Auslesen</h2>

<p>
    Zum Auslesen der verschiedenen Abholungen aus deinem Müllkalender, gib bitte deine URL an oder lade die ICS-Datei hoch und bestätige mit<br>
    <strong>Kalendereinträge extrahieren</strong>
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

<div class="api-container">
    <h2 class="custom-title">Abfall.IO API-Konfiguration</h2>
    <p>Gib die notwendigen Parameter ein, um die Abholungsdaten abzurufen:</p>

    <div class="custom-form-group">
        <label for="apiKey" class="custom-label">API-Key</label>
        <input type="text" id="apiKey" class="custom-input" placeholder="Dein API-Key">
    </div>

    <div class="custom-form-group">
        <label for="kommuneId" class="custom-label">Kommune-ID</label>
        <input type="number" id="kommuneId" class="custom-input" placeholder="z.B. 1069">
    </div>

    <div class="custom-form-group">
        <label for="bezirkId" class="custom-label">Bezirk-ID</label>
        <input type="number" id="bezirkId" class="custom-input" placeholder="z.B. 979">
    </div>

    <div class="custom-form-group">
        <label for="strasseId" class="custom-label">Straßen-ID</label>
        <input type="number" id="strasseId" class="custom-input" placeholder="z.B. 2890">
    </div>

    <button class="custom-button" onclick="handleFetchWasteSchedule()">Daten abrufen</button>

    <h3 class="custom-subtitle">Abholungsdaten</h3>
    <table class="custom-table" id="waste-entry-table">
        <thead>
            <tr>
                <th>Auswählen</th>
                <th>Beschreibung</th>
                <th>Benutzerdefinierte Bezeichnung</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dynamisch befüllte Einträge -->
        </tbody>
    </table>
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

<div id="step-2" style="display:none;">
<h2 class="custom-title">2. Kalenderdaten Umwandeln</h2>

<p>Im nächsten Schritt wähle jene Einträge aus, welche zu deinen Sensoren hinzugefügt werden sollen.<br> 
Zusätzlich hast du die Möglichkeit individuelle Bezeichnungen zu vergeben.
</p>

<div class="important-container">
    <p>
        <strong>Achtung!</strong> Deine persönlichen Bezeichnungen dürfen keine Umlaute enthalten und Leerzeichen sollen vermieden werden!
    </p>
</div>
    <!-- Warnungscontainer -->
    <div id="warning-container" class="important-container" style="display: none;">
        <h3>❗Achtung</h3>
        <p>
            Deine ICS-Datei enthält ungültige Einträge. Diese sollten angepasst werden, um Fehler zu vermeiden. 
            Gehe dazu auf die Seite <a href="/icszusammenfuhren/" target="_blank">ICS zusammenführen / bearbeiten</a>.<br>
            Die Verarbeitung wird dennoch fortgesetzt, aber überprüfe die Einträge vor dem Erstellen der Codes.
        </p>
    </div>
<p>
    Wähle deine Bezeichnung so, dass sie kurz und sinnvoll ist. Es ist nicht notwendig, das Wort <strong>Tonne</strong> in die Bezeichnung aufzunehmen, da dies automatisch vom Codegenerator ergänzt wird. 
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

<div id="step-3" style="display:none;">
<h2 class="custom-title">3. Sensoren Konfiguration</h2>

<p>An diesem Punkt kann die Integration <strong>Waste Collection Schedule</strong> in Home Assistant eingerichtet werden.<br>
Eine detaillierte Beschreibung wie diese einzurichten sind, findest du im <strong>⬇️ Dropdown Menü ⬇️</strong></p>

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
    Nun müssen den Sensoren bzw. Abholungen die Tonnenfarben zugeordnet werden.<br>
    Wichtig ist, dass <strong>keine</strong> Farbe zweimal verwendet werden darf.
</p>

<p>
    Mit einem Klick auf den Sensor-Namen wird dieser in die Zwischenablage kopiert.<br>
    Dadurch wird das Eintragen in Home Assistant als Sensor-Name wesentlich einfacher.
</p>

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

<!-- Code Output for Templates in a Code Block with Copy Button -->
<h3 class="custom-subtitle" id="template-header" style="display:none;">Werte Templates</h3>

<div id="code-output" style="display:none;">
    <h4>Werte Template Nächste Abholung</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('next-pickup-template')">Copy</button>
        <pre id="next-pickup-template" class="language-yaml"><code></code></pre>
    </div>

    <h4>Werte Template einzelne Abholungen</h4>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('individual-pickup-template')">Copy</button>
        <pre id="individual-pickup-template" class="language-yaml"><code></code></pre>
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

<div id="step-4" style="display:none;">
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

<button class="custom-button" onclick="createTemplates()">Templates erstellen</button>

<!-- Output for "Müllabholung Heute" -->
<div id="helper-template-output-heute" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-heute')">Copy</button>
        <pre id="helper-template-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Heute" -->
<div id="helper-template-output-text-heute" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-heute')">Copy</button>
        <pre id="helper-template-text-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Output for "Müllabholung Morgen" -->
<div id="helper-template-output-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-morgen')">Copy</button>
        <pre id="helper-template-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Ausgabe für "Müllabholung Text Morgen" -->
<div id="helper-template-output-text-morgen" style="display:none;">
    <div class="custom-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Text Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: none;">&#10003;</span>
    </div>
    <div class="code-container">
        <button class="copy-button" onclick="copyCode('helper-template-text-morgen')">Copy</button>
        <pre id="helper-template-text-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>
<button class="custom-button" onclick="showStep(5); createImageList();">Templates angelegt? Weiter zu den Dashboard-Karten!</button>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ███████ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██      
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
                                                                              
-->

<div id="step-5" style="display:none;">
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

<p class="description-text">
    Hier kann eine Schriftart für die Dashboard-Karte gewählt oder eine eigene eingetragen werden.
</p>
<div class="font-selection">
    <label for="fontSelection" class="custom-label">Schriftart auswählen:</label>
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
<div id="dashboard-options" class="dashboard-options">
    <!-- YAML-Ausgabefenster -->
    <div id="yaml-output-container" class="yaml-output-container">
        <h4 class="custom-title">Generierter YAML-Code</h4>
        <div class="yaml-code-container">
            <button class="copy-button" onclick="copyYAMLCode()">Copy</button>
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



<h3 class="custom-title">Gutes Gelingen!</h3>

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
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .api-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    /* Wichtiges Hinweis-Container */
    .important-container {
        background-color: rgba(255, 100, 0, 0.3);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 3px solid #ff0000;
    }
    .important-container h3 {
        color: #d12700;
        font-weight: bold;
        text-shadow: 2px 2px 5px #ffffff;
    }
    .important-container p {
        color: #383838;
        font-family: Arial Black;
    }
    .important-container strong {
        color: #d12700;
        text-transform: uppercase;
    }
    /* Hinweise */
    .note-container {
        background-color: rgba(117, 234, 255, 0.5);
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 3px solid #0062ff;
    }
    .note-container h3 {
        color: #0062ff;
        font-weight: bold;
        text-shadow: 2px 2px 5px #ffffff;
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
        margin-top: 30px;
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
        background-color: #e9e9e9;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
        background-color: #ffffff;
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
</style>

<!--
███████  ██████ ██████  ██ ██████  ████████ ███████ 
██      ██      ██   ██ ██ ██   ██    ██    ██      
███████ ██      ██████  ██ ██████     ██    █████   
     ██ ██      ██   ██ ██ ██         ██    ██      
███████  ██████ ██   ██ ██ ██         ██    ███████ 
                                                                              
-->

<script>
    async function fetchWasteSchedule(args) {
        const url = "https://api.abfall.io";
        const params = new URLSearchParams({
            key: args.apiKey,
            modus: "d6c5855a62cf32a4dadbc2831f0f295f",
            waction: "init"
        });

        const data = {
            f_id_kommune: args.kommuneId,
            f_id_bezirk: args.bezirkId,
            f_id_strasse: args.strasseId
        };

        try {
            const response = await fetch(`${url}?${params.toString()}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0"
                },
                body: new URLSearchParams(data)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP-Fehler ${response.status}: ${response.statusText} - ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const responseText = await response.text();
                throw new Error(`Ungültiges Antwortformat: ${responseText}`);
            }

            const result = await response.json();
            console.log("Abholungsdaten:", result);
            displayWasteEntries(result);
        } catch (error) {
            console.error("Fehler:", error);
            alert(`Fehler beim Abrufen der Daten: ${error.message}`);
        }
    }

    function handleFetchWasteSchedule() {
        const args = {
            apiKey: document.getElementById("apiKey").value.trim(),
            kommuneId: document.getElementById("kommuneId").value.trim(),
            bezirkId: document.getElementById("bezirkId").value.trim(),
            strasseId: document.getElementById("strasseId").value.trim()
        };

        if (!args.apiKey || !args.kommuneId || !args.bezirkId || !args.strasseId) {
            alert("Bitte alle Felder ausfüllen.");
            return;
        }

        fetchWasteSchedule(args);
    }


    document.addEventListener("DOMContentLoaded", function() {
        try {
            const nextPickupTemplate = `{% raw %}{{ value.types | join(", ") }}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const individualPickupTemplate = `{% raw %}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            
            document.getElementById("next-pickup-template").textContent = nextPickupTemplate;
            document.getElementById("individual-pickup-template").textContent = individualPickupTemplate;

        } catch (error) {
            console.error("Error during DOMContentLoaded setup:", error);
        }
    });
    function showStep(stepNumber) {
        // Alle Abschnitte anzeigen, die kleiner oder gleich der aktuellen Schritt-Nummer sind
        for (let i = 1; i <= 5; i++) {
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
            entryTableBody.innerHTML = "Lade und verarbeite Daten...";
    
            let icsData;
    
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                icsData = await file.text();
            } else if (urlInput.value) {
                try {
                    const response = await fetch(urlInput.value);
                    if (!response.ok) throw new Error("ICS-Datei konnte nicht geladen werden.");
                    icsData = await response.text();
                } catch (error) {
                    entryTableBody.innerHTML = `<tr><td colspan="3">Fehler beim Laden der ICS-Datei: ${error.message}</td></tr>`;
                    console.error("Fetch error:", error);
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
    
                    // Überprüfen, ob Ziffern oder Punkte enthalten sind
                    if (/\d|\./.test(summaryText)) {
                        invalidEntries.push(summaryText);
                    }
                }
            }
    
            // Falls ungültige Einträge gefunden wurden
            if (invalidEntries.length > 0) {
                const proceed = await showCustomDecision(
                    "Ungültige Einträge gefunden",
                    "Folgende Einträge enthalten Ziffern oder Punkte:",
                    invalidEntries
                );
                if (!proceed) {
                    showCustomAlert(
                        "Verarbeitung abgebrochen!",
                        "Die Verarbeitung wurde wegen ungültiger Einträge abgebrochen. Bitte überprüfe die ICS-Datei."
                    );
                    return; // Abbrechen der Verarbeitung
                }
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
        document.getElementById("template-header").style.display = "block";
        document.getElementById("code-output").style.display = "block";
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
            copyToClipboard("Nächste Abholung", standardCopyStatusCell); // Name wird kopiert
        };
        standardRow.appendChild(standardNameCell);

        // Kopiert-Status
        const standardCopyStatusCell = document.createElement("td");
        standardCopyStatusCell.innerHTML = '<span class="copy-checkmark" style="display: none;">✔️</span>';
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
                copyToClipboard(customName, copyStatusCell); // Name wird kopiert
            };
            sensorRow.appendChild(customNameCell);

            // Kopiert-Status
            const copyStatusCell = document.createElement("td");
            copyStatusCell.innerHTML = '<span class="copy-checkmark" style="display: none;">✔️</span>';
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

    function copyToClipboard(textToCopy, statusCell) {
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
            // Nur das entsprechende Bestätigungs-Icon anzeigen
            const confirmationIcon = element.parentElement.querySelector('.copy-confirmation');
            confirmationIcon.style.display = 'inline';
            
            // Nach 2 Sekunden das Icon wieder ausblenden
            setTimeout(() => {
                confirmationIcon.style.display = 'none';
            }, 2000);
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

    function copyCode(elementId) {
        const codeElement = document.getElementById(elementId);
        const codeText = codeElement.innerText || codeElement.textContent;

        navigator.clipboard.writeText(codeText)
            .then(() => {
                showCustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!"); // Zeigt das benutzerdefinierte Fenster
            })
            .catch(err => {
                console.error("Fehler beim Kopieren des Codes: ", err);
                showCustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten."); // Fehlerhinweis
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

        const blinkend = document.getElementById("blinkendCheckbox").checked;
        const styleUsed = document.getElementById("styleUseCheckbox").checked;
        const styleUnused = !document.getElementById("styleUseCheckbox").checked;
        const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value; // "heute" oder "morgen",
        const darstellung = document.getElementById("darstellungAuswahl").value; // "einzeilig" oder "mehrzeilig"
        const selectedFont = getSelectedFont(); // Funktion zur Auswahl der Schriftart
        const StyleHintergrund = document.getElementById("backgroundSelect").value;
        const StyleRahmenStil = document.getElementById("borderStyleSelect").value;
        const StyleRahmenEcke = document.getElementById("borderShapeSelect").value;

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

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${imageName}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
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

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor1.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
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

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor2.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
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
            });
        }

        // Setze den generierten YAML-Code in das `pre`-Tag
        const yamlOutput = document.getElementById("yaml-code-output");
        yamlOutput.innerHTML = `<code>${yaml}</code>`;
    }

    function copyYAMLCode() {
        const yamlCodeOutput = document.getElementById("yaml-code-output");
        const codeText = yamlCodeOutput.textContent;

        navigator.clipboard.writeText(codeText)
            .then(() => {
                showCustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!"); // Erfolgsnachricht
            })
            .catch(err => {
                console.error("Fehler beim Kopieren des Codes:", err);
                showCustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten."); // Fehlermeldung
            });
    }

    // Update both the example card and YAML code
    document.getElementById("update-example-and-code").addEventListener("click", () => {
        updateExampleCard();
        generateCardYAML();
    });
</script>


