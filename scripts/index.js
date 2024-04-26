// const debug = document.getElementById("debug")

createPaster()
createTable()

function createPaster() {
    const paster = document.getElementById("paster")
    let output = ""

    output += "<button onclick='paste()'>Paste</button>"
    output += "<textarea id='pasted'></textarea>"

    paster.innerHTML = output
}

function paste() {
    const pasted = document.getElementById("pasted").value
    const lines = pasted.split("\n")
    const selects = document.getElementsByTagName("select")
    let num = 0

    // remove any lines that do not look like
    // Jewel Slot 1:  imperfect cerebral bloodjewel
    // Jewel Slot 2:  imperfect cerebral bloodjewel
    // Jewel Slot 3:  imperfect devout bloodjewel
    // Jewel Slot 4:  imperfect devout bloodjewel
    // Jewel Slot 5:  imperfect bellicose bloodjewel
    // Jewel Slot 6:  polished mercantile bloodjewel

    const filtered = lines.filter((line) => {
        return line.match(/Jewel Slot \d+:  (imperfect|polished|flawless|perfect|luminous|wondrous) (bellicose|catalytic|cerebral|devout|ensorcelled|enthralling|fanatical|mercantile|necromantic|perfidious|savage) bloodjewel/)
    })

    // clear all selects
    for(const select of selects) {
        select.value = "none"
    }

    // Use regex to extract the gem quality and type from each line using the
    // map function to create an array of arrays
    const gemData = filtered.map((line) => {
        const match = line.match(/Jewel Slot \d+:  (imperfect|polished|flawless|perfect|luminous|wondrous) (bellicose|catalytic|cerebral|devout|ensorcelled|enthralling|fanatical|mercantile|necromantic|perfidious|savage) bloodjewel/)
        return [match[1], match[2]]
    })

    debug.innerHTML = JSON.stringify(gemData)

    // Populate the selects with the gem data
    for(const gem of gemData) {
        const quality = gem[0]
        const type = gem[1]
        const qualityIndex = qualities.indexOf(quality)
        const typeIndex = types.indexOf(type)

        selects[num].value = qualities[qualityIndex]
        selects[num + 8].value = types[typeIndex]

        num++
    }

    gemUpdated()
}

function createTable() {
    let output = ""
    let num = 1, max = 8

    output = "<table>"

    // Headers
    output += "<tr>"
    do {
        output += `<th>Gem ${num}</th>`
    } while(++num <= max)
    output += "</tr>"

    // Gem qualities
    num = 1
    output += "<tr>"
    const qualitydrops =
        `<option value='none'>none</option>` +
        qualities.reduce((acc, curr) => `${acc}<option value=${curr}>${capitalize(curr)}</option>`, "")

    do {
        output += `<td><select onchange='gemUpdated()' name='quality${num}'>${qualitydrops}</select></td>`
    } while (++num <= max)
    output += "</tr>"

    // Gem types
    num = 1
    output += "<tr>"
    const typedrops =
        `<option value='none'>none</option>` +
        types.reduce((acc, curr) => `${acc}<option value=${curr}>${capitalize(curr)}</option>`, "")

    do {
        output += `<td><select onchange='gemUpdated()' name='type${num}'>${typedrops}</select></td>`
    } while(++num <= max)
    output += "</tr>"

    // Write the table to the document
    document.getElementById("main").innerHTML = output
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
