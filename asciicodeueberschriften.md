---
title: Überschriften für den Code Editor
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---
<div class="guide-container">
<h1 class="custom-title">Code Überschriften Generator</h1>

Gib den Text ein, wähle eine Schriftart und die Buchstabenbreite, um eine ASCII-Art-Überschrift zu erstellen. Drücke **Generieren**, um den Text anzuzeigen, **Teste Alle**, um den Text in alle Schriftarten auf einmal anzuzeigen oder **Kopieren** um den generierten Text in die Zwischenablage zu kopieren.

Danach kannst du die generierte Überschrift in deinen Code-Editor einfügen.

<!-- Eingabefeld und Auswahloptionen im Formular-Design -->
<div class="custom-form-group" style="display: flex; justify-content: center; align-items: flex-start; gap: 50px;">
    
<div style="display: flex; flex-direction: column; gap: 10px; width: 30%;">
    <div class="custom-form-group">
        <label for="fontSelect">Schriftart:</label>
        <select id="fontSelect" style="width: 100%;">
            <option value="Banner3" selected>Banner3</option>
            <option value="Banner">Banner</option>
            <option value="Big">Big</option>
            <option value="Colossal">Colossal</option>
            <option value="Doom">Doom</option>
            <option value="Slant">Slant</option>
            <option value="Small">Small</option>
            <option value="Standard">Standard</option>
            <option value="Avatar">Avatar</option>
            <option value="Big Money-ne">Big Money-ne</option>
            <option value="Big Money-nw">Big Money-nw</option>
            <option value="Big Money-se">Big Money-se</option>
            <option value="Big Money-sw">Big Money-sw</option>
            <option value="BlurVision ASCII">BlurVision ASCII</option>
            <option value="Crawford2">Crawford2</option>
            <option value="Doh">Doh</option>
            <option value="Epic">Epic</option>
            <option value="Fire Font-k">Fire Font-k</option>
            <option value="Graceful">Graceful</option>
            <option value="Graffiti">Graffiti</option>
            <option value="Small Slant">Small Slant</option>
            <option value="Star Wars">Star Wars</option>
            <option value="Sub-Zero">Sub-Zero</option>
            <option value="ANSI Shadow">ANSI Shadow</option>
            <option value="ANSI Regular">ANSI Regular</option>
            <option value="Delta Corps Priest 1">Delta Corps Priest 1</option>
            <option value="Electronic">Electronic</option>
            <option value="4Max">4Max</option>
        </select>
    </div>
    <div class="custom-form-group">
        <label for="widthSelect">Buchstaben Breite:</label>
        <select id="widthSelect" style="width: 100%;">
            <option value="default" selected>Normal</option>
            <option value="full">Full</option>
            <option value="fitted">Fitted</option>
            <option value="smushR">Smush (R)</option>
            <option value="smushU">Smush (U)</option>
        </select>
    </div>
</div>
    
<div style="flex-direction: column; width: 50%;">
    <label for="textInput">Texteingabe:</label>
    <textarea class="textarea-list" id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 100%; height: 120px; resize: vertical; border: 1px solid #ddd; border-radius: 5px;"></textarea>
</div>
</div>

<!-- Buttons für Generieren, Test All und Kopieren -->
<div class="custom-button-container" style="text-align: center;">
    <button onclick="generateASCII()" class="custom-button generate">Generieren</button>
    <button onclick="testAllFonts()" class="custom-button copy">Teste Alle</button>
    <button onclick="copyToClipboard()" class="custom-button remove">Kopieren</button>
</div>

<!-- Ausgabefeld -->
<div style="text-align: center; margin: 20px;">
    <pre id="asciiOutput" class="yaml-output" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px;"></pre>
</div>
</div>

<!-- Lokale figlet.js Bibliothek -->
<script src="{{ '/assets/js/figlet.js' | relative_url }}"></script>

<!-- JavaScript für die ASCII-Art-Generierung und Kopieren -->
<script>
figlet.defaults.fontPath = "/assets/js/fonts/";  // Setzt den Pfad zu den Schriftarten

function generateASCII() {
    const text = document.getElementById("textInput").value;
    const font = document.getElementById("fontSelect").value;
    const width = document.getElementById("widthSelect").value;
    const lines = text.split('\n');  // Teilt den Text in Zeilen auf

    let asciiArt = "";  // Zum Speichern der generierten ASCII-Art

    function generateLine(line, callback) {
        figlet.text(line, { font: font, horizontalLayout: width }, function(err, result) {
            if (err) {
                console.log("Fehler:", err);
                callback(err);
                return;
            }
            asciiArt += result + "\n";  // Füge die generierte Zeile zur ASCII-Art hinzu
            callback();
        });
    }

    function generateAllLines(i) {
        if (i < lines.length) {
            generateLine(lines[i], function(err) {
                if (!err) {
                    generateAllLines(i + 1);
                } else {
                    console.log("Fehler beim Generieren der ASCII-Art");
                }
            });
        } else {
            document.getElementById("asciiOutput").textContent = asciiArt;
        }
    }

    generateAllLines(0);  // Startet die rekursive Generierung
}

function testAllFonts() {
    const text = document.getElementById("textInput").value;
    const fonts = [
        "Banner", "Banner3", "Big", "Colossal", "Doom", "Slant", "Small", "Standard",
        "Avatar", "Big Money-ne", "Big Money-nw", "Big Money-se", "Big Money-sw",
        "BlurVision ASCII", "Crawford2", "Doh", "Epic", "Fire Font-k", "Graceful", 
        "Graffiti", "Small Slant", "Star Wars", "Sub-Zero", "ANSI Shadow", 
        "ANSI Regular", "Delta Corps Priest 1", "Electronic", "4Max"
    ];
    let output = "";

    fonts.forEach((font) => {
        figlet.text(text, { font: font }, function(err, result) {
            if (err) {
                console.log("Fehler:", err);
                return;
            }
            output += `\n--- ${font} ---\n${result}\n`;
            document.getElementById("asciiOutput").textContent = output;
        });
    });
}

function copyToClipboard() {
    const asciiOutput = document.getElementById("asciiOutput").textContent;
    navigator.clipboard.writeText(asciiOutput).then(() => {
        alert("Text kopiert!");
    }).catch(err => {
        console.log("Kopierfehler:", err);
    });
}

// Testen, ob figlet.js geladen wurde
console.log(typeof figlet);  // Sollte "object" anzeigen, wenn die Bibliothek korrekt geladen wurde
</script>

<!-- Inline CSS für eine ansprechende Ansicht -->
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

    .guide-footer {
        text-align: center;
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
    .custom-title, .custom-subtitle {
        text-align: center;
        font-weight: bold;
        margin-top: 20px;
    }
    /* Formulargestaltung */
    .custom-form-group {
        margin-bottom: 15px;
    }
    .custom-form-group label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }
    .custom-form-group input, .custom-form-group select {
        padding: 8px;
        color: #000000;
        background-color: #9fb9fb;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
    }

    /* Buttons für Generieren, Test All und Kopieren */
    .custom-button-container {
        display: flex;
        justify-content: center;
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

    /* YAML-Ausgabe Styling */
    #asciiOutput {
        width: 100%;
        margin-top: 20px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #2d2d2d;
        color: #b7ffb7
    }
</style>
