---
title: Floorplan Button Position Generator
subtitle: Erstelle Buttons auf dem Home Assistant Picture Elements Floorplan
description: Generiere YAML-Code für Home Assistant anhand der Markierungen und Positionen.
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
<section class="content-section">

<h1 class="floorplan-main-title">Floorplan Button Positionierung</h1>

<h2 class="floorplan-main-subtitle">Positioniere deine Buttons für alle Entitäten direkt auf deinem Floorplan</h2>

<p class="floorplan-main-intro">
    Mit diesem Tool kannst du durch Eingabe der Angaben zu deinen Entitäten, die Buttons direkt auf deinem Floorplan-Hintergrund positionieren. Nach der Positionierung, generierst du dir den YAML-Code um diesen direkt auf deinem Home Assistant Dashboard Floorplan einzutragen.
</p>

<h3>Entitätenliste mit Home Assistant abfragen</h3>

<p>
    Mit dem folgenden Tool kannst du für die ausgewählte Domain (z. B. <code>light</code>, <code>switch</code>, <code>binary_sensor</code> usw.) den passenden Template-Code generieren, um alle Entitäten dieser Domain in einer Liste auszugeben. 
    Kopiere den Code und füge ihn in deinen Template-Editor in den Home Assistant Entwicklerwerkzeugen ein.<br>
    Als Ergebnis erhällst du eine Liste aller Entitäten dieser Domain.<br> 
    Diese kannst du kopieren und entweder direkt hier einfügen oder eine .csv oder .txt Datei erstellen und diese hier einfügen
</p>

<div class="floorplan-form-group">
    <label for="domain-select">Wähle eine Domain:</label>
    <select id="domain-select" onchange="updateTemplateCode()">
        <option value="light">light</option>
        <option value="switch">switch</option>
        <option value="input_boolean">input_boolean</option>
        <option value="binary_sensor">binary_sensor</option>
    </select>
</div>

<div class="code-container">
    <button class="copy-button" onclick="copyCode('template-output', this)">Code kopieren</button>
    <pre id="template-output">
        <code>
{%- raw %}
{%- set light_entities = states.light | map(attribute='entity_id') | list -%}
{{ light_entities | join('\n') }}{% endraw -%}
        </code>
    </pre>
</div>

<div class="floorplan-form-group">
    <label for="entity-list-upload">Entitäten-Liste hochladen oder einfügen:</label>
    <input type="file" id="entity-list-upload" accept=".txt,.csv" onchange="loadEntityList(event)" style="margin-bottom: 10px;">
    <textarea class="textarea-list" id="entity-list-text" placeholder="Entitäten manuell eingeben (eine pro Zeile)" rows="5" style="width: 100%;"></textarea>
        <div class="entity-preview-container" id="entity-preview" style="display: none; margin-top: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
            <h4>Hochgeladene Entitäten</h4>
            <textarea id="uploaded-entity-list" rows="10" style="width: 100%;" readonly></textarea>
        </div>
    <button class="custom-button" onclick="updateEntityDropdown()">Entitäten-Liste aktualisieren</button>
</div>
</section>


<section class="content-section">
<h3>Bild hochladen</h3>

<p>
    Lade ein Bild hoch, fülle die gewünschten Button-Einstellungen aus, und klicke dann auf die Position im Bild, an der der Button platziert werden soll. Für jede Positionierung kannst du unterschiedliche Einstellungen, wie Entität, Icons, und Aktionen (Tap/Hold), angeben. Nachdem du alle gewünschten Buttons gesetzt hast, klicke auf "YAML-Code generieren". Der erstellte YAML-Code wird unten angezeigt und kann kopiert werden, um ihn in dein Home Assistant-Dashboard einzufügen.
</p>

<!-- Bild-Upload -->
<div class="floorplan-form-group">
    <label for="image-upload" class="custom-label">Bild hochladen:</label>
    <input type="file" id="image-upload" class="custom-input" accept="image/*">
<p id="image-dimensions">Bildabmessungen: Noch kein Bild hochgeladen</p>
</div>

<!-- Bildcontainer -->
<div class="floorplan-container" id="container" style="display: none;">
    <img src="" alt="Floorplan" id="floorplan">
    <div class="floorplan-coords" id="coords">left: 0%, top: 0%</div>
</div>
</section>

<section class="content-section">
<!-- Formular für zusätzliche Angaben -->
<h3>Button-Einstellungen</h3>
<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Um die Buttons am Floorplan darzustellen ist die HACS Integration <strong>"Button Card"</strong> notwendig.<br>
        Diese Integration ist unbedingt vorab zu installieren!
    </p>
