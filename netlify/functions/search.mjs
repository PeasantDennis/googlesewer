// Select elements
const flushBtn = document.getElementById("flushBtn");
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

// Wikipedia Backup Search
async function searchWikipedia(query) {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
        const data = await response.json();

        resultsList.innerHTML = "";
        data.query.search.slice(0, 5).forEach(result => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="https://en.wikipedia.org/wiki/${result.title.replace(/ /g, '_')}" target="_blank">${result.title}</a>`;
            resultsList.appendChild(li);
        });
    } catch (error) {
        resultsList.innerHTML = "<p>Error fetching Wikipedia results. Try again later.</p>";
        console.error("Wikipedia search error:", error);
    }
}

// DuckDuckGo Scraper
async function searchDuckDuckGo(query) {
    try {
        const response = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`);
        const text = await response.text();

        // Extract search results using regex
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const results = doc.querySelectorAll(".result__title a");

        resultsList.innerHTML = "";
        results.forEach((result, index) => {
            if (index < 5) { // Limit to top 5 results
                const li = document.createElement("li");
                li.innerHTML = `<a href="https://duckduckgo.com${result.getAttribute("href")}" target="_blank">${result.textContent}</a>`;
                resultsList.appendChild(li);
            }
        });

        if (results.length === 0) {
            resultsList.innerHTML = "<p>No results found. Try Wikipedia instead.</p>";
            await searchWikipedia(query);
        }
    } catch (error) {
        console.warn("DuckDuckGo scraping failed, switching to Wikipedia.");
        await searchWikipedia(query);
    }
}

// Modify Flush Button to Use DuckDuckGo First, Wikipedia as Backup
flushBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsList.innerHTML = "<p>Flushing results...</p>";

    try {
        await searchDuckDuckGo(query);
    } catch (error) {
        console.warn("DuckDuckGo failed, switching to Wikipedia.");
        await searchWikipedia(query);
    }
});
