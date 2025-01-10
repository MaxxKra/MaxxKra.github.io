---
title: ICS Code Generator
subtitle: ICS-Dateien hochladen oder von URL abrufen
description: Lade ICS-Dateien hoch oder rufe sie von einer URL ab, um sie zu bearbeiten oder zusammenzuführen.
show_sidebar: false
layout: page
---
<div class="ics-guide">
    <h1 class="ics-title">ICS Code Generator</h1>
    <h2 class="ics-subtitle">ICS-Dateien hochladen oder von URL abrufen</h2>
    <p class="ics-description">
        Lade eine oder mehrere ICS-Dateien hoch oder gib die URL einer ICS-Datei an, um sie zu bearbeiten oder zusammenzuführen.
    </p>
    <section class="ics-step">
        <h3>1. ICS-Dateien hochladen oder URL verwenden</h3>
        <p>
            Wähle entweder eine <code>.ics</code>-Datei aus oder gib die URL einer Datei an. Du kannst auch mehrere Dateien hochladen, um sie zusammenzuführen.
        </p>
        <form class="ics-file-upload">
            <div class="ics-file-group">
                <label for="file1">ICS Datei 1 (erforderlich, wenn keine URL):</label>
                <input type="file" id="file1" accept=".ics">
            </div>
            <div class="ics-file-group">
                <label for="file2">ICS Datei 2 (optional):</label>
                <input type="file" id="file2" accept=".ics">
            </div>
            <div class="ics-file-group">
                <label for="file3">ICS Datei 3 (optional):</label>
                <input type="file" id="file3" accept=".ics">
            </div>
            <div class="ics-file-group">
                <label for="file4">ICS Datei 4 (optional):</label>
                <input type="file" id="file4" accept=".ics">
            </div>
            <div class="ics-file-group">
                <label for="file5">ICS Datei 5 (optional):</label>
                <input type="file" id="file5" accept=".ics">
            </div>
            <div class="ics-file-group">
                <label for="file6">ICS Datei 6 (optional):</label>
                <input type="file" id="file6" accept=".ics">
            </div>
            <button type="button" class="ics-button" onclick="mergeICSFiles()">ICS Datei(en) verarbeiten</button>
        </form>
    </section>
    <div id="warning-container" style="display: none;">
        <div class="important-container">
            <h3>❗ Achtung</h3>
            <p>
                Die Bezeichnungen deiner Kalender-Termine beinhalten Ziffern oder Punkte. Eine Bearbeitung dieser Einträge wird empfohlen.
            </p>
        </div>
    </div>
    <section class="ics-step">
        <h3>2. Zusammengeführte ICS-Datei bearbeiten</h3>
        <p>
            Die verarbeiteten Inhalte der ICS-Dateien werden hier angezeigt. Du kannst sie überprüfen und die Daten in die Zwischenablage kopieren oder bearbeiten.
        </p>
        <textarea id="output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
        <button class="ics-button" onclick="editAndDisplayEntries()">Einträge bearbeiten</button>
    </section>
    <section class="ics-step" id="edited-output-section" style="display: none;">
        <h3>Bearbeitete ICS-Datei</h3>
        <textarea id="edited-output" rows="20" readonly></textarea>
        <br>
        <button class="ics-button" onclick="copyEditedToClipboard()">Bearbeitete Datei kopieren</button>
        <button class="ics-button" onclick="downloadEditedICSFile()">Bearbeitete Datei herunterladen</button>
    </section>
    <footer class="ics-footer">
        <h4>Viel Erfolg! 🎉</h4>
        <p>Mit dem ICS Code Generator kannst du deine Kalender schnell und einfach bearbeiten.</p>
    </footer>
    {% include support_note.html %}
</div>

<style>
    .ics-guide {
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
    .ics-file-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .ics-button {
        padding: 10px 15px;
        background-color: #4CAF50;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        align-self: flex-start;
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
    .important-container {
        background-color: #ff9982;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        border: 1px solid #ff0000;
    }
    .important-container h3 {
        color: #d12700;
        text-shadow: 1px 1px 3px black;
    }
    .important-container p {
        color: #383838;
        font-family: Arial Black;
    }
</style>

<script>
    function mergeICSFiles() {
        const files = [
            document.getElementById('file1').files[0],
            document.getElementById('file2').files[0],
            document.getElementById('file3').files[0],
            document.getElementById('file4').files[0],
            document.getElementById('file5').files[0],
            document.getElementById('file6').files[0],
        ];
    
        const validFiles = files.filter(file => file);
    
        if (validFiles.length === 0) {
            alert("Bitte mindestens eine ICS-Datei hochladen.");
            return;
        }
    
        const readers = validFiles.map(file => {
            const reader = new FileReader();
            reader.readAsText(file);
            return reader;
        });
    
        Promise.all(
            readers.map(
                reader =>
                    new Promise(resolve => {
                        reader.onload = () => resolve(reader.result);
                    })
            )
        ).then(results => {
            const mergedData = results.join("\n");
            const lines = mergedData.split("\n");
            const warningContainer = document.getElementById('warning-container');
    
            let containsInvalidSummary = false;
    
            const processedLines = lines.map((line) => {
                if (line.startsWith("SUMMARY")) {
                    const index = line.indexOf(":");
                    if (index !== -1) {
                        const summaryContent = line.substring(index + 1).trim(); // Inhalt nach dem ersten Doppelpunkt
                        if (/\d|\./.test(summaryContent)) { // Prüft auf Ziffern oder Punkte
                            containsInvalidSummary = true;
                        }
                    }
                }
                return line;
            });
    
            // Zeigt die Warnung an, falls ungültige Einträge gefunden werden
            if (containsInvalidSummary) {
                warningContainer.style.display = "block";
            } else {
                warningContainer.style.display = "none";
            }
    
            document.getElementById('output').value = processedLines.join("\n");
        });
    }

    function copyToClipboard() {
        const output = document.getElementById('output');
        output.select();
        document.execCommand('copy');
        alert('ICS-Datei in die Zwischenablage kopiert!');
    }

    function editAndDisplayEntries() {
        const icsData = document.getElementById('output').value;
    
        if (!icsData) {
            alert("Keine ICS-Daten verfügbar. Bitte zuerst eine Datei verarbeiten.");
            return;
        }
    
        const lines = icsData.split("\n");
        const editedLines = lines.map(line => {
            if (line.startsWith("SUMMARY")) {
                const index = line.indexOf(":");
                if (index !== -1) {
                    const originalSummary = line.substring(index + 1).trim(); // Inhalt nach dem ersten Doppelpunkt
                    const cleanedSummary = originalSummary.replace(/[0-9.\s]/g, ""); // Entferne Ziffern, Punkte und Leerzeichen
                    return `SUMMARY:${cleanedSummary}`; // Ersetze SUMMARY_xyz mit SUMMARY:
                }
            }
            return line; // Unveränderte Zeilen zurückgeben
        });
    
        const editedOutput = document.getElementById('edited-output');
        editedOutput.value = editedLines.join("\n");
        document.getElementById('edited-output-section').style.display = 'block';
    }

    function copyEditedToClipboard() {
        const editedOutput = document.getElementById('edited-output');
        editedOutput.select();
        document.execCommand('copy');
        alert('Bearbeitete ICS-Daten in die Zwischenablage kopiert!');
    }

    function downloadEditedICSFile() {
        const editedOutput = document.getElementById('edited-output').value;

        if (!editedOutput) {
            alert("Keine bearbeiteten ICS-Daten verfügbar.");
            return;
        }

        const blob = new Blob([editedOutput], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'bearbeitete_kalender.ics';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
</script>
