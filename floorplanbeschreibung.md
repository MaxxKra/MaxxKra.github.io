---
title: Floorplan Codegenerator Beschreibung
subtitle: Hier erfährst du alles über die Handhabung der Floorplan Codegeneratoren
description: Details und Infos zu den Floorplan Codegeneratoren
show_sidebar: false
layout: page
---

<div class="support-note">
    <p>Wenn dir meine Videos auf 'Smart Home Bastler' oder die hilfreichen Tools auf meiner Website gefallen und du meine Arbeit unterstützen möchtest, freue ich mich über jede Art von Unterstützung</p>
    
    <div class="support-links">
        <a href="https://www.amazon.de/hz/wishlist/ls/3FT7MNGRVOTM3?ref_=wl_share" target="_blank">
            <img src="/img/amazon_wishlist_logo.png" alt="Amazon Wishlist" class="support-icon">
            <span>Amazon Wishlist</span>
        </a>
        <a href="https://www.buymeacoffee.com/bastler" target="_blank">
            <img src="/img/buy_me_a_coffee_logo.png" alt="Buy Me a Coffee" class="support-icon">
            <span>Buy Me a Coffee</span>
        </a>
        <a href="https://www.paypal.me/kramlmaxx" target="_blank">
            <img src="/img/paypal_donate_logo.png" alt="PayPal Donate" class="support-icon">
            <span>PayPal Donate</span>
        </a>
    </div>

    <p>❤️ Danke, dass du Teil der Community bist! ❤️</p>
</div>


<div class="ics-guide">
    <h1 class="ics-title">ICS Code Generator</h1>
    <h2 class="ics-subtitle">Schritt-für-Schritt Anleitung</h2>
    <p class="ics-description">
        Lade eine oder mehrere ICS-Dateien hoch oder rufe sie über eine URL ab. Bearbeite sie direkt oder füge sie zusammen, um eine neue Datei zu erstellen.
    </p>

    <section class="ics-step">
        <h3>1. ICS-Dateien hochladen oder URL verwenden</h3>
        <p>
            Du kannst entweder eine oder mehrere <code>.ics</code>-Dateien hochladen oder eine URL angeben, um die ICS-Datei direkt aus dem Internet zu laden.
        </p>
        <div class="ics-input-section">
            <div class="ics-url-input">
                <label for="ics-url">ICS URL (optional):</label>
                <input type="text" id="ics-url" placeholder="Gib die URL einer ICS-Datei ein">
                <button class="ics-button" onclick="fetchICSFromURL()">Kalender von URL laden</button>
            </div>

            <form class="ics-file-upload">
                <label for="file1">Hochladen (mind. eine Datei erforderlich):</label>
                <input type="file" id="file1" accept=".ics" required>
                <label for="file2">Weitere Datei (optional):</label>
                <input type="file" id="file2" accept=".ics">
                <label for="file3">Weitere Datei (optional):</label>
                <input type="file" id="file3" accept=".ics">
                <button class="ics-button" type="button" onclick="mergeICSFiles()">ICS Datei(en) verarbeiten</button>
            </form>
        </div>
    </section>

    <section class="ics-step">
        <h3>2. Zusammengeführte ICS-Datei bearbeiten</h3>
        <p>
            Nach dem Hochladen oder Abrufen einer ICS-Datei werden die Inhalte in der folgenden Box angezeigt. Du kannst die Daten überprüfen und bei Bedarf anpassen.
        </p>
        <textarea id="output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
    </section>

    <section class="ics-step">
        <h3>3. ICS-Einträge bearbeiten</h3>
        <div id="summaryList">
            <p>
                Nachdem die ICS-Dateien verarbeitet wurden, werden hier alle Einträge angezeigt. Du kannst sie individuell bearbeiten, sofern sie nicht von einer URL geladen wurden.
            </p>
        </div>
    </section>

    <footer class="ics-footer">
        <h4>Viel Erfolg! 🎉</h4>
        <p>Mit dem ICS Code Generator kannst du deine Kalender schnell und einfach bearbeiten.</p>
    </footer>
</div>

<style>
    .ics-guide {
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
    .ics-title {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 10px;
    }
    .ics-subtitle {
        text-align: center;
        color: #666;
        font-size: 1.4em;
        margin-bottom: 20px;
    }
    .ics-description {
        text-align: center;
        color: #555;
        margin-bottom: 20px;
    }
    .ics-step {
        margin-bottom: 20px;
    }
    .ics-step h3 {
        color: #4CAF50;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    .ics-input-section {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .ics-url-input,
    .ics-file-upload {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .ics-url-input label,
    .ics-file-upload label {
        font-weight: bold;
        margin-bottom: 5px;
    }
    .ics-url-input input,
    .ics-file-upload input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .ics-button {
        padding: 10px 15px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
    }
    .ics-button:hover {
        background-color: #45a049;
    }
    textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }
    .ics-footer {
        text-align: center;
        margin-top: 20px;
    }
    .ics-footer h4 {
        color: #333;
    }
    .ics-footer p {
        color: #777;
    }
    .support-note {
        width: 80%;
        margin: 0 auto;
        border: 2px solid #f39c12;
        padding: 20px;
        background-color: #fff3cd;
        border-radius: 12px;
        margin-top: 20px;
        margin-bottom: 30px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .support-note p {
        font-size: 18px;
        margin-bottom: 15px;
        color: #856404;
        font-weight: bold;
    }
    .support-links {
        display: flex;
        justify-content: space-around;
        gap: 0;
    }
    .support-links a {
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .support-icon {
        width: 160px;
        height: auto;
        margin-bottom: 5px;
        transition: transform 0.2s;
    }
    .support-icon:hover {
        transform: scale(1.3);
    }
    .support-note p:last-of-type {
        margin-top: 20px;
    }
</style>


