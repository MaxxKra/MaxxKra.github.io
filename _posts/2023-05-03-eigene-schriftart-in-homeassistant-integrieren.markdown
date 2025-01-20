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
    <li>Entpacke die erstellte Datei und speichere das <code>&lt;deine-Schrift&gt;.woff2</code> in deinen <code>www-Ordner</code> in Home Assistant.<br>
    In meinem Fall ist es <code>Technology.woff2</code>.</li>
    <li>Nun öffne in Home Assistant deinen File-Editor oder Studio Code Server und erstelle im <code>www-Ordner</code> ein neues File mit Namen <code>font.css</code> und füge folgende Codezeilen ein:</li>
</ul>

<div class="shb-code-container">
    <button class="copy-code-button" onclick="copyCode('code-css-font', this)">Kopieren</button>
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
<div class="shb-code-container">
    <button class="copy-code-button" onclick="copyCode('code-js-font', this)">Kopieren</button>
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

<div class="shb-code-container">
    <button class="copy-code-button" onclick="copyCode('code-yaml-font', this)">Kopieren</button>
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
<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>
<footer class="shb-footer">
    <h2>Viel Erfolg bei der Einbindung eigener Schriftarten 🎉</h2>
</footer>

{% include support_note.html %}
</div>

