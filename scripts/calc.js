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
    printEffects()
}

function buildSelectedGems() {
    let numSelects = selects.length / 2
    const maxSelects = numSelects

    selectedGems.length = 0

    while(numSelects--) {
        const gemType = selects[numSelects].value
        const gemQuality = selects[maxSelects + numSelects].value

        if(types.indexOf(gemType) == -1) continue
        if(qualities.indexOf(gemQuality) == -1) continue

        selectedGems.push({
            type: gemType,
            quality: qualities.indexOf(gemQuality)
        })
    }
}

function generateEffects() {
    const usedTypes = []

    effects = {}

    for(const gem of selectedGems) {
        const {type, quality} = gem
        const bonus = gems[type]
        let bonuses = bonus.length

        while(bonuses-- > 0) {
            const title = bonus[bonuses].title
            const name = bonus[bonuses].name
            const notation = bonus[bonuses].notation || ""
            let bonus_value = bonus[bonuses].values[quality]
            let effect = effects[title]

            if(effect === undefined) effect = {
                value: 0,
                name: name,
                notation: notation
            }

            if(usedTypes.indexOf(type) > -1) {
                bonus_value = Math.floor(bonus_value / diminishing_factor)
            }
            effect.value += bonus_value
            effects[title] = effect
        }
        usedTypes.push(type)
    }
}

function printEffects() {
    const labels = Object.keys(effects)

    for(const label of labels) {
        if(effects[label].value <= 0) continue

        output.innerHTML += `<p><strong>${label}:</strong> ${effects[label].value}${effects[label].notation}\n`
    }
}
