---
title: Floorplan Button Position Generator
subtitle: Erstelle Buttons auf dem Home Assistant Picture Elements Floorplan
description: Generiere YAML-Code für Home Assistant anhand der Markierungen und Positionen.
show_sidebar: false
layout: page
---
<div class="floorplan-main-container">
    <h1 class="floorplan-main-title">Floorplan Button Positionierung</h1>
    <h2 class="floorplan-main-subtitle">Positioniere deine Buttons für alle Entitäten direkt auf deinem Floorplan</h2>
    <p class="floorplan-main-intro">
        Mit diesem Tool kannst du durch Eingabe der Angaben zu deinen Entitäten, die Buttons direkt auf deinem Floorplan-Hintergrund positionieren. Nach der Positionierung, generierst du dir den YAML-Code um diesen direkt auf deinem Home Assistant Dashboard Floorplan einzutragen.
    </p>   
    <h3>Bild hochladen</h3>
    <p>Lade ein Bild hoch, fülle die gewünschten Button-Einstellungen aus, und klicke dann auf die Position im Bild, an der der Button platziert werden soll. Für jede Positionierung kannst du unterschiedliche Einstellungen, wie Entität, Icons, und Aktionen (Tap/Hold), angeben. Nachdem du alle gewünschten Buttons gesetzt hast, klicke auf "YAML-Code generieren". Der erstellte YAML-Code wird unten angezeigt und kann kopiert werden, um ihn in dein Home Assistant-Dashboard einzufügen.
    </p>
    <!-- Bild-Upload -->
    <div class="custom-form-group">
        <label for="image-upload" class="custom-label">Bild hochladen:</label>
        <input type="file" id="image-upload" class="custom-input" accept="image/*">
    <p id="image-dimensions">Bildabmessungen: Noch kein Bild hochgeladen</p>
    </div>
    <!-- Bildcontainer -->
    <div class="floorplan-container" id="container">
        <img src="floorplan.png" alt="Floorplan" id="floorplan">
        <div class="floorplan-coords" id="coords">left: 0%, top: 0%</div>
    </div>
    <!-- Formular für zusätzliche Angaben -->
    <h3>Button-Einstellungen</h3>
    <div class="dropdown">
        <button class="dropdown-toggle" onclick="toggleDropdown('tutorialDropdown', this)">
            Wie positioniere ich die Buttons auf dem Bild?<span>&#9660;</span>
        </button>
        <div id="tutorialDropdown" class="dropdown-content" style="display: none; padding: 10px; text-align: left; line-height: 1.5;">
            <p><strong>Schritt-für-Schritt-Anleitung:</strong></p>
            <ol>
                <li>Trage deine Entität ein.</li>
                <li>Trage den Speicherpfad deiner Icons (Home Assistant) ein.</li>
                <li>Trage den Namen des Icons ein, welches bei einem Fehler der Entität angezeigt werden soll.</li>
                <li>Trage den Namen des Icons ein, welches beim Zustand <em>"AN"</em> deiner Entität angezeigt werden soll.</li>
                <li>Trage den Namen des Icons ein, welches beim Zustand <em>"AUS"</em> deiner Entität angezeigt werden soll.</li>
                <li>Wähle eine Breite des Buttons auf dem Floorplan, z. B. <em>2</em>.</li>
                <li>Wähle die Form des Buttons.</li>
                <li>Wähle eine <em>Tap</em>- und eine <em>Hold Action</em>.</li>
            </ol>
            <p>Wenn alles eingetragen und ausgewählt ist, klicke auf das Bild, um die Position des Buttons zu setzen.</p>
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
        <div class="floorplan-form-group">
            <label for="marker-entity">Entität (entity):</label>
            <input type="text" id="marker-entity" placeholder="z.B. light.<DEINE-ENTITÄT>">
        </div>    
        <div class="floorplan-form-group">
            <label for="marker-path">Speicherpfad der Icons:</label>
            <input type="text" id="marker-path" placeholder="/local/lovelace/icon/">
        </div>    
        <div class="floorplan-form-group">
            <label for="marker-default-icon">Icon bei Fehler:</label>
            <input type="text" id="marker-default-icon" placeholder="<DEIN-FEHLER-BUTTON-BILD>.png">
        </div>    
        <div class="floorplan-form-group">
            <label for="marker-on-icon">Icon im Zustand 'An':</label>
            <input type="text" id="marker-on-icon" placeholder="<DEIN-AN-BUTTON-BILD>.png">
        </div>    
        <div class="floorplan-form-group">
            <label for="marker-off-icon">Icon im Zustand 'Aus':</label>
            <input type="text" id="marker-off-icon" placeholder="<DEIN-AUS-BUTTON-BILD>.png">
        </div>    
        <div class="floorplan-form-group">
            <label for="marker-size">Größe des Icons (%):</label>
            <input type="text" id="marker-size" placeholder="z.B. 2">
        </div>    
        <!-- Auswahl für die Form des Markers -->
        <div class="floorplan-form-group">
            <label for="marker-shape">Form des Buttons:</label>
            <select id="marker-shape">
                <option value="50%">Rund</option>
                <option value="0%">Eckig</option>
                <option value="10%">Abgerundet</option>
            </select>
        </div>
    </div>
    <!-- Auswahl für die Tap- und Hold-Action mit jeweiligen Navigationspfaden -->
    <div class="floorplan-form-group-horizontal">
        <div class="floorplan-form-group">
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
        <div class="floorplan-form-group">
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
    <div class="floorplan-button-container">
        <button class="floorplan-button floorplan-button-primary" onclick="generateYAML()">YAML-Code generieren</button>
        <button class="floorplan-button floorplan-button-info" onclick="copyYAML()">YAML-Code kopieren</button>
        <button class="floorplan-button floorplan-button-warning" onclick="removeMarkers()">Alle Markierungen entfernen</button>
        <button class="floorplan-button floorplan-button-danger" onclick="clearYAML()">YAML-Code löschen</button>
    </div>
    <h3>Generierter YAML-Code:</h3>
    <textarea id="yaml-output" rows="20" cols="80" readonly></textarea>
    <footer class="guide-footer">
    <h2>Viel Erfolg bei der Positionierung deiner Buttons! 🎉</h2>
    </footer>
    {% include support_note.html %}
