---
layout: post
title: "Einen smarten Adventskranz bauen"
date: 2024-11-23 08:03:24
categories: Dashboard
tags: [Adventskranz, ESPHome, D1 Mini, Home Assistant, Automatisierung, DIY Smart Home, Weihnachtsdeko, Mikrocontroller, Smarte Beleuchtung, Advent]
description: "Hier zeige ich, wie ich mit ESPHome und einem D1 Mini Microcontroller meinen Adventskranz smart gemacht habe"
image: /img/blog/smarter_Adventkranz/blog-post-smarter-adventskranz.png
published: true
---

<div class="post-content">
<p>
    Da meine Frau und ich das Glück haben, bei zwei unglaublich süßen Katern wohnen zu dürfen, ist es leider nicht möglich, echte, brennende Kerzen in der Wohnung zu nutzen.
</p>

<p>
    Da wir dennoch gerne zur Weihnachtszeit einen Adventskranz aufstellen und dieser natürlich leuchtende Kerzen haben soll, kam mir die Idee, einfach einen smarten Adventskranz zu bauen und diesen voll automatisiert zu gestalten.
</p>

<h3>Schritt 1. Verwendete Komponenten</h3>

<p>Was habe ich zum Bau des smarten Adventskranzes benötigt:</p>

<ol>
    <li>Einen künstlichen, optisch ansprechenden Kranz</li>
    <li>Vier batteriebetriebene Echtwachs-Kerzen</li>
    <li>Eine batteriebetriebene Lichterkette (1m)</li>
    <li>Einen ESP32-Mikrocontroller</li>
    <li>Ein Netzteil und ein Micro-USB-Kabel</li>
    <li>Ein paar Klemmen und Draht</li>
</ol>

<p>
    Die meisten der Komponenten könnt ihr in meinem Amazon Shop ansehen und gerne kaufen.
</p>

<a href="https://amzn.to/4fK08yu" target="_blank" style="color: white; text-decoration: none;">
<button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Link zum Shop</button>
</a>

<h3>Schritt 2. Kerzen verdrahten</h3>

<p>
    Als alle Teile zuhause angekommen waren, habe ich mich daran gemacht, die Kerzen für den Anschluss an den Mikrocontroller vorzubereiten.
    Dazu habe ich seitlich ein kleines Loch gebohrt, welches direkt in die Batteriekammer führte. In dieses Loch habe ich zwei Drähte mit 0,5 mm (Farbe schwarz und grün) eingeführt und um die Kerze nicht auseinandernehmen zu müssen, habe ich die Drähte einfach an die Batteriekontakte gelötet. Den Schalter der Kerze habe ich bei allen fix auf <strong>"on"</strong> gelassen. Die einmetrige Lichterkette habe ich von der Batteriebox getrennt und die Adern des Kabels für den Anschluss an den Microcontroller vorbereitet.
</p>

<div class="columns is-centered">
{% assign gallery_images = site.data.gallery_adventskranz_kerze %}
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



<h3>Schritt 3. Platine löten</h3>

<p>
    Um auch in der Zukunft noch zu wissen, wie ich den Microcontroller verdrahtet habe, zeichnete ich mir ein Schema in <strong>fritzing</strong>.<br> 
    Dieses Schema und das Pinout des Microcontrollers könnt ihr euch hier ansehen und bei Bedarf als PDF herunterladen. Um die Kerzen nicht immmer vom Microcontroller abklemmen zu müssen, habe ich mir Klemmen mit Stecker besorgt und diese dann, für mich übersichtlich, auf der Platine angeordnet.<br> 
    Verdrahtet habe ich die Platine mit 0,5mm² Drähten in verschiedenen Farben. Der Microcontroller selbst, ist nicht fix auf die Platine gelötet, sondern auch mit Steckleisten versehen um ihn bei Bedarf ohne Umstände tauschen zu können.
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/ESP_Verdrahtung_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/ESP_Verdrahtung.png" %}
<a href="/img/blog/smarter_Adventkranz/Smarter_Adventkranz_Anschluss.pdf" download="Smarter_Adventkranz_Anschluss.pdf" class="download-button">
  📈 Anschlussplan
