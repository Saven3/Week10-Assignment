class Card {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Deck {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.cards = [];
    }


addCard(card) {
    this.cards.push(card);
}

deleteCard(card) {
    let index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
    }
}

let decks = [];
let deckId = 0;

onClick('new-deck', () => {
    decks.push(new Deck(deckId++, getValue('new-deck-name')));
    drawDOM();
});


function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let deckDiv = document.getElementById('decks');
    clearElement(deckDiv);
    for (Deck of decks) {
       let table = createDeckTable(Deck);
       let title = document.createElement('h2');
       title.innerHTML = Deck.name;
       title.appendChild(createDeckDeleteButton(Deck));
       deckDiv.appendChild(title);
       deckDiv.appendChild(table);
       for (card of Deck.cards) {
        createCardRow(Deck, table, card);
       } 
    }
}

function createCardRow(deck, table, card) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = card.name;
    row.insertCell(1).innerHTML = card.type;
    row.insertCell(2).innerHTML = card.color;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(deck, card));
}

function createDeleteRowButton(deck, card) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark text-danger border-danger';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = deck.cards.indexOf(card);
        deck.cards.splice(index, 1);
        drawDOM();
    };

    return btn;
}

function createDeckDeleteButton(deck) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark text-danger border-danger';
    btn.innerHTML = 'Delete Deck';
    btn.onclick = () => {
        let index = decks.indexOf(deck);
        decks.splice(index, 1);
        drawDOM();
    };

    return btn;
}

function createNewCardButton(deck) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-dark text-danger border-danger';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        deck.addCard(new Card(getValue(`name-input-${deck.id}`), getValue(`type-input-${deck.id}`), getValue(`color-input-${deck.id}`)));
        drawDOM();
    };

    return btn;
}

function createDeckTable(deck) {
    let table = document.createElement('table');
    table.setAttribute('class', 'text-danger table table-dark table-striped table-hover');

    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let typeColumn = document.createElement('th');
    let colorColumn = document.createElement('th');

    nameColumn.innerHTML = 'Name';
    typeColumn.innerHTML = 'Type';
    colorColumn.innerHTML = 'Color';

    row.appendChild(nameColumn);
    row.appendChild(typeColumn);
    row.appendChild(colorColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let typeTh = document.createElement('th');
    let colorTh = document.createElement('th');
    let createTh = document.createElement('th');

    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${deck.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');

    let typeInput = document.createElement('input');
    typeInput.setAttribute('id', `type-input-${deck.id}`);
    typeInput.setAttribute('type', 'text');
    typeInput.setAttribute('class', 'form-control');

    let colorInput = document.createElement('input');
    colorInput.setAttribute('id', `color-input-${deck.id}`);
    colorInput.setAttribute('type', 'text');
    colorInput.setAttribute('class', 'form-control');

    let newCardButton = createNewCardButton(deck);
    nameTh.appendChild(nameInput);
    typeTh.appendChild(typeInput);
    colorTh.appendChild(colorInput);
    createTh.appendChild(newCardButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(typeTh);
    formRow.appendChild(colorTh);
    formRow.appendChild(createTh);

    return table;


}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}