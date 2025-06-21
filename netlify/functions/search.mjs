import fetch from 'node-fetch';

export async function handler(event, context) {
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No search term provided" }),
    };
  }

  const apiKey = '7869dd041ee71d017b26d1bac59b49182cc7e50db168eb3ec9005686b19fcaed';

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

  allResults.reverse();

  return {
    statusCode: 200,
    body: JSON.stringify({ inverted_results: allResults }, null, 2),
  };
}

