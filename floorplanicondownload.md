---
title: Floorplan Icons
subtitle: Alle von mir verwendeten Icons im Überblick und zum Download
description: Sieh dir meine Icons an oder lade sie dir herunter
show_sidebar: false
layout: page
---

<div class="guide-container">
    <h1 class="icon-main-title">Floorplan Icons Download</h1>
    <h2 class="icon-main-subtitle">Icons aussuchen und einzeln oder gesamt herunterladen </h2>
    <p class="icon-main-intro">
        Wozu sind diese Icons?<br>
        Icons wie diese werden von mir in Home Assistant auf meinem Floorplan verwendet. Sie werden zum Aktivieren / Deaktivieren von Entitäten, zum Navigieren auf andere Dashboard-Seiten oder zur Anzeige von diversen Entitäten-Status benutzt.
    </p>
    <h3>Hier sind alle meine Icons im Überblick</h3>
    <p>
        Du kannst die gesammelten Icons in einem ZIP-Ordner über den Download Button, oder jedes einzelne Icon mit einem Klick daraufherunterladen.
    </p>
    <a href="/img/icons/icons.zip" download>
        <button class="icon-download-button">Download alle Icons</button>
    </a>
    <table class="icon-table">
        <tbody>
            {% assign icons = "alarm_armed_away,alarm_arming,alarm_disarmed,alarm_pending,alarm_triggered,arbeitszimmer_off,arbeitszimmer_on,back_Icon,birne_off,birne_on,birthday,bueropc_off,bueropc_on,decke_off,decke_on,dnd,echo_paused,echo_playing,effekt_off,effekt_on,energie_icon,esszimmer_off,esszimmer_on,fehler,fliegengitter_off,fliegengitter_on,flocky_cleaning,flocky_docking,flocky_returning,flocky_standby,garagenlicht_off,garagenlicht_on,garagentor_offen,garagentor_zu,garten_off,garten_on,gs_fertig,gs_laeuft,guten_morgen_off,guten_morgen_on,gute_nacht_off,gute_nacht_on,haengeleuchte_off,haengeleuchte_on,hauptschalter,hauptschalter_al,hauptschalter_al_flocky,hauptschalter_al_flocky_on,hauptschalter_al_on,heizstrahler_off,heizstrahler_on,heizung_off,heizung_on,heizung_sommer,heizung_winter,kaffee_off,kaffee_on,kalender_on,kerzen_off,kerzen_on,kueche_off,kueche_on,led_off,led_on,leer,like,markise_closed,markise_open,medien_off,musik_off,musik_on,nachttisch_off,nachttisch_on,next_page,onair_off,onair_on,pc_ausgeschaltet,pc_eingeschaltet,playstation_off,playstation_on,post_leer,post_voll,refresh,refresh_blau,refresh_green,refresh_weiss,rolladen_offen,rolladen_zu,rollladen_closed,rollladen_open,sanitaer_off,sanitaer_on,schlafzimmer_off,schlafzimmer_on,schreibtisch_off,schreibtisch_on,sideboard_off,sideboard_on,spot_off,spot_on,strava_icon,tankstellen,termine,touchpc_off,touchpc_on,tr_fertig,tr_laeuft,tuere_aufgesperrt,tuere_off,tuere_on,tuere_versperrt,tv_off,tv_on,ventilator_off,ventilator_on,videoleuchte_off,videoleuchte_on,vollbild_off,vollbild_off_blue,vollbild_on,vollbild_on_blue,vorraum_off,vorraum_on,wand_off,wand_on,wm_fertig,wm_laeuft,wohnzimmer_off,wohnzimmer_on,youtube,zuhause_off,zuhause_on" | split: "," %}
            {% assign count = 0 %}
            <tr>
            {% for icon in icons %}
                {% if icon != "dateinamen" %}
                    <td>
                        <div class="icon-wrapper">
                            <a href="/img/icons/{{ icon }}.png" download>
                                <img src="/img/icons/{{ icon }}.png" alt="{{ icon }}" />
                            </a>
                            <p>{{ icon | remove: ".png" }}</p>
                        </div>
                    </td>
                    {% assign count = count | plus: 1 %}
                    {% if count == 6 %}
                        </tr><tr>
                        {% assign count = 0 %}
                    {% endif %}
                {% endif %}
            {% endfor %}
            </tr>
        </tbody>
    </table>
    <footer class="icon-main-footer">
        <h2>Viel Freude mit den Icons 🎉</h2>
    </footer>
    {% include support_note.html %}
</div>
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
        color: #1598b3;
        font-size: 1.75em;
        margin-bottom: 10px;
    }
    .content h1 {
        color: #1598b3
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
    .icon-main-container {
        max-width: 100%;
        margin-bottom: 100px;
        padding: 20px;
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: Arial, sans-serif;
        line-height: 1.6;
    }
    .icon-main-title {
        text-align: center;
        color: #333;
        font-size: 2em;
        margin-bottom: 20px;
    }
    .icon-main-subtitle {
        text-align: center;
        font-size: 1.4em;
        margin-bottom: 20px;
        color: #555;
    }
    .icon-main-intro {
        text-align: center;
        color: #777;
        margin-bottom: 20px;
    }
    .icon-table {
        width: 100%;
        background-color: #232323;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .icon-table thead th {
        background-color: #f9f9f9;
        color: #fff;
        padding: 15px;
        text-align: center;
        font-size: 1.2em;
    }
    .icon-table td {
        text-align: center;
        vertical-align: middle;
        padding: 15px;
        border: 1px solid #444;
        width: 16.66%;
    }
    .icon-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        border: 1px dashed #ccffbb70;
        padding: 10px;
        position: relative;
    }
    .icon-wrapper img {
        max-width: 100px;
        height: auto;
        margin-bottom: 10px;
        object-fit: contain;
    }
    .icon-wrapper p {
        font-size: 0.9em;
        color: #f9f9f9;
        margin: 0;
        text-align: center;
        word-wrap: break-word;
    }
    .icon-wrapper a {
        text-decoration: none;
        color: inherit;
    }
    .icon-wrapper a:hover {
        opacity: 0.8;
    }
    .icon-download-button {
        background-color: #4CAF50; /* Grüner Hintergrund */
        color: white; /* Weiße Schrift */
        width: 30%;
        padding: 10px 20px; /* Innenabstand */
        font-size: 16px; /* Schriftgröße */
        border: none; /* Kein Rahmen */
        border-radius: 5px; /* Abgerundete Ecken */
        cursor: pointer; /* Zeiger beim Hover */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Schatten */
        transition: background-color 0.3s ease;
    }
    .icon-download-button:hover {
        background-color: #45a049; /* Dunkleres Grün beim Hover */
    }
    .icon-main-footer {
        text-align: center;
        margin-top: 20px;
    }
</style>
