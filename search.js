document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.querySelector("input").value;
  const resultsContainer = document.querySelector("#results");
  resultsContainer.innerHTML = "Searching...";

  const res = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();

  const results = data.organic_results || [];

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  resultsContainer.innerHTML = results
    .map(
      (r) => `
      <div>
        <a href="${r.link}" target="_blank">
          <h3>${r.title}</h3>
        </a>
        <p>${r.snippet}</p>
      </div>
    `
    )
    .join("");
});

