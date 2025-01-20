---
title: ICS Code Generator
subtitle: ICS-Dateien hochladen oder erstellen
description: Lade ICS-Dateien hoch oder rufe sie von einer URL ab, um sie zu bearbeiten oder zusammenzuführen.
show_sidebar: false
layout: page
---
<div class="shb-main-container">

<h1 class="shb-main-title">ICS Code Generator</h1>

<h2 class="shb-section-title-center">ICS-Dateien zum Bearbeiten hochladen oder eigene erstellen</h2>

<p class="shb-main-description">
    Lade eine oder mehrere ICS-Dateien hoch um sie auszulesen oder zusammenzuführen, oder erstelle dir eine ICS Datei nach eigenen Angaben und lade sie herunter.
</p>

<h2 class="shb-section-title-center">Was möchtest du machen?</h2>

<div class="shb-center-container">
<div class="shb-form-group" style="flex-direction: row; gap: 50px;">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="mergeICSCheckbox" onchange="toggleSections()">
        <label for="mergeICSCheckbox" style="margin-left: 5px; font-size: 1.2em; color: #1ab5d5;">Mehrere ICS zusammenführen</label>
    </div>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="createICSCheckbox" onchange="toggleSections()">
        <label for="createICSCheckbox" style="margin-left: 5px; font-size: 1.2em; color: #1ab5d5;">Eigene ICS erstellen</label>
    </div>
</div>
</div>

<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>
<!--      ___ ____ ____                                                        __ _   _ _                        -->
<!--     |_ _/ ___/ ___|   _____   _ ___  __ _ _ __ ___  _ __ ___   ___ _ __  / _(_) (_) |__  _ __ ___ _ __      -->
<!--      | | |   \___ \  |_  / | | / __|/ _` | '_ ` _ \| '_ ` _ \ / _ \ '_ \| |_| | | | '_ \| '__/ _ \ '_ \     -->
<!--      | | |___ ___) |  / /| |_| \__ \ (_| | | | | | | | | | | |  __/ | | |  _| |_| | | | | | |  __/ | | |    -->
<!--     |___\____|____/  /___|\__,_|___/\__,_|_| |_| |_|_| |_| |_|\___|_| |_|_|  \__,_|_| |_|_|  \___|_| |_|    -->
<!--                                                                                                             -->


<section class="content-section" id="merge-section" style="display: none;">

<h3 class="shb-section-title-center">ICS-Dateien hochladen, auslesen oder zusammenführen</h3>
<div class="shb-center-container">
<p>
    Wähle entweder eine oder mehrere <code>.ics</code>-Dateien aus um sie auszulesen bzw. zusammenzuführen.
</p>
</div>
<div class="shb-form-group-container ics-file-container">
    <div class="shb-form-group ics-file-group">
        <label for="file1">ICS Datei 1 (erforderlich):</label>
        <input type="file" id="file1" accept=".ics">
    </div>
    <div class="shb-form-group ics-file-group">
        <label for="file2">ICS Datei 2 (optional):</label>
        <input type="file" id="file2" accept=".ics">
    </div>
    <div class="shb-form-group ics-file-group">
        <label for="file3">ICS Datei 3 (optional):</label>
        <input type="file" id="file3" accept=".ics">
    </div>
    <div class="shb-form-group ics-file-group">
        <label for="file4">ICS Datei 4 (optional):</label>
        <input type="file" id="file4" accept=".ics">
    </div>
    <div class="shb-form-group ics-file-group">
        <label for="file5">ICS Datei 5 (optional):</label>
        <input type="file" id="file5" accept=".ics">
    </div>
    <div class="shb-form-group ics-file-group">
        <label for="file6">ICS Datei 6 (optional):</label>
        <input type="file" id="file6" accept=".ics">
    </div>
</div>

<div class="shb-button">
    <button class="shb-button shb-button-blue" style="width: 30%" onclick="mergeICSFiles()">ICS Datei(en) verarbeiten</button>
</div>

</section>

<div class="important-container" id="warning-container" style="display: none;">
    <h3>❗ Achtung</h3>
    <p>
        Die Bezeichnungen deiner Kalender-Termine beinhalten Ziffern oder Punkte. Eine Bearbeitung dieser Einträge wird empfohlen.
    </p>
</div>

<section class="content-section" id="edit-section" style="display: none;">

<h3 class="shb-section-title-center">Zusammengeführte ICS-Datei</h3>
<div class="shb-center-container">
<p>
    Die ausgelesenen und zusammengeführten Inhalte der ICS-Dateien werden hier angezeigt.<br>
    Du kannst sie über die Buttons in die Zwischenablage kopieren oder den kombinierten Kalender herunterladen.
<br><br>
    Wenn fehlerhafte Einträge vorhanden sind, werden diese in der Tabelle darunter angezeigt.
<br><br>
    Mit einem Klick auf <strong>Einträge bearbeiten</strong> werden sämtliche fehlerhaften Einträge korrigiert und in einem neuen Ausgabefenster angezeigt.
</p>
</div>
<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="output" rows="20" cols="80" readonly></textarea>
</div>

<div id="error-table-container" class="shb-error-table-container" style="display: none;">
    <!-- Tabelle wird hier dynamisch eingefügt -->
</div>

<div class="shb-center-container">
<div class="shb-button-container">
    <button class="shb-button shb-button-yellow" onclick="copyToClipboard()">In Zwischenablage kopieren</button>
    <button class="shb-button shb-button-green" onclick="downloadMergedICSFile()">Zusammengeführte Datei herunterladen</button>
    <button class="shb-button shb-button-blue" onclick="editAndDisplayEntries()">Einträge bearbeiten</button>
</div>
</div>

</section>

<section class="content-section" id="edited-output-section" style="display: none;">

<h3 class="shb-section-title-center">Bearbeitete ICS-Datei</h3>
<div class="shb-center-container">
<p>
    Hier wird deine bearbeitete ICS-Datei angezeigt.
<br><br>
    Du kannst sie nun in die Zwischenablage kopieren oder herunterladen.
</p>
</div>
<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="edited-output" rows="20" readonly></textarea>
</div>

<div class="shb-center-container">
<div class="shb-button-container">
    <button class="shb-button shb-button-yellow" onclick="copyEditedToClipboard()">Bearbeitete Datei kopieren</button>
    <button class="shb-button shb-button-green" onclick="downloadEditedICSFile()">Bearbeitete Datei herunterladen</button>
</div>
</div>

</section>

<!--      ___ ____ ____                  _       _ _                -->
<!--     |_ _/ ___/ ___|    ___ _ __ ___| |_ ___| | | ___ _ __      -->
<!--      | | |   \___ \   / _ \ '__/ __| __/ _ \ | |/ _ \ '_ \     -->
<!--      | | |___ ___) | |  __/ |  \__ \ ||  __/ | |  __/ | | |    -->
<!--     |___\____|____/   \___|_|  |___/\__\___|_|_|\___|_| |_|    -->
<!--                                                                -->