</a>
</div>
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/ESP32_D1-Mini_Pinout_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/ESP32_D1-Mini_Pinout.png" %}
<a href="/img/blog/smarter_Adventkranz/D1_Mini_ESP32_-_pinout.pdf" download="D1_Mini_ESP32_-_pinout.pdf" class="download-button">
  📈 ESP32 Pinout
</a>
</div>
</div>

<div class="columns is-centered">
{% assign gallery_images = site.data.gallery_adventkranz_platine %}
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

<h3>Schritt 4. ESPHome Programmierung</h3>

<p>
    Als nächstes ging es um die Programmierung. Ich habe den Microcontroller mit einem Mikro-USB-Kabel für Datenübertragung an meinen Arbeits-PC angeschlossen. Dann habe ich Home Assistant in meinem Google Chrome Browser geöffnet, da ich festgestellt habe, das es bei anderen Browsern vermehrt Probleme mit den USB-Treibern bei der Installation von ESP Modulen gibt. In Home Assistant habe ich dann in ESPHome ein neuse Gerät eingebunden und dieses mit folgendem Code konfiguriert.
</p>
<p>
    Eine kurze Beschreibung wie man in ESPHome ein Gerät hinzufügt, findest du im ⬇️ Dropdown ⬇️
</p>

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown', this)">ESPHome - Neues Gerät einrichten <span>&#9660;</span></button>
    <div id="galleryDropdown" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_esp_new_device %}
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
<div class="code-container">
    <button class="copy-button" onclick="copyCode('code-yaml-esp', this)">Kopieren</button>
    <pre id="code-yaml-esp" class="language-yaml"><code>
esphome:
  name: adventskranz
  friendly_name: Adventskranz

esp32:
  board: wemos_d1_mini32
  framework:
    type: arduino

# Enable logging
logger:

# Enable Home Assistant API
api:
  encryption:
    key: "DEIN-ENCRYPTION-KEY"

ota:
  - platform: esphome
    password: "DEIN-OTA-PASSWORT"

#Web server für "VISIT"
web_server:
  port: 80

# WIFI Einstellungen mit statischer IP
wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  manual_ip:
    static_ip: 192.168.50.211 # Ich nutze grundsätzlich statische IP´s
    gateway: 192.168.50.1     # Änder diese Einträge für dich passend um!
    subnet: 255.255.255.0

# Enable fallback hotspot (captive portal) in case wifi connection fails
ap:
  ssid: "Adventskranz Fallback Hotspot"
  password: "DEIN PASSWORT"

captive_portal:

light:
  - platform: binary
    name: "Kerze1"
    output: light_kerze1
  - platform: binary
    name: "Kerze2"
    output: light_kerze2
  - platform: binary
    name: "Kerze3"
    output: light_kerze3
  - platform: binary
    name: "Kerze4"
    output: light_kerze4
  - platform: binary
    name: "Kette"
    output: light_kette

output:
  - id: light_kerze1
    platform: gpio
    pin: GPIO0
  - id: light_kerze2
    platform: gpio
    pin: GPIO12
  - id: light_kerze3
    platform: gpio
    pin: GPIO33
  - id: light_kerze4
    platform: gpio
    pin: GPIO14
  - id: light_kette
    platform: gpio
    pin: GPIO25
    </code></pre>
</div>

<p>
    Nachdem der Microcontroller mit dem Programm konfiguriert wurde, ging es an das Testen.<br>
    Ich habe die Kerzen und die Lichterkette angeschlossen, den Microcontroller über ein Micro-USB-Kabel mit Strom versorgt und dann im Browser die VISIT-Seite geöffnet. Hier kann mann alle konfigurierten Schalter betätigen und so die Funktion kontrollieren.
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/ESP_Visit_Button_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/ESP_Visit_Button.png" %}
</div>
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/ESP_Visit_testen_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/ESP_Visit_testen.png" %}
</div>
</div>


<h3>Schritt 5. Kalender einrichten</h3>

