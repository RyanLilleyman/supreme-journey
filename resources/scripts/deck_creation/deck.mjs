export default class Deck {
    constructor() {
        this.name = "";
        this.cards = [];
    }

    get currentCardCount() {
        return this.cards.length;
    }

    get Name() {
        return this.name;
    }

    get Cards() {
        return this.cards;
    }

    addCard(card) {
        this.cards.push(card);
        return card;
    }

    setName(name) {
        this.name = name + " Deck";
        return this.name;
    }

    removeLastCard() {
        return this.cards.pop();
    }

    clearDeck() {
        this.cards = [];
    }
}
