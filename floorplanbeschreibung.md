---
title: Floorplan Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Floorplan Codegeneratoren
description: Details und Infos zu den Floorplan Codegeneratoren
show_sidebar: false
layout: page
---

<style>
    .guide-container {
        max-width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #1a1a1a;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 4px 6px rgba(255, 255, 255, 0.3);
    }

    .content-section {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }

    .content-section h2 {
        color: #5bacff;
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
    .floorplan-description {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .floorplan-description h1 {
        text-align: center;
        color: #007BFF;
        font-size: 2.5em;
        margin-bottom: 20px;
    }

    .floorplan-description h2 {
        color: #0056b3;
        border-bottom: 2px solid #0056b3;
        padding-bottom: 5px;
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 1.8em;
    }

    .floorplan-description p {
        margin-bottom: 15px;
        font-size: 1.1em;
    }

    .floorplan-description ul {
        margin: 15px 0;
        padding-left: 20px;
        list-style-type: disc;
    }

    .floorplan-description ul li {
        margin-bottom: 10px;
    }

    .floorplan-description ol {
        margin: 15px 0;
        padding-left: 20px;
        list-style-type: decimal;
    }

    .floorplan-description ol li {
        margin-bottom: 10px;
    }

    .floorplan-description hr {
        border: none;
        border-top: 2px solid #ddd;
        margin: 30px 0;
    }

    .floorplan-description footer {
        text-align: center;
        font-size: 1em;
        color: #666;
        margin-top: 40px;
    }
</style>

<div class="guide-container">

    <h1>Floorplan Codegeneratoren</h1>

    <section class="content-section" id="beleuchtungsbilder">
        <h2>Floorplan Beleuchtungsbilder Generator</h2>
        <p>
            Mit dem Floorplan Beleuchtungsbilder Generator kannst du interaktive Visualisierungen für dein Home Assistant Dashboard erstellen.
            Die Beleuchtungsbilder repräsentieren den Zustand einzelner Licht-Entitäten in deinem Zuhause. Mithilfe von in Sweet Home 3D
            oder ähnlichen Tools generierten Bildern können beleuchtete und unbeleuchtete Bereiche dargestellt werden.
        </p>
        <h3>Funktionen</h3>
        <ul>
            <li>Hochladen von Hintergrundbildern und Beleuchtungsbildern</li>
            <li>Zuordnung der Beleuchtungsbilder zu Entitäten</li>
            <li>Unterstützung von RGB- und RGBW-Beleuchtung</li>
            <li>Automatische Generierung des YAML-Codes für Home Assistant</li>
            <li>Integration mit der <strong>Config Template Card</strong> (HACS erforderlich)</li>
        </ul>
        <h3>Anleitung</h3>
        <ol>
            <li>Entitätenliste eingeben oder hochladen.</li>
            <li>Hintergrundbild (z. B. Nachtgrundriss) hochladen.</li>
            <li>Speicherpfad der Bilder und transparentes Pixel-Bild konfigurieren.</li>
            <li>Beleuchtungsbilder hochladen und zu Entitäten zuordnen.</li>
            <li>Option für die Beleuchtung (z. B. ein/aus, RGB, RGBW) wählen.</li>
            <li>YAML-Code generieren und in Home Assistant einbinden.</li>
        </ol>
    </section>

    <hr>

    <section class="content-section" id="button-position">
        <h2>Floorplan Button Position Generator</h2>
        <p>
            Der Floorplan Button Position Generator ist ein Werkzeug, um Buttons für Entitäten in deinem Home Assistant Floorplan 
            zu erstellen und flexibel zu positionieren. 
            So kannst du interaktive Bedienelemente direkt auf deinem Dashboard platzieren.
        </p>
        <h3>Funktionen</h3>
        <ul>
            <li>Hochladen eines Hintergrundbildes</li>
            <li>Setzen von Markern an spezifischen Positionen</li>
            <li>Konfiguration von Icons und Aktionen (Tap/Hold)</li>
            <li>Unterstützung der <strong>Button Card</strong> Integration (HACS erforderlich)</li>
            <li>Automatische Generierung des YAML-Codes</li>
        </ul>
        <h3>Anleitung</h3>
        <ol>
            <li>Entitätenliste eingeben oder hochladen.</li>
            <li>Hintergrundbild hochladen und die Bilddimensionen prüfen.</li>
            <li>Buttons konfigurieren (Icon, Größe, Form, Aktionen).</li>
            <li>Marker auf dem Bild setzen, um die Button-Positionen festzulegen.</li>
            <li>YAML-Code generieren und in Home Assistant einbinden.</li>
        </ol>
    </section>

    <hr>

    <footer>
        <p>Viel Erfolg beim Einrichten deines Floorplans! Für weitere Informationen kannst du die einzelnen Generator-Seiten besuchen.</p>
    </footer>
<br>
{% include support_note.html %}

</div>
