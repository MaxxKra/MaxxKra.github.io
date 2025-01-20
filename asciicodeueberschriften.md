---
title: Überschriften für den Code Editor
subtitle: Erstelle deine eigenen ASCII Art Überschriften
description: Um die Überschriften in deinem Code Editor besser aussehen zu lassen, ist der ASCII Art Text generator genau richtig.
show_sidebar: false
layout: page
---
<div class="shb-main-container">
<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>
<h1 class="shb-main-title">Code Überschriften Generator</h1>

<p class="shb-main-description">
    Gib den Text ein, wähle eine Schriftart und die Buchstabenbreite, um eine ASCII-Art-Überschrift zu erstellen.<br>
    Drücke **Generieren**, um den Text anzuzeigen, **Teste Alle**, um den Text in alle Schriftarten auf einmal anzuzeigen oder **Kopieren** um den generierten Text in die Zwischenablage zu kopieren.
</p>
<p class="shb-main-description">
    Danach kannst du die generierte Überschrift in deinen Code-Editor einfügen.
</p>
<!-- Eingabefeld und Auswahloptionen im Formular-Design -->
<div class="shb-center-container" style="gap: 50px;">
    <div style="display: flex; flex-direction: column; width: 20%;">
        <div class="shb-form-group" style="gap: 0; margin: 0 0 15px 0;">
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
        <div class="shb-form-group" style="gap: 0; margin: 0 0 15px 0;">
            <label for="widthSelect">Buchstaben Breite:</label>
            <select id="widthSelect" style="width: 100%;">
                <option value="default" selected>Normal</option>
                <option value="full">Full</option>
                <option value="fitted">Fitted</option>
                <option value="smushR">Smush (R)</option>
                <option value="smushU">Smush (U)</option>
            </select>
        </div>
        <div class="shb-form-group" style="gap: 0; margin: 0 0 15px 0;">
            <label for="languageSelect">Programmiersprache:</label>
            <select id="languageSelect" style="width: 100%;">
                <option value="none" selected>Keine</option>
                <option value="yaml">YAML <strong>&#35;</strong></option>
                <option value="html">HTML <strong>&#60;&#33;--</strong></option>
                <option value="css">CSS <strong>&#47;&#42;</strong></option>
                <option value="python">Python <strong>&#35;</strong></option>
                <option value="javascript">JavaScript <strong>&#47;&#47;</strong></option>
                <option value="bash">Bash <strong>&#35;</strong></option>
            </select>
        </div>
    </div>
    <div class="shb-form-group" style="flex-direction: column; width: 50%; gap: 0; margin: 0;">
        <label for="textInput">Texteingabe:</label>    
        <div class="shb-text-output" style="margin: 0 0 15px 0;">
            <textarea class="shb-text-code-outputt" id="textInput" placeholder="Gib hier deinen Text ein" style="padding: 10px; width: 100%; height: 160px; resize: vertical; border: 1px solid #ddd; border-radius: 5px;"></textarea>
        </div>
    </div>
</div>
<!-- Buttons für Generieren, Test All und Kopieren -->
<div class="shb-button-container" style="text-align: center; display: block; gap: 20px;">
    <button onclick="generateASCII()" class="shb-button shb-button-blue" style="width: 20%">Generieren</button>
    <button onclick="testAllFonts()" class="shb-button shb-button-yellow" style="width: 20%; margin: 0 10px;">Teste Alle</button>
    <button onclick="copyToClipboard()" class="shb-button shb-button-red" style="width: 20%">Kopieren</button>
</div>

<!-- Ausgabefeld -->
<div style="text-align: center; margin: 20px; line-height: 1.2">
    <pre id="asciiOutput" class="yaml-output" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 5px;"></pre>
</div>

<footer class="shb-footer">
    <h2>Viel Spaß mit deinen ASCII Code Überschriften! 🎉</h2>
</footer>

{% include support_note.html %}

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
    const language = document.getElementById("languageSelect").value;
    const lines = text.split('\n');

    let asciiArt = "";

    function wrapWithComment(content) {
        switch (language) {
            case "yaml":
                return `#    ${content}    #`;
            case "html":
                return `<!--    ${content}    -->`;
            case "css":
                return `/*    ${content}    */`;
            case "javascript":
                return `//    ${content}    //`;
            case "python":
                return `#     ${content}    #`;
            case "bash":
                return `#    ${content}    #`;
            default:
                return content;
        }
    }

    function generateLine(line, callback) {
        figlet.text(line, { font: font, horizontalLayout: width }, function (err, result) {
            if (err) {
                console.log("Fehler:", err);
                callback(err);
                return;
            }
            const wrappedResult = result
                .split('\n')
                .map(wrapWithComment)
                .join('\n');
            asciiArt += wrappedResult + "\n";
            callback();
        });
    }

    function generateAllLines(i) {
        if (i < lines.length) {
            generateLine(lines[i], function (err) {
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

    generateAllLines(0);
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
        showSHBcustomAlert('Perfekt!', 'Der ACSII Text wurde kopiert!');
    }).catch(err => {
        console.log("Kopierfehler:", err);
    });
}

// Testen, ob figlet.js geladen wurde
console.log(typeof figlet);  // Sollte "object" anzeigen, wenn die Bibliothek korrekt geladen wurde
</script>

<!-- Inline CSS für eine ansprechende Ansicht -->
<style>
    .textarea-list {
        width:100%;
        background-color: #c3c3c3;
        color: #000000;
        font-size: 0.9em;
        font-weight: bold;
        padding: 10px;
        margin-bottom: 10px;
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
