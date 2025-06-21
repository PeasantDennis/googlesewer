import fetch from 'node-fetch';

export async function handler(event) {
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No search term provided" }),
    };
  }

  const apiKey = 7869dd041ee71d017b26d1bac59b49182cc7e50db168eb3ec9005686b19fcaed 
  let allResults = [];
  let start = 0;

  for (let page = 0; page < 10; page++) {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=10&start=${start}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.organic_results && data.organic_results.length > 0) {
      allResults.push(...data.organic_results);
    } else {
      break;
    }

    start += 10;
  }

  // 🧠 Score and sort
  const scored = applyInversionFilters(allResults).reverse(); // Reverse for sewer effect

  return {
    statusCode: 200,
    body: JSON.stringify({ results: scored }, null, 2),
  };
}

function applyInversionFilters(results) {
  return results.map(result => {
    const url = result.link || '';
    const snippet = (result.snippet || '').toLowerCase();
    const domain = new URL(url).hostname.replace(/^www\./, '');

    let score = 0;

    // 🟡 Ego triggers
    const clickbait = ["you won’t believe", "shocking", "revealed", "secret", "experts say"];
    clickbait.forEach(trigger => { if (snippet.includes(trigger)) score -= 2; });

    // 🔴 Commercial triggers
    const ads = ["buy now", "sponsored", "sale"];
    if (url.includes("/buy/") || url.includes("affiliate") || ads.some(t => snippet.includes(t))) score -= 3;

    // 🔵 Truthy sources
    const goodDomains = ["medium.com", "substack.com", "archive.org", "theconversation.com"];
    if (goodDomains.some(g => domain.endsWith(g))) score += 3;
    if (domain.endsWith('.org') || domain.endsWith('.edu')) score += 2;

    return { ...result, score };
  }).sort((a, b) => b.score - a.score); // Higher score = more truthful
}