</div>
<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('tutorialDropdown', this)">
        Wie positioniere ich die Buttons auf dem Bild?<span>&#9660;</span>
    </button>
    <div id="tutorialDropdown" class="dropdown-content" style="display: none; padding: 10px; text-align: left; line-height: 1.5;">
        <p><strong>Schritt-für-Schritt-Anleitung:</strong></p>
        <ol>
            <li>Wähle eine Entität aus der Liste aus</li>
            <li>Trage den Speicherpfad deiner Icons (Home Assistant) ein. Vorschlag: /local/lovelace/icon/</li>
            <li>Wähle ein Icon, welches beim Zustand <em>"AN"</em> deiner Entität angezeigt werden soll oder gib einen eigenen Namen ein.</li>
            <li>Wähle ein Icon, welches beim Zustand <em>"AUS"</em> deiner Entität angezeigt werden soll oder gib einen eigenen Namen ein.</li>
            <li>Trage den Namen des Icons ein, welches bei einem Fehler der Entität angezeigt werden soll. Vorschlag: fehler.png</li>
            <li>Wähle eine Breite des Buttons auf dem Floorplan. Voreingestellt: <em>2</em>.</li>
            <li>Wähle die Form des Buttons.</li>
            <li>Wähle eine <em>Tap</em>- und eine <em>Hold Action</em>.</li>
        </ol>
        <p>
            Wenn alles ausgewählt ist, klicke auf das Bild, um die Position des Buttons zu setzen.<br>
            In der Tabelle werden alle Einstellungen als Information angezeigt. Ausgewählte Icons können mit einem Klick daruf heruntergeladen werden.
        </p>
        <p><strong>Für die nächste Entität:</strong></p>
        <ul>
            <li>Ändere die Eingaben in den Punkten 1–8, die für die neue Entität gelten.</li>
            <li>Klicke dann erneut auf das Bild, um die neue Entität zu positionieren.</li>
        </ul>
        <p>Fahre so mit all deinen Entitäten fort, bis alle Buttons positioniert sind.</p>
        <p><strong>Zum Schluss:</strong></p>
        <ul>
            <li>Klicke auf <em>YAML-Code generieren</em>, um den Code zu erhalten.</li>
        </ul>
        <p><strong>Hinweis:</strong> Falls dir Fehler unterlaufen, kannst du mit den unteren Buttons Markierungen entfernen oder den YAML-Code löschen.</p>
        <p><strong>Viel Erfolg! 🎉</strong></p>
    </div>
</div>    

<div class="floorplan-marker-form">
    <div class="floorplan-form-group-full">
        <label for="marker-entity">Entität (entity):</label>
        <select id="marker-entity">
            <option value="">Bitte auswählen...</option>
            <!-- Dynamisch hinzugefügte Optionen -->
        </select>
    </div>  
    <div class="floorplan-form-group-full">
        <label for="marker-path">Speicherpfad der Icons:</label>
        <input type="text" id="marker-path" placeholder="/local/lovelace/icon/">
    </div>    
    <div class="floorplan-form-group-full">
        <label for="icon-dropdown">Icon im Zustand 'An':</label>
        <div class="custom-dropdown">
            <button id="on-icon-button" class="custom-dropdown-button" onclick="toggleIconDropdown()">Bitte auswählen...</button>
            <div class="custom-dropdown-content" id="icon-dropdown">
                <!-- Dynamisch generierte Icons -->
            </div>
        </div>
        <input type="text" id="custom-on-icon" placeholder="Eigenen Namen eingeben" style="margin-top: 10px; width: 100%;">
        <input type="hidden" id="selected-icon" name="selected-icon">
    </div>
    <div class="floorplan-form-group-full">
        <label for="off-icon-dropdown">Icon im Zustand 'Aus':</label>
        <div class="custom-dropdown">
            <button id="off-icon-button" class="custom-dropdown-button" onclick="toggleOffIconDropdown()">Bitte auswählen...</button>
            <div class="custom-dropdown-content" id="off-icon-dropdown">
                <!-- Dynamisch generierte Icons -->
            </div>
        </div>
        <input type="text" id="custom-off-icon" placeholder="Eigenen Namen eingeben" style="margin-top: 10px; width: 100%;">
        <input type="hidden" id="selected-off-icon" name="selected-off-icon">
    </div>
    <div class="floorplan-form-group-full">
        <label for="marker-default-icon">Icon bei Fehler:</label>
        <input type="text" id="marker-default-icon" value="fehler.png">
    </div>        
    <div class="floorplan-form-group-full">
        <label for="marker-size">Größe des Icons (%):</label>
        <input type="text" id="marker-size" value="2">
    </div>    
    <!-- Auswahl für die Form des Markers -->
    <div class="floorplan-form-group-full">
        <label for="marker-shape">Form des Buttons:</label>
        <select id="marker-shape">
            <option value="50%">Rund</option>
            <option value="0%">Eckig</option>
            <option value="10%">Abgerundet</option>
        </select>
    </div>
