const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const query = event.queryStringParameters.q;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No search term provided" }),
    };
  }

  const apiKey = "7869dd041ee71d017b26d1bac59b49182cc7e50db168eb3ec9005686b19fcaed"; // Replace this
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${apiKey}&num=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data", details: err.message }),
    };
  }
};

