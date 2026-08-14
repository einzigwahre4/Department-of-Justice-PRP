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


// ==========================================
// ZENTRALE GESETZESSUCHE
// ==========================================

const lawSearchInput = document.getElementById("lawSearch");
const searchResults = document.getElementById("searchResults");

function searchLaws() {

    const searchTerm = lawSearchInput.value
        .toLowerCase()
        .trim();

    searchResults.innerHTML = "";

    if (searchTerm.length < 2) {
        searchResults.innerHTML = `
            <div class="search-empty">
                Bitte mindestens 2 Zeichen eingeben.
            </div>
        `;
        return;
    }

    const articles = document.querySelectorAll(".law-article");

    let resultsFound = 0;

    articles.forEach(article => {

        const text = article.innerText.toLowerCase();

        if (text.includes(searchTerm)) {

            resultsFound++;

            const title = article.querySelector("h3");

            const result = document.createElement("div");

            result.className = "search-result";

            result.innerHTML = `
                <div class="search-result-title">
                    ${title ? title.innerText : "Gesetzesstelle"}
                </div>

                <div class="search-result-text">
                    ${getSearchPreview(article.innerText, searchTerm)}
                </div>
            `;

result.addEventListener("click", () => {

    const section = article.closest(".page-section");

    if (section) {

        showSection(section.id);

        setTimeout(() => {

            article.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            article.classList.add("search-highlight");

            setTimeout(() => {
                article.classList.remove("search-highlight");
            }, 2500);

        }, 300);
    }

});

            searchResults.appendChild(result);
        }
    });

    if (resultsFound === 0) {

        searchResults.innerHTML = `
            <div class="search-empty">
                Keine passende Gesetzesstelle gefunden.
            </div>
        `;
    }
}


// Vorschautext für Suchergebnisse
function getSearchPreview(text, searchTerm) {

    const lowerText = text.toLowerCase();

    const position = lowerText.indexOf(searchTerm);

    if (position === -1) {
        return text.substring(0, 180) + "...";
    }

    const start = Math.max(0, position - 80);

    const end = Math.min(
        text.length,
        position + searchTerm.length + 100
    );

    let preview = text.substring(start, end);

    if (start > 0) {
        preview = "..." + preview;
    }

    if (end < text.length) {
        preview += "...";
    }

    return preview;
}


// Suche bereits während der Eingabe
if (lawSearchInput) {

    lawSearchInput.addEventListener(
        "input",
        searchLaws
    );
}

/* =========================================
   ENTER-TASTE FÜR SUCHE
========================================= */

if (lawSearchInput) {

    lawSearchInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchLaws();
        }

    });

}