</div>

<!-- Auswahl für die Tap- und Hold-Action mit jeweiligen Navigationspfaden -->
<div class="floorplan-marker-form">
    <div class="floorplan-form-group-full">
        <label for="marker-tap-action">Tap Action:</label>
        <select id="marker-tap-action" onchange="toggleNavigationPathInput('tap')">
            <option value="toggle">Umschalten</option>
            <option value="none">Keine</option>
            <option value="more-info">Mehr Info</option>
            <option value="navigate">Navigieren</option>
            <option value="call-service">Taster</option>
            <option value="fire-dom-event">Pop-Up</option>
        </select>
        <input type="text" id="navigation-path-tap" placeholder="Pfad für Navigation (Tap)" style="display:none; margin-top: 5px;">
    </div>
    <div class="floorplan-form-group-full">
        <label for="marker-hold-action">Hold Action:</label>
        <select id="marker-hold-action" onchange="toggleNavigationPathInput('hold')">
            <option value="more-info" selected>Mehr Info</option>
            <option value="none">Keine</option>
            <option value="toggle">Umschalten</option>
            <option value="navigate">Navigieren</option>
            <option value="call-service">Taster</option>
            <option value="fire-dom-event">Pop-Up</option>
        </select>
        <input type="text" id="navigation-path-hold" placeholder="Pfad für Navigation (Hold)" style="display:none; margin-top: 5px;">
    </div>
</div>

<!-- Eingabefelder für den Navigationspfad, nur sichtbar, wenn "Navigieren" ausgewählt ist -->
<div class="floorplan-form-group" id="navigation-path-group-tap" style="display: none;">
    <label for="navigation-path-tap">Navigationspfad (Tap):</label>
    <input type="text" id="navigation-path-tap" placeholder="Pfad für Navigation (Tap)">
</div>

<div class="floorplan-form-group" id="navigation-path-group-hold" style="display: none;">
    <label for="navigation-path-hold">Navigationspfad (Hold):</label>
    <input type="text" id="navigation-path-hold" placeholder="Pfad für Navigation (Hold)">
</div>
</section>

<section class="content-section">
<h3>Markierte Positionen:</h3>

<table id="position-table" border="1" style="width: 100%; text-align: left; border-collapse: collapse;">
    <thead>
        <tr>
            <th>Position</th>
            <th>Entität</th>
            <th>Icon-Pfad</th>
            <th>Fehler-Icon</th>
            <th>An-Icon</th>
            <th>Aus-Icon</th>
            <th>Größe (%)</th>
            <th>Form</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamisch generierte Einträge -->
    </tbody>
</table>
</section>

<section class="content-section">
<div class="floorplan-button-container">
    <button class="floorplan-button floorplan-button-primary" onclick="generateYAML()">YAML-Code generieren</button>
    <button class="floorplan-button floorplan-button-info" onclick="copyYAML()">YAML-Code kopieren</button>
    <button class="floorplan-button floorplan-button-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
    <button class="floorplan-button floorplan-button-danger" onclick="clearYAML()">YAML-Code löschen</button>
</div>

<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>
</section>

<footer class="guide-footer">
    <h2>Viel Erfolg bei der Positionierung deiner Buttons! 🎉</h2>
