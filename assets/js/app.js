// Warten, bis der DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Button anzeigen/verstecken
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) { // Ab 200px Scrolltiefe anzeigen
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    // Nach oben scrollen bei Klick
    scrollToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Weiches Scrollen
        });
    });
});

function copyCode(elementId, button) {
    const codeElement = document.getElementById(elementId);
    const codeText = codeElement.innerText || codeElement.textContent;
    navigator.clipboard.writeText(codeText)
        .then(() => {
            showSHBcustomAlert("ERFOLG!", "Der Code wurde erfolgreich kopiert!");
            button.classList.add('copied');
            button.textContent = "Kopiert ✔️";
        })
        .catch(err => {
            console.error("Fehler beim Kopieren des Codes: ", err);
            showSHBcustomAlert("FEHLER!", "Beim Kopieren des Codes ist ein Fehler aufgetreten.");
        });
}

function showSHBcustomAlert(title, message) {
    const alertBox = document.getElementById("shb-custom-alert");
    const alertTitle = document.getElementById("shb-custom-alert-title");
    const alertMessage = document.getElementById("shb-custom-alert-message");
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    alertBox.style.display = "flex";
    document.getElementById("shb-close-alert").onclick = function () {
        alertBox.style.display = "none";
    };
}

function toggleSHBdropdown(dropdownId, toggleButton) {
    var dropdownContent = document.getElementById(dropdownId);
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
        dropdownContent.style.display = "block";
        toggleButton.classList.add("rotated"); // Klasse hinzufügen
    } else {
        dropdownContent.style.display = "none";
        toggleButton.classList.remove("rotated"); // Klasse entfernen
    }
}