<section class="content-section" id="create-section" style="display: none;">

<h3 class="shb-section-title-center">Eigene ICS-Datei erstellen</h3>

<p>
    Fülle die Felder aus, um eigene Events zu erstellen und in eine ICS-Datei zu exportieren.
</p>

<p>
    Mit jedem Klick des Buttons <strong>Event hinzufügen</strong>, werden dein eingetragener Eventname und das Eventdatum deinem gewählten Kalendernamen hinzugefügt^
</p>

<p>
    Wenn alle Einträge getroffen sind, kannst du deinen erstellten ICS-Kalender herunterladen
</p>

<div class="shb-form-group">
    <label for="calendarName">Kalendername:</label>
    <input type="text" id="calendarName" placeholder="z.B. Mein Kalender" style="width: 30%">
</div>
<div class="shb-form-group">
    <label for="eventName">Eventname:</label>
    <input type="text" id="eventName" placeholder="z.B. Restabfall" style="width: 30%">
</div>
<div class="shb-form-group">
    <label for="eventDate">Eventdatum:</label>
    <input type="date" id="eventDate" placeholder="tt.mm.jjjj" style="width: 30%">
</div>

<div class="shb-button">
    <button class="shb-button shb-button-blue" style="width: 30%" onclick="addEventToICS()">Event hinzufügen</button>
</div>

<div class="shb-text-output">
    <textarea class="shb-text-code-output" id="created-ics-output" rows="10" readonly></textarea>
</div>

<div class="shb-button">
<button class="shb-button shb-button-blue" style="width: 30%" onclick="downloadCreatedICS()">Erstellten Kalender herunterladen</button>
</div>

</section>

