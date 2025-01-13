---
title: ICS Code Generator
subtitle: ICS-Dateien hochladen oder erstellen
description: Lade ICS-Dateien hoch oder rufe sie von einer URL ab, um sie zu bearbeiten oder zusammenzuführen.
show_sidebar: false
layout: page
---
<div class="ics-guide">
    <h1 class="ics-title" style="color: #1598b3; font-size: 2.5em;">ICS Code Generator</h1>
    <h2 class="ics-subtitle">ICS-Dateien zum Bearbeiten hochladen oder eigene erstellen</h2>
    <p class="ics-description">
        Lade eine oder mehrere ICS-Dateien hoch um sie auszulesen oder zusammenzuführen, oder erstelle dir eine ICS Datei nach eigenen Angaben und lade sie herunter.
    </p>
    <h2 class="ics-subtitle">Was möchtest du machen?</h2>
    <div class="ics-options">
        <label>
            <input type="checkbox" id="mergeICSCheckbox" onchange="toggleSections()"> Mehrere ICS zusammenführen
        </label>
        <label>
            <input type="checkbox" id="createICSCheckbox" onchange="toggleSections()"> Eigene ICS erstellen
        </label>
    </div>
    <section class="ics-step" id="merge-section" style="display: none;">
        <h3>ICS-Dateien hochladen oder URL verwenden</h3>
        <p>
            Wähle entweder eine oder mehrere <code>.ics</code>-Dateien aus um sie auszulesen bzw. zusammenzuführen.
        </p>
        <form class="ics-file-upload">
            <div class="ics-file-group">
                <label for="file1">ICS Datei 1 (erforderlich):</label>
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
    <section class="ics-step" id="edit-section" style="display: none;">
        <h3>Zusammengeführte ICS-Datei</h3>
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
<section class="ics-step" id="create-section" style="display: none;">
    <h3>Eigene ICS-Datei erstellen</h3>
    <p>Fülle die Felder aus, um eigene Events zu erstellen und in eine ICS-Datei zu exportieren.</p>
    <p>Mit jedem Klick des Buttons <strong>Event hinzufügen</strong>, werden dein eingetragener Eventname und das Eventdatum deinem gewählten Kalendernamen hinzugefügt</p>
    <p>Wenn alle Einträge getroffen sind, kannst du deinen erstellten ICS-Kalender herunterladen</p>
    <form id="ics-creation-form">
        <div class="ics-file-group">
            <label for="calendarName">Kalendername:</label>
            <input type="text" id="calendarName" placeholder="z.B. Mein Kalender">
        </div>
        <div class="ics-file-group">
            <label for="eventName">Eventname:</label>
            <input type="text" id="eventName" placeholder="z.B. Restabfall">
        </div>
        <div class="ics-file-group">
            <label for="eventDate">Eventdatum:</label>
            <input type="date" id="eventDate" placeholder="tt.mm.jjjj">
        </div>
        <button type="button" class="ics-button" onclick="addEventToICS()">Event hinzufügen</button>
    </form>
    <textarea id="created-ics-output" rows="10" readonly></textarea>
    <br>
    <button class="ics-button" onclick="downloadCreatedICS()">Erstellten Kalender herunterladen</button>
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
        border: 1px solid #1598b3;
        border-radius: 8px;
        box-shadow: 0 4px 4px 6px #1598b380;
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
        color: #d1d1d1;
        margin-bottom: 20px;
    }
    .ics-step {
        margin-bottom: 20px;
        padding: 15px;
        background-color: #252525;
        border: 1px solid #444;
        border-radius: 8px;
    }
    .ics-step h3 {
        color: #4CAF50;
        font-size: 1.4em;
        margin-bottom: 15px;
        text-align: center;
    }
    .ics-options {
        text-align: center;
        margin-bottom: 20px;
    }

    .ics-options label {
        display: inline-block;
        margin: 0 10px;
        font-size: 1.2em;
        color: #d1d1d1;
        cursor: pointer;
    }

    .ics-options input {
        margin-right: 5px;
    }
    .ics-file-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        gap: 8px;
    }
    .ics-file-group label {
        font-weight: bold;
        color: #d1d1d1;
    }
    .ics-file-group input {
        width: 50%;
        padding: 10px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #1a1a1a;
        color: #d1d1d1;
    }
    .ics-file-group input:focus {
        outline: none;
        border-color: #4CAF50;
    }
    .ics-file-group input[type="date"] {
        background-color: #ffffff; /* Heller Hintergrund */
        color: #000000; /* Schwarzer Text */
        height: 40px;
        border: 2px solid rgb(0, 0, 0);
        border-radius: 4px;
        padding: 5px 10px;
    }
    .ics-file-group input[type="date"]:focus {
        outline: none;
        border: 2px solid #4CAF50; /* Grün als Fokusfarbe */
    }
    .ics-button {
        padding: 10px 20px;
        font-size: 1em;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
        width: 100%;
        text-align: center;
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
        background-color: #1a1a1a;
        color: #d1d1d1;
        font-family: Arial, sans-serif;
        font-size: 1em;
        line-height: 1.5;
    }
    .ics-footer {
        text-align: center;
        margin-top: 20px;
    }
    .ics-footer h4 {
        color: #ffffff;
    }
    .ics-footer p {
        color: #d1d1d1;
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
function toggleSections() {
    const mergeCheckbox = document.getElementById('mergeICSCheckbox');
    const createCheckbox = document.getElementById('createICSCheckbox');
    const mergeSection = document.getElementById('merge-section');
    const editSection = document.getElementById('edit-section');
    const createSection = document.getElementById('create-section');

    // Sichtbarkeit basierend auf Checkbox-Zustand
    if (mergeCheckbox.checked) {
        mergeSection.style.display = 'block';
        editSection.style.display = 'block';
    } else {
        mergeSection.style.display = 'none';
        editSection.style.display = 'none';
    }

    if (createCheckbox.checked) {
        createSection.style.display = 'block';
    } else {
        createSection.style.display = 'none';
    }
}

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

let icsContent = "";

function addEventToICS() {
    const calendarName = document.getElementById('calendarName').value || "Mein Kalender";
    const eventName = document.getElementById('eventName').value || "Unbekanntes Event";
    const eventDate = document.getElementById('eventDate').value;

    if (!eventDate) {
        alert("Bitte ein Datum für das Event auswählen.");
        return;
    }

    if (!icsContent) {
        icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:${calendarName}
`;
    }

    const eventEntry = `BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART;VALUE=DATE:${eventDate.replace(/-/g, "")}
DESCRIPTION:${eventName}
END:VEVENT
`;

    icsContent += eventEntry;

    // Zeige den aktuellen Inhalt der ICS-Datei im Textfeld an
    document.getElementById('created-ics-output').value = `${icsContent}END:VCALENDAR`;
}

function downloadCreatedICS() {
    const calendarName = document.getElementById('calendarName').value || "Mein Kalender";
    const finalICSContent = `${icsContent}END:VCALENDAR`;

    const blob = new Blob([finalICSContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${calendarName}.ics`;
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

</script>