<p>
    Da ich den Adventskranz vollautomatisch betreiben möchte, habe ich mir einen Kalender mit den Advent-Tagen erstellt. Bei uns bleibt der Weihnachtsbaum und auch der Adventskranz bis zum 6.Jänner stehen.<br>
    Aus diesem Grund hat dieser Kalender folgende Einträge:
</p>

<ul>
    <li><strong>1.Advent</strong>: Jählich ab dem 1. Adventsonnstag</li>
    <li><strong>2.Advent</strong>: Jählich ab dem 2. Adventsonnstag</li>
    <li><strong>3.Advent</strong>: Jählich ab dem 3. Adventsonnstag</li>
    <li><strong>4.Advent</strong>: Jählich ab dem 4. Adventsonnstag</li>
    <li><strong>XMAS</strong>: Jählich ab dem 24.Dezember bis zum 6.Jänner</li>
</ul>

<p>
Du kannst dir hier die Einträge der nächsten 10 Jahre des Kalenders ansehen und ihn wenn du möchtest herunterladen.
</p>

<div style="text-align: center;">
    <label for="year-select" style="font-weight: bold; margin-bottom: 10px; display: block;">Jahr auswählen:</label>
    <select id="year-select" class="styled-select">
        <option value="all">Alle Jahre</option>
    </select>
</div>

<div id="event-table" class="styled-table-container" style="margin-top: 20px;"></div>

<a href="/assets/calendar/advent_calendar.ics" download="Advent_Kalender.ics" class="download-button">
  📅 Advent-Kalender ICS herunterladen
</a>

<p>
    Diesen Kalender habe ich in Home Assistant eingerichtet, um ihn für Automatisierungen und Templates zu nutzen.<br>
    Wenn du wissen möchtest, wie man auf einfachem Weg in Home Assistant einen Kalender einrichtet, sieh in den ⬇️ Dropdown ⬇️
</p>

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown2', this)">Neuen lokalen Kalender einrichten <span>&#9660;</span></button>
    <div id="galleryDropdown2" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_kalender_erstellen %}
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

<p>
    In Home Assistant sieht der eingerichtete Kalender so aus:
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Advent_Kalender_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Advent_Kalender.png" %}
</div>
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Advent_Kalender_2_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Advent_Kalender_2.png" %}
</div>
</div>

<h3>Schritt 6. Helfer Template anlegen</h3>

<p>
Um eine Anzeige in Home Assistant zu haben, welcher Status des Kalenders gerade zutrifft, habe ich ein Template angelegt, welches einen Sensor erstellt.
</p>
<p>
Auch hierzu findest du eine Beschreibung im ⬇️ Dropdown ⬇️
</p>

<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown3', this)">Template-Sensor Helfer einrichten <span>&#9660;</span></button>
    <div id="galleryDropdown3" class="dropdown-content" style="display: none;">
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

<h4>Template für den Helfer:</h4>

<ul>
    <li><strong>Name</strong>: Advent</li>
    <li><strong>Icon</strong>: mdi:pine-tree-variant-outline</li>
</ul>
<div class="code-container">
    <button class="copy-button" onclick="copyCode('code-yaml-calendar', this)">Kopieren</button>
    <pre id="code-yaml-calendar" class="language-yaml"><code>
{% raw %}
{% set ADVENTKAL = states.calendar.advent.state %}
{%- if ADVENTKAL == 'off' %}
Kein Advent!
{%- elif ADVENTKAL == 'on' %}
{{ states.calendar.advent.attributes.message }}
{% else %}
FEHLER
{%- endif %}
{% endraw %}
    </code></pre>
</div>

<p>
    Der installierte Sensor <strong>sensor.advent</strong> inkl. Labels zur einfacheren Sortierung kann hier angesehen werden:
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Adventkranz_Helfer_Sensor_1_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Adventkranz_Helfer_Sensor_1.png" %}
</div>
</div>

<h3>Schritt 7. Automatisierung</h3>

<p>
    Die Automatisierung war der letzte Schritt. Ich wollte einen Schalter, welcher den Adventskranz ein und aus schaltet. Welche und wieviele der Kerzen dabei eingeschaltet werden, übernimmt die Automatisierung.
</p>

