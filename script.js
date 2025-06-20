
async function search() {
  const query = document.getElementById('query').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '<p>Flushing...</p>';

  const response = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=7869dd041ee71d017b26d1bac59b49182cc7e50db168eb3ec9005686b19fcaed`);
  const data = await response.json();

  if (!data.organic_results) {
    resultsDiv.innerHTML = '<p>No results or API limit reached.</p>';
    return;
  }

  const reversed = data.organic_results.reverse();
  resultsDiv.innerHTML = '';

  reversed.forEach(result => {
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = `<a href="${result.link}" target="_blank"><h3>${result.title}</h3></a><p>${result.snippet || ''}</p>`;
    resultsDiv.appendChild(div);
  });
}
