console.log("O script foi carregado!");
console.log("Conteúdo atual do body:", document.body.innerHTML);

function mostrarAlerta() {
    alert("Você clicou no botão!");
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const searchType = document.getElementById("search-type");
    const resultsContainer = document.getElementById("results");

    if (!searchButton || !searchInput || !searchType || !resultsContainer) {
        console.error("Erro: Um ou mais elementos necessários não foram encontrados no HTML.");
        return;
    }

    searchButton.addEventListener("click", async () => {
        const query = searchInput.value.trim();
        const type = searchType.value;

        if (!query) {
            alert("Descrição do ticket");
            return;
        }

        const requestData = {
            searchType: type,
            query: query
        };

        try {
            const response = await fetch("https://caie.dev/tickets/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            displayResults(data);
        } catch (error) {
            console.error("Erro ao buscar tickets:", error);
            resultsContainer.innerHTML = "<li>Erro ao buscar tickets.</li>";
        }
    });

    function displayResults(results) {
        resultsContainer.innerHTML = "";

        if (!results || results.length === 0) {
            resultsContainer.innerHTML = "<li>Nenhum resultado encontrado.</li>";
            return;
        }

        results.forEach(ticket => {
            const listItem = document.createElement("li");

            const link = document.createElement("a");
            link.href = ticket.url;
            link.textContent = ticket.url;
            link.target = "_blank";
            link.classList.add("result-url");

            const score = document.createElement("span");
            score.textContent = ticket.score.toFixed(6);
            score.classList.add("result-score");

            listItem.appendChild(link);
            listItem.appendChild(score);
            resultsContainer.appendChild(listItem);
        });
    }
});
