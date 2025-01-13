---
layout: post
title: "Eigene Schriftart in Home Assistant integrieren"
date: 2023-05-03 06:58:00
categories: Dashboard
tags: [Eigene Schriftart, Font, Home Assistant, StudioCodeServer]
description: "Einen Weg, eigene Schriftarten in Home Assistant einzufügen, zeige ich hier."
image: /img/blog/eigene_Schriftart/blog-post-eigene-schriftarten.png
published: true
---

<div class="post-content">
<p>
    Ich wollte unbedingt für meine Dashboards eine Schriftart zur Auswahl haben, welche meine Uhr in digitaler Schrift anzeigt.
</p>

<p>
    Da ich als "font-family" keine passende Schrift gefunden habe, fügte ich mir eine im Netz gefundene in Home Assistant hinzu.<br>
    Hier die notwendigen Schritte und Codes zum Nachmachen:
</p>

<div style="text-align: center;">
    <img src="/img/blog/eigene_Schriftart/blog-post-eigene-schriftart-digital-uhr.png" alt="Digitale Uhr" style="max-width: 60%; height: auto; border-radius: 10px; margin-bottom: 30px;">
</div>

<ul>
    <li>Lade dir eine Schrift deiner Wahl aus dem Internet z.B von <a href="https://www.1001fonts.com/technology-font.html" target="_blank">1001fonts.com</a></li>
    <li>Dann musst du die heruntergeladene "ttf-Datei" in ein "woff2" konvertieren. Nutze dazu diesen <a href="https://www.fontconverter.io/de" target="_blank">Konverter</a>.</li>
    <li>Entpacke die erstellte Datei und speichere das <code>&lt;deine-Schrift&gt;.woff2</code> in deinen <code>www-Ordner</code> in Home Assistant. In meinem Fall ist es <code>Technology.woff2</code>.</li>
    <li>Nun öffne in Home Assistant deinen File-Editor oder Studio Code Server und erstelle im <code>www-Ordner</code> ein neues File mit Namen <code>font.css</code> und füge folgende Codezeilen ein:</li>
</ul>

<div class="code-container">
    <button class="copy-button" onclick="copyCode('code-css-font', this)">Kopieren</button>
    <pre id="code-css-font" class="language-css"><code>
/* Ersetze "Technology" mit dem Namen deiner Schriftart */
@font-face {
  font-family: "DJBGetDigital";
  src: url(/local/Technology.woff2) format('woff2');
}
    </code></pre>
</div>

    <ul>
        <li>Füge ein weiteres File in deinen "www-Order" hinzu und gib ihm den Namen <code>loadfonts.js</code>. In dieses File füge folgenden Code ein:</li>
    </ul>
<div class="code-container">
    <button class="copy-button" onclick="copyCode('code-js-font', this)">Kopieren</button>
    <pre id="code-js-font" class="language-js"><code>
function loadcss() {
    let css = '/local/fonts.css?v=0.005';

    let link = document.createElement('link');
    let head = document.getElementsByTagName('head')[0];
    let tmp;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    tmp = link.cloneNode(true);
    tmp.href = css;
    head.appendChild(tmp);
    console.info('%c Font Style sheet loaded', 'color: white; background: #000; font-weight: 700;');
}
loadcss();
    </code></pre>
</div>

    <ul>
        <li>Leere den Browser-Cache und teste, ob die Schrift funktioniert. Z.B. kannst du folgende Karte manuell in dein Dashboard einfügen:</li>
    </ul>

<div class="code-container">
    <button class="copy-button" onclick="copyCode('code-yaml-font', this)">Kopieren</button>
    <pre id="code-yaml-font" class="language-yaml"><code>
# WICHTIG! Du musst card-mod installiert haben um den Stil der Karte zu ändern!
# Ändere die font-family auf deine Schriftart
type: markdown
content: '# &lt;center&gt; &#123;&#123;states("sensor.time")&#125;&#125; &lt;/center&gt;'
card_mod:
  style: |
    ha-card {
      font-family: Technology;
      font-size: 2vw;
      color: var(--primary-color);
      background: transparent;
      border: transparent;
    }
    </code></pre>
</div>

    <p>In meinem Fall sieht das Endergebnis so aus:</p>

    <div style="text-align: center;">
        <img src="/img/blog/eigene_Schriftart/blog-post-eigene-schriftart-digital-uhr-2.png" alt="Digitale Uhr 2" style="max-width: 60%; height: auto; border-radius: 10px; margin-bottom: 30px;">
    </div>
<div id="custom-alert" style="display: none;">
    <div id="custom-alert-content">
        <h4 id="custom-alert-title"></h4>
        <p id="custom-alert-message"></p>
        <button id="close-alert">OK</button>
    </div>
</div>
</div>

<style>
    .post-content {
        max-width: 100%;
        margin: auto;
        font-family: Arial, sans-serif;
        line-height: 1.6;
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
</style>

<script>

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
</script>
