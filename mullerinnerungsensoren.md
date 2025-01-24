---
title: Müllerinnerung Sensoren Codegenerator
subtitle: Erstelle die Template-Codes für deine Müllerinnerung
description: Generiere die Templates für die Waste Collection Schedule Integration anhand der Angaben aus deinem Müllkalender.
tags: [Home Assistant, Abfallerinnerung, Müllerinnerung, Waste Collection Schedule, Codegenerator, ics Kalender]
show_sidebar: false
layout: page
---
<div class="shb-main-container">
<h1 class="shb-main-title">Müllerinnerung Code-Generator</h1>
<br>
<p class="shb-main-description">
    Mit diesem Code-Generator hast du die Möglichkeit, deine Müllerinnerung vom Anlegen des Kalenders über das Einrichten der Sensoren und Templates bis hin zur Dashboard- und Pop-Up- Karte durchzuführen.
</p>
<!-- Wichtiger Hinweis -->
<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Bevor du startest stelle sicher, dass die hier angeführten Hinweise vorhanden / eingerichtet sind!
    </p>
    <p>
        Ebenfalls ist zu beachten, dass derzeit nur ICS Dateien und ICS-URLs für den Codegenerator genutzt werden können.
    </p>
</div>
<h4 class="shb-section-title-left">Was muss vor der Bearbeitung mit dem Code-Generator vorbereitet werden:</h4>

<ul class="shb-list-start">
    <li>Herunterladen und installieren der <strong>Waste Collection Schedule</strong> in HACS</li>
    <li>Anlegen eines <strong>muell</strong> Ordners im <strong>config/www/</strong> Ordner</li>
    <li>Bereitstellung einer ICS Datei oder URL</li>
</ul>
<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('noISCdropdown', this)">
        Was mache ich, wenn ich keine ICS Datei oder URL habe? <span>⬇️</span>
    </button>
    <div id="noISCdropdown" class="shb-dropdown-content" style="display: none;">
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

<div id="shb-custom-alert" style="display: none;">
    <div id="shb-custom-alert-content">
        <h4 id="shb-custom-alert-title"></h4>
        <p id="shb-custom-alert-message"></p>
        <button id="shb-close-alert">OK</button>
    </div>
</div>
<br>
<div class="shb-button">
    <button class="shb-button shb-button-main" style="margin-bottom: 30px;" onclick="showStep(1);">👇  Hinweise gelesen! Vorbereitungen getroffen! Bereit zu starten!  👇</button>
</div>
<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ███ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         ██ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██         ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██ 
-->

<div class="content-section" id="step-1" style="display:none;">
<h2 class="shb-section-title-center">1. Kalenderdaten Auslesen</h2>

<p>
    Zum Auslesen der verschiedenen Abholungen aus deinem Müllkalender, gib bitte deine URL an oder lade die ICS-Datei hoch und bestätige unten mit <button class="shb-inline-button-main">Kalendereinträge extrahieren</button>.
</p>

<div class="shb-form-group">
    <label for="icsFile">ICS-Datei hochladen</label>
    <input type="file" id="icsFile" style="width: 30%" accept=".ics" />
</div>

<div class="shb-form-group">
    <label for="calendarUrl">oder ICS-URL eingeben</label>
    <input type="url" id="calendarUrl" style="width: 30%" placeholder="https://example.com/kalender.ics" />
</div>

<div class="shb-button">
    <button class="shb-button shb-button-main" style="margin-bottom: 30px;" onclick="extractEntries();">👇  Kalendereinträge extrahieren!  👇</button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██      
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
-->

<div class="content-section" id="step-2" style="display:none;">
<h2 class="shb-section-title-center">2. Kalenderdaten Umwandeln</h2>

<p>
    Im nächsten Schritt wähle jene Einträge aus, welche zu deinen Sensoren hinzugefügt werden sollen.<br> Zusätzlich hast du die Möglichkeit individuelle Bezeichnungen zu vergeben.
</p>

<div id="umlaut-warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Deine persönlichen Bezeichnungen dürfen keine Umlaute enthalten und Leerzeichen sollen vermieden werden!
    </p>
</div>
<!-- Warnungscontainer -->
<div id="warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Deine Kalender enthält ungültige Einträge wie z.B. <strong>Ä, Ö, Ü, Leerzeichen oder Sonderzeichen </strong>.<br>
        Diese Einträge sollten unbedingt ohne diese Zeichen angepasst werden, um Fehler zu vermeiden.<br>
        Am Besten korrigierst du diese hier über die <strong>Eigenen Bezeichnungen</strong> und in der Waste Collection Schedule gleichermaßen über die <strong>Mülltypen (Alias-Namen)</strong>. 
    </p>
</div>
<div id="url-warning-container" class="important-container" style="display: none;">
    <h3>❗Achtung</h3>
    <p>
        Wenn das Laden der Daten deiner URL nicht funktioniert, wurde die Anfrage von dieser Seite vermutlich abgelehnt.<br>
        In diesem Fall, lade dir die ICS Datei lokal auf deinen Rechner und füge sie als Datei in den Codegenerator ein, um mit der Codeerstellung fortzufahren.<br>
        In der Waste Collection Schedule kannst du versuchen, die URL trotzdem zu verwenden.
    </p>
</div>
<p>
    Wähle deine Bezeichnung so, dass sie kurz und sinnvoll ist. Es ist nicht notwendig, das Wort <strong>Tonne</strong> in die Bezeichnung aufzunehmen, da dies automatisch vom Codegenerator ergänzt wird.<br>
    Beispiel: Aus der Bezeichnung <strong>Papier</strong> wird automatisch <strong>die Papier Tonne</strong>.
</p>
<p>
    Anders ist es bei der Verwendung von Säcken. Werden anstatt Tonnen, Säcke verwendet, ist die Bezeichnung <strong>Sack</strong> der Farbe oder dem Müll-Typ anzuhängen.<br>
    Beispiel: Für Restabfall wähle die Bezeichnung <strong>Restabfall Sack</strong>, für den gelben Sack wähle die Bezeichnung <strong>Gelber Sack</strong>. 
</p>
<p>

    Es sind folgende Farben von Säcken für die Bezeichnung möglich:
</p>
<ul>
    <li>Gelber Sack</li>
    <li>Schwarzer Sack</li>
    <li>Roter Sack</li>
    <li>Blauer Sack</li>
</ul>
<p>
Nach den Änderungen klicke unten auf <button class="shb-inline-button-main">Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!</button>
</p>

<div class="shb-styled-table-container">
<table class="shb-custom-table" id="entry-table">
    <thead>
        <tr>
            <th style="text-align: center;">Auswählen</th>
            <th>Kalendereintrag</th>
            <th>Eigene Bezeichnung</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->
    </tbody>
</table>
</div>

<p>
    Es kommt häufig vor, dass Kalendereinträge nicht nur die einfachen Namen sonder mit zusätzlichem Text versehen sind.<br>
    In solch einem Fall, kann im nächsten Schritt die eigene Bezeichnung auch als Alias in der Waste Collection Schedule angelegt werden.
</p>

<div class="shb-button" id="confirm-step-2">
    <button class="shb-button shb-button-main" style="margin-bottom: 30px;" onclick="handleStepTransition();">👇  Auswahl getroffen, eigene Bezeichnungen gewählt? Weiter mit Sensoren!  👇</button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██             ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██         █████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ██████  
-->

<div class="content-section" id="step-3" style="display:none;">
<h2 class="shb-section-title-center">3. Sensoren Konfiguration</h2>

<p>
    Wenn du eine ICS Datei verwendest, sollte an diesem Punkt diese Datei in deinem <strong>www/muell/</strong> Ordner abgelegt werden.
</p>

<p>
    Nun kann die bereits installierte Integration <strong>Waste Collection Schedule</strong> in Home Assistant - Geräte & Dienste eingerichtet werden.<br>
    Eine detaillierte Beschreibung wie diese einzurichten ist, findest du im <strong>⬇️ Dropdown Menü ⬇️</strong>
</p>

<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown', this)">Waste Collection Schedule Integration und Sensor Einrichtung <span>⬇️</span></button>
    <div id="galleryDropdown" class="shb-dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_mull_helfer %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                    {{ gallery.subtitle | markdownify }}
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>
<h4 class="shb-section-title-left">Was kann in der Waste Collection Schedule Integration eingerichtet werden:</h4>

<ul class="shb-list-start">
    <li><strong>Kalender</strong> - Anlegen deines Abfallkalenders mittels ICS, URL oder Abfall App</li>
    <li><strong>Mülltypen</strong> - Änderung der Bezeichnungen deiner einzelnen Abholungen (Alias Namen)</li>
    <li><strong>Sensor Nächste Abholung</strong> - Ein Sensor welche die nächste Abholung als Status ausgibt</li>
    <li><strong>Sensor einzelne Abholung</strong> - Sensoren für jeden einzelnen Mülltyp mit "heute", "morgen" oder "in Tragen"</li>
    <li><strong>Sensor Datum</strong> - Sensoren welche das Datum der nächsten Abholung einzelner Mülltypen ausgibt</li>
</ul>
<br>

<h3 class="shb-section-title-center" id="sensor-header" style="display:none;">Sensor zur Anzeige der nächsten Abholung</h3>

<p>
    Der erste Sensor welcher anzulegen ist, betrifft die <strong>Nächste Abholung</strong>.<br>
    <br>
    Mit einem Klick auf den Sensor Namen in der Tabelle und auf den <code>Kopieren</code> Button des Werte Template, werden diese in die Zwischenablage kopiert.<br>
    Kopierte Einträge werden mit einem ✔️ gekennzeichnet.<br>
    Dann den <strong>SENSOR NAME</strong> zusammen mit dem <strong>Werte Template Nächste Abholung</strong> in die Waste Collection Schedule eintragen.
</p>

<table class="shb-custom-table" id="next-event-table">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th style="text-align: center;">Kopiert</th>
            <th>Entity ID</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="Nächste Abholung">Nächste Abholung</td>
            <td class="status" id="next-event-sensor" style="text-align: center;">❌</td>
            <td>sensor.nachste_abholung</td>
        </tr>
    </tbody>
</table>

<div id="code-output-next" style="display:none;">
    <h4>Werte Template Nächste Abholung</h4>
    <div class="shb-code-container">
        <button class="copy-code-button" onclick="copyCode('next-pickup-template', this)">Kopieren</button>
        <pre id="next-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>

<h3 class="shb-section-title-center" id="template-header" style="display:none;">Sensoren für einzelne Abholungen / Müll-Typen</h3>

<p>
    Nun müssen den Sensoren bzw. den Müll-Typen die Tonnen oder Säcke in den verschidenen Farben zugeordnet werden.<br>
    Wichtig ist, dass <strong>keine</strong> Farbe zweimal verwendet werden darf.<br>
    Du kannst deine gewählten Bilder, um sie für dein Dashboard zu nutzen, später bei den Dashboard-Karten herunterladen.
