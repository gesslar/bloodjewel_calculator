const output = document.getElementById("output")
const debug = document.getElementById("debug")
const selects = document.getElementsByTagName("select")
const selectedGems = []
let effects = {}

function gemUpdated() {
    output.innerHTML = ""
    debug.innerHTML = ""

    buildSelectedGems()
    generateEffects()
    floorValues()
    printEffects()
}

function resetGems() {
    selectedGems.length = 0
    effects = {}

    generateEffects()
}

function buildSelectedGems() {
    let numSelects = selects.length / 2
    const maxSelects = numSelects

    selectedGems.length = 0

    while(numSelects--) {
        const gemType = selects[maxSelects + numSelects].value
        const gemQuality = selects[numSelects].value

        if(types.indexOf(gemType) == -1) continue
        if(qualities.indexOf(gemQuality) == -1) continue

        selectedGems.push({
            type: gemType,
            quality: qualities.indexOf(gemQuality)
        })
    }
}

function generateEffects() {
    effects = {};
    let allBonuses = {};

    // First, gather all bonuses for each type
    selectedGems.forEach(gem => {
        const { type, quality } = gem;
        const bonuses = gems[type];

        bonuses.forEach(bonus => {
            const { title, values } = bonus;
            if (!allBonuses[title]) {
                allBonuses[title] = [];
            }
            allBonuses[title].push(values[quality]);
        });
    });

    // Now process each type of bonus with diminishing returns
    Object.keys(allBonuses).forEach(title => {
        const values = allBonuses[title];
        if (values.length === 0) return;

        // Sort values from highest to lowest
        values.sort((a, b) => b - a);

        const mainValue = values[0]; // The highest value, no diminishing returns applied
        let totalValue = mainValue;

        if (values.length > 1) {
            // Apply diminishing returns to the sum of the remaining values
            const remainder = values.slice(1);
            const diminishedSum = remainder.reduce((acc, val) => acc + val, 0) / diminishing_factor;

            totalValue += diminishedSum;
        }

        // Ensure we have initial setup for this effect in the main effects object
        if (!effects[title]) {
            effects[title] = {
                value: 0,
                name: gems[selectedGems[0].type][0].name, // Assuming name and notation are consistent per title
                notation: gems[selectedGems[0].type][0].notation || ""
            };
        }

        effects[title].value += totalValue;
    });
}

function floorValues() {
    for(const label in effects) {
        effects[label].value = Math.floor(effects[label].value)
    }

}

function printEffects() {
    const labels = Object.keys(effects)

    labels.sort()

    for(const label of labels) {
        if(effects[label].value <= 0) continue

        output.innerHTML += `<p><strong>${label}:</strong> ${effects[label].value}${effects[label].notation}\n`
    }
}
