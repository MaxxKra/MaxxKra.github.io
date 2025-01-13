---
title: Floorplan Beleuchtungsbilder Code Generator
subtitle: Erstelle Home Assistant Picture Elements Code der Beleuchtungsbilder
description: Generiere YAML-Code für Home Assistant
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
<h1 class="floorplan-title">Floorplan Beleuchtungsbilder</h1>

<h2 class="floorplan-subtitle">Erstelle die YAML-Codes für deine Beleuchtungsbilder</h2>

<p class="floorplan-intro">
    Was sind Beleuchtungsbilder?<br>
    Als Beleuchtungsbilder versteht man jene in Sweet Home 3D oder anderen 3D Planungstools generierte Bilder, welche den Zustand einzelner Beleuchtungs-Entitäten aus Home Assistant auf einzelnen Bildern darstellt. 
    Jedes dieser Entitäts-Bilder zeigt nur den ausgeleuchteten Raum, wohingegen der Rest des Bildes schwarz bleibt.<br>
    Dies ermöglicht eine anschauliche Visualisierung der Beleuchtung in deinem Smart Home.
</p>

<p>
    Beispiele und Erklärungen für Beleuchtungsbilder findest du im 🔽 Dropdown Menü 🔽.
</p>

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown', this)">Beleuchtungsbilder Beispiele<span>&#9660;</span></button>
    <div id="galleryDropdown" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_beleuchtungsbilder_example %}
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
</section>

<section class="content-section">
<h3>Entitätenliste mit Home Assistant abfragen</h3>

<p>
    Mit dem folgenden Tool kannst du für die ausgewählte Domain (z. B. <code>light</code>, <code>switch</code>, <code>binary_sensor</code> usw.) den passenden Template-Code generieren, um alle Entitäten dieser Domain in einer Liste auszugeben. 
    Kopiere den Code und füge ihn in deinen Template-Editor in den Home Assistant Entwicklerwerkzeugen ein.<br>
    Als Ergebnis erhälst du eine Liste aller Entitäten dieser Domain.<br> 
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
    <p>Um das Auswählen deiner Entitäten für die Codegenerierung einfacher zu gestalten, sind hier alle Entitäten für deine Beleuchtungsbilder einzugeben oder hochzuladen. Mit einem Klick auf <strong>Entitäten-Liste aktualisieren</strong> werden diese Entitäten in den Entität Dropdown der nachfolgenden Tabelle geladen.</p>
    <input type="file" id="entity-list-upload" accept=".txt,.csv" onchange="loadEntityList(event)" style="margin-bottom: 10px;">
    <textarea class="textarea-list" id="entity-list-text" placeholder="Entitäten manuell eingeben (eine pro Zeile)" rows="5;"></textarea>
        <div class="entity-preview-container" id="entity-preview" style="display: none; margin-top: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
            <h4>Hochgeladene Entitäten</h4>
            <textarea id="uploaded-entity-list" rows="10" style="width: 100%;" readonly></textarea>
        </div>
    <button class="custom-button generate" onclick="updateEntityDropdown()">Entitäten-Liste aktualisieren</button>
</div>
</section>

<section class="content-section">
<h3>Grundlegende Einstellungen</h3>

<p>
    Hier kannst du grundlegende Einstellungen vornehmen. Als erstes der Speicherpfad deiner Bilder und zum zweiten den Dateinamen deines transparenten 1 Pixel Bilds.
</p>
<p>
    Der Speicherpfad ist hier mit /local/lovelace/floorplan/ angegeben. Dies ist allerdings nur ein Vorschlag für eine übersichtliche Struktur. Lege dir die Ordner in deinem www-Ordner (/local/) nach deinen Bedürfnissen an oder verwende den vorgeschlagenen Pfad. Wichtig ist, dass der korrekte Pfad deiner Beleuchtungsbilder hier eingegeben wird.
</p>
<div class="floorplan-form-group">
    <label for="path-input">Speicherpfad der Floorplan Bilder:</label>
    <input type="text" id="path-input" value="/local/lovelace/floorplan/" placeholder="/local/lovelace/floorplan/">
</div>
<br>
<p>
    Da Beleuchtungsbilder für den Entitäts-Zustand "on" erstellt werden muss auch für den Zustand "off" ein Bild zur Verfügung stehen um keinen Fehler des Codes zu generieren. Dieses Bild ist in der Regel ein transparentes Bild mit nur einem Pixel.<br>
    Dieses sollte am selben Speicherort wie die Beleuchtungsbilder gespeichert sein. Der Namen dieses Bildes muss hier eingetragen werden.<br>
    Der Dateiname ist hier mit <strong>1x1_transparent.png</strong> voreingestellt. Dieser kann natürlich geändert werden. 
