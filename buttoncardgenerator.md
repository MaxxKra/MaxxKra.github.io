---
title: Button-Card Codegenerator
subtitle: Erstelle den YAML-Code für deine Custom-Button-Card
description: Generiere den YAML-Code für die Custom Button Card anhand deiner individuellen Angaben.
tags: [Home Assistant, Button Card, custom-button-card, Codegenerator]
show_sidebar: false
layout: page
---
<div class="shb-main-container">
<h1 class="shb-main-title">Button-Card Code-Generator</h1>
<br>
<p class="shb-main-description">
    Mit diesem Code-Generator hast du die Möglichkeit, deine Custom-Button-Card für das Home Assistant Dashboard nach eigenen Angaben zu generieren.
</p>
<div class="content-section">
<h2 class="shb-section-title-center">Grundlegende Einstellungen</h2>
</div>
<div class="generator-container">
    <h2>Custom Button Card Generator</h2>
    <label for="card-type">Kartentyp:</label>
    <select id="card-type" class="shb-input" onchange="updateFields()">
        <option value="button">Schalter / Taste</option>
        <option value="status">Statusanzeige</option>
        <option value="blank">Blank Karte</option>
    </select>
    
    <div id="settings-container">
        <label for="entity">Entity:</label>
        <input type="text" id="entity" class="shb-input" placeholder="sensor.example">
        
        <label for="icon">Icon:</label>
        <input type="text" id="icon" class="shb-input" placeholder="mdi:lightbulb">
        
        <label for="color">Farbe:</label>
        <input type="color" id="color" class="shb-input">
        
        <label for="size">Größe:</label>
        <input type="text" id="size" class="shb-input" placeholder="100px">
        
        <label for="action">Primäre Aktion:</label>
        <select id="action" class="shb-input">
            <option value="toggle">Toggle</option>
            <option value="more-info">More Info</option>
            <option value="navigate">Navigate</option>
            <option value="url">URL</option>
            <option value="call-service">Call Service</option>
        </select>
    </div>
    
    <button class="shb-button" onclick="generateCode()">Code generieren</button>
    <button class="shb-button" onclick="downloadCode()">Download</button>
    
    <h3>Generierter YAML-Code:</h3>
    <textarea id="yaml-output" class="shb-textarea" readonly></textarea>
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
</script>
</div>