<p>
Zuerst der Schalter. Dieser ist ein Input-Boolean und ich habe diesen bei den Helfern angelegt. 
</p>
<ul>
    <li><strong>Name</strong>: Adventskranz</li>
    <li><strong>Icon</strong>: mdi:candle</li>
</ul>

<p>
Wie man einen Helfer-Schalter anlegt, findest du im ⬇️ Dropdown ⬇️
</p>
<div class="dropdown">
    <button class="dropdown-toggle" onclick="toggleDropdown('galleryDropdown4', this)">Helfer-Schalter einrichten <span>&#9660;</span></button>
    <div id="galleryDropdown4" class="dropdown-content" style="display: none;">
        {% assign gallery_images = site.data.gallery_helfer_schalter %}
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

<p>
    Der fertig installierte Helfer <strong>input_boolean.adventskranz</strong> inkl. Labels zur einfacheren Sortierung ist hier anzusehen:
</p>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Adventkranz_Helfer_Schalter_1_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Adventkranz_Helfer_Schalter_1.png" %}
</div>
</div>

<p>
    Mit den Entitäten des ESP, des Kalender-Templates und des Schalters, konnte ich dann folgende Automatisierung anlegen.
</p>

<div class="advent-container">
  <h2>Was macht nun diese Automatisierung?</h2>
  <p>
    Diese Automatisierung steuert den Adventskranz entsprechend des aktuellen Adventsstatus.
  </p>
  <ul>
    <li>
      <strong>Wenn der Schalter "Adventskranz" eingeschaltet wird:</strong>
      <ul>
        <li>Es wird geprüft, welche Adventwoche gerade ist.</li>
        <li>Je nach Woche werden 1 bis 4 Kerzen eingeschaltet.</li>
        <li>Die Lichterkette wird immer eingeschaltet.</li>
      </ul>
    </li>
    <li>
      <strong>Wenn der Schalter "Adventskranz" ausgeschaltet wird:</strong>
      <ul>
        <li>Alle Kerzen und die Lichterkette werden ausgeschaltet.</li>
      </ul>
    </li>
  </ul>
  <p>
    Diese Automatisierung sorgt für eine stimmungsvolle Beleuchtung während der Adventszeit.
  </p>
</div>



<div class="code-container">
    <h4>Die Automatisierung im YAML-Code</h4>
    <button class="copy-button" onclick="copyCode('code-yaml-automation', this)">Kopieren</button>
    <pre id="code-yaml-automation" class="language-yaml"><code>
alias: Adventskranz Automatisierung
description: Steuert den Adventskranz entsprechend des aktuellen Adventsstatus
triggers:
  - entity_id: input_boolean.adventskranz
    to: "on"
    trigger: state
  - entity_id: input_boolean.adventskranz
    to: "off"
    trigger: state
conditions: []
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: input_boolean.adventskranz
            state: "on"
        sequence:
          - choose:
              - conditions:
                  - condition: state
                    entity_id: sensor.advent
                    state: 1.Advent
                sequence:
                  - target:
                      entity_id:
                        - light.adventskranz_kerze1
                        - light.adventskranz_kette
                    action: light.turn_on
                    data: {}
              - conditions:
                  - condition: state
                    entity_id: sensor.advent
                    state: 2.Advent
                sequence:
                  - target:
                      entity_id:
                        - light.adventskranz_kerze1
                        - light.adventskranz_kerze2
                        - light.adventskranz_kette
                    action: light.turn_on
                    data: {}
              - conditions:
                  - condition: state
                    entity_id: sensor.advent
                    state: 3.Advent
                sequence:
                  - target:
                      entity_id:
                        - light.adventskranz_kerze1
                        - light.adventskranz_kerze2
                        - light.adventskranz_kerze3
                        - light.adventskranz_kette
                    action: light.turn_on
                    data: {}
              - conditions:
                  - condition: state
                    entity_id: sensor.advent
                    state: 4.Advent
                sequence:
                  - target:
                      entity_id:
                        - light.adventskranz_kerze1
                        - light.adventskranz_kerze2
                        - light.adventskranz_kerze3
                        - light.adventskranz_kerze4
                        - light.adventskranz_kette
                    action: light.turn_on
                    data: {}
              - conditions:
                  - condition: state
                    entity_id: sensor.advent
                    state: XMAS
                sequence:
                  - target:
                      entity_id:
                        - light.adventskranz_kerze1
                        - light.adventskranz_kerze2
                        - light.adventskranz_kerze3
                        - light.adventskranz_kerze4
                        - light.adventskranz_kette
                    action: light.turn_on
                    data: {}
      - conditions:
          - condition: state
            entity_id: input_boolean.adventskranz
            state: "off"
        sequence:
          - target:
              entity_id:
                - light.adventskranz_kerze1
                - light.adventskranz_kerze2
                - light.adventskranz_kerze3
                - light.adventskranz_kerze4
                - light.adventskranz_kette
            action: light.turn_off
            data: {}
