const main = document.getElementById("main")
let max_gems = 2

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

    // Compose a regex comprised of all of the gem qualities and types for parsing
    // the lines
    const qualityRegex = qualities.join("|")
    const typeRegex = types.join("|")
    const gemRegex = new RegExp(`(${qualityRegex}) (${typeRegex})`)


    const filtered = lines.filter((line) => {
        return line.match(gemRegex)
    })

    // Do we have more than the max_gems? If so, update the max_gems
    // and redraw the table
console.info(`Length: ${filtered.length}, Max: ${max_gems}`)
    if(filtered.length > max_gems) {
        document.getElementById("spinner").value = filtered.length
        max_gems = filtered.length
        createTable()
        console.info(`Max gems updated to ${max_gems}`)
    }

    // clear all selects
    for(const select of selects) {
        select.value = "none"
    }

    // Use regex to extract the gem quality and type from each line using the
    // map function to create an array of arrays
    const gemData = filtered.map((line) => {
        const match = line.match(gemRegex)
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
        selects[num + max_gems].value = types[typeIndex]

        num++
    }

    gemUpdated()
}

function createTable() {
    let output = ""
    let num = 1, max = max_gems

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
    main.innerHTML = output
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

document.getElementById("spinner").addEventListener("change", function () {
    const newValue = parseInt(this.value, 10) // Convert the value from string to number

    if (newValue >= 2 && newValue <= 15) {
        max_gems = newValue // Update the global variable max_gems
        createTable();       // Call the function to redraw the table
    } else {
        console.error("Invalid number of gems: ", newValue)
    }

    resetGems()
    document.getElementById("output").innerHTML = ""
});
