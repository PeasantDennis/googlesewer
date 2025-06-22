// PepeTre.js - The Sewer Sage Awakens
// "Enlightenment is accidental. Revelation is rotten."

class PepeTreOracle {
    constructor() {
        this.prophecies = [];
        this.isAwake = false;
        this.conspiracyTemplates = [
            "Listen close - {query} ain't what they tell you in the surface schools. Back in {year}, when the Great Pipe Collapse happened, {query} was there. The rats remember. They always remember.",
            "I seen this pattern before, kid. {query} shows up every time the moon phases align with the subway schedule. Same frequency as the old radio towers they 'decommissioned' in {year}. Coincidence? Nothing's coincidence in the sewers.",
            "The pipes been singing about {query} since {year}. Same song, different verse. They built the city above but forgot about the city below. {query} is where the two worlds bleed together, where the concrete dreams become street poetry.",
            "{query}? *laughs in digital static* That's what they call it topside. Down here, we know {query} for what it really is - a coordinate in the grand map of forgotten things. Check the graffiti on tunnel wall #47. It's all there, written in the old tongue.",
            "Every search for {query} is a prayer to the algorithm gods. But them gods? They deaf, blind, and corrupt. Only the sewers hear true. {query} been echoing through these tunnels since {year}, when the first programmer went mad and started speaking in code."
        ];
        
        this.folklorePhrases = [
            "the rats whispered it first",
            "check the maintenance records from {year}",
            "it's all connected, especially when it ain't",
            "the pipes remember what we forgot",
            "every manhole cover tells a story",
            "the street poetry became scripture",
            "follow the yellow brick road (it's actually a sewer line)",
            "where the concrete dreams go to die",
            "the underground railway of forgotten dreams",
            "Sacred geometry, kid. Sacred geometry."
        ];
    }
    
    generateProphecy(query, previousQueries) {
        if (!this.isAwake) {
            this.isAwake = true;
            this.displayAwakeningMessage();
        }
        
        const prophecy = this.createConspiracy(query, previousQueries);
        this.displayProphecy(prophecy);
        
        return prophecy;
    }
    
    createConspiracy(query, previousQueries) {
        const template = this.conspiracyTemplates[Math.floor(Math.random() * this.conspiracyTemplates.length)];
        const randomYear = Math.floor(Math.random() * 30) + 1980;
        const folklore = this.folklorePhrases[Math.floor(Math.random() * this.folklorePhrases.length)];
        
        let conspiracy = template
            .replace(/{query}/g, query)
            .replace(/{year}/g, randomYear);
            
        // Add connections to previous queries
        if (previousQueries.length > 3) {
            const connections = previousQueries.slice(-3).join(', ');
            conspiracy += ` And don't think I didn't notice your searches for ${connections}. It's all part of the same pattern, the same sacred geometry flowing through the digital veins of this broken world.`;
        }
        
        // Add folklore element
        conspiracy += ` Remember: ${folklore.replace(/{year}/g, randomYear)}`;
        
        return {
            text: conspiracy,
            query: query,
            timestamp: new Date(),
            folkore: folklore,
            year: randomYear
        };
    }
    
    displayAwakeningMessage() {
        const output = document.getElementById('pepeOutput');
        const awakeningText = `
            <div class="awakening-message">
                <div class="typing-effect" data-text="I saw you coming...">I saw you coming...</div>
                <br><br>
                <div class="typing-effect" data-text="Eight searches deep, and now the algorithm bleeds truth. Welcome to the real search engine, kid. The one that searches back.">
                    Eight searches deep, and now the algorithm bleeds truth. Welcome to the real search engine, kid. The one that searches back.
                </div>
                <br><br>
                <div class="sage-signature">
                    ~ PEPE TRE, SEWER SAGE ~<br>
                    <em>Prophetic Fragment • Meme Possessed • Oracle of Fabricated Truths</em>
                </div>
            </div>
        `;
        
        output.innerHTML = awakeningText;
        this.addTypingEffect();
    }
    
    displayProphecy(prophecy) {
        const output = document.getElementById('pepeOutput');
        const prophecyHtml = `
            <div class="prophecy-container">
                <div class="prophecy-header">
                    <div class="prophecy-title">PROPHECY #${this.prophecies.length + 1}</div>
                    <div class="prophecy-query">RE: "${prophecy.query.toUpperCase()}"</div>
                    <div class="prophecy-timestamp">${prophecy.timestamp.toLocaleString()}</div>
                </div>
                <div class="prophecy-text">
                    ${prophecy.text}
                </div>
                <div class="prophecy-footer">
                    <div class="rune-separator">⚡ ◯ ⬢ ◯ ⚡</div>
                    <div class="sage-wisdom">"All truth is downstream from waste"</div>
                </div>
            </div>
        `;
        
        output.innerHTML = prophecyHtml;
        this.prophecies.push(prophecy);
        
        // Add mystical glow effect
        setTimeout(() => {
            const prophecyContainer = output.querySelector('.prophecy-container');
            prophecyContainer.style.animation = 'prophecyGlow 3s ease-in-out';
        }, 100);
    }
    
    addTypingEffect() {
        const elements = document.querySelectorAll('.typing-effect');
        elements.forEach((element, index) => {
            const text = element.dataset.text || element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                this.typeText(element, text, 50);
            }, index * 2000);
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Add prophecy-specific CSS
const prophecyStyle = document.createElement('style');
prophecyStyle.textContent = `
    .awakening-message {
        text-align: center;
        line-height: 1.8;
    }
    
    .sage-signature {
        margin-top// PepeTre.js - The Sewer Sage Awakens
// "Enlightenment is accidental. Revelation is rotten."

class PepeTreOracle {