</footer>

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
        color: #1598b3;
        font-size: 1.75em;
        margin-bottom: 10px;
    }

    .content h1 {
        color: #1598b3
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
    .entity-preview-container {
        background-color: #9fb9fb;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 15px;
        margin: 10px 0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .entity-preview-container h4 {
        margin-bottom: 10px;
        color: #333;
        font-size: 16px;
        font-weight: bold;
    }

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
        white-space: pre-wrap;
    }

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
        transition: background-color 0.3s, transform 0.2s;
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
    .custom-input, select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        max-width: 100%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
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

    .floorplan-main-container {
        max-width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .floorplan-main-title {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 10px;
    }
    .floorplan-main-subtitle {
        text-align: center;
        color: #666;
        font-size: 1.4em;
        margin-bottom: 20px;
    }
    .floorplan-main-intro {
        text-align: center;
        color: #555;
        margin-bottom: 20px;
    }
    .custom-form-group {
        margin-top: 20px;
    }
    .custom-label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .floorplan-container {
        position: relative;
        display: inline-block;
        margin-top: 20px;
        border: 1px solid #ddd;
        padding: 0;
        background-color: #f9f9f9;
        border-radius: 8px;
        margin-bottom: 20px;
    }
    img {
        display: block;
        cursor: crosshair;
    }
    .floorplan-coords {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 14px;
        display: none;
    }
    .floorplan-container:hover .floorplan-coords {
        display: block;
    }
    .floorplan-marker {
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    .floorplan-marker-form {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-top: 20px;
    }
    .floorplan-form-group, .floorplan-form-group-full {
        display: flex;
        flex-direction: column;
    }
    .floorplan-form-group label, .floorplan-form-group-full label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .floorplan-form-group input, .floorplan-form-group select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        max-width: 30%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .floorplan-form-group-full input, .floorplan-form-group-full select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        max-width: 100%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    .floorplan-button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .floorplan-button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .floorplan-button-primary {
        background-color: #007bff;
        color: #fff;
    }
    .floorplan-button-info {
        background-color: #17a2b8;
        color: #fff;
    }
    .floorplan-button-warning {
        background-color: #ffc107;
        color: #fff;
    }
    .floorplan-button-danger {
        background-color: #dc3545;
        color: #fff;
    }
    .textarea-list {
        width:100%;
        background-color: #c3c3c3;
        color: #000000;
        font-size: 0.9em;
        font-weight: bold;
        padding: 10px;
        margin-bottom: 10px;
    }
    #yaml-output {
        width: 100%;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #f8f8f8;
    }
    .floorplan-form-group-horizontal {
        display: flex;
        gap: 10px;
    }
    
    .floorplan-form-group-horizontal .floorplan-form-group {
        flex: 1;
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
        width: 8%;
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
    .guide-footer {
    text-align: center;
    margin-top: 20px;
    }
    #marker-on-icon option {
        padding: 10px;
        display: flex;
        align-items: center;
    }

    #marker-on-icon img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        vertical-align: middle;
    }
    .custom-dropdown {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .custom-dropdown-button {
        background-color: #e9e9e9;
        color: #000000;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 100%;
        text-align: left;
        cursor: pointer;
    }

    .custom-dropdown-button::after {
        content: "▼";
        float: right;
        margin-right: 10px;
        color: #000000;
    }

    .custom-dropdown-content {
        display: none;
        position: absolute;
        background-color: #6b6b6b;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        width: 100%;
    }

    .custom-dropdown-content div {
        padding: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
        color: #fff;
    }

    .custom-dropdown-content div:hover {
        background-color: #555;
    }

    .custom-dropdown-content img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    /* Tabelle allgemein */
    #position-table {
        width: 100%;
        border-collapse: collapse;
        background-color: #6b6b6b; /* Passend zum Dropdown-Hintergrund */
        color: #fff; /* Weiße Schrift */
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        overflow: hidden;
    }

    /* Kopfzeile der Tabelle */
    #position-table th {
        background-color: #555; /* Passend zur Hover-Farbe des Dropdowns */
        color: #fff; /* Weiße Schrift */
        font-weight: bold;
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    /* Zellen der Tabelle */
    #position-table td {
        background-color: #6b6b6b; /* Dunkler Hintergrund für die Zellen */
        color: #fff; /* Weiße Schrift */
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    /* Zellen mit Bildern */
    #position-table td img {
        display: block;
        margin: auto; /* Zentriert das Bild in der Zelle */
        max-width: 24px;
        max-height: 24px;
        border-radius: 5px; /* Leicht abgerundete Ecken für die Bilder */
    }

    /* Hover-Effekt für Tabellenzeilen */
    #position-table tr:hover {
        background-color: #555; /* Gleiche Hover-Farbe wie Dropdown-Einträge */
        transition: background-color 0.3s ease;
    }

    /* Alternative Zeilenfarbe für bessere Übersicht */
    #position-table tr:nth-child(even) td {
        background-color: #5a5a5a; /* Etwas hellere Farbe für gerade Zeilen */
    }

    /* Text in den Zellen */
    #position-table td {
        font-size: 14px;
        line-height: 1.5;
    }

    /* Zentrierung der Tabelle */
    #position-table {
        margin-top: 20px;
        border-radius: 5px;
    }


</style>

<script>

