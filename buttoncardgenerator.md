---
title: Button-Card Codegenerator
subtitle: Erstelle den YAML-Code für deine Custom-Button-Card
description: Generiere den YAML-Code für die Custom Button Card anhand deiner individuellen Angaben.
tags: [Home Assistant, Button Card, custom-button-card, Codegenerator]
show_sidebar: false
layout: page
---
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">
</head>

<div class="shb-main-container">
<h1 class="shb-main-title">Button-Card Code-Generator</h1>
<br>
<p class="shb-main-description">
    Mit diesem Code-Generator hast du die Möglichkeit, deine Custom-Button-Card für das Home Assistant Dashboard nach eigenen Angaben zu generieren.
</p>
<div class="content-section">
<h2 class="shb-section-title-center">Grundlegende Einstellungen</h2>
<div class="shb-form-group">
    <h2>Custom Button Card Generator</h2>
    <label for="card-type" class="shb-label">Kartentyp:</label>
    <select id="card-type" class="shb-form-group" onchange="updateFields()" style="width: 30%;">
        <option value="button">Schalter / Taste</option>
        <option value="status">Statusanzeige</option>
        <option value="blank">Blank Karte</option>
    </select>
</div>
    
<div id="settings-container" class="shb-form-group">
    <label for="entity" class="shb-label">Entity:</label>
    <input type="text" id="entity" class="shb-form-group" placeholder="sensor.example" style="width: 30%;">
    <label for="icon" class="shb-label">Icon:</label>
    <div class="shb-form-group" style="display: flex; flex-direction: row; align-items: center; gap: 15px;">
        <input type="text" id="icon" class="shb-form-group" placeholder="lightbulb" style="width: 30%;" oninput="updateIconPreview()">
        <div id="icon-preview-container">
            <i class="mdi mdi-lightbulb" style="font-size: 40px; color: white;"></i>
        </div>
    </div>
    <label for="color" class="shb-label">Farbe:</label>
    <input type="color" id="color" class="shb-form-group" style="width: 30%;">
    <label for="size" class="shb-label">Größe:</label>
    <input type="text" id="size" class="shb-form-group" placeholder="100px" style="width: 30%;">
    <label for="action" class="shb-label">Primäre Aktion:</label>
    <select id="action" class="shb-form-group" style="width: 30%;">
        <option value="toggle">Toggle</option>
        <option value="more-info">More Info</option>
        <option value="navigate">Navigate</option>
        <option value="url">URL</option>
        <option value="call-service">Call Service</option>
    </select>
</div>
    
<div class="shb-button-container">
    <button class="shb-button-main" onclick="generateCode()">Code generieren</button>
    <button class="shb-button-blue" onclick="downloadCode()">Download</button>
</div>
    
<h3>Generierter YAML-Code:</h3>
<textarea id="yaml-output" class="shb-text-code-output" readonly></textarea>
</div>
</div>

<script>
    function updateFields() {
        const cardType = document.getElementById('card-type').value;
        const settingsContainer = document.getElementById('settings-container');
        
        if (cardType === 'blank') {
            settingsContainer.style.display = 'none';
        } else {
            settingsContainer.style.display = 'block';
        }
    }

    function updateIconPreview() {
        let iconInput = document.getElementById('icon').value.trim();
        const iconPreviewContainer = document.getElementById('icon-preview-container');

        // Prüfen, ob das Icon bereits mit "mdi-" beginnt, falls nicht, ergänzen
        if (!iconInput.startsWith('mdi-')) {
            iconInput = 'mdi-' + iconInput;
        }

        // Altes Icon entfernen
        iconPreviewContainer.innerHTML = '';

        // Neues Icon-Element erstellen
        const newIcon = document.createElement('i');
        newIcon.className = `mdi ${iconInput}`;
        newIcon.style.fontSize = "40px";
        newIcon.style.color = "white";

        // Neues Icon in den Container einfügen
        iconPreviewContainer.appendChild(newIcon);
    }
</script>