</p>
<br>
<div class="floorplan-form-group">
    <label for="transparent-image-input">Dateiname 1 Pixel Bild:</label>
    <input type="text" id="transparent-image-input" placeholder="1x1_transparent.png">
    <p style="margin-top: 10px;">
        Wenn du noch kein transparentes 1 Pixel Bild haben solltest, kannst du es 
        <a href="/img/floorplan/1x1_transparent.png" download class="download-link">hier herunterladen</a>.
    </p>
</div>
</section>

<section class="content-section">
<h3>Hintergrundbild hochladen</h3>

<p>
    An dieser Stelle kannst du dein Hintergrundbild (normalerweise der Grundriss bei Nacht) hochgeladen werden.<br>
    Dieses Hintergrundbild definiert die Größe deines Floorplans und muss das gleiche Format und die gleichen Abmessungen wie die Beleuchtungsbilder haben.<br>
    Eine Vorschau deines Hintergrundbilds wird nach dem Hochladen unten angezeigt.
</p>
<div class="floorplan-form-group">
    <label for="background-upload">Hintergrundbild hochladen:</label>
    <button class="file-upload-button" onclick="triggerBackgroundUpload()">Datei auswählen</button>
    <input type="file" id="background-upload" accept="image/*" onchange="handleBackgroundImageUpload()" style="display: none;">
    <span id="background-image-display" class="file-name-display">Kein Bild ausgewählt</span>
</div>
</section>

<section class="content-section">
<h3>Entitätsbilder Einstellungen</h3>

<p>
    In dieser Tabelle kannst du Zeile für Zeile einen Bezug deiner Entitäten zu den Beleuchtungsbildern und der Art (Option) deiner Beleuchtung herstellen.<br>
    Wähle dazu eine Entität aus dem Entität Dropdown aus und lade das zugehörige Beleuchtungsbild hoch.
</p>
<p>
    Wähle eine Option aus der Liste welche zu deiner Entität passt, z.B. Licht ein/aus, dimmbar, RGB, RGBW oder Abdeckung.<br>
    Bedenke bei der Option RGB, dass der Name deines Beleuchtungsbilds mit der Endung <strong>_farbe.png</strong> erstellt sein muss.<br>
    Bei der Option RGBW ist zusätzlich zum roten Beleuchtungsbild mit der Endung <strong>_farbe.png</strong> ein zusätzliches weißes Bild mit gleichem Namen aber der Endung <strong>_weiss.png</strong> in deinem Ordner zu speichern.<br>
    Für RGBW reicht es aus, das rote Bild hochzuladen. Der Codegenerator fügt das weiße Bild automatisch basierend auf dem roten Bildnamen ein. 
</p>
<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Um RGB bzw. RGBW Beleuchtungsbilder am Floorplan korrekt darzustellen ist die HACS Integration <strong>"Config Template Card"</strong> notwendig.<br>
        Diese Integration ist unbedingt vorab zu installieren!
    </p>
</div>
<p>
    Die von dir getroffenen Einstellungen und Namen der hochgeladenen Bilder werden automatisch in den YAML-Code übernommen und deine Bilder in der Vorschau angezeigt.
</p>

<table id="entities-table">
    <thead>
        <tr>
            <th>Entität (entity)</th>
            <th>Bild auswählen</th>
            <th>Option</th>
            <th>Aktionen</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <select class="entity-dropdown">
                    <option value="">Bitte auswählen...</option>
                </select>
            </td>
            <td>
                <button class="file-upload-button" onclick="triggerFileInput(this)">Datei auswählen</button>
                <input type="file" class="file-upload" accept="image/*" style="display: none;" onchange="handleFileUpload(this)">
            </td>
            <td>
                <select>
                    <option value="switch">Licht ein-aus</option>
                    <option value="dimmable">Licht dimmbar</option>
                    <option value="rgb">Licht RGB</option>
                    <option value="rgbw">Licht RGBW</option>
                    <option value="cover">Abdeckungen</option>
                </select>
            </td>
            <td><button class="action-button remove-button" onclick="removeRow(this)">&#x2212;</button></td>
        </tr>
    </tbody>
</table>