function updateTemplateCode() {
    const domain = document.getElementById('domain-select').value;
    const codeElement = document.querySelector('#template-output code');

    // Neuer Code mit RAW-Block
    const templateCode = `{%- raw %}
{%- set ${domain}_entities = states.${domain} | map(attribute='entity_id') | list -%}
{{ ${domain}_entities | join('\\n') }}{% endraw -%}`;

    // Aktualisiere den Inhalt des <code>-Elements
    codeElement.innerText = templateCode;
}

// Initialer Template-Code für die Standardauswahl "light"
updateTemplateCode();

function copyCode(elementId, button) {
    const codeElement = document.getElementById(elementId);
    const codeText = codeElement.innerText || codeElement.textContent;

    navigator.clipboard.writeText(codeText)
        .then(() => {
            showCustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!");

            button.classList.add('copied');
            button.textContent = "Kopiert ✔️";
        })
        .catch(err => {
            console.error("Fehler beim Kopieren des Codes: ", err);
            showCustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten.");
        });
}

function showCustomAlert(title, message) {
    const alertBox = document.getElementById("custom-alert");
    const alertTitle = document.getElementById("custom-alert-title");
    const alertMessage = document.getElementById("custom-alert-message");

    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertBox.style.display = "flex";

    document.getElementById("close-alert").onclick = function () {
        alertBox.style.display = "none";
    };
}

let entityList = [];

// Funktion zum Hochladen der Entitäten-Liste aus einer Datei
function loadEntityList(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const fileEntities = content
                .split('\n')
                .map(item => item.trim())
                .filter(item => item); // Entfernt leere Zeilen

            // Setze die Liste zurück und entferne Duplikate
            entityList = [...new Set(fileEntities)];

            // Zeige die hochgeladenen Entitäten in der Vorschau
            const previewContainer = document.getElementById("entity-preview");
            const previewTextarea = document.getElementById("uploaded-entity-list");
            previewTextarea.value = entityList.join('\n'); // Zeige die Liste im Textbereich an
            previewContainer.style.display = "block"; // Zeige die Vorschau an
        };
        reader.readAsText(file);
    }
}

// Funktion zum Aktualisieren der Dropdown-Liste mit Entitäten
function updateEntityDropdown() {
    // Manuell eingegebene Entitäten
    const textareaContent = document.getElementById('entity-list-text').value;
    const manualEntities = textareaContent
        .split('\n')
        .map(item => item.trim())
        .filter(item => item); // Entfernt leere Einträge

    // Kombiniere hochgeladene und manuell eingegebene Entitäten
    entityList = [...new Set([...entityList, ...manualEntities])];

    // Aktualisiere das Dropdown
    const entityDropdown = document.getElementById('marker-entity');
    entityDropdown.innerHTML = '<option value="">Bitte auswählen...</option>'; // Dropdown zurücksetzen

    entityList.forEach(entity => {
        const option = document.createElement('option');
        option.value = entity;
        option.textContent = entity;
        entityDropdown.appendChild(option);
    });

    // Zeige Erfolgsmeldung
    showCustomAlert("ERFOLG!", "Die Entitäten-Liste wurde erfolgreich aktualisiert!");

    // Leere das Vorschaulisten-Fenster nach Aktualisierung
    const previewContainer = document.getElementById("entity-preview");
    const previewTextarea = document.getElementById("uploaded-entity-list");
    previewTextarea.value = ""; // Vorschauliste leeren
    previewContainer.style.display = "none"; // Verstecke die Vorschau
}