mode: single

    </code></pre>
</div>

<p>
    Nach der Installation der Automatisierung ging es an den Zusammenbau des Adventskranzes und an das Testen.
    <br>
    In den Etwicklerwerkzeugen ist es sehr einfach, für kurze Zeit die Kalenderdaten nach eigenen Bedürfnissen zu setzen. Ich habe bei Zustand <strong>on</strong> und bei <strong>message: 4.Advent</strong> eingetragen und dann auf <strong>ZUSTAND SETZEN</strong> geklickt. Dann auf meinem neu erstelltem Dashboard die Funktionen gestestet.<br>
    Alles funktionierte zur vollsten Zufriedenheit.
</p>

<div class="columns is-centered">
{% assign gallery_images = site.data.gallery_adventkranz_testen %}
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

  <footer class="blog-footer">
    <h2>Viel Spaß und Erfolg beim Nachbasteln 🎉</h2>
  </footer>


<h3>8. Zusätzliche Templates</h3>

<p>
    Aufmerksamen Lesern wird es nicht entgangen sein, dass auf dem Dashboard noch zusätzliche Sensoren die Adventzeit betreffend angeführt waren.<br>
    Hierbei handelt es sich um einen simplen Adventkalender und eine Anzeige für die Tage bis zum Heiligen Abend.
</p>

<p>
    Auch diese Templates könnt ihr hier kopieren und bei euch einfügen.
</p>

<h4>Template Adventkalender:</h4>

<ul>
    <li><strong>Name</strong>: Adventkalender</li>
    <li><strong>Icon</strong>: mdi:window-closed-variant</li>
</ul>

<div class="code-container">
    <h4>Template-Helfer Adventkalender</h4>
    <button class="copy-button" onclick="copyCode('code-yaml-advent', this)">Kopieren</button>
    <pre id="code-yaml-advent" class="language-yaml"><code>
{% raw %}
{% set ADVENTMONAT = (12) %}
{% set HEILIGABEND = (12, 24) %}
{% set ADVENTTAG = (now().month, now().day) %}
{% if ADVENTTAG >= (12, 1) and ADVENTTAG <= HEILIGABEND %}
{{ now().day }}
{% else%}
kein
{% endif %}
{% endraw %}
    </code></pre>
</div>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Helfer_Template_Adventkalender_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Helfer_Template_Adventkalender.png" %}
</div>
</div>

<h4>Template Tage bis Heiligabend:</h4>

<ul>
    <li><strong>Name</strong>: Adventtage bis XMAS</li>
    <li><strong>Icon</strong>: mdi:calendar-check-outline</li>
</ul>

<div class="code-container">
    <h4>Template-Helfer Tage bis XMAS</h4>
    <button class="copy-button" onclick="copyCode('code-yaml-adventdays', this)">Kopieren</button>
    <pre id="code-yaml-adventdays" class="language-yaml"><code>
{% raw %}
{% set ADVENTMONAT = (12) %}
{% set HEILIGABEND = (12, 24) %}
{% set ADVENTTAG = (now().month, now().day) %}
{% if ADVENTTAG >= (12, 1) and ADVENTTAG <= HEILIGABEND and ADVENTMONAT == now().month and (24 - now().day) >= 2 %}
Es sind noch {{ 24 - now().day }} Tage bis Heligabend!
{% elif ADVENTTAG >= (12, 1) and ADVENTTAG <= HEILIGABEND and ADVENTMONAT == now().month and (24 - now().day) == 1 %}
Nur noch 1 Tag bis Heiligabend!
{% elif ADVENTTAG >= (12, 1) and ADVENTTAG <= HEILIGABEND and ADVENTMONAT == now().month and (24 - now().day) == 0 %}
Heute ist Heilgabend! Fröhliche Weihnachten!
{% else%}

