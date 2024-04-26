const main = document.getElementById("main")
let max_gems = 12

createPaster()
createTable()

function createPaster() {
    const paster = document.getElementById("paster")
    let output = ""

    output = `
    <div><h2>Paste your gems here</h2></div>
    <div><textarea id="pasted"></textarea></div>
    <span><button class="button pastebutton" id="confirmpaste" onclick='paste()'>📋 Confirm Paste</button></span>
    <span><button class="button pastebutton" id="cancelpaste" onclick='cancelpaste()'>✖️ Cancel Paste</button></span>
    `

    paster.innerHTML = output
}

function showpaste() {
    const paster = document.getElementById("paster")
    paster.style.display = "block"
    pasted.focus()
}

function cancelpaste() {
    const paster = document.getElementById("paster")
    paster.style.display = "none"

    const pastedElement = document.getElementById("pasted")
    pastedElement.value = ""
    paster.blur()
}

function paste() {
    const pastedElement = document.getElementById("pasted");
    const lines = pastedElement.value.split("\n");

    pastedElement.value = "";  // Clear the textarea
    document.getElementById("paster").style.display = "none";  // Hide the container
    document.getElementById("paster").blur();  // Remove focus from the container

    const qualityRegex = qualities.join("|");
    const typeRegex = types.join("|");
    const gemRegex = new RegExp(`(${qualityRegex}) (${typeRegex})`);

    const filtered = lines.filter((line) => line.match(gemRegex));

    if (filtered.length > max_gems) {
        max_gems = filtered.length;
        createTable();
    }

    const selects = document.getElementsByTagName("select"); // Re-fetch selects after table creation
    let num = 0;

    for (const select of selects) {
        select.value = "none"; // Clear all selects
    }

    const gemData = filtered.map((line) => {
        const match = line.match(gemRegex);
        return [match[1], match[2]];
    });

    debug.innerHTML = JSON.stringify(gemData);

    // Populate the selects with the gem data
    gemData.forEach((gem, index) => {
        if (index < max_gems) {
            const qualitySelect = selects[index * 2]; // Assuming quality is first in each group
            const typeSelect = selects[index * 2 + 1]; // Assuming type is second

            qualitySelect.value = gem[0];
            typeSelect.value = gem[1];
        }
    });

    gemUpdated();
}

function createTable() {
    let output = "";
    let max = max_gems;

    output += `<div class="flex-container">`;  // Start of flex container

    for (let num = 1; num <= max; num++) {
        const qualitydrops =
            `<option value='none'>none</option>` +
            qualities.reduce((acc, curr) => `${acc}<option value='${curr}'>${capitalize(curr)}</option>`, "");

        const typedrops =
            `<option value='none'>none</option>` +
            types.reduce((acc, curr) => `${acc}<option value='${curr}'>${capitalize(curr)}</option>`, "");

        output += `<div class="gem-group">
                      <div class="label">Bloodjewel ${num}</div>
                      <select class="select quality-select" onchange='gemUpdated()' name='quality${num}'>${qualitydrops}</select>
                      <select class="select type-select" onchange='gemUpdated()' name='type${num}'>${typedrops}</select>
                   </div>`;
    }

    output += `</div>`;  // End of flex container

    document.getElementById("main").innerHTML = output;  // Assuming `main` is the ID of your container div
}


function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}
