// Select elements
const askPepeTreBtn = document.getElementById("askPepeTre");
const resultsList = document.getElementById("resultsList");

// Pepe Tre's Fake News Generator
async function generateFakeNews() {
    const results = resultsList.querySelectorAll("li a");
    
    if (results.length < 8) {
        alert("Pepe Tre says: 'Oi, bruz, not enough results to cook up a story. Try another search.'");
        return;
    }

    // Grab the 8th result for the main headline
    const mainHeadline = results[7].textContent;
    const mainLink = results[7].href;

    // Grab the 7th result for inspiration
    const inspirationHeadline = results[6].textContent;

    // Generate a nonsense story
    const fakeStory = `
        <h2>${mainHeadline} - But Worse</h2>
        <p>In a shocking twist, sources claim that "${mainHeadline}" is actually linked to "${inspirationHeadline}". 
        Experts say the connection is undeniable, despite mainstream media refusing to report on it. 
        Pepe Tre, the park-bench philosopher, insists that this is just the tip of the iceberg.</p>
        <p>More details will emerge as neighborhood kids continue their investigation. Stay tuned.</p>
        <p><a href="${mainLink}" target="_blank">Read the original (before it gets deleted)</a></p>
    `;

    // Display the fake news
    const fakeNewsContainer = document.createElement("div");
    fakeNewsContainer.innerHTML = fakeStory;
    fakeNewsContainer.style.background = "#222";
    fakeNewsContainer.style.padding = "15px";
    fakeNewsContainer.style.marginTop = "20px";
    fakeNewsContainer.style.borderLeft = "5px solid #ff00ff";

    document.body.appendChild(fakeNewsContainer);
}

// Trigger Pepe Tre's Fake News Generator
askPepeTreBtn.addEventListener("click", generateFakeNews);