{% endif %}
{% endraw %}
    </code></pre>
</div>

<div class="columns is-centered">
<div class="column is-5">
{% include image-modal.html ratio="is-4by3" link="/img/blog/smarter_Adventkranz/Helfer_Template_Tage-bis-XMAS_k.png" alt="Example image" large_link="/img/blog/smarter_Adventkranz/Helfer_Template_Tage-bis-XMAS.png" %}
</div>
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
    /* Allgemeines Styling für Dropdown-Menü */
    .styled-select {
        width: 200px;
        padding: 10px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
        background-color: #f9f9f9;
        cursor: pointer;
    }
    /* Tabellencontainer */
    .styled-table-container {
        margin: auto;
        width: 80%;
    }
    /* Tabellenstyling */
    .styled-table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        text-align: left;
        margin: 20px 0;
    }
    /* Tabellenkopf */
    .styled-table thead th {
        background-color:#007bff;
        color: #333; /* Dunkle Schrift */
        padding: 10px;
        font-weight: bold;
        text-transform: uppercase;
        border-bottom: 2px solid #a4c8e1; /* Graublauer Rand */
    }
    /* Tabellenzellen */
    .styled-table tbody tr:nth-child(odd) {
        background-color: #f0f7ff; /* Helles Blau */
    }
    .styled-table tbody tr:nth-child(even) {
        background-color: #e6eef7; /* Graublau */
    }
    .styled-table tbody td {
        color: #333; /* Dunkle Schrift */
        padding: 10px;
        border-bottom: 1px solid #a4c8e1; /* Graublauer Rand */
    }
    /* Hervorhebung bei Hover */
    .styled-table tbody tr:hover {
        background-color: #cfe0f5; /* Intensiveres Blau */
        transition: background-color 0.3s ease;
    }
    /* Download-Button */
    .download-button {
        display: inline-block;
        padding: 10px 20px;
        margin-top: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #fff;
        background-color: #007bff;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }
    .download-button:hover {
        background-color: #0056b3;
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
    .dropdown {
        margin: 0 0 20px;
        text-align: center;
    }
    .dropdown-toggle {
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        background-color: #f39c12;
        color: #ffffff;
        padding: 10px 5px;
        border: none;
        border-radius: 5px;
        text-align: center;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: inline-block;
    }
    .dropdown-toggle.rotated {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        transform: rotate(180deg); /* Text von unten nach oben */
        padding: 20px 30px;
        width: 200px;
        height: auto;
    }
    .dropdown-toggle span {
        float: right;
    }
    .dropdown-content {
        padding: 20px;
        background-color: #1a1a1a;
        border: 1px solid #f39c12;
        border-radius: 5px;
        margin-top: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .blog-footer {
    text-align: center;
    margin-top: 20px;
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
    .advent-container {
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #444; /* Dunkler Rand für das Theme */
        border-radius: 8px;
        background-color: #333; /* Dunkler Hintergrund */
        color: #eee; /* Helle Schriftfarbe */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Schatten für etwas Tiefe */
    }
    .advent-container h2 {
        text-align: center;
        color: #ddd; /* Helle Farbe für Überschrift */
    }
    .advent-container p {
        line-height: 1.6;
        margin-top: 15px;
        color: #ccc; /* Helle Farbe für normalen Text */
        text-align: center;
    }
    .advent-container ul {
        line-height: 1.6;
        margin: 15px 0;
        padding-left: 20px;
        color: #bbb; /* Helle Farbe für Listenelemente */
    }
    .advent-container ul li {
        margin-top: 10px;
    }
    .advent-container ul li ul {
        margin-top: 5px;
        list-style-type: disc;
        padding-left: 20px;
    }
    .advent-container ul li ul li {
        margin-top: 5px;
    }
    .advent-container strong {
        color: #fff; /* Helle Farbe für hervorgehobenen Text */
    }

</style>


<script>
    document.addEventListener("DOMContentLoaded", function () {
        const icsUrl = "/assets/calendar/advent_calendar.ics";
        const yearSelect = document.getElementById("year-select");
        const eventTableContainer = document.getElementById("event-table");

        let allEvents = []; // Speicher für alle geladenen Events

        // Funktion zum Erstellen der Tabelle
        function createTable(events) {
            eventTableContainer.innerHTML = ""; // Tabelle leeren
            const table = document.createElement("table");
            table.classList.add("styled-table"); // Klasse hinzufügen
            table.style.width = "100%";
            table.setAttribute("border", "1");

            const tableHeader = `
                <thead>
                    <tr>
                        <th>Terminname</th>
                        <th>Startdatum</th>
                        <th>Enddatum</th>
                    </tr>
                </thead>
            `;
            table.innerHTML = tableHeader;

            const tbody = document.createElement("tbody");

            // Zeilen für jedes Event erstellen
            events.forEach(event => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${event.title}</td>
                    <td>${event.start}</td>
                    <td>${event.end || "-"}</td>
                `;
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            eventTableContainer.appendChild(table);
        }

        // Funktion zum Filtern der Events nach Jahr
        function filterEventsByYear(year) {
            const filteredEvents = allEvents.filter(event => {
                const eventYear = new Date(event.start.split('.').reverse().join('-')).getFullYear();
                return year === "all" || eventYear === parseInt(year, 10);
            });
            createTable(filteredEvents);
        }

        // ICS-Datei laden und Events extrahieren
        fetch(icsUrl)
            .then(response => response.text())
            .then(data => {
                // ICS-Datei durchsuchen
                const eventRegex = /BEGIN:VEVENT[\s\S]*?END:VEVENT/g;
                const events = data.match(eventRegex) || [];

                // Events extrahieren
                allEvents = events.map(eventData => {
                    const titleMatch = eventData.match(/SUMMARY:(.+)/);
                    const startMatch = eventData.match(/DTSTART(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);
                    const endMatch = eventData.match(/DTEND(?:;VALUE=DATE)?:(\d{4})(\d{2})(\d{2})/);

                    return {
                        title: titleMatch ? titleMatch[1] : "Unbekannt",
                        start: startMatch ? `${startMatch[3]}.${startMatch[2]}.${startMatch[1]}` : "Unbekannt",
                        end: endMatch
                            ? new Date(`${endMatch[1]}-${endMatch[2]}-${endMatch[3]}`)
                                .toISOString()
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join(".")
                            : null
                    };
                });

                // Dropdown mit "Dieses Jahr" und den nächsten 10 Jahren füllen
                const currentYear = new Date().getFullYear();
                const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
                years.unshift("Dieses Jahr"); // "Dieses Jahr" als ersten Eintrag hinzufügen

                // Dropdown-Menü füllen
                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year === "Dieses Jahr" ? currentYear : year;
                    option.textContent = year;
                    if (year === "Dieses Jahr") option.selected = true; // "Dieses Jahr" als Standardwert
                    yearSelect.appendChild(option);
                });

                // Tabelle basierend auf dem aktuellen Jahr anzeigen
                filterEventsByYear(currentYear);
            })
            .catch(error => console.error("Fehler beim Laden der ICS-Datei:", error));

        // Event-Listener für die Jahresauswahl
        yearSelect.addEventListener("change", function () {
            const selectedYear = this.value === "Dieses Jahr" ? new Date().getFullYear() : this.value;
            filterEventsByYear(selectedYear);
        });
    });
    function toggleDropdown(dropdownId, toggleButton) {
        var dropdownContent = document.getElementById(dropdownId);
        if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
            dropdownContent.style.display = "block";
            toggleButton.classList.add("rotated"); // Klasse hinzufügen
        } else {
            dropdownContent.style.display = "none";
            toggleButton.classList.remove("rotated"); // Klasse entfernen
        }
    }
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


