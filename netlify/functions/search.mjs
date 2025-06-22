// Select elements
const flushBtn = document.getElementById("flushBtn");
const searchInput = document.getElementById("searchInput");
const resultsList = document.getElementById("resultsList");

// Oracle buttons
const askCaptOneBtn = document.getElementById("askCaptOne");
const askBotTomBtn = document.getElementById("askBotTom");
const askPepeTreBtn = document.getElementById("askPepeTre");

// Fake search results (until API is connected)
const mockResults = [
    { title: "Mainstream Mouthpiece Says Everything's Fine", link: "#" },
    { title: "Same Story, Different Outlet", link: "#" },
    { title: "Obscure Blog With Contrarian Stats", link: "#" },
    { title: "Research Paper That No One Cited", link: "#" },
    { title: "Satirical Truth-Bomb Disguised as Rant", link: "#" }
];

// Flush function (search simulation)
flushBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) return;

    resultsList.innerHTML = "";
    mockResults.forEach(result => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${result.link}" target="_blank">${result.title}</a>`;
        resultsList.appendChild(li);
    });
});

// Oracle functions (different filters)
askCaptOneBtn.addEventListener("click", () => {
    alert("CAPT.ONE says: 'Truth floats, but so does garbage. Choose wisely.'");
});

askBotTomBtn.addEventListener("click", () => {
    alert("BOT TOM says: 'This one’s all feathers, no substance. Next.'");
});

askPepeTreBtn.addEventListener("click", () => {
    alert("Pepe Tre says: 'Oi, bruz, this one’s cooked. But cooked don’t mean wrong.'");
});
