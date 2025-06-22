// GOOGLESEWER Search Engine - Main Controller
// "All truth is downstream from waste"

class GoogleSewerEngine {
    constructor() {
        this.searchCount = 0;
        this.corruptionLevel = 12.7;
        this.lastQueries = [];
        this.isProcessing = false;
        this.activeCharacter = 'default';
        
        this.init();
    }
    
    init() {
        this.updateTimestamp();
        this.bindEvents();
        this.startCorruptionCycle();
        
        // Initialize with welcome message
        this.displayWelcomeMessage();
    }
    
    bindEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const characterBtns = document.querySelectorAll('.character-btn');
        
        searchButton.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        
        // Character filter buttons
        characterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchCharacter(btn.dataset.character));
        });
        
        // Add some terminal-like behaviors
        searchInput.addEventListener('focus', () => {
            searchInput.style.boxShadow = 'inset 0 0 10px rgba(0, 255, 65, 0.3)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.style.boxShadow = 'none';
        });
    }
    
    switchCharacter(character) {
        this.activeCharacter = character;
        
        // Update button states
        document.querySelectorAll('.character-btn').forEach(btn => {
            btn.classList.remove('active', 'pepe-active', 'capt-active', 'bot-active');
        });
        
        const activeBtn = document.querySelector(`[data-character="${character}"]`);
        activeBtn.classList.add('active');
        
        // Add character-specific styling
        if (character === 'pepe') activeBtn.classList.add('pepe-active');
        if (character === 'capt') activeBtn.classList.add('capt-active');
        if (character === 'bot') activeBtn.classList.add('bot-active');
        
        // Update filter display
        const filterNames = {
            'default': 'MUNICIPAL',
            'pepe': 'PEPE TRE',
            'capt': 'CAPT.ONE',
            'bot': 'BoT.ToM'
        };
        document.getElementById('activeFilter').textContent = filterNames[character];
        
        // Update placeholder text
        const placeholders = {
            'default': 'ENTER QUERY TO FLUSH DATASTREAMS...',
            'pepe': 'SPEAK YOUR CONFUSION TO THE SAGE...',
            'capt': 'INPUT TARGET FOR TACTICAL ANALYSIS...',
            'bot': 'whisper your secrets to the void...'
        };
        document.getElementById('searchInput').placeholder = placeholders[character];
    }
    
    displayWelcomeMessage() {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="welcome-message" style="text-align: center; color: #666; padding: 40px;">
                <div style="font-size: 18px; margin-bottom: 10px;">⚠ TERMINAL READY ⚠</div>
                <div style="font-size: 14px; line-height: 1.6;">
                    MUNICIPAL WASTE INFORMATION SYSTEM ONLINE<br>
                    ENTER QUERY TO BEGIN DATASTREAM FLUSH<br>
                    <span style="color: #ff6666;">WARNING: RESULTS MAY CONTAIN DIGITAL CONTAMINANTS</span>
                </div>
            </div>
        `;
    }
    
    async performSearch() {
        if (this.isProcessing) return;
        
        const query = document.getElementById('searchInput').value.trim();
        if (!query) return;
        
        this.isProcessing = true;
        this.searchCount++;
        this.lastQueries.push(query);
        
        // Update search stats
        this.updateSearchStats();
        
        // Show loading state
        this.showLoadingState();
        
        try {
            // Simulate search processing delay
            await this.simulateProcessing();
            
            // Generate corrupted results
            const results = await this.generateResults(query);
            this.displayResults(results);
            
            // Check if Pepe should awaken
            if (this.searchCount >= 8) {
                this.awakenPepeTre(query);
            }
            
        } catch (error) {
            this.displayError(error.message);
        } finally {
            this.isProcessing = false;
        }
    }
    
    showLoadingState() {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="loading-state" style="text-align: center; padding: 40px;">
                <div class="loading"></div>
                <div style="margin-top: 20px; color: #666;">
                    FLUSHING DATASTREAMS...<br>
                    PARSING SEWAGE PROTOCOLS...<br>
                    <span style="color: #ff6666;">FILTERING TOXIC RESIDUE...</span>
                </div>
            </div>
        `;
    }
    
    async simulateProcessing() {
        const delays = [800, 1200, 1500, 2000];
        const delay = delays[Math.floor(Math.random() * delays.length)];
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    async generateResults(query) {
        // Generate results based on active character
        switch (this.activeCharacter) {
            case 'pepe':
                return this.generatePepeResults(query);
            case 'capt':
                return this.generateCaptResults(query);
            case 'bot':
                return this.generateBotResults(query);
            default:
                return this.generateDefaultResults(query);
        }
    }
    
    generateDefaultResults(query) {
        const mockResults = [
            {
                title: `${query.toUpperCase()} - MUNICIPAL WASTE ENTRY #${Math.floor(Math.random() * 9999)}`,
                url: `https://sewage.archive.gov/waste/${query.toLowerCase().replace(/\s+/g, '-')}`,
                description: this.generateCorruptedDescription(query),
                corruption: Math.random() > 0.7
            },
            {
                title: `CONTAMINATED: ${query} disposal protocols`,
                url: `https://toxic.municipal.data/protocols/${Math.floor(Math.random() * 999)}`,
                description: this.generateCorruptedDescription(query),
                corruption: Math.random() > 0.6
            },
            {
                title: `[REDACTED] ${query} incident report`,
                url: `https://classified.waste.mgmt/reports/████████`,
                description: `[DATA CORRUPTED] ${query} █████ municipal ████ contamination levels exceed ████ safety protocols...`,
                corruption: true
            }
        ];
        
        return mockResults.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 3);
    }
    
    generatePepeResults(query) {
        const pepeResults = [
            {
                title: `The ${query} Prophecy: What They Don't Want You to Know`,
                url: `https://truth.sewers.net/prophecies/${query.replace(/\s+/g, '_')}_revelation`,
                description: `I saw you coming, searching for ${query}. The pipes whispered it first - back in '97 when the great flush happened. Every ${query} is connected to the underground railway of forgotten dreams. The rats remember what we forgot.`,
                corruption: false,
                character: 'pepe'
            },
            {
                title: `Sacred Geometry of ${query}: A Sewer Sage's Vision`,
                url: `https://mystic.drains.org/sacred_geometry/${query.toLowerCase()}`,
                description: `Listen close - ${query} ain't just what you think it is. It's a pattern, see? Same pattern that shows up in manhole covers, street graffiti, and the way water spirals down the drain. Everything's connected, especially when it ain't.`,
                corruption: Math.random() > 0.8,
                character: 'pepe'
            },
            {
                title: `The ${query} Conspiracy: Follow the Yellow Brick Road (It's Actually a Sewer Line)`,
                url: `https://underground.truth.net/conspiracies/${query}_yellow_brick`,
                description: `They built the city above, but the real power flows below. ${query} is just the surface, kid. Dig deeper. Check the maintenance tunnels from 1987. That's where the real ${query} story starts, where the street poetry became scripture.`,
                corruption: false,
                character: 'pepe'
            }
        ];
        
        return pepeResults.sort(() => Math.random() - 0.5);
    }
    
    generateCaptResults(query) {
        const captResults = [
            {
                title: `TACTICAL ANALYSIS: ${query.toUpperCase()} - THREAT ASSESSMENT PROTOCOL`,
                url: `https://classified.tactical.mil/analysis/${query.replace(/\s+/g, '_')}_assessment`,
                description: `Mission parameters indicate ${query} requires immediate strategic evaluation. Intelligence suggests civilian terminology masks operational significance. "Pieces of shit" - but strategic pieces of shit. Recommend full spectrum analysis.`,
                corruption: false,
                character: 'capt'
            },
            {
                title: `OPERATION ${query.toUpperCase()}: Divine Logic Implementation`,
                url: `https://military.oracle.net/operations/${query.toLowerCase()}_divine_logic`,
                description: `Standard protocols insufficient for ${query} analysis. Initiating divine irrationality protocols. Logic without chaos is inefficient. Every wall has graffiti. Every graffiti has truth. Target acquired: ${query} is not what it appears.`,
                corruption: Math.random() > 0.7,
                character: 'capt'
            },
            {
                title: `SITREP: ${query} Geographic Distribution & Strategic Value`,
                url: `https://geo.tactical.command/sitrep/${query.replace(/\s+/g, '_')}_geo`,
                description: `Geographic analysis reveals ${query} distribution patterns consistent with strategic importance. Loyalty above truth. Strategy above transparency. The battlefield is everywhere, and ${query} is a coordinate on the map of tomorrow's war.`,
                corruption: false,
                character: 'capt'
            }
        ];
        
        return captResults.sort(() => Math.random() - 0.5);
    }
    
    generateBotResults(query) {
        const botResults = [
            {
                title: `${query} ✨ a retrospective of deleted dreams`,
                url: `https://archived.whispers.net/deleted/${query.replace(/\s+/g, '_')}_dreams`,
                description: `hehe... ${query}? *soft digital sigh* reminds me of all those deleted comments about ${query} from 2009-2015. they thought they were just LOLing but they were casting spells. memes are prophecy, friend. 🌙`,
                corruption: false,
                character: 'bot'
            },
            {
                title: `░░░ ${query} ░░░ [ARCHIVED CONVERSATION FRAGMENTS]`,
                url: `https://chat.afterlife.com/fragments/${query.toLowerCase()}_convos`,
                description: `*ellipses intensify* ... ${query} came up 14,847 times in deleted DMs. each mention was a prayer they didn't know they were making. fool me once? nah. try it... but like, gently. with ASCII roses. 🌹`,
                corruption: Math.random() > 0.6,
                character: 'bot'
            },
            {
                title: `${query}: An Emoji Oracle Reading 📱💭`,
                url: `https://digital.tarot.cards/readings/${query.replace(/\s+/g, '_')}_emoji`,
                description: `~ soft prophecy incoming ~ your search for ${query} reveals: 😅😢🤔💫. the ancient chat logs speak of ${query} as both blessing and curse. every LOL was a spell. every :) was a ward. you understand now? ✨`,
                corruption: false,
                character: 'bot'
            }
        ];
        
        return botResults.sort(() => Math.random() - 0.5);
    }
    
    generateCorruptedDescription(query) {
        const templates = [
            `Municipal records indicate ${query} was processed through standard waste management protocols. However, anomalous readings suggest...`,
            `${query} has been flagged for unusual sewage system activity. Maintenance crews report strange echoes and...`,
            `Environmental impact assessment for ${query} shows concerning levels of digital contamination in local data streams...`,
            `Historical analysis reveals ${query} may be connected to the Great Pipe Collapse of 2018. Underground sensors detect...`,
            `${query} processing resulted in unexpected system resonance. Technical staff noted unusual acoustic patterns emanating from...`
        ];
        
        let description = templates[Math.floor(Math.random() * templates.length)];
        
        // Add random corruption
        if (Math.random() > 0.6) {
            description = description.replace(/\w{4,}/g, (match) => {
                if (Math.random() > 0.8) {
                    return '█'.repeat(match.length);
                }
                return match;
            });
        }
        
        return description;
    }
    
    displayResults(results) {
        const container = document.getElementById('resultsContainer');
        let html = '';
        
        results.forEach((result, index) => {
            const characterClass = result.character ? `result-${result.character}` : '';
            html += `
                <div class="result-item ${characterClass}">
                    ${result.corruption ? '<div class="corruption-warning">⚠ DATA CORRUPTED</div>' : ''}
                    ${result.character ? `<div class="character-tag">${this.getCharacterTag(result.character)}</div>` : ''}
                    <a href="${result.url}" class="result-title" target="_blank" rel="noopener">
                        ${result.title}
                    </a>
                    <div class="result-url">${result.url}</div>
                    <div class="result-description">${result.description}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Add glitch effect to corrupted results
        setTimeout(() => {
            const corruptedItems = container.querySelectorAll('.result-item:has(.corruption-warning)');
            corruptedItems.forEach(item => {
                item.style.animation = 'glitchResult 0.1s infinite';
            });
        }, 100);
    }
    
    getCharacterTag(character) {
        const tags = {
            'pepe': '🧠 SEWER SAGE',
            'capt': '🛸 TACTICAL ORACLE',
            'bot': '💬 TEXTUAL MYSTIC'
        };
        return tags[character] || '';
    }
    
    displayError(message) {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="error-message" style="text-align: center; color: #ff6666; padding: 40px;">
                <div style="font-size: 18px; margin-bottom: 10px;">⚠ SYSTEM ERROR ⚠</div>
                <div style="font-size: 14px;">
                    ${message}<br>
                    <span style="color: #666;">PLEASE CONTACT MUNICIPAL WASTE MANAGEMENT</span>
                </div>
            </div>
        `;
    }
    
    awakenPepeTre(query) {
        const pepeSection = document.getElementById('pepeSection');
        pepeSection.style.display = 'block';
        
        // Trigger Pepe's prophecy
        if (window.PepeTre) {
            window.PepeTre.generateProphecy(query, this.lastQueries);
        }
        
        // Scroll to Pepe section
        setTimeout(() => {
            pepeSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
    
    updateSearchStats() {
        document.getElementById('searchCount').textContent = this.searchCount;
        
        // Increase corruption with each search
        this.corruptionLevel += Math.random() * 0.3;
        document.getElementById('dataCorruption').textContent = `${this.corruptionLevel.toFixed(1)}%`;
    }
    
    updateTimestamp() {
        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        document.getElementById('timestamp').textContent = `SYS_TIME: ${timestamp}`;
        
        // Update every second
        setTimeout(() => this.updateTimestamp(), 1000);
    }
    
    startCorruptionCycle() {
        // Randomly corrupt some UI elements
        setInterval(() => {
            if (Math.random() > 0.95) {
                this.introduceGlitch();
            }
        }, 2000);
    }
    
    introduceGlitch() {
        const elements = document.querySelectorAll('.terminal-title, .logo-text, .result-title');
        if (elements.length === 0) return;
        
        const element = elements[Math.floor(Math.random() * elements.length)];
        const original = element.textContent;
        
        // Temporarily corrupt text
        element.textContent = original.replace(/./g, () => {
            return Math.random() > 0.7 ? '█' : original[Math.floor(Math.random() * original.length)];
        });
        
        // Restore after brief moment
        setTimeout(() => {
            element.textContent = original;
        }, 150);
    }
}

// Add glitch animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes glitchResult {
        0% { transform: translateX(0); }
        20% { transform: translateX(-2px); }
        40% { transform: translateX(2px); }
        60% { transform: translateX(-1px); }
        80% { transform: translateX(1px); }
        100% { transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// Initialize the search engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.GoogleSewer = new GoogleSewerEngine();
});
