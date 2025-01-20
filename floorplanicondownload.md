---
title: Floorplan Icons
subtitle: Alle von mir verwendeten Icons im Überblick und zum Download
description: Sieh dir meine Icons an oder lade sie dir herunter
show_sidebar: false
layout: page
---

<div class="shb-main-container">
    <h1 class="shb-main-title">Floorplan Icons Download</h1>
    <h2 class="shb-section-title-center">Icons aussuchen und einzeln oder gesamt herunterladen </h2>
    <p class="shb-main-description">
        Wozu sind diese Icons?<br>
        Icons wie diese werden von mir in Home Assistant auf meinem Floorplan verwendet. Sie werden zum Aktivieren / Deaktivieren von Entitäten, zum Navigieren auf andere Dashboard-Seiten oder zur Anzeige von diversen Entitäten-Status benutzt.
    </p>
    <h3>Hier sind alle meine Icons im Überblick</h3>
    <p>
        Du kannst die gesammelten Icons in einem ZIP-Ordner über den Download Button, oder jedes einzelne Icon mit einem Klick daraufherunterladen.
    </p>
    <div class="shb-button">
        <a href="/img/icons/icons.zip" download>
        <button class="shb-button shb-button-blue" style="width: 30%" >Download alle Icons 💾</button>
        </a>
    </div>
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
    <footer class="shb-footer">
        <h2>Viel Freude mit den Icons 🎉</h2>
    </footer>
    {% include support_note.html %}
</div>
<style>
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
</style>
