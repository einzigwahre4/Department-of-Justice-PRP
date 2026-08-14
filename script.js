/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

    // Alle Seiten ausblenden
    const sections =
        document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });


    // Gewünschte Seite anzeigen
    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active");
    }


    // Navigation aktualisieren
    const buttons =
        document.querySelectorAll(".nav-button");

    buttons.forEach(button => {
        button.classList.remove("active");
    });


    // Passenden Button finden
    buttons.forEach(button => {

        const onclickValue =
            button.getAttribute("onclick");

        if (
            onclickValue &&
            onclickValue.includes("'" + sectionId + "'")
        ) {
            button.classList.add("active");
        }

    });


    // Nach oben scrollen
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   SUCHFUNKTION
========================================= */

function searchLaw() {

    const input =
        document.getElementById("searchInput");

    const searchTerm =
        input.value.trim().toLowerCase();


    // Wenn nichts gesucht wird
    if (searchTerm === "") {
        return;
    }


    // Wir durchsuchen alle Gesetzesartikel
    const articles =
        document.querySelectorAll(".law-article");


    let found = false;


    articles.forEach(article => {

        const text =
            article.innerText.toLowerCase();


        if (text.includes(searchTerm)) {

            article.style.display = "block";

            article.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            article.style.outline =
                "3px solid var(--accent)";

            found = true;

            setTimeout(() => {

                article.style.outline = "";

            }, 2500);

        }

    });


    if (!found) {

        alert(
            "Der gesuchte Begriff wurde im aktuellen Gesetzbuch nicht gefunden."
        );

    }

}


/* =========================================
   ENTER-TASTE FÜR SUCHE
========================================= */

document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchLaw();
        }

    });