</p>
<p>
    Nach der Zuordnung sind auch diese Sensoren in der Waste Collection Schedule anzulegen.<br>
    Auch hier funktioniert das Kopieren wie schon zuvor. Einfach den Sensor Name anklicken um ihn zu kopieren und zusammen mit dem <strong>Werte Template einzelne Abholungen</strong> als <code>Abfallarten</code> in der Waste Collection Schedule einzeln anlegen.
</p>

<table class="shb-custom-table" id="sensor-table" style="display:none;">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th style="text-align: center;">Kopiert</th>
            <th>Original Name</th>
            <th>Entity ID</th>
            <th>Tonnen Farbe</th>
            <th style="text-align: center;">Vorschau</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->
    </tbody>
</table>

<div id="code-output-events" style="display:none;">
    <h4>Werte Template einzelne Abholungen</h4>
    <div class="shb-code-container">
        <button class="copy-code-button" onclick="copyCode('individual-pickup-template', this)">Kopieren</button>
        <pre id="individual-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>

<h3 class="shb-section-title-center" id="date-sensor-header" style="display:none;">Optional: Sensoren für die Datum Anzeige der einzelnen Müll-Typen</h3>

<p>
    Wenn du das Datum der einzelnen Abholung benötigst, kannst du dir diesen Sensor ebenfalls anlegen.<br>
    Nutze dazu den Sensor Namen mit dem Zusatz <strong>Datum</strong>, kopiere ihn mit einem Klick aus der Liste 
    und lege diesen Sensor zusammen mit dem <strong>Werte Template Datum einzelne Abholungen</strong> ebenfalls als <code>Abfallarten</code>, einzeln, in der Waste Collection Schedule an.
</p>

<table class="shb-custom-table" id="date-sensor-table" style="display: none;">
    <thead>
        <tr>
            <th>Sensor Name</th>
            <th style="text-align: center;">Kopiert</th>
            <th>Entity ID</th>
        </tr>
    </thead>
    <tbody>
        <!-- Dynamically populated rows will go here -->    
    </tbody>
</table>

<div id="code-output-date" style="display:none;">
    <h4>Werte Template Datum einzelne Abholungen</h4>
    <div class="shb-code-container">
        <button class="copy-code-button" onclick="copyCode('date-pickup-template', this)">Kopieren</button>
        <pre id="date-pickup-template" class="language-yaml"><code></code></pre>
    </div>
</div>

<h3 class="shb-section-title-center">Tageszeit des Anzeigewechsel ändern</h3>

<p>
    In der Integration ist der Wechsel der Tageszeit lt. Standard <strong>10:00 Uhr</strong>.<br>
    Ab diesem Zeitpunkt wird die Abholung für heute und morgen gewechselt und daher nicht mehr angezeigt.<br>
    Diese Zeit kann wie folgt auf eigene Bedürfnisse geändert werden.
</p>

