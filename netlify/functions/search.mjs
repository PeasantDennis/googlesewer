import fetch from 'node-fetch';

export async function handler(event, context) {
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No search term provided" }),
    };
  }

  const apiKey = 'YOUR_SERPAPI_KEY'; // replace this with your actual SerpAPI key

  let allResults = [];
  let start = 0;

  for (let page = 0; page < 10; page++) {  // 10 pages x 10 results = 100
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=10&start=${start}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.organic_results && data.organic_results.length > 0) {
      allResults.push(...data.organic_results);
    } else {
      break; // stop if no more results
    }

    start += 10;
  }

  allResults.reverse(); // invert the order

  return {
    statusCode: 200,
    body: JSON.stringify({ inverted_results: allResults }, null, 2), // pretty print
  };
}
