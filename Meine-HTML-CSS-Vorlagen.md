---
title: Meine HTML und CSS Vorlagen
subtitle: Alle Blöcke auf einer Seite
description: Hier kann ich mir alles für neue Seiten kopieren um einen Standard zu halten
show_sidebar: false
layout: page
---

<div class="shb-main-container">

<h1 class="shb-main-title">SHB Main Title</h1>

<p class="shb-main-description">
    Main Description Text here
</p>

<div class="content-section">

<h2 class="shb-section-title-center">Section Title Center H2</h2>
<h3 class="shb-section-title-center">Section Title Center H3</h3>
<h4 class="shb-section-title-center">Section Title Center H4</h4>

<h2 class="shb-section-title-left">Section Title Left H2</h2>
<h3 class="shb-section-title-left">Section Title Left H3</h3>
<h4 class="shb-section-title-left">Section Title Left H4</h4>

<div class="important-container">
    <h3>❗Achtung</h3>
    <p>
        Hier folgt eine Warnung mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>

<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Hier folgt ein Hinweis mit <strong>hervorgehobenem</strong> Text!
    </p>
</div>

<div class="shb-form-group">
    <label for="select-id-1">Auswahl:</label>
    <select id="select-id-1" style="width: 30%;">  <!-- Füge  onchange="updateScript1()" hinzu für Script -->
        <option value="Eins">Eins</option>
        <option value="Zwei">Zwei</option>
        <option value="Drei">Drei</option>
        <option value="Vier">Vier</option>
    </select>
</div>

<div class="shb-form-group">
    <label for="file-id-1">Eine Datei hochladen</label>
    <input type="file" id="file-id-1" accept=".ics" style="width: 30%" />
</div>

<div class="shb-form-group">
    <label for="input-id-1">Einen Text eingeben</label>
    <input type="url" id="input-id-1" placeholder="Das ist der Platzhalter" style="width: 30%" />
</div>

<div class="shb-form-group">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="checkbox-id-1" />
        <label for="checkbox-id-1">Text für Checkbox 1</label>
    </div>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="checkbox-id-2" />
        <label for="checkbox-id-2">Text für Checkbox 2</label>
    </div>
</div>

<label class="shb-label">Drücke den gewählten Button:</label>

<div class="shb-button-container">
    <button class="shb-button shb-button-blue" style="width: 20%">Button Blau</button> <!-- Füge  onclick="updateScript2()" hinzu für Script -->
    <button class="shb-button shb-button-green" style="width: 20%">Button Grün</button>
    <button class="shb-button shb-button-yellow" style="width: 20%">Button Gelb</button>
    <button class="shb-button shb-button-red" style="width: 20%">Button Rot</button>
</div>

<div class="shb-button">
    <button class="shb-button shb-button-blue" style="width: 30%" >Button Blau</button>
</div>
<div class="shb-button">
    <button class="shb-button shb-button-green" style="width: 30%" >Button Grün</button>
</div>
<div class="shb-button">
    <button class="shb-button shb-button-yellow" style="width: 30%" >Button Gelb</button>
</div>
<div class="shb-button">
    <button class="shb-button shb-button-red" style="width: 30%" >Button Rot</button>
</div>

<ul class="shb-list-start">
    <li>Erster Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Zweiter Punkt mit <strong>hervorgehobenem Text</strong></li>
    <li>Dritter Punkt mit <strong>hervorgehobenem Text</strong></li>
</ul>

<div class="shb-code-container">
    <button class="copy-code-button" onclick="copyCode('code-output', this)">Kopieren</button>
    <pre id="code-output">
        <code>
{%- raw %}
{%- set light_entities = states.light | map(attribute='entity_id') | list -%}
{{ light_entities | join('\n') }}{% endraw -%}
        </code>
    </pre>
</div>


<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>


<div class="shb-text-output">
    <button class="copy-code-button" onclick="copyCode('yaml-output', this)">Kopieren</button>
    <textarea class="shb-text-code-output" id="yaml-output" rows="20" cols="80" readonly>
# Test Eintrag
{%- raw %}
type: picture-elements
image: /local/lovelace/floorplan/hintergrund_nacht_org.png
elements:
  - type: image
    entity: light.arbeitszimmer_deckenlicht
    image: /local/lovelace/floorplan/1x1_transparent.png
    state_image:
      "on": /local/lovelace/floorplan/arbeitszimmer_deckenlicht.png
    tap_action:
      action: none
    hold_action:
      action: none
    style:
      opacity: 1

      mix-blend-mode: lighten
      pointer-events: none
      left: 50%
      top: 50%
      width: 100%
{% endraw -%}
    </textarea>
</div>


<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('testdropdown', this)">
        Was mache ich, wenn ich keine ICS Datei oder URL habe?<span>⬇️</span>
    </button>
    <div id="testdropdown" class="shb-dropdown-content" style="display: none;">
        <div class="shb-dropdown-youtube">
            {% include youtube.html video="r4koAf8UnwQ" %}
        </div>
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



<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin: 50px;
    }
    .slider-container {
        margin: 20px;
    }
    .value-display {
        font-size: 1.5em;
        margin-top: 10px;
    }
</style>

<h1>Slider mit Wertanzeige</h1>
<div class="slider-container">
    <input type="range" id="slider" min="0" max="100" value="50">
    <div class="value-display">
        Wert: <span id="sliderValue">50</span>
    </div>
</div>

<script>
    // Referenzen für den Slider und die Anzeige
    const slider = document.getElementById('slider');
    const sliderValue = document.getElementById('sliderValue');

    // Event Listener für Änderungen des Sliders
    slider.addEventListener('input', () => {
        sliderValue.textContent = slider.value;
    });
</script>




</div>

<footer class="shb-footer">
    <p>Ich hoffe dir hat dieses Tool geholfen. Über Support und Feedback würde ich mich wirklich freuen.</p>
    <h2>Viel Erfolg bei der Einrichtung deines Floorplans! 🎉</h2>
</footer>

{% include support_note.html %}

</div>
