function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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

    // Gem qualities
    num = 1
    output += "<tr>"
    const qualitydrops =
        `<option value='none'>none</option>` +
        qualities.reduce((acc, curr) => `${acc}<option value=${curr}>${capitalize(curr)}</option>`, "")

    do {
        output += `<td><select onchange='gemUpdated()' name='quality${num}'>${qualitydrops}</select></td>`
    } while(++num <= max)
    output += "</tr>"

    // Write the table to the document
    document.getElementById("main").innerHTML = output
}

createTable()
