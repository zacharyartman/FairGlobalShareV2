// format personName : [items]
let persons = {};
// format item : price
let items = {};
// format item : pricePerPerson
let itemPricePerPerson = {};
// format personName : amountOwed
let owedPerPerson = {};

let rowCount = 0;

document.getElementById('add-person-button').onclick = addPerson;

function addPerson() {
    let nameInput = document.getElementById("name");
    let name = nameInput.value;
    persons[name] = [];
    nameInput.value = '';

    addOneCheckboxPerRow(name);
}

function addItem(name, price) {
    items[name] = price;
}


document.getElementById('add-row-button').onclick = addRow;

// WORKS
function getItemPricePerPerson() {
    for (let itemName in items) {
        let count = 0;
        let price = items[itemName];

        for (let personName in persons) {
            if (persons[personName].includes(itemName)) {
                count ++;
            }
        }
        itemPricePerPerson[itemName] = (price) / count;
    }
}

// WORKS
function getIndividualPricesOwed() {
    getItemPricePerPerson();
    for (let personName in persons) { 
        let totalOwed = 0;
        let personItems = persons[personName];
        for (let i = 0; i < personItems.length; i++) {
            itemName = personItems[i];
            totalOwed += itemPricePerPerson[itemName];
        }
        owedPerPerson[personName] = totalOwed;
    }
}

function getCheckBoxesString(row) {
    var checkboxesString = "";
    for (let personName in persons) {
        let checkboxID = `row${row}-${personName}`
        checkboxesString += `<div><input type="checkbox" id="${checkboxID}" name="${personName}">`;
        checkboxesString += `<label for="${checkboxID}">${personName}</label></div>`;
    }
    return checkboxesString;
}

function getOneCheckboxElement(personName, row) {
    let checkboxID = `row${row}-${personName}`;

    // Create checkbox input
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = checkboxID;
    checkbox.name = personName;

    // Create label
    let label = document.createElement('label');
    label.htmlFor = checkboxID;
    label.textContent = personName;

    // Create a container for checkbox and label
    let container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(label);

    return container;
}

function addOneCheckboxPerRow(personName) {
    for (let row = 1; row < rowCount + 1; row++) {
        let container = getOneCheckboxElement(personName, row);
        document.getElementById(`row${row}-shared-by`).appendChild(container);
    }
}

function addRow() {
    rowCount++;
    let rowID = `table-row${rowCount}`;

    const receiptTableBody = document.querySelector('.receipt-section table');
    // create row in the table
    let newRow = document.createElement('tr');
    newRow.id = rowID;

    // create an input for name with id = rowrowCount-item-text-field
    let itemNameCell = document.createElement('td');
    itemNameCell.className = 'item';
    let itemNameInput = document.createElement('input');
    itemNameInput.type = 'text';
    itemNameInput.className = 'item-text-field';
    itemNameInput.placeholder = 'ex: Filet Mignon';
    itemNameInput.id = `row${rowCount}-item-text-field`;
    itemNameCell.appendChild(itemNameInput);

    // create an input for price = rowrowCount-price-field
    let priceCell = document.createElement('td');
    priceCell.className = 'price';
    let priceSymbolSpan = document.createElement('span');
    // TODO: CHANGE TO EURO/CURRENCY SYMBOL
    priceSymbolSpan.textContent = '$'
    let priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.id = `row${rowCount}-price-field`;
    priceInput.className = 'price-field'
    priceInput.placeholder = 'ex: 35.00';
    priceCell.appendChild(priceSymbolSpan);
    priceCell.appendChild(priceInput);
    // add the checkboxes
    let sharedByCell = document.createElement('td');
    sharedByCell.className = 'shared-by';
    sharedByCell.id = `row${rowCount}-shared-by`;
    sharedByCell.innerHTML = getCheckBoxesString(rowCount);

    newRow.appendChild(itemNameCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(sharedByCell);

    receiptTableBody.appendChild(newRow);
}

function test() {
    addItem("steak", 20);
    addItem('chicken', 10);
    persons["Zach"] = ["steak"];
    persons["Hayden"] = ["chicken"];
    getIndividualPricesOwed();
    console.log(owedPerPerson);
}

// ADD ONE ROW ON INITIALIZATION
addRow();