<button class="action-button add-button" onclick="addRow()">&#x2b;</button>
<br>
<h3 id="preview-heading" style="display: none;">Vorschau:</h3>
<div id="preview-container" class="blend-preview" style="position: relative; width: 100%; border: 1px solid #ddd; margin-top: 20px; display: none;">
    <img id="preview-background" alt="Hintergrundbild Vorschau" style="width: 100%; display: none;">
    <div id="preview-entities" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
</div>
</section>
<section class="content-section">
<br>
<div class="custom-button-container">
    <button class="custom-button generate" onclick="generateYAML()">YAML-Code generieren</button>
    <button class="custom-button copy" onclick="copyYAML()">YAML-Code kopieren</button>
    <button class="custom-button remove" onclick="clearYAML()">YAML-Code löschen</button>
    <button class="custom-button clear" onclick="clearInputs()">Eingaben löschen</button>
</div>

<h3>Generierter YAML-Code:</h3>

<p>
    Nach dem Ausfüllen der oben stehenden Felder und dem Drücken auf <strong>YAML-Code generieren</strong>, erscheint hier der fertige YAML-Code. Dieser wird mit einem Klick auf <strong>YAML-Code kopieren</strong> in die Zwischenablage kopiert und kann in deine Home Assistant Dashboard Konfiguration eingefügt werden, um die Grundlage deines Floorplans zu bilden. Mit <strong>YAML-Code löschen</strong> wird der erstellte Code gelöscht, mit <strong>Eingaben löschen werden alle bisherigen Eingaben inkl. Bilderpfad, transparentem Pixel und Hintergrundbild entfernt.</strong>
</p>

<textarea id="yaml-output" rows="20" cols="80" readonly></textarea>
</section>