function toggleDropdown() {
    const dropdown = document.getElementById("iconDropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Funktion für On-Icon-Dropdown
function toggleIconDropdown() {
    const dropdown = document.getElementById("icon-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function populateIconDropdown() {
    const icons = [
        "decke_on.png",
        "led_on.png",
        "spot_on.png",
        "haengeleuchte_on.png",
        "schreibtisch_on.png",
        "nachttisch_on.png",
        "wand_on.png",
        "birne_on.png",
        "kerzen_on.png",
        "sideboard_on.png",
        "tuere_on.png",
        "ventilator_on.png",
        "videoleuchte_on.png",
        "onair_on.png",
        "musik_on.png",
        "tv_on.png",
        "playstation_on.png",
        "heizung_on.png",
        "vollbild_on.png",
        "gute_nacht_on.png",
        "guten_morgen_on.png",
        "zuhause_on.png"
    ];

    const dropdownContent = document.getElementById("icon-dropdown");
    dropdownContent.innerHTML = ""; // Löscht vorherige Einträge

    icons.forEach(icon => {
        const div = document.createElement("div");
        div.innerHTML = `<img src="/img/icons/${icon}" alt="${icon}"> ${icon}`;
        div.onclick = function () {
            document.getElementById("on-icon-button").textContent = icon;
            document.getElementById("selected-icon").value = icon;
            document.getElementById("custom-on-icon").value = ""; // Leert das eigene Eingabefeld
            dropdownContent.style.display = "none";
        };
        dropdownContent.appendChild(div);
    });
}

// Überwacht die eigene Eingabe für On-Icon
document.getElementById("custom-on-icon").addEventListener("input", function () {
    const customInput = document.getElementById("custom-on-icon").value;
    if (customInput) {
        document.getElementById("on-icon-button").textContent = customInput;
        document.getElementById("selected-icon").value = customInput;
    }
});

// Funktion für Off-Icon-Dropdown
function toggleOffIconDropdown() {
    const dropdown = document.getElementById("off-icon-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function populateOffIconDropdown() {
    const icons = [
        "decke_off.png",
        "led_off.png",
        "spot_off.png",
        "haengeleuchte_off.png",
        "schreibtisch_off.png",
        "nachttisch_off.png",
        "wand_off.png",
        "birne_off.png",
        "kerzen_off.png",
        "sideboard_off.png",
        "tuere_off.png",
        "ventilator_off.png",
        "videoleuchte_off.png",
        "onair_off.png",
        "musik_off.png",
        "tv_off.png",
        "playstation_off.png",
        "heizung_off.png",
        "vollbild_off.png",
        "gute_nacht_off.png",
        "guten_morgen_off.png",
        "zuhause_off.png"
    ];

    const dropdownContent = document.getElementById("off-icon-dropdown");
    dropdownContent.innerHTML = ""; // Löscht vorherige Einträge

    icons.forEach(icon => {
        const div = document.createElement("div");
        div.innerHTML = `<img src="/img/icons/${icon}" alt="${icon}"> ${icon}`;
        div.onclick = function () {
            document.getElementById("off-icon-button").textContent = icon;
            document.getElementById("selected-off-icon").value = icon;
            document.getElementById("custom-off-icon").value = ""; // Leert das eigene Eingabefeld
            dropdownContent.style.display = "none";
        };
        dropdownContent.appendChild(div);
    });
}

// Überwacht die eigene Eingabe für Off-Icon
document.getElementById("custom-off-icon").addEventListener("input", function () {
    const customInput = document.getElementById("custom-off-icon").value;
    if (customInput) {
        document.getElementById("off-icon-button").textContent = customInput;
        document.getElementById("selected-off-icon").value = customInput;
    }
});

// Initialisiere beide Dropdowns
populateIconDropdown();
populateOffIconDropdown();



// JavaScript zur Markierungserstellung, Bild-Upload und Anzeige der Bildabmessungen
const img = document.getElementById('floorplan');
const coordsDisplay = document.getElementById('coords');
const container = document.getElementById('container');
const imageUpload = document.getElementById('image-upload');
const imageDimensions = document.getElementById('image-dimensions');
const yamlOutput = document.getElementById('yaml-output');

// Speichert die Daten der Markierungen für die YAML-Generierung
let markers = [];

img.addEventListener('mousemove', (event) => {
  const rect = img.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  coordsDisplay.textContent = `left: ${xPercent.toFixed(2)}%, top: ${yPercent.toFixed(2)}%`;
});

function toggleCustomIconInput(state) {
    const customInput = document.getElementById(`custom-${state}-icon`);
    const select = document.getElementById(`marker-${state}-icon`);
    if (select.value === "custom") {
        customInput.style.display = "block";
    } else {
        customInput.style.display = "none";
    }
}

img.addEventListener('click', (event) => {
    const rect = img.getBoundingClientRect();
    const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

    const shape = document.getElementById('marker-shape').value;

    const marker = document.createElement('div');
    marker.classList.add('floorplan-marker');
    marker.style.left = `${xPercent}%`;
    marker.style.top = `${yPercent}%`;
    marker.style.borderRadius = shape;
    container.appendChild(marker);

    // Icons für Zustand "An" und "Aus" mit Priorität für benutzerdefinierte Eingabe
    const selectedOnIcon = document.getElementById("selected-icon").value; // Dropdown-Auswahl
    const customOnIcon = document.getElementById("custom-on-icon").value; // Benutzerdefinierter Name
    const onIcon = customOnIcon || selectedOnIcon;

    const selectedOffIcon = document.getElementById("selected-off-icon").value; // Dropdown-Auswahl
    const customOffIcon = document.getElementById("custom-off-icon").value; // Benutzerdefinierter Name
    const offIcon = customOffIcon || selectedOffIcon;

    const newMarker = {
        x: xPercent.toFixed(2),
        y: yPercent.toFixed(2),
        entity: document.getElementById('marker-entity').value || "",
        path: document.getElementById('marker-path').value || "/local/lovelace/icon/",
        defaultIcon: document.getElementById('marker-default-icon').value || "fehler.png",
        onIcon: onIcon,
        offIcon: offIcon,
        size: document.getElementById('marker-size').value || "2",
        shape: shape,
        fromDropdownOn: !!selectedOnIcon && !customOnIcon, // True, wenn aus der Dropdown-Liste gewählt
        fromDropdownOff: !!selectedOffIcon && !customOffIcon // True, wenn aus der Dropdown-Liste gewählt
    };

    markers.push(newMarker);
    updatePositionTable(newMarker);
});

// Funktion zum Aktualisieren der Tabelle
function updatePositionTable(marker) {
    const tableBody = document.querySelector('#position-table tbody');
    const row = document.createElement('tr');

    // Zustand "An" Icon: Bild aus Dropdown oder benutzerdefinierter Name
    const onIconHTML = marker.fromDropdownOn
        ? `<a href="/img/icons/${marker.onIcon}" download="${marker.onIcon}">
                <img src="/img/icons/${marker.onIcon}" alt="${marker.onIcon}" style="width: 40px; height: 40px; cursor: pointer;">
           </a>`
        : `<span>${marker.onIcon}</span>`; // Benutzerdefinierter Name

    // Zustand "Aus" Icon: Bild aus Dropdown oder benutzerdefinierter Name
    const offIconHTML = marker.fromDropdownOff
        ? `<a href="/img/icons/${marker.offIcon}" download="${marker.offIcon}">
                <img src="/img/icons/${marker.offIcon}" alt="${marker.offIcon}" style="width: 40px; height: 40px; cursor: pointer;">
           </a>`
        : `<span>${marker.offIcon}</span>`; // Benutzerdefinierter Name

    // Default Icon: Bild oder benutzerdefinierter Name
    const defaultIconHTML = marker.defaultIcon === "fehler.png"
        ? `<a href="/img/icons/${marker.defaultIcon}" download="${marker.defaultIcon}">
                <img src="/img/icons/${marker.defaultIcon}" alt="${marker.defaultIcon}" style="width: 40px; height: 40px; cursor: pointer;">
           </a>`
        : `<span>${marker.defaultIcon}</span>`; // Benutzerdefinierter Name

    // Erstelle die Tabellenzeile
    row.innerHTML = `
        <td>left: ${marker.x}%, top: ${marker.y}%</td>
        <td>${marker.entity}</td>
        <td>${marker.path}</td>
        <td>${defaultIconHTML}</td>
        <td>${onIconHTML}</td>
        <td>${offIconHTML}</td>
        <td>${marker.size}</td>
        <td>${marker.shape === "50%" ? "Rund" : marker.shape === "0%" ? "Eckig" : "Abgerundet"}</td>
    `;

    tableBody.appendChild(row);
}

// Bild hochladen und anzeigen
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = function() {
        container.style.display = "block"; // Zeige den Container an
        container.style.width = `${img.width}px`;
        container.style.height = `${img.height}px`;
        removeMarkers();

        imageDimensions.textContent = `Bildabmessungen: Breite ${img.width}px, Höhe ${img.height}px`;
      };
    };
    reader.readAsDataURL(file);
  } else {
    container.style.display = "none"; // Verstecke den Container, wenn kein Bild vorhanden
    imageDimensions.textContent = "Bildabmessungen: Noch kein Bild hochgeladen";
  }
});