</div>

<style>
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
    .custom-input, .custom-button, select {
        width: 100%;
        background-color: #e9e9e9;
        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
        border: 1px solid #c9c9c9;
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
        border: 1px solid #ddd;
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
        width: 100px;
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
    .guide-footer {
    text-align: center;
    margin-top: 20px;
    }
</style>

<script>
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

img.addEventListener('click', (event) => {
  const rect = img.getBoundingClientRect();
  const xPercent = ((event.clientX - rect.left) / rect.width) * 100;
  const yPercent = ((event.clientY - rect.top) / rect.height) * 100;

  // Auswahl der Form des Markers
  const shape = document.getElementById('marker-shape').value;

  // Marker erstellen
  const marker = document.createElement('div');
  marker.classList.add('floorplan-marker');
  marker.style.left = `${xPercent}%`;
  marker.style.top = `${yPercent}%`;
  marker.style.borderRadius = shape; // Setzt die Form des Markers
  container.appendChild(marker);

  // Speichert die Markierung und aktuelle Eingaben
  markers.push({
    x: xPercent.toFixed(2),
    y: yPercent.toFixed(2),
    entity: document.getElementById('marker-entity').value || "",
    path: document.getElementById('marker-path').value || "/local/lovelace/icon/",
    defaultIcon: document.getElementById('marker-default-icon').value || "DEIN-FEHLER-BUTTON-BILD.png",
    onIcon: document.getElementById('marker-on-icon').value || "DEIN-AN-BUTTON-BILD.png",
    offIcon: document.getElementById('marker-off-icon').value || "DEIN-AUS-BUTTON-BILD.png",
    size: document.getElementById('marker-size').value || "2",
    shape: shape
  });
});

// Bild hochladen und anzeigen
imageUpload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = function() {
        container.style.width = `${img.width}px`;  
        container.style.height = `${img.height}px`; 
        removeMarkers();

        imageDimensions.textContent = `Bildabmessungen: Breite ${img.width}px, Höhe ${img.height}px`;
      };
    };
    reader.readAsDataURL(file);
  }
});

// Funktion zum Entfernen aller Markierungen im Bild
function removeMarkers() {
  document.querySelectorAll('.floorplan-marker').forEach(marker => marker.remove());
  markers = [];
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
  alert('YAML-Code wurde in die Zwischenablage kopiert!');
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