<footer class="guide-footer">
    <h2>Viel Erfolg bei der Einrichtung deines Floorplans! 🎉</h2>
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
    .blend-preview {
        margin-top: 20px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #333333;
        text-align: center;
    }

    .blend-container {
        position: relative;
        display: inline-block;
        overflow: hidden;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #000;
    }

    .background-image {
        display: block;
        width: 100%;
        height: auto;
        position: relative;
        z-index: 1;
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
    #preview-entities img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        mix-blend-mode: lighten;
        z-index: 2;
        pointer-events: none;
        background-color: rgba(255, 255, 255, 0.5); /* Fallback */
    }

    .file-name-display {
        display: inline-block;
        color: #a7a7a7;
        font-size: 14px;
        font-weight: bold;
        margin-right: 10px;
    }

    .file-upload-button {
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 14px;
        cursor: pointer;
    }

    .file-upload-button:hover {
        background-color: #0056b3;
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
    .floorplan-container {
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
    .floorplan-title {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 10px;
    }
    .floorplan-subtitle {
        text-align: center;
        color: #666;
        font-size: 1.4em;
        margin-bottom: 20px;
    }
    .floorplan-intro {
        text-align: center;
        color: #d1d1d1;
        margin-bottom: 20px;
    }
    .floorplan-form-group {
        display: flex;
        flex-direction: column;
    }
    .floorplan-form-group label {
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
    .floorplan-form-group-horizontal {
        display: flex;
        gap: 10px;
    }
    
    .floorplan-form-group-horizontal .floorplan-form-group {
        flex: 1;
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
    .download-link {
        color: #007bff;
        text-decoration: underline;
    }
    .download-link:hover {
        color: #0056b3;
        text-decoration: none;
    }
    /* Tabellengestaltung */
    #entities-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 15px;
        margin-bottom: 20px;
    }
    #entities-table th, #entities-table td {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: left;
    }
    #entities-table th {
        background-color: #9fb9fb;
        font-weight: bold;
        color: #000000;
    }
    #entities-table td input, #entities-table td select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        width: 100%;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }
    /* Buttons für Zeilen hinzufügen und entfernen */
    .action-button {
        font-size: 20px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: #fff;
    }
    .add-button {
        background-color: #28a745;
        margin-top: 10px;
    }
    .remove-button {
        background-color: #dc3545;
    }

    /* Hauptbuttons Styling */
    .custom-button-container {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    .custom-button {
        padding: 10px 15px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
    }
    .custom-button.generate {
        background-color: #007bff;
    }
    .custom-button.copy {
        background-color: #17a2b8;
    }
    .custom-button.remove {
        background-color: #ffc107;
        color: #000;
    }
    .custom-button.clear {
        background-color: #dc3545;
    }

    /* YAML-Ausgabe Styling */
    #yaml-output {
        width: 100%;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #5d5d5d;
        color: #efefef;
        font-family: monospace;
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
    .guide-footer {
    text-align: center;
    margin-top: 20px;
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

    // Aktualisiere alle Dropdown-Menüs in der Tabelle
    const dropdowns = document.querySelectorAll('.entity-dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="">Bitte auswählen...</option>'; // Dropdown zurücksetzen
        entityList.forEach(entity => {
            const option = document.createElement('option');
            option.value = entity;
            option.textContent = entity;
            dropdown.appendChild(option);
        });
    });

    // Zeige Erfolgsmeldung
    showCustomAlert("ERFOLG!", "Die Entitäten-Liste wurde erfolgreich aktualisiert!");

    // Leere das Vorschaulisten-Fenster nach Aktualisierung
    const previewContainer = document.getElementById("entity-preview");
    const previewTextarea = document.getElementById("uploaded-entity-list");
    previewTextarea.value = ""; // Vorschauliste leeren
    previewContainer.style.display = "none"; // Verstecke die Vorschau
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

// Trigger den versteckten Datei-Upload-Input
function triggerFileInput(button) {
    const fileInput = button.nextElementSibling; // Verstecktes Input-Feld
    fileInput.click();
}

// Verarbeite den Dateiupload und aktualisiere den Dateinamen
function handleFileUpload(input) {
    const file = input.files[0];
    const fileButton = input.previousElementSibling; // Button "Datei auswählen"

    if (file) {
        fileButton.textContent = file.name; // Zeige den Dateinamen im Button
        input.dataset.filename = file.name; // Speichere den Dateinamen für die Vorschau und YAML-Generierung
    } else {
        fileButton.textContent = 'Datei auswählen';
        input.dataset.filename = ''; // Falls kein Bild ausgewählt ist
    }

    // Aktualisiere die Vorschau
    updatePreview();
}

// Trigger den versteckten Datei-Upload-Input für das Hintergrundbild
function triggerBackgroundUpload() {
    const fileInput = document.getElementById('background-upload');
    fileInput.click();
}

// Verarbeite den Dateiupload, aktualisiere den Dateinamen und die Vorschau
function handleBackgroundImageUpload() {
    const fileInput = document.getElementById('background-upload');
    const fileNameDisplay = document.getElementById('background-image-display');
    const previewBackground = document.getElementById('preview-background');
    const previewHeading = document.getElementById('preview-heading');
    const previewContainer = document.getElementById('preview-container');
    const file = fileInput.files[0];

    if (file) {
        // Zeige den Dateinamen an
        fileNameDisplay.textContent = file.name;

        // Speichere den Dateinamen für die YAML-Generierung
        fileInput.dataset.filename = file.name;

        // Aktualisiere die Vorschau mit dem hochgeladenen Bild
        previewBackground.src = URL.createObjectURL(file);
        previewBackground.style.display = 'block';

        // Zeige die Vorschau und die Überschrift an
        previewHeading.style.display = 'block';
        previewContainer.style.display = 'block';
    } else {
        // Kein Bild ausgewählt
        fileNameDisplay.textContent = 'Kein Bild ausgewählt';
        previewBackground.src = '';
        previewBackground.style.display = 'none';

        // Verstecke die Vorschau und die Überschrift
        previewHeading.style.display = 'none';
        previewContainer.style.display = 'none';
    }

    // Aktualisiere die Vorschau mit Entitätsbildern (falls vorhanden)
    updatePreview();
}

function updatePreview() {
    const path = document.getElementById('path-input').value.trim();
    const backgroundUploadInput = document.getElementById('background-upload');
    const previewBackground = document.getElementById('preview-background');
    const previewEntities = document.getElementById('preview-entities');

    // Aktualisiere das Hintergrundbild
    if (backgroundUploadInput.files[0]) {
        previewBackground.src = URL.createObjectURL(backgroundUploadInput.files[0]);
        previewBackground.style.display = 'block';
    } else if (backgroundUploadInput.dataset.filename) {
        previewBackground.src = `${path}${backgroundUploadInput.dataset.filename}`;
        previewBackground.style.display = 'block';
    } else {
        previewBackground.src = '';
        previewBackground.style.display = 'none';
    }

    // Entferne alte Entitätsbilder
    previewEntities.innerHTML = '';

    // Füge neue Entitätsbilder hinzu
    const tableRows = document.querySelectorAll('#entities-table tbody tr');
    console.log(`Zeilen in der Tabelle: ${tableRows.length}`); // Debugging

    tableRows.forEach((row, index) => {
        const fileInput = row.querySelector('.file-upload');
        const entityImageFile = fileInput.files[0];
        const entityImagePath = fileInput.dataset.filename;

        const img = document.createElement('img');
        if (entityImageFile) {
            img.src = URL.createObjectURL(entityImageFile);
        } else if (entityImagePath) {
            img.src = `${path}${entityImagePath}`;
        }

        if (img.src) {
            img.style.mixBlendMode = 'lighten';
            img.style.position = 'absolute';
            img.style.width = '100%';
            img.style.height = '100%';
            img.alt = `Bild ${index + 1}`;
            previewEntities.appendChild(img);
        }
    });
}

// Funktion zum Hinzufügen einer neuen Zeile zur Tabelle
function addRow() {
    const table = document.getElementById('entities-table').getElementsByTagName('tbody')[0];
    const newRow = table.rows[0].cloneNode(true);

    // Leere alle Eingabefelder in der neuen Zeile
    newRow.querySelectorAll('input').forEach(input => {
        input.value = ''; // Eingabefeld leeren
        if (input.classList.contains('file-upload')) {
            input.dataset.filename = ''; // dataset.filename zurücksetzen
        }
    });

    newRow.querySelectorAll('select').forEach(select => {
        select.value = ''; // Dropdown zurücksetzen
    });

    const fileButton = newRow.querySelector('.file-upload-button');
    if (fileButton) fileButton.textContent = 'Datei auswählen';

    table.appendChild(newRow);

    // Aktualisiere die Vorschau
    updatePreview();
}


// Funktion zum Entfernen einer Zeile aus der Tabelle
function removeRow(button) {
    const row = button.parentNode.parentNode;
    const table = row.parentNode;
    if (table.rows.length > 1) {
        row.remove();
    }
}

// Funktion zum Leeren des YAML-Code-Feldes
function clearYAML() {
    document.getElementById('yaml-output').value = '';

    showCustomAlert('Hinweis', 'Deine YAML-Configuration wurde gelöscht!');
}

// Funktion zum Löschen der Eingabefelder, Entfernen der Vorschau und Anzeigen eines Alerts
function clearInputs() {
    document.getElementById('path-input').value = '/local/lovelace/floorplan/';
    
    // Hintergrundbild-Upload zurücksetzen
    const backgroundUpload = document.getElementById('background-upload');
    const backgroundDisplay = document.getElementById('background-image-display');
    const previewBackground = document.getElementById('preview-background');
    const previewHeading = document.getElementById('preview-heading');
    const previewContainer = document.getElementById('preview-container');
    backgroundUpload.value = ''; // Lösche die Datei aus dem Input-Feld
    backgroundUpload.dataset.filename = ''; // Entferne den Dateinamen
    backgroundDisplay.textContent = 'Kein Bild ausgewählt'; // Standardtext wiederherstellen
    previewBackground.src = ''; // Vorschau-Bild zurücksetzen
    previewBackground.style.display = 'none'; // Vorschau-Bild verstecken
    previewHeading.style.display = 'none'; // Überschrift verstecken
    previewContainer.style.display = 'none'; // Vorschau-Container verstecken

    document.getElementById('transparent-image-input').value = '';

    // Tabelle zurücksetzen
    document.querySelectorAll('#entities-table tbody tr').forEach(row => {
        row.querySelectorAll('select').forEach(select => {
            select.value = '';
        });
        const fileInput = row.querySelector('.file-upload');
        const fileNameDisplay = row.querySelector('.file-upload-button');
        if (fileInput) {
            fileInput.value = '';
            fileInput.dataset.filename = '';
        }
        if (fileNameDisplay) {
            fileNameDisplay.textContent = 'Datei auswählen';
        }
    });

    // Entitätsbilder-Vorschau entfernen
    const previewEntities = document.getElementById('preview-entities');
    previewEntities.innerHTML = '';

    // Benachrichtigung anzeigen
    showCustomAlert('Hinweis', 'Alle Eingaben wurden gelöscht und müssen neu getroffen werden.');
}

// Funktion zum Generieren des YAML-Codes
function generateYAML() {
    const path = document.getElementById('path-input').value.trim();
    const backgroundInput = document.getElementById('background-upload');
    const backgroundImage = backgroundInput.dataset.filename ? backgroundInput.dataset.filename.trim() : '';
    const transparentImageInput = document.getElementById('transparent-image-input').value.trim();
    const transparentImage = transparentImageInput || '1x1_transparent.png'; // Fallback auf Standardwert
    const tableRows = document.querySelectorAll('#entities-table tbody tr');
    let yaml = '';

    if (!path || !backgroundImage || !transparentImage) {
        showCustomAlert('Achtung','Bitte alle allgemeinen Felder ausfüllen!');
        return;
    }

    if (!path.endsWith('/')) {
        path += '/'; // Fügt einen abschließenden Slash hinzu
    }

    yaml += `type: picture-elements\n`;
    yaml += `image: ${path}${backgroundImage}\n`;
    yaml += `elements:\n`;

    tableRows.forEach((row) => {
        const entityDropdown = row.cells[0].querySelector('select'); // Entität aus dem Dropdown
        const entity = entityDropdown ? entityDropdown.value : '';
        const fileInput = row.cells[1].querySelector('.file-upload');
        const entityImage = fileInput.dataset.filename;
        const option = row.cells[2].querySelector('select').value;

        if (!entity || !entityImage || !option) {
            console.warn('Eine Zeile ist unvollständig und wurde übersprungen.');
            return;
        }

        if (option === 'switch') {
            yaml += `  - type: image\n`;
            yaml += `    entity: ${entity}\n`;
            yaml += `    image: ${path}${transparentImage}\n`;
            yaml += `    state_image:\n`;
            yaml += `      "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      opacity: 1\n\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      pointer-events: none\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n`;
        } else if (option === 'dimmable') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      entity: ${entity}\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      pointer-events: none\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'rgb') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      FARBMODUS: states['${entity}'].attributes.color_mode\n`;
            yaml += `      LICHTFARBE: states['${entity}'].attributes.hs_color\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      entity: ${entity}\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": ${path}${entityImage}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      pointer-events: none\n`;
            yaml += `      filter: >-\n`;
            yaml += `        \${ "hue-rotate(" + (LICHTFARBE ? LICHTFARBE[0] : 0) + "deg)"}\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'rgbw') {
            yaml += `  - type: custom:config-template-card\n`;
            yaml += `    variables:\n`;
            yaml += `      LEUCHTENSTATUS: states['${entity}'].state\n`;
            yaml += `      FARBMODUS: states['${entity}'].attributes.color_mode\n`;
            yaml += `      LICHTFARBE: states['${entity}'].attributes.hs_color\n`;
            yaml += `      HELLIGKEIT: states['${entity}'].attributes.brightness\n`;
            yaml += `    entities:\n`;
            yaml += `      - ${entity}\n`;
            yaml += `    element:\n`;
            yaml += `      type: image\n`;
            yaml += `      entity: ${entity}\n`;
            yaml += `      image: ${path}${transparentImage}\n`;
            yaml += `      state_image:\n`;
            yaml += `        "on": >-\n`;
            yaml += `          \${FARBMODUS === 'color_temp' ? '${path}${entityImage.replace('_farbe.png', '_weiss.png')}' : '${path}${entityImage}'}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    style:\n`;
            yaml += `      mix-blend-mode: lighten\n`;
            yaml += `      pointer-events: none\n`;
            yaml += `      filter: >-\n`;
            yaml += `        \${ "hue-rotate(" + (LICHTFARBE ? LICHTFARBE[0] : 0) + "deg)"}\n`;
            yaml += `      opacity: >-\n`;
            yaml += `        \${LEUCHTENSTATUS === 'on' ? (HELLIGKEIT / 254) : '100'}\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n\n`;
        } else if (option === 'cover') {
            yaml += `  - type: image\n`;
            yaml += `    entity: ${entity}\n`;
            yaml += `    tap_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    hold_action:\n`;
            yaml += `      action: none\n`;
            yaml += `    image: ${path}${transparentImage}\n`;
            yaml += `    state_image:\n`;
            yaml += `      closed: ${path}${entityImage}\n`;
            yaml += `    style:\n`;
            yaml += `      pointer-events: none\n`;
            yaml += `      left: 50%\n`;
            yaml += `      top: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `      opacity: 1\n\n`;
        }
    });

    document.getElementById('yaml-output').value = yaml;
}

// Funktion zum Kopieren des YAML-Codes
function copyYAML() {
    const yamlOutput = document.getElementById('yaml-output');
    yamlOutput.select();
    document.execCommand('copy');
    showCustomAlert('Super','Dein fertiger YAML-Code wurde in die Zwischenablage kopiert!');
}
</script>