<footer class="shb-footer">
    <p>Mit dem ICS Code Generator kannst du deine Kalender schnell und einfach bearbeiten oder einen eigenen erstellen.</p>
    <h2>Viel Erfolg! 🎉</h2>
</footer>

{% include support_note.html %}

</div>

<style>
/* Styling nur für die ics-file-container */
.ics-file-container {
    display: flex;
    flex-wrap: wrap; /* Mehrere Zeilen erlauben */
    gap: 20px; /* Abstand zwischen den Feldern */
    justify-content: space-between; /* Gleichmäßige Verteilung */
}

/* Styling für die spezifischen Eingabefelder */
.ics-file-container .ics-file-group {
    flex: 1 1 calc(30% - 20px);
    box-sizing: border-box;
}

/* Input- und Label-Stil bleibt gleich */
.ics-file-container .ics-file-group label {
    font-weight: bold;
}

.ics-file-container .ics-file-group input {
    width: 100%; /* Eingabefeld füllt die gesamte Breite */
    padding: 8px;
    background-color: #1ab5d5;
    border-radius: 5px;
    border: 1px solid #ffffff;
    font-size: 14px;
}

/* Fehler-Tabelle spezifisch */
.shb-error-table-container {
    margin: auto;
    width: 100%;
}

.shb-error-table {
    width: 100%;
    border: 4px solid #1ab5d5;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    text-align: left;
    margin: 20px 0;
}

.shb-error-table thead th {
    background-color: #1ab5d5; /* Kopfzeile bleibt blau */
    color: #000000 !important;
    padding: 5px 10px;
    font-weight: bold;
    text-transform: uppercase;
    border-left: 2px solid #000000 !important;
}

.shb-error-table thead th:first-child {
    border-left: none;
}

/* Differenzierung der Zeilenfarben */
.shb-error-table tbody tr:nth-child(odd) {
    background-color: #fffdf0 !important; /* Sehr helles Gelb für ungerade Zeilen */
}

.shb-error-table tbody tr:nth-child(even) {
    background-color: #fff7cc !important; /* Dunkleres Gelb für gerade Zeilen */
}

.shb-error-table tbody td {
    padding: 10px;
    vertical-align: middle;
    border-left: 2px solid #1ab5d5;
}

/* Farben für die Spalten */
.shb-error-table tbody td.summary-cell {
    background-color: rgba(184, 243, 255, 0.6); /* Helles Blau mit Transparenz */
    color: #000000;
    font-weight: bold;
}

.shb-error-table tbody td.error-cell {
    background-color: rgba(255, 204, 204, 0.6); /* Helles Rot mit Transparenz */
    color: #990000;
    font-weight: bold;
}

.shb-error-table tbody td.action-cell {
    background-color: rgba(255, 247, 204, 0.6); /* Helles Gelb mit Transparenz */
    color: #665500;
    font-weight: bold;
}

/* Hover-Effekt bleibt erhalten */
.shb-error-table tbody tr:hover {
    background-color: #e6f7ff !important; /* Leichtes Blau beim Hover */
    transition: background-color 0.3s ease;
}

</style>

<script>
    function toggleSections() {
        const mergeCheckbox = document.getElementById('mergeICSCheckbox');
        const createCheckbox = document.getElementById('createICSCheckbox');
        const mergeSection = document.getElementById('merge-section');
        const createSection = document.getElementById('create-section');

        // Sichtbarkeit basierend auf Checkbox-Zustand
        if (mergeCheckbox.checked) {
            mergeSection.style.display = 'block';
        } else {
            mergeSection.style.display = 'none';
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
        showSHBcustomAlert('Achtung!', 'Bitte mindestens eine ICS-Datei hochladen');
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

        const errorMap = new Map();

        lines.forEach((line, index) => {
            if (line.startsWith("SUMMARY")) {
                const contentIndex = line.indexOf(":");
                if (contentIndex !== -1) {
                    const summaryContent = line.substring(contentIndex + 1).trim();

                    const errors = [];
                    if (/[äöüÄÖÜß]/.test(summaryContent)) {
                        errors.push({ type: "Umlaut entdeckt", action: "Umlaut wird geändert" });
                    }
                    if (/[()\\/]/.test(summaryContent)) {
                        errors.push({ type: "Sonderzeichen entdeckt", action: "Sonderzeichen und nachfolgender Text wird entfernt" });
                    }
                    if (/[0-9]/.test(summaryContent)) {
                        errors.push({ type: "Ziffer entdeckt", action: "Ziffer wird entfernt" });
                    }
                    if (summaryContent.includes(" ")) {
                        errors.push({ type: "Leerzeichen entdeckt", action: "Leerzeichen wird entfernt" });
                    }

                    if (errors.length > 0) {
                        const errorDescription = errors.map(e => e.type).join(", ");
                        const actions = errors.map(e => e.action).join(", ");
                        if (!errorMap.has(summaryContent)) {
                            errorMap.set(summaryContent, { errorDescription, actions });
                        }
                    }
                }
            }
        });

        const errorList = Array.from(errorMap.entries()).map(([summary, { errorDescription, actions }]) => ({
            summary,
            error: errorDescription,
            action: actions,
        }));

        displayErrorTable(errorList);

        document.getElementById('output').value = lines.join("\n");
        document.getElementById('edit-section').style.display = 'block';
    });
}