<div class="columns is-centered">
{% assign gallery_images = site.data.gallery_wcs_integration_tageszeitwechsel %}
    <div class="columns is-multiline">
        {% for gallery in gallery_images %}
            <div class="column is-12">
                <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
            </div>
            {% for image in gallery.images %}
                <div class="column is-3-desktop is-6-tablet">
                    <div class="card">
                        <div class="card-image">
                            {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                        </div>
                        <div class="card-content">
                            <div class="content">
                                {{ image.description | markdownify }}
                            </div>
                        </div>
                    </div>
                </div>
            {% endfor %}
        {% endfor %}
    </div>
</div>

<div class="shb-button" id="confirm-step-3" style="margin-top: 20px;">
    <button class="shb-button shb-button-main" onclick="if (validateColors()) { showStep(4); }">👇  Sensoren angelegt? Weiter zu den Templates!  👇
    </button>
</div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ██   ██ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██   ██ 
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██             ██ 
-->

<div class="content-section" id="step-4" style="display:none;">
<h2 class="shb-section-title-center">4. Templates Erstellen</h2>

<!-- Hinweisfenster mit Beschreibung -->
<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Vor der Erstellung der Templates solltest du entscheiden, ob du den Text <strong>Du musst heute keine Tonne rausstellen!</strong> bzw. <strong>Du musst morgen keine Tonne rausstellen!</strong> angezeigt bekommen möchtest oder nicht.<br>
        Für eine Anzeige dieses Textes, aktiviere die jeweilige Checkbox ✅.
    </p>
</div>

<p>
    Eine Beschreibung wie man einen Template-Sensor Helfer in Home Assistant anlegt,findest du im <strong>⬇️ Dropdown Menü ⬇️</strong>
</p>

<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown2', this)">Home Assistant - Template Sensor Helfer anlegen <span>⬇️</span></button>
    <div id="galleryDropdown2" class="shb-dropdown-content" style="display: none;">
        <div class="shb-dropdown-youtube">
            {% include youtube.html video="3fhL_K4o3Dg" %}
        </div>
        {% assign gallery_images = site.data.gallery_helfer_Template_mullerinnerung %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>


<!-- Checkboxen für "keine"-Anzeige -->
<div class="shb-form-group">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="keineHeute" />
        <label for="keineHeute">Anzeige Text "keine" für Heute</label>
    </div>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="keineMorgen" />
        <label for="keineMorgen">Anzeige Text "keine" für Morgen</label>
    </div>
</div>

<div class="shb-button">
    <button class="shb-button shb-button-main" onclick="showStep(5); createTemplates()">👇  Templates erstellen  👇</button>
</div>
<br>
<!-- Output for "Müllabholung Heute" -->
<div id="helper-template-output-heute" style="display:none;">
    <div class="shb-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Heute</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="shb-code-container">
        <button class="copy-code-button" onclick="copyCode('helper-template-heute', this)">Kopieren</button>
        <pre id="helper-template-heute" class="language-yaml"><code></code></pre>
    </div>
</div>

<!-- Output for "Müllabholung Morgen" -->
<div id="helper-template-output-morgen" style="display:none;">
    <div class="shb-title-inline">
        <h4 onclick="copyTitleToClipboard(this)">Müllabholung Morgen</h4>
        <p>Klicke auf die Überschrift um sie zu kopieren!</p>
        <span class="copy-confirmation" style="display: inline;">❌</span>
    </div>
    <div class="shb-code-container">
        <button class="copy-code-button" onclick="copyCode('helper-template-morgen', this)">Kopieren</button>
        <pre id="helper-template-morgen" class="language-yaml"><code></code></pre>
    </div>
</div>
</div>
<div class="content-section" id="step-5" style="display:none;">
    <div class="shb-button">
        <button class="shb-button shb-button-main" onclick="showStep(6); createImageList();">👇  Templates angelegt? Weiter zu den Dashboard-Karten!  👇</button>
    </div>
</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████     ███████ 
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██      
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████ 
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██             ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██        ███████ 
                                                                              
-->

<div class="content-section" id="step-6" style="display:none;">
<h2 class="shb-section-title-center">5. Dashboard-Karten</h2>

<div class="important-container">
    <h3>❗Wichtig</h3>
    <p>
        Bevor du die Dashboard-Karte erstellst, stelle sicher, dass die <strong>"Custom Button Card"</strong> in HACS installiert ist.<br>
        Diese Button Card ist für die korrekte Darstellung der Dashboard-Karte unbedingt notwendig.
    </p>
</div>

<p>
    Hier siehst du eine Zusammenfassung deiner Einstellungen, welche den Zusammenhang deines Sensor-Namens mit den gewählten Tonnenfarben darstellt.<br>
    Die Vorschaubilder können mit einem Klick darauf heruntergeladen werden.
</p>
<p>
    Alle Bilder sollten in Home Assistant im Ordner <strong>www/muell</strong> gespeichert werden.<br>
    <strong>Wichtig ist, dass diese vor dem Erstellen der Dashboard-Karten hinzugefügt werden!</strong>
</p>
<div id="image-list-output"></div>


<div id="example-section" style="margin-top: 50px;">
    <h3 class="shb-section-title-left">Dashboard-Karten Optionen</h3>
</div>

<div id="sensor-summary" class="sensor-summary">
    <p>
        Du hast <span id="sensor-count" style="font-weight: bold; color: #4be0ff;">0</span> Sensoren angelegt.
    </p>
</div>

<p>
    Mit dieser Checkbox kannst du auswählen, ob die Tonne bei Abholung blinken soll.<br>
    Bei der Anzeige Auswahl wird eingestellt, ob der Text und die optional blinkende Tonne für heute oder morgen angezeigt werden soll.
</p>

<!-- Checkbox für "Tonne blinkend" -->
<div class="shb-form-group">
    <div class="checkbox-wrapper">
        <input type="checkbox" id="blinkendCheckbox">
        <label for="blinkendCheckbox">Tonne blinkend</label>
    </div>
</div>

<!-- Auswahlliste für "Anzeige Heute" und "Anzeige Morgen" -->
<div class="shb-form-group">
    <label for="anzeigeAuswahl">Anzeige Auswahl:</label>
    <select id="anzeigeAuswahl" style="width: 30%;">
        <option value="heute">Anzeige Heute</option>
        <option value="morgen">Anzeige Morgen</option>
    </select>
</div>

<p class="description-text">
    Die Dashboard-Karten wurden so konfiguriert, dass sie bis 3 Abholungen/Sensoren einzeilig und ab 5 Abholungen/Sensoren zweizeilig dargestellt werden.<br>
    Für 4 Abholungen/Sensoren kann hier entschieden werden, ob ein- oder mehrzeilig.
</p>

<!-- Auswahlliste für Darstellung -->
<div class="shb-form-group">
    <label for="darstellungAuswahl">Darstellung bei 4 Abholungen/Sensoren:</label>
    <select id="darstellungAuswahl" style="width: 30%;">
        <option value="einzeilig">Darstellung Einzeilig</option>
        <option value="mehrzeilig">Darstellung Mehrzeilig</option>
    </select>
</div>

<!-- Checkbox für "Datum anzeigen" -->
<div class="shb-form-group">
    <label for="dateUseCheckbox">Datum der Abholung anzeigen?</label>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="dateUseCheckbox">
        <label for="dateUseCheckbox">Datum anzeigen</label>
    </div>
</div>

<p>
    Das Datum der Abholung kann auf der Karte nur ausgewählt werden, wenn der/die Sensor/Sensoren für diese Entität in der Waste Collection Schedule eingerichtet wurde/wurden.<br>
    Die Entität dieses Sensors soll demnach aus dem Sensor Namen der Abholung und dem Zusatz <strong>Datum</strong> bestehen.<br>
    <strong>Beispiel: "Restabfall Datum" = "sensor.restabfall_datum"</strong>
</p>

<div class="shb-form-group">
    <label for="fontSelection">Schriftart auswählen:</label>
    <p style="margin-bottom: 0; padding-bottom: 0;">Hier kann eine Schriftart für die Dashboard-Karte gewählt oder eine eigene eingetragen werden.</p>
    <select id="fontSelection" style="width: 30%;" onchange="toggleCustomFontInput()">
        <option value="Arial Rounded MT" selected>Arial Rounded MT (Standard)</option>
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Custom">Eigene Schriftart</option>
    </select>
    <input type="text" id="customFontInput" style="display: none; margin-top: 10px; width: 30%;" placeholder="Eigene Schriftart eingeben">
</div>

<!-- Checkbox für "Style anpassen" -->
<div class="shb-form-group">
    <label for="styleUseCheckbox">Karten Design anpassen?</label>
    <div class="checkbox-wrapper">
        <input type="checkbox" id="styleUseCheckbox">
        <label for="styleUseCheckbox">Style ändern</label>
    </div>
</div>

<!-- Versteckter Container mit 3 Auswahllisten -->
<div id="styleOptions" class="shb-style-options">
    <div class="important-container">
        <h3>❗Wichtig</h3>
        <p>
            Wenn der Style geändert wird, muss <strong>card-mod</strong> und <strong>Vertical Stack In Card</strong> in HACS installiert werden.<br>
            Nur mit diesen Dashboard-Integrationen ist eine Änderung des Hintergrund und des Rahmens möglich.
        </p>
    </div>
    <div class="shb-select-group">
        <!-- Hintergrund -->
        <div class="shb-form-group" style="width: 30%">
            <label for="backgroundSelect">Hintergrund:</label>
            <select id="backgroundSelect">
                <option value="transparent">Transparent</option>
                <option value=" ">Standard</option>
            </select>
        </div>
        <!-- Rahmen Aussehen -->
        <div class="shb-form-group" style="width: 30%">
            <label for="borderStyleSelect">Rahmen Aussehen:</label>
            <select id="borderStyleSelect">
                <option value="none">Keinen Rahmen</option>
                <option value=" ">Standard Rahmen</option>
                <option value="1px solid var(--primary-color)">Dicker Rahmen Theme Farbe</option>
            </select>
        </div>
        <!-- Rahmen Form -->
        <div class="shb-form-group" style="width: 30%">
            <label for="borderShapeSelect">Rahmen Form:</label>
            <select id="borderShapeSelect">
                <option value="0px">Eckig</option>
                <option value="12px">Abgerundet</option>
            </select>
        </div>
    </div>
</div>

<p>
    Wenn alle Einstellungen getroffen wurden, klicke auf <strong>Beispiel anzeigen & Code generieren</strong><br>
    Du kannst nachträglich jederzeit Einstellungen ändern und den Code neu generieren.
</p>

<!-- Button zur Aktualisierung -->
<div class="shb-button">
    <button class="shb-button shb-button-main" id="update-example-and-code">👇  Beispiel anzeigen & Code generieren  👇</button>
</div>


</div>

<!--
 █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██████  
██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██       
███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████  
██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██    ██ 
██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██████  
                                                                                    
-->

<div class="content-section" id="step-7" style="display:none;">


<div id="dashboard-options" class="shb-select-group">
    <!-- YAML-Ausgabefenster -->
    <div id="yaml-output-container" class="shb-vertical-half-container">
        <h4 class="shb-section-title-center">Generierter YAML-Code</h4>
        <div class="shb-code-container" style="max-height: 400px;">
            <button class="copy-code-button" onclick="copyCode('yaml-code-output', this)">Kopieren</button>
            <pre id="yaml-code-output"><code></code></pre>
        </div>
    </div>
    <!-- Beispielbild -->
    <div id="example-card-container" class="shb-vertical-half-container">
        <h4 class="shb-section-title-center">Beispielkarte</h4>
        <div class="shb-image-wrapper">
            <img id="example-image" src="" alt="Beispielkarte">
        </div>
    </div>
</div>

<h3 class="shb-section-title-center">Besteht noch Interesse an einer Dashboard Pop-Up Erinnerung?</h3><br>
<div class="shb-button">
    <button class="shb-button shb-button-main" onclick="showStep(8);">👇  Ja! Weiter zu der Pop-Up Karte  👇</button>
</div>
</div>

<div class="content-section" id="step-8" style="display:none;">

<h2 class="shb-section-title-center">6. Pop-Up-Karte</h2>

<br>

<h4 class="shb-section-title-left">Zur Anzeige eines Pop-Up auf deinem Home Assistant Dashboard sind mehrere Schritte notwendig:</h4>

<ul class="shb-list-start">
    <li>Herunterladen und Speichern des Hintergrund-Bilds</li>
    <li>Anlegen einer Helfer-Taste und eines Helfer-Zeitplans</li>
    <li>Erstellung des YAML-Codes für die Pop-Up Karte</li>
    <li>Speichern der Pop-Up Karte auf jedem notwendigen Dashboard</li>
    <li>Einrichtung der Browser ID via Browser_Mod</li>
    <li>Einrichtung der Automatisierung für das Pop-Up</li>
</ul>


<h3 class="shb-section-title-center">6.1 Hintergrund-Bild</h3>


<div class="shb-two-column-container">
    <!-- Linke Spalte -->
    <div class="shb-left-column">
        <p>
            Für das Pop-Up ist ein Hintergrundbild notwendig. 
        </p>
        <p>
            Dieses kannst du dir hier mit einem Klick auf das Bild herunterladen und in Home Assistant in deinen <strong>"muell"</strong>-Ordner speichern.<br>
            Achte darauf, das Bild vor dem ersten Erstellen der Dashboard-Karte abzuspeichern, da ansonsten durch den Home Assistant Cache längere Zeit Fehler angezeigt werden können.
        </p>
    </div>
    <!-- Rechte Spalte -->
    <div class="shb-right-column">
        <a href="/img/muell/popup_background.png" download>
            <img src="/img/muell/popup_background.png" alt="Hintergrundbild für Pop-Up">
        </a>
    </div>
</div>

<h3 class="shb-section-title-center">6.2 Helfer anlegen</h3>
<p>
    Für das Öffnen des Pop-Ups ist ein Helfer-Taster erforderlich, und für die Automatisierung wird ein Helfer-Zeitplan benötigt.<br>
    Diese beiden Helfer tragen die Bezeichnungen <strong>Müllerinnerung Taster</strong> und <strong>Müllerinnerung Zeitplan</strong>. Sie müssen mit genau diesen Namen angelegt werden, um die Funktionalität des Pop-Ups sicherzustellen.
</p>
<p>
 Wie man die notwendigen Helfer anlegt, findest du in den folgenden ⬇️ Dropdowns ⬇️
</p>
<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown3', this)">Helfer-Taster einrichten <span>⬇️</span></button>
    <div id="galleryDropdown3" class="shb-dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_helfer_taster %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    <div class="shb-dropdown-youtube">
                        {% include youtube.html video="7HlL8uKRyC0" %}
                    </div>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>
<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown4', this)">Helfer-Zeitplan einrichten <span>⬇️</span></button>
    <div id="galleryDropdown4" class="shb-dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_helfer_zeitplan %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                    <div class="shb-dropdown-youtube">
                        {% include youtube.html video="_oR8JQHNYqY" %}
                    </div>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>
<br>
<p>
    Klicke auf den Namen eines Helfers in der Tabelle, um ihn in die Zwischenablage zu kopieren. Nach dem Kopieren wird ein ✔️ angezeigt.<br>
    Lege diese Helfer in Home Assistant an und fahre anschließend mit dem nächsten Schritt fort.
</p>

<table class="shb-custom-table" id="helper-table">
    <thead>
        <tr>
            <th>Helfer Name</th>
            <th style="text-align: center;">Name kopiert</th>
            <th>Helfer Entity-ID</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Taster">Müllerinnerung Taster</td>
            <td class="status" id="status-taster" style="text-align: center;">❌</td>
            <td>input_button.mullerinnerung_taster</td>
        </tr>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Zeitplan">Müllerinnerung Zeitplan</td>
            <td class="status" id="status-zeitplan" style="text-align: center;">❌</td>
            <td>schedule.mullerinnerung_zeitplan</td>
        </tr>
    </tbody>
</table>

<h3 class="shb-section-title-center">6.3 Pop-Up Code erstellen</h3>

<div class="note-container">
    <h3>💡 Hinweis</h3> 
    <p>
        Soll das Pop-Up für die Abholung Morgen erinnern, muss im vorherigen Abschnitt des Codegenerators unter <strong>Anzeige Auswahl</strong> - <strong>Anzeige Morgen</strong> gewählt werden!!
    </p>
</div>
<br>
<p>
    Mit einem Klick auf <strong>Pop-Up erstellen</strong> wird der Code für das Pop-Up nach deinen zuvor gewählten Einstellungen und Angaben erstellt. 
</p>

<div class="shb-button">
    <button class="shb-button shb-button-main" id="popup-code">👇  Pop-Up erstellen  👇</button>
</div>

<p>
    Den generierten Code kannst du mit <strong>Kopieren</strong> in die Zwischenablage kopieren.
</p>

<div id="popup-options" class="shb-select-group">
    <!-- YAML-Ausgabefenster -->
    <div id="popup-output-container" class="shb-vertical-half-container">
        <h4 class="shb-section-title-center">Generierter Pop-Up-Code</h4>
        <div class="shb-code-container" style="max-height: 400px;">
            <button class="copy-code-button" onclick="copyCode('popup-code-output', this)">Kopieren</button>
            <pre id="popup-code-output"><code></code></pre>
        </div>
    </div>
    <!-- Beispielbild -->
    <div id="example-popup-container" class="shb-vertical-half-container" style="display: none;">
        <h4 class="shb-section-title-center">Pop-Up Beispiel</h4>
        <div class="shb-image-wrapper">
            <img id="example-popup" src="/img/muell/popupCard_example.png" alt="Pop-Up Beispiel">
        </div>
    </div>
</div>

<h3 class="shb-section-title-center">6.4 Pop-Up auf Dashboard speichern</h3>

<p>
    Der kopierte Pop-Up Code wird nun auf jedes Dashboard gespeichert auf welchem es agezeigt werden soll.<br>
    Dazu füge entweder eine neue Karte, einen neuen Abschnitt oder eine neue Zeile in einen Stapel hinzu und suche dann nach <strong>Manuell</strong>. <br>
    Füge hier den kopierten Code ein und bestätige mit <strong>Speichern</strong> bzw. <strong>Fertig</strong>.
</p>
<br>
<p>
    Bedenke, dass das Pop-Up nur angezeigt wird wenn der More-Info Dialog des Müllerinnerung Taster aufgerufen wird.<br>
    Um das zu erreichen, ist eine Browser ID sowie eine Automatisierung notwendig. 
</p>

<h3 class="shb-section-title-center">6.5 Browser ID einrichten</h3>

<p>
    Mit Browser Mod und dessen Browser ID ist es möglich, Aktionen auf Dashboards von registrierten Browsern auszuführen.<br>
    In diesem Fall geht es um das Öffnen eines Pop-Ups.<br>

    Nicht vergessen, jeden Browser zu registrieren auf welchem das Pop-Up angezeigt werden soll.
</p>
<br>
<p>
    Wie man Browser Mod und die Browser ID einrichtet, erfährst du im ⬇️ Dropdown ⬇️
</p>
<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown5', this)">Browser Mod und Browser ID einrichten <span>⬇️</span></button>
    <div id="galleryDropdown5" class="shb-dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_browser_mod_id %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                    {{ gallery.subtitle | markdownify }}
                    <div class="shb-dropdown-youtube">
                        {% include youtube.html video="_GxgMv0LSLI" %}
                    </div>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>

<h3 class="shb-section-title-center">6.6 Pop-Up Automatisierung</h3>

<p>
    Um das Pop-Up automatisch bzw. über einen Tastendruck des Helfer-Taster zu öffnen, wird eine Automatisierung angelegt.
</p>
<br>
<p>
    Zur einfachen Einrichtung dieser Automatisierung habe ich ein Blueprint erstellt. Dieses kann mit einem Klick auf das Blueprint in der Tabelle herunter geladen und in Home Assistant installiert werden.
</p>
<p>
    Wie man das Blueprint installiert und die Automatisierung einrichtet, siehst du im ⬇️ Dropdown ⬇️
</p>
<div class="shb-dropdown">
    <button class="shb-dropdown-toggle" onclick="toggleSHBdropdown('galleryDropdown6', this)">Blueprint Installation und Einrichtung <span>⬇️</span></button>
    <div id="galleryDropdown6" class="shb-dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_blueprint_popup %}
        <div class="columns is-multiline">
            {% for gallery in gallery_images %}
                <div class="column is-12">
                    <p class="title is-3 has-text-centered">{{ gallery.title }}</p>
                </div>
                <div class="column is-12" style="font-size: 1.2rem; font-weight: 400;">
                    {{ gallery.subtitle | markdownify }}
                    <div class="shb-dropdown-youtube">
                        {% include youtube.html video="WP8SMkcWKlM" %}
                    </div>
                </div>
                {% for image in gallery.images %}
                    <div class="column is-3-desktop is-6-tablet">
                        <div class="card">
                            <div class="card-image">
                                {% include image-modal.html ratio=image.ratio link=image.link alt=image.alt large_link=image.large_link %}
                            </div>
                            <div class="card-content">
                                <div class="content">
                                    {{ image.description | markdownify }}
                                </div>
                            </div>
                        </div>
                    </div>
                {% endfor %}
            {% endfor %}
        </div>
    </div>
</div>
<br>

<table class="shb-custom-table" id="blueprint-table">
    <thead>
        <tr>
            <th>Blueprint</th>
            <th style="text-align: center;">Blueprint kopiert</th>
            <th>Beschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="https://gist.github.com/MaxxKra/3dbc1164e0d037bda67911fccead5f36">Blueprint Pop-Up öffnen</td>
            <td class="status" id="status-blueprint" style="text-align: center;">❌</td>
            <td>Ein Blueprint für die Automatisierung zum Öffnen eines Pop-Ups</td>
        </tr>
    </tbody>
</table>
<br>
<h4 class="shb-section-title-left">Welche Eingaben sind im Blueprint zu trreffen?</h4>

<ul class="shb-list-start">
    <li>Der Zeitplan zum Öffnen des Pop-Ups</li>
    <li>Der Taster welcher das Pop-Up öffnet</li>
    <li>Der Sensor zur Müllabholung. Entweder <code>Müllabholung Heute</code> oder <code>Müllabholung Morgen</code></li>
    <li>Der Pop-Up Sensor-Status welcher das Öffnen des Pop-Ups verhindert</li>
    <li>Eine oder mehrere Browser-IDs, auf welchen das Pop-Up eingerichtet ist.</li>
    <li>Zum Schluss, der Automatisierungs Name welcher in der Tabelle unten kopiert werden kann.</li>
</ul>
<br>
<table class="shb-custom-table" id="popup-sensor-table">
    <thead>
        <tr>
            <th>Pop-up Sensor Status</th>
            <th style="text-align: center;">Status kopiert</th>
            <th>Beschreibung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="none">none</td>
            <td class="status" id="popup-state-none" style="text-align: center;">❌</td>
            <td>Wenn zuvor bei den Templates die Checkboxen für die Anzeige des Textes <code>nicht</code> angehakt wurden</td>
        </tr>
        <tr>
            <td class="copyable" data-helper="Du musst heute keine Tonne rausstellen.">Du musst heute keine Tonne rausstellen.</td>
            <td class="status" id="popup-state-today" style="text-align: center;">❌</td>
            <td>Wenn das Pop-Up für <code>Heute</code> ist und zuvor bei den Templates die Checkboxen für die Anzeige des Textes angehakt wurden</td>
        </tr>
        <tr>
            <td class="copyable" data-helper="Du musst morgen keine Tonne rausstellen.">Du musst morgen keine Tonne rausstellen.</td>
            <td class="status" id="popup-state-tomorrow" style="text-align: center;">❌</td>
            <td>Wenn das Pop-Up für <code>Morgen</code> ist und zuvor bei den Templates die Checkboxen für die Anzeige des Textes angehakt wurden</td>
        </tr>
    </tbody>
</table>
<br>
<table class="shb-custom-table" id="automation-table">
    <thead>
        <tr>
            <th>Automatisierung Name</th>
            <th style="text-align: center;">Name kopiert</th>
            <th>Entity ID Automatisierung</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="copyable" data-helper="Müllerinnerung Pop-Up">Müllerinnerung Pop-Up</td>
            <td class="status" id="status-automation" style="text-align: center;">❌</td>
            <td>automation.mullerinnerung_pop_up</td>
        </tr>
    </tbody>
</table>
<br>
<p>
    Nach der Installation der Automatisierung sollte das Pop-Up auf deinen gewählten Dashboards durch den eingerichteten Zeitplan automatisch geöffnet werden.
</p>
</div>


<footer class="shb-footer">
    <p>Ich hoffe dieser Codegenerator konnte dir bei der Einrichtung deiner Müllerinnerung helfen.<br>
    Über Feedback und Unterstützung würde ich mich auf jeden Fall freuen.</p>
    <h2>Danke und gutes Gelingen! 🎉</h2>
</footer>

{% include support_note.html %}

</div>

<!--
 ██████ ███████ ███████ 
██      ██      ██      
██      ███████ ███████ 
██           ██      ██ 
 ██████ ███████ ███████ 
                                                                              
-->

<style>
    /* Sensor-Zusammenfassung */
    .sensor-summary {
        margin: 15px 0;
        font-size: 1.2em;
        line-height: 1.5;
        text-align: left;
        color: #ffffff;
        border: 2px solid #1598b3;
        border-radius: 8px;
        padding: 8px;
        width: fit-content;
    }
    /* Tabelle */
    .shb-custom-table {
        width: 100%;
        border: 2px solid #1ab5d5;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        text-align: left;
        margin: 20px 0;
    }

    /* Kopfzeile */
    .shb-custom-table thead th {
        background-color: #1ab5d5;
        color: #ffffff;
        padding: 10px;
        font-weight: bold;
        text-transform: uppercase;
        border: 1px solid #000;
    }

    /* Alternierende Zeilenfarben im Tabellenkörper */
    .shb-custom-table tbody tr:nth-child(odd) {
        background-color: #b8f3ff;
    }

    .shb-custom-table tbody tr:nth-child(even) {
        background-color: #97ecfd;
    }

    /* Zellenstile */
    .shb-custom-table tbody td {
        padding: 10px;
        vertical-align: middle;
        border: 2px solid #1ab5d5;
        color: #000000;
    }

    /* Hover-Effekt */
    .shb-custom-table tbody tr:hover {
        background-color: #90caf9;
        transition: background-color 0.3s ease;
    }

    /* Checkbox-Stil */
    .shb-custom-checkbox {
        transform: scale(1.4);
        margin: 0 20px;
    }
    .shb-two-column-container {
        display: flex;
        gap: 20px;
        align-items: center;
        margin: 20px 10%;
    }

    .shb-left-column {
        flex: 1;
        text-align: center;
    }

    .shb-right-column {
        flex: 0.4;
        text-align: center;
    }

    .shb-right-column img {
        max-width: 300px;
        height: auto;
        cursor: pointer;
    }

    /* Checkbox-Stil */
    .shb-custom-checkbox {
        transform: scale(1.4);
        margin: 0 20px;
    }

    /* Input-Felder in der Tabelle */
    .shb-custom-input {
        padding: 8px;
        color: #000000;
        background-color: #1ab5d5;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
        width: 100%;
    }

    .shb-custom-input::placeholder {
        color: #ffffff;
        font-style: italic;
        opacity: 0.8;
    }

    .shb-custom-input:focus {
        background-color: #99eafb;
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }

    .color-select {
        padding: 8px;
        color: #000000;
        background-color: #1ab5d5;
        border: 1px solid #ffffff;
        box-shadow: 0 2px 5px #ffffff;
        border-radius: 5px;
        font-size: 14px;
        width: 100%;
    }

    .color-select:focus {
        background-color: #37c4e1;
        border: 2px solid #0048ff;
        box-shadow: 0 4px 10px #7199ff;
        outline: none;
    }

    /* Stile für die Optionen */
    .color-select option {
        background-color: #99eafb;
    }

    /* Jede zweite Zeile heller */
    .color-select option:nth-child(even) {
        background-color: #b4f2ff
    }

</style>

<!--
███████  ██████ ██████  ██ ██████  ████████ ███████ 
██      ██      ██   ██ ██ ██   ██    ██    ██      
███████ ██      ██████  ██ ██████     ██    █████   
     ██ ██      ██   ██ ██ ██         ██    ██      
███████  ██████ ██   ██ ██ ██         ██    ███████ 
                                                                              
-->

<script>
    document.addEventListener("DOMContentLoaded", function() {
        try {
            const nextPickupTemplate = `{% raw %}{{ value.types | join(", ") }}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const individualPickupTemplate = `{% raw %}{% if value.daysTo == 0 %} Heute{% elif value.daysTo == 1 %} Morgen{% else %} in {{ value.daysTo }} Tagen{% endif %}{% endraw %}`;
            const datePickupTemplate = `{% raw %}{{value.date.strftime("%d.%m.%Y")}}{% endraw %}`;
            
            document.getElementById("next-pickup-template").textContent = nextPickupTemplate;
            document.getElementById("individual-pickup-template").textContent = individualPickupTemplate;
            document.getElementById("date-pickup-template").textContent = datePickupTemplate;

        } catch (error) {
            console.error("Error during DOMContentLoaded setup:", error);
        }
    });
    function showStep(stepNumber) {
        // Alle Abschnitte anzeigen, die kleiner oder gleich der aktuellen Schritt-Nummer sind
        for (let i = 1; i <= 8; i++) {
            const step = document.getElementById(`step-${i}`);
            if (step) {
                if (i <= stepNumber) {
                    step.style.display = "block"; // Zeigt die vorherigen und den aktuellen Step an
                    step.classList.remove("completed"); // Entfernt die "abgeschlossen"-Markierung, wenn sie gesetzt war
                } else {
                    step.style.display = "none"; // Versteckt die zukünftigen Schritte
                }
            }
        }

        // Automatisch scrollen, um den ausgewählten Schritt in den Fokus zu bringen
        const currentStep = document.getElementById(`step-${stepNumber}`);
        if (currentStep) {
            // Höhe der fixierten Navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight || 0;

            // Scrollen unter Berücksichtigung der Navbar-Höhe
            const offsetTop = currentStep.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
    }

async function extractEntries() {
    try {
        const fileInput = document.getElementById('icsFile');
        const urlInput = document.getElementById('calendarUrl');
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');

        // Alle Warncontainer ausblenden
        const warningContainer = document.getElementById("warning-container");
        const umlautWarningContainer = document.getElementById("umlaut-warning-container");
        const urlWarningContainer = document.getElementById("url-warning-container");

        warningContainer.style.display = "none";
        umlautWarningContainer.style.display = "none";
        urlWarningContainer.style.display = "none";

        entryTableBody.innerHTML = "Lade und verarbeite Daten...";

        let icsData;

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            icsData = await file.text();
        } else if (urlInput.value) {
            const icsUrl = urlInput.value;
            try {
                const response = await fetch(icsUrl);
                if (!response.ok) {
                    throw new Error(`ICS-Datei konnte nicht geladen werden: ${response.status} ${response.statusText}`);
                }
                icsData = await response.text();
            } catch (error) {
                // Zeige den URL-Warncontainer bei einem Fehler
                urlWarningContainer.style.display = "block";
                console.error("Fetch error:", error);
                entryTableBody.innerHTML = `<tr><td colspan="3">Fehler beim Laden der URL: ${error.message}</td></tr>`;
                return;
            }
        } else {
            // Zeige den customAlert bei fehlender Eingabe
            showSHBcustomAlert(
                "Keine Eingabe",
                "Bitte eine ICS-Datei hochladen oder eine URL eingeben."
            );
            entryTableBody.innerHTML = "<tr><td colspan='3'>Bitte eine ICS-Datei hochladen oder eine URL eingeben.</td></tr>";
            return;
        }

        // Wenn Daten geladen wurden, führe showStep aus
        showStep(2);

        const summaryEntries = new Set();
        const invalidEntries = [];
        const lines = icsData.split("\n");

        for (let line of lines) {
            if (line.startsWith("SUMMARY")) {
                const summaryText = line.split(":").slice(1).join(":").trim();
                summaryEntries.add(summaryText);

                // Überprüfen, ob Ziffern, Punkte oder unerlaubte Zeichen enthalten sind
                if (/[^a-zA-Z\d_\-\s]/.test(summaryText)) {
                    invalidEntries.push(summaryText);
                }
            }
        }

        // Zeige den Warnungscontainer bei ungültigen Einträgen
        if (invalidEntries.length > 0) {
            warningContainer.style.display = "block"; // Container einblenden
            umlautWarningContainer.style.display = "none"; // Umlaut-Warnung ausblenden
        }

        entryTableBody.innerHTML = "";
        let idCounter = 0;
        summaryEntries.forEach(entry => {
            const row = document.createElement("tr");

            // Checkbox
            const checkboxCell = document.createElement("td");
            checkboxCell.setAttribute("style", "text-align: center;");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "shb-custom-checkbox";
            checkbox.id = `shb-custom-checkbox-${idCounter}`;
            checkboxCell.appendChild(checkbox);
            row.appendChild(checkboxCell);

            // Summary Entry
            const summaryCell = document.createElement("td");
            summaryCell.textContent = entry;
            summaryCell.id = `summary-${idCounter}`;
            
            // Markiere ungültige Einträge
            if (invalidEntries.includes(entry)) {
                summaryCell.style.color = "red"; // Färbe ungültige Einträge rot
                summaryCell.title = "Ungültiger Eintrag - bitte anpassen"; // Tooltip
            }
            row.appendChild(summaryCell);

            // Custom Name Input
            const customNameCell = document.createElement("td");
            const customNameInput = document.createElement("input");
            customNameInput.type = "text";
            customNameInput.placeholder = "Eigene Bezeichnung";
            customNameInput.className = "shb-custom-input";
            customNameInput.id = `custom-name-${idCounter}`;
            customNameCell.appendChild(customNameInput);
            row.appendChild(customNameCell);

            entryTableBody.appendChild(row);
            idCounter++;
        });

    } catch (error) {
        console.error("Error in extractEntries:", error);
    }
}

    function checkEntries() {
        const entryTableBody = document.getElementById('entry-table').querySelector('tbody');
        const umlautPattern = /[^äöüÄÖÜßa-zA-Z0-9\s-_]/;
        const selectedEntries = Array.from(entryTableBody.querySelectorAll("tr")).filter(row => {
            return row.querySelector(".shb-custom-checkbox").checked;
        });

        // Warnung, wenn keine Checkbox ausgewählt wurde
        if (selectedEntries.length === 0) {
            showSHBcustomAlert("Keine Auswahl getroffen!", "Bitte wähle mindestens einen Eintrag aus!");
            return false; // Fehler: keine Auswahl getroffen
        }

        let umlautWarning = false;

        selectedEntries.forEach(row => {
            const customName = row.querySelector(".shb-custom-input").value.trim(); // Eigene Bezeichnung
            const summaryText = row.querySelector("td:nth-child(2)").textContent.trim(); // Kalendereintrag (SUMMARY)

            // Prüfe auf Umlaute in der eigenen Bezeichnung
            if (umlautPattern.test(customName)) {
                umlautWarning = true;
            }

            // Prüfe auf Umlaute im Kalendereintrag, wenn keine eigene Bezeichnung eingetragen wurde
            if (customName === "" && umlautPattern.test(summaryText)) {
                umlautWarning = true;
            }
        });

        if (umlautWarning) {
            showSHBcustomAlert("Nicht verwendbare Zeichen entdeckt!", "Bitte eigene Kalendereinträge kontrollieren und eigene Bezeichnungen anpassen!");
            return false; // Fehler
        }

        // Alles in Ordnung
        generateSensorTable(selectedEntries);
        generateDateSensorTable(selectedEntries);
        document.getElementById("template-header").style.display = "block";
        document.getElementById("sensor-header").style.display = "block";
        document.getElementById("date-sensor-header").style.display = "block";
        document.getElementById("code-output-next").style.display = "block";
        document.getElementById("code-output-events").style.display = "block";
        document.getElementById('code-output-date').style.display = 'block';
        return true;
    }
    function handleStepTransition() {
        const isValid = checkEntries(); // Prüft, ob die Eingaben korrekt sind
        if (isValid) {
            showStep(3); // Nur wenn keine Fehler vorliegen, wird zu Schritt 3 gewechselt
        }
    }

function generateSensorTable(selectedEntries) {
    const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
    const sensorTable = document.getElementById('sensor-table');
    sensorTableBody.innerHTML = "";

    // Add rows for selected entries
    selectedEntries.forEach((row) => {
        let originalName = row.querySelector(".shb-custom-input").value || row.querySelector("td:nth-child(2)").textContent.trim();
        let customName = originalName;

        if (customName.includes("Sack") && !["Gelber Sack", "Grüner Sack", "Schwarzer Sack", "Blauer Sack", "Roter Sack"].includes(customName)) {
            customName = customName.replace(/\s*Sack/, "").trim();
        }

        const sensorName = `sensor.${customName.toLowerCase().replace(/[\s-]+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
            return {
                'ä': 'a', 'ö': 'o', 'ü': 'u',
                'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ss'
            }[match];
        })}`;

        const sensorRow = document.createElement("tr");

        // Sensor Name
        const customNameCell = document.createElement("td");
        customNameCell.textContent = customName;
        customNameCell.style.cursor = "pointer";
        customNameCell.onclick = () => {
            toggleCopyStatus(copyStatusCell);
            copyToClipboards(customName, copyStatusCell);
        };
        sensorRow.appendChild(customNameCell);

        // Kopiert-Status
        const copyStatusCell = document.createElement("td");
        copyStatusCell.innerHTML = '<span class="copy-checkmark">❌</span>';
        copyStatusCell.style.textAlign = "center";
        sensorRow.appendChild(copyStatusCell);

        // Original Name
        const originalNameCell = document.createElement("td");
        originalNameCell.textContent = originalName;
        sensorRow.appendChild(originalNameCell);

        // Entity ID
        const sensorNameCell = document.createElement("td");
        sensorNameCell.textContent = sensorName;
        sensorRow.appendChild(sensorNameCell);

        // Farbe Auswahlfeld
        const colorCell = document.createElement("td");
        const colorSelect = document.createElement("select");
        colorSelect.className = "color-select";
        [
            "Farbe wählen", "Schwarz", "Blau", "Rot", "Gelb", "Grün", "Braun", "Schwarz-Blau", "Schwarz-Rot", "Schwarz-Gelb", "Schwarz-Grün", "Schwarz-Braun",
            "gelber Sack", "schwarzer Sack", "roter Sack", "blauer Sack", "grüner Sack", "Sperrabfall", "Grünschnitt", "Glas"
        ].forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            colorSelect.appendChild(option);
        });
        colorCell.appendChild(colorSelect);
        sensorRow.appendChild(colorCell);

        // Vorschau-Bild
        const previewCell = document.createElement("td");
        const previewImage = document.createElement("img");
        previewImage.src = "/img/muell/sack.png";
        previewImage.style.width = "50px";
        previewImage.style.height = "auto";
        previewImage.style.display = "block";
        previewImage.style.margin = "0 auto";
        previewCell.appendChild(previewImage);

        colorSelect.onchange = () => {
            const colorToImageMap = {
                "Schwarz": "schwarz.png",
                "Blau": "blau.png",
                "Rot": "rot.png",
                "Gelb": "gelb.png",
                "Grün": "gruen.png",
                "Braun": "braun.png",
                "Schwarz-Blau": "schwarz-blau.png",
                "Schwarz-Rot": "schwarz-rot.png",
                "Schwarz-Gelb": "schwarz-gelb.png",
                "Schwarz-Grün": "schwarz-gruen.png",
                "Schwarz-Braun": "schwarz-braun.png",
                "gelber Sack": "gelb_sack.png",
                "schwarzer Sack": "schwarz_sack.png",
                "roter Sack": "rot_sack.png",
                "blauer Sack": "blau_sack.png",
                "grüner Sack": "gruen_sack.png",
                "Sperrabfall": "sperrabfall.png",
                "Grünschnitt": "gruenschnitt.png",
                "Glas": "glas.png"
            };
            previewImage.src = `/img/muell/${colorToImageMap[colorSelect.value] || "sack.png"}`;
        };

        sensorRow.appendChild(previewCell);
        sensorTableBody.appendChild(sensorRow);
    });

    sensorTable.style.display = "table";
}



    // Funktion zum Umschalten des Kopierstatus
    function toggleCopyStatus(statusCell) {
        const checkmark = statusCell.querySelector(".copy-checkmark");
        if (checkmark) {
            checkmark.textContent = checkmark.textContent === "❌" ? "✔️" : "❌"; // Umschalten zwischen ❌ und ✔️
        }
    }

    function generateDateSensorTable(selectedEntries) {
        const dateSensorTableBody = document.getElementById('date-sensor-table').querySelector('tbody');
        const dateSensorTable = document.getElementById('date-sensor-table');
        dateSensorTableBody.innerHTML = "";

        // Add rows for selected entries
        selectedEntries.forEach((row) => {
            let customName = row.querySelector(".shb-custom-input").value || row.querySelector("td:nth-child(2)").textContent;

            // Überprüfen und gegebenenfalls "Sack" entfernen
            if (customName.includes("Sack") && !["Gelber Sack", "Schwarzer Sack", "Blauer Sack", "Roter Sack", "Grüner Sack"].includes(customName)) {
                customName = customName.replace(/\s*Sack/, "").trim();
            }

            // Sensorname generieren und "_datum" anhängen
            const sensorName = `sensor.${customName.toLowerCase().replace(/[\s-]+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
                return {
                    'ä': 'a', 'ö': 'o', 'ü': 'u',
                    'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ss'
                }[match];
            })}_datum`;

            const sensorRow = document.createElement("tr");

            // Sensor Name
            const customNameCell = document.createElement("td");
            customNameCell.textContent = `${customName} Datum`;
            customNameCell.style.cursor = "pointer";
            customNameCell.onclick = () => {
                toggleCopyStatus(copyStatusCell); // Status ändern
                copyToClipboards(`${customName} Datum`, copyStatusCell); // Name kopieren
            };
            sensorRow.appendChild(customNameCell);

            // Kopiert-Status
            const copyStatusCell = document.createElement("td");
            copyStatusCell.innerHTML = '<span class="copy-checkmark">❌</span>'; // Standardmäßig ❌
            copyStatusCell.style.textAlign = "center";
            sensorRow.appendChild(copyStatusCell);

            // Entity ID
            const sensorNameCell = document.createElement("td");
            sensorNameCell.textContent = sensorName;
            sensorRow.appendChild(sensorNameCell);

            dateSensorTableBody.appendChild(sensorRow);
        });

        dateSensorTable.style.display = "table";
    }


    function copyToClipboards(textToCopy, statusCell) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            const checkmark = statusCell.querySelector(".copy-checkmark");
            if (checkmark) {
                checkmark.style.display = "inline"; // Häkchen dauerhaft anzeigen
            }
        }).catch(err => {
            console.error("Fehler beim Kopieren:", err);
        });
    }

function validateColors() {
    const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
    const rows = Array.from(sensorTableBody.querySelectorAll("tr"));

    let colorNotSelected = false;

    rows.forEach(row => {
        // Suche nach dem Dropdown in der Spalte Tonnen Farbe
        const selectElement = row.cells[4]?.querySelector("select");

        if (!selectElement) {
            console.error("Kein Dropdown-Element in der Spalte 'Tonnen Farbe' gefunden!");
            return; // Überspringe die aktuelle Zeile, wenn kein Dropdown gefunden wurde
        }

        const color = selectElement.value;
        console.log(`Ausgewählte Farbe in der Zeile: "${color}"`); // Debugging-Ausgabe

        if (!color || color.trim() === "" || color === "Farbe wählen") {
            colorNotSelected = true; // Wenn keine Farbe ausgewählt wurde
        }
    });

    if (colorNotSelected) {
        showSHBcustomAlert("Keine Tonnen-Farben?", "Die Farben der Tonne sollten zugeordnet werden!");
        return false; // Rückgabe `false`, wenn eine Farbe fehlt
    }

    return true; // Rückgabe `true`, wenn alles korrekt ist
}


function createTemplates() {
    // Checkboxen für "keine"-Anzeige prüfen
    const heuteCheckbox = document.getElementById("keineHeute").checked;
    const morgenCheckbox = document.getElementById("keineMorgen").checked;

    // Templates für "Heute" und "Morgen" erstellen
    createTemplate("Heute", "helper-template-heute", "helper-template-output-heute", heuteCheckbox);
    createTemplate("Morgen", "helper-template-morgen", "helper-template-output-morgen", morgenCheckbox);
}

    function copyTitleToClipboard(element) {
        const textToCopy = element.textContent.trim(); // Text der Überschrift
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Suche nach dem Symbol in der gleichen Zeile wie die Überschrift
            const confirmationIcon = element.parentElement.querySelector('.copy-confirmation');
            if (confirmationIcon) {
                // Umschalten zwischen ❌ und ✔️
                confirmationIcon.textContent = "✔️";
            }
        }).catch(err => {
            console.error("Fehler beim Kopieren in die Zwischenablage:", err);
        });
    }

function createTemplate(day, templateId, outputId, showNoCollectionMessage) {
    const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody'); // Tabelle für Sensoren
    const sensorRows = Array.from(sensorTableBody.querySelectorAll("tr")); // Zeilen der sensor-table (ohne Header)

    const sensorState = [];

    // Verarbeitung der Daten
    sensorRows.forEach(sensorRow => {
        // Extrahiere customName aus der 1. Spalte
        const customName = sensorRow.cells[0]?.textContent.trim();

        // Extrahiere originalName aus der 3. Spalte
        let originalName = sensorRow.cells[2]?.textContent.trim();

        // Entferne " Sack" aus originalName, falls vorhanden
        if (originalName.includes(" Sack")) {
            originalName = originalName.replace(" Sack", "");
        }

        // Extrahiere Farbe aus der 5. Spalte
        const color = sensorRow.cells[4]?.querySelector("select")?.value.trim();

        // Sicherheitsprüfung: Überspringe Zeilen ohne gültige Namen oder Farbe
        if (!customName || !originalName || !color || color === "Farbe wählen") {
            console.warn("Zeile übersprungen: Fehlender Name oder keine Farbe ausgewählt", sensorRow);
            return;
        }

        // Kategorisierung basierend auf der Farbe
        let category;
        if ("Schwarz,Blau,Rot,Gelb,Grün,Braun,Schwarz-Blau,Schwarz-Rot,Schwarz-Gelb,Schwarz-Grün,Schwarz-Braun".split(",").includes(color)) {
            category = "TONNE";
        } else if ("gelber Sack,schwarzer Sack,roter Sack,blauer Sack,grüner Sack".split(",").includes(color)) {
            category = "SACK";
        } else if ("Sperrabfall,Grünschnitt,Glas".split(",").includes(color)) {
            category = "SAMMLUNG";
        } else {
            console.warn("Unbekannte Kategorie für Farbe", color);
            return;
        }

        // Generiere sensorName basierend auf customName
        const sensorName = `states.sensor.${customName.toLowerCase().replace(/\s+/g, "_").replace(/[äöüÄÖÜß]/g, match => {
            return { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U', 'ß': 'ss' }[match];
        })}.state`;

        // Anpassung für farbliche Säcke
        let adjustedName = originalName;
        if (originalName.match(/\b(Gelber|Schwarzer|Blauer|Roter|Grüner)\b/)) {
            adjustedName = originalName
                .replace(/\bGelber\b/, "gelben")
                .replace(/\bSchwarzer\b/, "schwarzen")
                .replace(/\bBlauer\b/, "blauen")
                .replace(/\bRoter\b/, "roten")
                .replace(/\bGrüner\b/, "grünen");
        }

        // Füge Kategorie, Namen und Sensorstatus in das Array ein
        sensorState.push([adjustedName, category, sensorName]);
    });

    // Template-Text generieren mit den Kategorien
    let sensorStateEntries = sensorState
        .map(([name, category, sensor]) => `    ('${name}', '${category}', ${sensor})`) // Generiere YAML-Zeilen
        .join(",\n");

    let templateText = `
{% raw %}
{%- set SENSORSTATE = [
${sensorStateEntries}
] %}
{%- set DAY = '${day}' %}
{%- set SACKS = namespace(values=[]) %}
{%- set TONNEN = namespace(values=[]) %}
{%- set SAMMLUNGEN = namespace(values=[]) %}

{# Trenne Einträge basierend auf der zweiten Spalte #}
{% for ITEM in SENSORSTATE %}
    {% if ITEM[1] == 'SACK' and ITEM[2] == DAY %}
        {% set SACKS.values = SACKS.values + [' den ' ~ ITEM[0]] %}
    {% elif ITEM[1] == 'TONNE' and ITEM[2] == DAY %}
        {% set TONNEN.values = TONNEN.values + [' die ' ~ ITEM[0]] %}
    {% elif ITEM[1] == 'SAMMLUNG' and ITEM[2] == DAY %}
        {% set SAMMLUNGEN.values = SAMMLUNGEN.values + [' die ' ~ ITEM[0]] %}
    {% endif %}
{% endfor %}

{# Ausgabe der Ergebnisse #}
{%- if SACKS.values | length > 0 or TONNEN.values | length > 0 or SAMMLUNGEN.values | length > 0 %}
Du musst {{ DAY | lower }}
    {%- for ITEM in SACKS.values %}
        {%- if not loop.first %}
            {%- if loop.last %} und 
            {%- else %}, 
            {%- endif %}
        {%- endif %}{{ ITEM }}
    {%- endfor %}
    {%- if SACKS.values | length > 0 %} Sack{%- endif %}
    {%- if TONNEN.values | length > 0 and SACKS.values | length > 0 and SAMMLUNGEN.values | length > 0 %},
    {%- elif TONNEN.values | length > 0 and SACKS.values | length > 0 and SAMMLUNGEN.values | length == 0 %}, sowie{% endif %}
    {%- for ITEM in TONNEN.values %}
        {%- if not loop.first %}
            {%- if loop.last %} und 
            {%- else %}, 
            {%- endif %}
        {%- endif %}{{ ITEM }}
    {%- endfor %}
    {%- if TONNEN.values | length > 0 %} Tonne{%- endif %}
    {%- if SAMMLUNGEN.values | length > 0 and (TONNEN.values | length > 0 or SACKS.values | length > 0) %}, sowie{% endif %}
    {%- for ITEM in SAMMLUNGEN.values %}
        {%- if not loop.first %}
            {%- if loop.last %} und 
            {%- else %}, 
            {%- endif %}
        {%- endif %}{{ ITEM }}
    {%- endfor %}
    {%- if SAMMLUNGEN.values | length > 0 %} Sammlung{% endif %} rausstellen!
{%- else %}${showNoCollectionMessage ? `\nDu musst {{ DAY | lower }} keine Tonne rausstellen.` : 'none'}
{%- endif %}
{% endraw %}
`;

    // Template in das entsprechende <pre> Element setzen
    const templateElement = document.getElementById(templateId);
    templateElement.innerHTML = `<code class="language-yaml">${templateText.trim()}</code>`;
    document.getElementById(outputId).style.display = "block";
}



    function createImageList() {
        const sensorTableBody = document.getElementById('sensor-table').querySelector('tbody');
        const rows = Array.from(sensorTableBody.querySelectorAll("tr")); // Überspringe die Standardreihe "Nächste Abholung"
        
        // Tabelle für die Ausgabe erstellen
        let imageTable = '<table class="shb-custom-table"><thead><tr><th>Sensor Name</th><th>Bilder Name</th><th>Entity ID</th><th style="text-align: center;">Bild Vorschau und Download</th></tr></thead><tbody>';
        
        // Mapping von Farben zu Bilddateinamen
        const colorToImageMap = {
            "Schwarz": "schwarz.png",
            "Blau": "blau.png",
            "Rot": "rot.png",
            "Gelb": "gelb.png",
            "Grün": "gruen.png",
            "Braun": "braun.png",
            "Schwarz-Blau": "schwarz-blau.png",
            "Schwarz-Rot": "schwarz-rot.png",
            "Schwarz-Gelb": "schwarz-gelb.png",
            "Schwarz-Grün": "schwarz-gruen.png",
            "Schwarz-Braun": "schwarz-braun.png", 
            "gelber Sack": "gelb_sack.png", 
            "schwarzer Sack": "schwarz_sack.png",
            "roter Sack": "rot_sack.png",
            "blauer Sack": "blau_sack.png",
            "grüner Sack": "gruen_sack.png",
            "Sperrabfall": "sperrabfall.png",
            "Grünschnitt": "gruenschnitt.png",
            "Glas": "glas.png"
        };
        
        // Zeilen der Tabelle durchlaufen und Bildnamen sowie Bildvorschau zuordnen
        let sensorCount = 0; // Zähler für die Anzahl der Sensoren
        rows.forEach(row => {
            const sensorName = row.cells[0].textContent.trim(); // Sensor Name
            const selectedColor = row.cells[4].querySelector("select").value; // Farbauswahl
            const entityID = row.cells[3].textContent.trim(); // Entity ID

            if (colorToImageMap[selectedColor]) {
                sensorCount++; // Zähler inkrementieren
                const imageName = colorToImageMap[selectedColor];
                const imagePath = `/img/muell/${imageName}`;
                
                // Tabellenzeile erstellen
                imageTable += `
                    <tr>
                        <td>${sensorName}</td>
                        <td>${imageName}</td>
                        <td>${entityID}</td>
                        <td style="text-align: center;">
                            <a href="${imagePath}" download="${imageName}">
                                <img src="${imagePath}" alt="${imageName}" style="width: 50px; height: auto; cursor: pointer;" title="Bild herunterladen">
                            </a>
                        </td>
                    </tr>`;
            }
        });
        
        imageTable += '</tbody></table>';
        
        // Tabelle im HTML anzeigen
        const outputContainer = document.getElementById('image-list-output');
        if (!outputContainer) {
            const newOutputContainer = document.createElement('div');
            newOutputContainer.id = 'image-list-output';
            document.body.appendChild(newOutputContainer);
        }
        document.getElementById('image-list-output').innerHTML = imageTable;

        // Sensor-Zusammenfassung anzeigen
        const sensorSummary = document.getElementById('sensor-summary');
        const sensorCountElement = document.getElementById('sensor-count');
        
        if (sensorCount === 1) {
            sensorCountElement.textContent = "einen Sensor / eine Müll-Type";
        } else {
            sensorCountElement.textContent = `${sensorCount} Sensoren / Müll-Typen`;
        }

        sensorSummary.style.display = "block"; // Zusammenfassung einblenden
        sensorSummary.innerHTML = `Du hast <span style="font-weight: bold; color: #4be0ff;">${sensorCount === 1 ? "einen Sensor / eine Müll-Type" : `${sensorCount} Sensoren / Müll-Typen`}</span> angelegt.`;
    }

    function updateExampleCard() {
        const darstellungAuswahl = document.getElementById("darstellungAuswahl").value;
        const sensorTableBody = document.getElementById("sensor-table").querySelector("tbody");
        const sensorCount = sensorTableBody.querySelectorAll("tr"); // Exclude the header row

        let imagePath = "/img/muell/";

        if (sensorCount === 1) {
            imagePath += "exampleCard_1.png";
        } else if (sensorCount === 2) {
            imagePath += "exampleCard_2.png";
        } else if (sensorCount === 3) {
            imagePath += "exampleCard_3.png";
        } else if (sensorCount === 4) {
            if (darstellungAuswahl === "einzeilig") {
                imagePath += "exampleCard_4_1.png";
            } else if (darstellungAuswahl === "mehrzeilig") {
                imagePath += "exampleCard_4_2.png";
            }
        } else if (sensorCount === 5) {
            imagePath += "exampleCard_5.png";
        } else {
            imagePath += "exampleCard_6.png";
        }

        const exampleImage = document.getElementById("example-image");
        exampleImage.src = imagePath;
        exampleImage.style.display = "block"; // Show the image
    }

    function toggleCustomFontInput() {
        const fontSelection = document.getElementById("fontSelection").value;
        const customFontInput = document.getElementById("customFontInput");

        if (fontSelection === "Custom") {
            customFontInput.style.display = "block";
        } else {
            customFontInput.style.display = "none";
        }
    }

    function getSelectedFont() {
        const fontSelection = document.getElementById("fontSelection").value;
        const customFontInput = document.getElementById("customFontInput");

        // Falls "Eigene Schriftart" gewählt wurde, die Eingabe verwenden
        if (fontSelection === "Custom" && customFontInput.value.trim() !== "") {
            return customFontInput.value.trim();
        }
        return fontSelection;
    }
    // Event Listener für die Checkbox
    document.getElementById("styleUseCheckbox").addEventListener("change", function () {
        const styleOptionsDiv = document.getElementById("styleOptions");
        if (this.checked) {
            // Zeige den Container, wenn die Checkbox angehakt ist
            styleOptionsDiv.style.display = "contents";
        } else {
            // Verstecke den Container, wenn die Checkbox nicht angehakt ist
            styleOptionsDiv.style.display = "none";
        }
    });

    // Initialzustand festlegen
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("styleOptions").style.display = "none";
    });


    function generateCardYAML() {
        const imageTableBody = document.getElementById('image-list-output').querySelector('tbody'); // Tabelle aus createImageList
        const rows = Array.from(imageTableBody.querySelectorAll("tr"));
        const sensorCount = rows.length;

        const blinkend = document.getElementById("blinkendCheckbox").checked; // blinkende Tonne?
        const dateUsed = document.getElementById("dateUseCheckbox").checked; // Datum angezeigt?
        const styleUsed = document.getElementById("styleUseCheckbox").checked; // Style geändert
        const styleUnused = !document.getElementById("styleUseCheckbox").checked; // Style nicht geändert
        const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value; // Anzeige "heute" oder "morgen",
        const darstellung = document.getElementById("darstellungAuswahl").value; // Karte einzeilig oder mehrzeilig
        const selectedFont = getSelectedFont(); // Ausgewählte Schriftart
        const StyleHintergrund = document.getElementById("backgroundSelect").value; // Gewählter Hintergrund
        const StyleRahmenStil = document.getElementById("borderStyleSelect").value; // Gewählter Rahmen
        const StyleRahmenEcke = document.getElementById("borderShapeSelect").value; // Gewählte Rahmen Form

        let yaml = "";

        // Für den Fall, dass 1 Sensor erstellt wurde
        if (sensorCount === 1) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensor aus der Tabelle entnehmen
            const sensorEntity = rows[0].cells[2].textContent.trim(); // Entity ID
            const imageName = rows[0].cells[1].textContent.trim(); // Bildname

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensorEntity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${imageName}\n`; // Bildname aus Tabelle
            yaml += `            size: 100px\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${imageName}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensorEntity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensorEntity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`; // Dynamische Schriftart
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;
        }

        // Für den Fall, dass 2 Sensoren erstellt wurden
        else if (sensorCount === 2) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensor1 = {
                entity: rows[0].cells[2].textContent.trim(),
                image: rows[0].cells[1].textContent.trim(),
            };
            const sensor2 = {
                entity: rows[1].cells[2].textContent.trim(),
                image: rows[1].cells[1].textContent.trim(),
            };

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            // YAML für den ersten Sensor
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor1.entity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${sensor1.image}\n`;
            yaml += `            size: 40%\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor1.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor1.entity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor1.entity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;

            // YAML für den zweiten Sensor
            yaml += `      - type: vertical-stack\n`;
            yaml += `        cards:\n`;
            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor2.entity}\n`;
            yaml += `            show_entity_picture: true\n`;
            yaml += `            entity_picture: /local/muell/${sensor2.image}\n`;
            yaml += `            size: 40%\n`;
            yaml += `            show_state: false\n`;
            yaml += `            show_name: false\n`;
            yaml += `            styles:\n`;
            yaml += `              card:\n`;
            yaml += `                - border: none\n`;
            yaml += `                - background: transparent\n`;
            yaml += `                - padding: 1em 0 0 0\n`;

            if (blinkend) {
                yaml += `            state:\n`;
                yaml += `              - value: ${valueText}\n`;
                yaml += `                entity_picture: /local/muell/${sensor2.image}\n`;
                yaml += `                styles:\n`;
                yaml += `                  entity_picture:\n`;
                yaml += `                    - animation:\n`;
                yaml += `                        - blink 1s linear infinite\n`;
            }

            if (dateUsed) {
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor2.entity}_datum\n`;
                yaml += `            show_name: false\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0\n`;
            }

            yaml += `          - type: custom:button-card\n`;
            yaml += `            entity: ${sensor2.entity}\n`;
            yaml += `            show_name: true\n`;
            yaml += `            show_icon: false\n`;
            yaml += `            show_state: true\n`;
            yaml += `            styles:\n`;
            yaml += `              name:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `                - color: var(--primary-color)\n`;
            yaml += `              state:\n`;
            yaml += `                - font-family: ${selectedFont}\n`;
            yaml += `              card:\n`;
            yaml += `                - background-color: transparent\n`;
            yaml += `                - border: none\n`;
            yaml += `                - padding: 0 0 1em 0\n`;
        }

        else if (sensorCount === 3) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        // Für den Fall, dass 4 Sensoren erstellt wurden und Darstellung "Einzeilig"
        else if (sensorCount === 4 && darstellung === "einzeilig") {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 80%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        else if (sensorCount === 4 && darstellung === "mehrzeilig") {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 2).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(2, 4).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        else if (sensorCount === 5) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 3).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(3, 5).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 40%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }


        else if (sensorCount === 6) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 3).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(3, 6).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }


        else if (sensorCount === 7) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 4).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(4, 7).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }


        else if (sensorCount === 8) {
            const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
            const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

            // Sensoren aus der Tabelle entnehmen
            const sensors = rows.map(row => ({
                entity: row.cells[2].textContent.trim(),
                image: row.cells[1].textContent.trim(),
            }));

            if (styleUnused) {
                yaml += `type: vertical-stack\n`; 
            }
            if (styleUsed) {
                yaml += `type: custom:vertical-stack-in-card\n`;
                yaml += `card_mod:\n`;
                yaml += `  style: |\n`;
                yaml += `    ha-card {\n`;
                yaml += `      background: ${StyleHintergrund};\n`;
                yaml += `      border: ${StyleRahmenStil};\n`;
                yaml += `      border-radius: ${StyleRahmenEcke}\n`;
                yaml += `    }\n`;
            }
            yaml += `cards:\n`;
            yaml += `  - type: custom:button-card\n`;
            yaml += `    entity: ${entityText}\n`;
            yaml += `    show_icon: false\n`;
            yaml += `    show_name: false\n`;
            yaml += `    show_state: true\n`;
            yaml += `    style:\n`;
            yaml += `      top: 10%\n`;
            yaml += `      left: 50%\n`;
            yaml += `      width: 100%\n`;
            yaml += `    styles:\n`;
            yaml += `      state:\n`;
            yaml += `        - font-size: 1.5em\n`;
            yaml += `        - font-family: ${selectedFont}\n`;
            yaml += `        - color: var(--primary-color)\n`;
            yaml += `        - white-space: unset\n`;
            yaml += `        - text-overflow: unset\n`;
            yaml += `        - word-break: break-word\n`;
            yaml += `        - visibility: >\n`;
            yaml += `            [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
            yaml += `      card:\n`;
            yaml += `        - background: transparent\n`;
            yaml += `        - border: none\n`;
            yaml += `        - padding-bottom: 0\n`;

            // Erste Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(0, 4).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });

            // Zweite Zeile der horizontalen Sensoren
            yaml += `  - type: horizontal-stack\n`;
            yaml += `    cards:\n`;

            sensors.slice(4, 8).forEach(sensor => {
                yaml += `      - type: vertical-stack\n`;
                yaml += `        cards:\n`;
                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_entity_picture: true\n`;
                yaml += `            entity_picture: /local/muell/${sensor.image}\n`;
                yaml += `            size: 60%\n`;
                yaml += `            show_state: false\n`;
                yaml += `            show_name: false\n`;
                yaml += `            styles:\n`;
                yaml += `              card:\n`;
                yaml += `                - border: none\n`;
                yaml += `                - background: transparent\n`;
                yaml += `                - padding: 1em 0 0 0\n`;

                if (blinkend) {
                    yaml += `            state:\n`;
                    yaml += `              - value: ${valueText}\n`;
                    yaml += `                entity_picture: /local/muell/${sensor.image}\n`;
                    yaml += `                styles:\n`;
                    yaml += `                  entity_picture:\n`;
                    yaml += `                    - animation:\n`;
                    yaml += `                        - blink 1s linear infinite\n`;
                }

                if (dateUsed) {
                    yaml += `          - type: custom:button-card\n`;
                    yaml += `            entity: ${sensor.entity}_datum\n`;
                    yaml += `            show_name: false\n`;
                    yaml += `            show_icon: false\n`;
                    yaml += `            show_state: true\n`;
                    yaml += `            styles:\n`;
                    yaml += `              state:\n`;
                    yaml += `                - font-family: ${selectedFont}\n`;
                    yaml += `              card:\n`;
                    yaml += `                - background-color: transparent\n`;
                    yaml += `                - border: none\n`;
                    yaml += `                - padding: 0\n`;
                }

                yaml += `          - type: custom:button-card\n`;
                yaml += `            entity: ${sensor.entity}\n`;
                yaml += `            show_name: true\n`;
                yaml += `            show_icon: false\n`;
                yaml += `            show_state: true\n`;
                yaml += `            styles:\n`;
                yaml += `              name:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `                - color: var(--primary-color)\n`;
                yaml += `              state:\n`;
                yaml += `                - font-family: ${selectedFont}\n`;
                yaml += `              card:\n`;
                yaml += `                - background-color: transparent\n`;
                yaml += `                - border: none\n`;
                yaml += `                - padding: 0 0 1em 0\n`;
            });
        }

        // Setze den generierten YAML-Code in das `pre`-Tag
        const yamlOutput = document.getElementById("yaml-code-output");
        yamlOutput.innerHTML = `<code>${yaml}</code>`;
    }

    // Update both the example card and YAML code
    document.getElementById("update-example-and-code").addEventListener("click", () => {
        updateExampleCard();
        generateCardYAML();
        showStep(7);
    });



//   █████  ██████  ███████  ██████ ██   ██ ███    ██ ██ ████████ ████████      ██████   //
//  ██   ██ ██   ██ ██      ██      ██   ██ ████   ██ ██    ██       ██        ██        //
//  ███████ ██████  ███████ ██      ███████ ██ ██  ██ ██    ██       ██        ███████   //
//  ██   ██ ██   ██      ██ ██      ██   ██ ██  ██ ██ ██    ██       ██        ██    ██  //
//  ██   ██ ██████  ███████  ██████ ██   ██ ██   ████ ██    ██       ██         ██████   //
                                                                                    


// Funktion zum Kopieren in die Zwischenablage
function copyToClipboard(helperName, statusId) {
    navigator.clipboard.writeText(helperName)
        .then(() => {
            // Erfolgreich kopiert, ändere den Status auf ✔️
            const statusElement = document.getElementById(statusId);
            statusElement.textContent = "✔️";
        })
        .catch(err => {
            console.error("Fehler beim Kopieren:", err);
        });
}

// Eventlistener für die Helfernamen
document.querySelectorAll(".copyable").forEach(element => {
    element.addEventListener("click", () => {
        const helperName = element.getAttribute("data-helper"); // Name des Helfers
        const statusId = element.nextElementSibling.id; // ID des Status-Felds
        copyToClipboard(helperName, statusId);
    });
});



function generatePopupYAML() {
    const imageTableBody = document.getElementById('image-list-output').querySelector('tbody');
    const rows = Array.from(imageTableBody.querySelectorAll("tr"));
    const sensorCount = rows.length;

    const anzeigeAuswahl = document.getElementById("anzeigeAuswahl").value;
    const selectedFont = getSelectedFont();
    const entityText = `sensor.mullabholung_${anzeigeAuswahl}`;
    const valueText = `${anzeigeAuswahl.charAt(0).toUpperCase() + anzeigeAuswahl.slice(1)}`; // "Heute" oder "Morgen"

    // Dynamisches Sammeln der Sensordaten
    const sensors = rows.map((row, index) => ({
        entity: row.cells[2]?.textContent.trim() || "",
        image: row.cells[1]?.textContent.trim() || "",
        index: index + 1 // 1-basiert
    }));

    let yaml = "";

    yaml += `type: custom:popup-card\n`;
    yaml += `dismissable: true\n`;
    yaml += `size: normal\n`;
    yaml += `entity: input_button.mullerinnerung_taster\n`;
    yaml += `style: |-\n`;
    yaml += `  --popup-max-width: 1500px;\n`;
    yaml += `  --popup-min-width: 1000px;\n`;
    yaml += `title: Nicht vergessen!\n`;
    yaml += `card:\n`;
    yaml += `  type: picture-elements\n`;
    yaml += `  elements:\n`;

    // Titelbereich
    yaml += `    - type: custom:button-card\n`;
    yaml += `      entity: ${entityText}\n`;
    yaml += `      show_icon: false\n`;
    yaml += `      show_name: false\n`;
    yaml += `      show_state: true\n`;
    yaml += `      styles:\n`;
    yaml += `        card:\n`;
    yaml += `          - background: transparent\n`;
    yaml += `          - border: none\n`;
    yaml += `        state:\n`;
    yaml += `          - font-size: 2em\n`;
    yaml += `          - font-family: ${selectedFont}\n`;
    yaml += `          - color: var(--primary-color)\n`;
    yaml += `          - white-space: unset\n`;
    yaml += `          - text-overflow: unset\n`;
    yaml += `          - word-break: break-word\n`;
    yaml += `          - visibility: >\n`;
    yaml += `              [[[ return entity.state === 'none' ? 'hidden' : 'visible'; ]]]\n`;
    yaml += `          - text-shadow: 1px 1px 2px black, 0 0 25px white, 0 0 5px grey\n`;
    yaml += `      style:\n`;
    yaml += `        left: 50%\n`;
    yaml += `        top: 13%\n`;
    yaml += `        width: 90%\n`;

    // Dynamisches Hinzufügen der Sensoren
    sensors.forEach(sensor => {
        if (sensor.entity && sensor.image) {
            yaml += `    - type: custom:button-card\n`;
            yaml += `      entity: ${sensor.entity}\n`;
            yaml += `      show_icon: false\n`;
            yaml += `      show_name: false\n`;
            yaml += `      show_state: false\n`;
            yaml += `      show_entity_picture: true\n`;
            yaml += `      size: 100%\n`;
            yaml += `      state:\n`;
            yaml += `        - value: ${valueText}\n`;
            yaml += `          entity_picture: /local/muell/${sensor.image}\n`;
            yaml += `      styles:\n`;
            yaml += `        card:\n`;
            yaml += `          - background: transparent\n`;
            yaml += `          - border: none\n`;

            // Dynamische Positionierung basierend auf dem Index
            let position = getPositionByIndex(sensor.index); // Funktion zur Berechnung der Position
            yaml += `      style:\n`;
            yaml += `        left: ${position.left}%\n`;
            yaml += `        top: ${position.top}%\n`;
            yaml += `        width: ${position.width}%\n`;
        }
    });

    yaml += `  image: /local/muell/popup_background.png\n`;
    yaml += `grid_options:\n`;
    yaml += `  columns: 24\n`;
    yaml += `  rows: auto\n`;

    // Setze den generierten YAML-Code in das `pre`-Tag
    const popupOutput = document.getElementById("popup-code-output");
    popupOutput.innerHTML = `<code>${yaml}</code>`;
}

// Funktion zur Berechnung der Position basierend auf dem Index
function getPositionByIndex(index) {
    const positions = {
        1: { left: 27, top: 75, width: 22 },
        2: { left: 57, top: 75, width: 22 },
        3: { left: 87, top: 75, width: 22 },
        4: { left: 12, top: 79, width: 23 },
        5: { left: 42, top: 79, width: 23 },
        6: { left: 72, top: 79, width: 23 }
    };
    return positions[index] || { left: 50, top: 50, width: 20 }; // Standardposition
}

// Update both the example card and YAML code
document.getElementById("popup-code").addEventListener("click", () => {
    generatePopupYAML(); // YAML generieren

    // Beispielbild anzeigen
    const exampleContainer = document.getElementById("example-popup-container");
    exampleContainer.style.display = "block";
});


</script>


