/**
 * I wrote this class to encapsulate the functionality of a deck.
 */
export default class Deck {
    constructor(name = "", cards = []) {
        this.name = name;
        this.cards = cards;
    }

    /**
     * I wrote this method to grab the current card count.
     */
    get currentCardCount() {
        return this.cards.length;
    }

    /**
     * I wrote this method to grab the current name.
     */
    get Name() {
        return this.name;
    }

    /**
     * I wrote this method to grab the current cards.
     */
    get Cards() {
        return this.cards;
    }

    /**
     * I wrote this method to add a card to the back of the Cards array.
     */
    addCard(card) {
        this.cards.push(card);
        return card;
    }

    /**
     * I wrote this method to set the name.
     */
    setName(name) {
        this.name = name + " Deck";
        return this.name;
    }

    /**
     * I wrote this method to remove the last card from the Cards array via pop().
     */
    removeLastCard() {
        return this.cards.pop();
    }

    /**
     * I wrote thie method to completely clear the deck.
     */
    clearDeck() {
        this.cards = [];
    }
}