// Funktion zum Entfernen aller Markierungen im Bild
function removeMarkers() {
    // Entfernt alle Marker aus dem Bild
    document.querySelectorAll('.floorplan-marker').forEach(marker => marker.remove());
    markers = [];

    // Löscht alle Zeilen in der Tabelle außer dem Header
    const tableBody = document.querySelector('#position-table tbody');
    tableBody.innerHTML = ''; // Löscht alle Inhalte in der Tabelle
}

// Funktion zum Leeren des YAML-Code-Feldes
function clearYAML() {
  yamlOutput.value = '';
}

function toggleNavigationPathInput(actionType) {
  const tapPathInput = document.getElementById('navigation-path-tap');
  const holdPathInput = document.getElementById('navigation-path-hold');

  if (actionType === 'tap') {
    const tapAction = document.getElementById('marker-tap-action').value;
    tapPathInput.style.display = tapAction === 'navigate' ? 'block' : 'none';
  } else if (actionType === 'hold') {
    const holdAction = document.getElementById('marker-hold-action').value;
    holdPathInput.style.display = holdAction === 'navigate' ? 'block' : 'none';
  }
}


// Generiert YAML-Code basierend auf den Markierungen
function generateYAML() {
  let yaml = "";
  markers.forEach(marker => {
    yaml += `  - type: custom:button-card\n`;
    yaml += `    entity: ${marker.entity || "light.default_entity"}\n`;
    yaml += `    show_name: false\n`;
    yaml += `    show_entity_picture: true\n`;
    yaml += `    entity_picture: ${marker.path}${marker.defaultIcon}\n`;
    yaml += `    show_icon: false\n`;
    yaml += `    aspect_ratio: 1/1\n`;
    yaml += `    size: 100%\n`;
    yaml += `    styles:\n`;
    yaml += `      card:\n`;
    yaml += `        - border: 2px solid var(--state-icon-color)\n`;
    yaml += `        - border-radius: ${marker.shape}\n`;
    yaml += `        - background-color: var(--primary-background-color)\n`;
    yaml += `    state:\n`;
    yaml += `      - value: "on"\n`;
    yaml += `        entity_picture: ${marker.path}${marker.onIcon}\n`;
    yaml += `        styles:\n`;
    yaml += `          card:\n`;
    yaml += `            - border: 2px solid var(--primary-color)\n`;
    yaml += `      - value: "off"\n`;
    yaml += `        entity_picture: ${marker.path}${marker.offIcon}\n`;
    yaml += `        styles:\n`;
    yaml += `          card:\n`;
    yaml += `            - border: 2px solid var(--primary-color)\n`;

    // Tap Action Configuration
    const tapAction = document.getElementById("marker-tap-action").value;
    const entity = marker.entity;
    if (tapAction === "toggle") {
        yaml += `    tap_action:\n      action: toggle\n`;
    } else if (tapAction === "none") {
        yaml += `    tap_action:\n      action: none\n`;
    } else if (tapAction === "more-info") {
        yaml += `    tap_action:\n      action: more-info\n`;
    } else if (tapAction === "navigate") {
        const navigationPath = document.getElementById("navigation-path-tap").value;
        yaml += `    tap_action:\n      action: navigate\n      navigation_path: ${navigationPath || "/"}\n`;
    } else if (tapAction === "call-service") {
        yaml += `    tap_action:\n      action: call-service\n      service: input_button.press\n      service_data:\n        entity_id: ${entity}\n`;
    } else if (tapAction === "fire-dom-event") {
        yaml += `    tap_action:\n      action: fire-dom-event\n      browser_mod:\n        service: browser_mod.more_info\n        data:\n          entity: ${entity}\n`;
    }

    // Hold Action Configuration with default "Mehr Info"
    const holdAction = document.getElementById("marker-hold-action").value;
    if (holdAction === "toggle") {
        yaml += `    hold_action:\n      action: toggle\n`;
    } else if (holdAction === "none") {
        yaml += `    hold_action:\n      action: none\n`;
    } else if (holdAction === "navigate") {
        const navigationPath = document.getElementById("navigation-path-hold").value;
        yaml += `    hold_action:\n      action: navigate\n      navigation_path: ${navigationPath || "/"}\n`;
    } else if (holdAction === "call-service") {
        yaml += `    hold_action:\n      action: call-service\n      service: input_button.press\n      service_data:\n        entity_id: ${entity}\n`;
    } else if (holdAction === "fire-dom-event") {
        yaml += `    hold_action:\n      action: fire-dom-event\n      browser_mod:\n        service: browser_mod.more_info\n        data:\n          entity: ${entity}\n`;
    } else {
        // Standard "Mehr Info" für hold_action
        yaml += `    hold_action:\n      action: more-info\n`;
    }

    yaml += `    style:\n      left: ${marker.x}%\n      top: ${marker.y}%\n      width: ${marker.size}%\n\n`;
  });
  yamlOutput.value = yaml;
}


// Funktion zum Kopieren des YAML-Codes
function copyYAML() {
  yamlOutput.select();
  document.execCommand('copy');
  showCustomAlert('Super!', 'Dein YAML-Code wurde in die Zwischenablage kopiert!');
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
</script>