function displayErrorTable(errorList) {
    const container = document.getElementById('error-table-container');
    container.innerHTML = ''; // Vorherigen Inhalt löschen

    if (errorList.length > 0) {
        const tableHTML = `<table class="shb-error-table">
            <thead>
                <tr>
                    <th>Fehlerhafter SUMMARY</th>
                    <th>Fehlerbeschreibung</th>
                    <th>Nach Bearbeitung</th>
                </tr>
            </thead>
            <tbody>
                ${errorList
                    .map(
                        error =>
                            `<tr>
                                <td class="summary-cell">${error.summary}</td>
                                <td class="error-cell">${error.error}</td>
                                <td class="action-cell">${error.action}</td>
                            </tr>`
                    )
                    .join('')}
            </tbody>
        </table>`;

        container.innerHTML = tableHTML;
        container.style.display = "block"; // Tabelle sichtbar machen
    } else {
        container.style.display = "none"; // Keine Fehler -> Tabelle ausblenden
    }
}

    function copyToClipboard() {
        const output = document.getElementById('output');
        output.select();
        document.execCommand('copy');
        showSHBcustomAlert('Super!', 'Die ICS-Datei wurde in die Zwischenablage kopiert!');
    }

    function downloadMergedICSFile() {
        const mergedOutput = document.getElementById('output').value;

        if (!mergedOutput) {
            showSHBcustomAlert('Oh Jeh!', 'Es ist keine zusammengeführte ICS-Datei verfügbar.');
            return;
        }

        const blob = new Blob([mergedOutput], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'kombinierter_kalender.ics';
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

function editAndDisplayEntries() {
    const icsData = document.getElementById('output').value;

    if (!icsData) {
        showSHBcustomAlert('Sorry!', 'Keine ICS-Daten verfügbar. Bitte zuerst eine Datei verarbeiten.');
        return;
    }

    const lines = icsData.split("\n");

    const editedLines = lines.map(line => {
        if (line.startsWith("SUMMARY")) {
            const index = line.indexOf(":");
            if (index !== -1) {
                const originalSummary = line.substring(index + 1).trim();

                // Entferne alles ab dem ersten Sonderzeichen
                let cleanedSummary = originalSummary.replace(/[^a-zA-ZäöüÄÖÜß\s]+.*/, "").trim();

                // Ersetze Umlaute
                cleanedSummary = cleanedSummary
                    .replace(/ä/g, "ae")
                    .replace(/ö/g, "oe")
                    .replace(/ü/g, "ue")
                    .replace(/ß/g, "ss")
                    .replace(/Ä/g, "Ae")
                    .replace(/Ö/g, "Oe")
                    .replace(/Ü/g, "Ue");

                // Entferne Ziffern, Punkte und Leerzeichen
                cleanedSummary = cleanedSummary.replace(/[0-9.\s]/g, "").trim();

                return `SUMMARY:${cleanedSummary}`; // Ersetze SUMMARY mit bereinigtem Wert
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
        showSHBcustomAlert('Perfekt!', 'Deine bearbeitete ICS-Datei wurde in die Zwischenablage kopiert!');
    }

    function downloadEditedICSFile() {
        const editedOutput = document.getElementById('edited-output').value;

        if (!editedOutput) {
            showSHBcustomAlert('Oh Jeh!', 'Es sind keine bearbeiteten ICS-Daten verfügbar.');
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
        showSHBcustomAlert('Nicht vergessen!', 'Du musst ein Datum für das Event auswählen.');
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
