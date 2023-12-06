import DECK_SERVICES from "../services/deckServices.mjs";

class GlobalDecks {
    constructor() {
        this.decks = new Map();
    }

    static getInstance() {
        if (!GlobalDecks.instance) {
            GlobalDecks.instance = new GlobalDecks();
        }
        return GlobalDecks.instance;
    }

    getCurrentDecks() {
        return this.decks;
    }

    getDeckByName(name) {
        return this.decks.get(name);
    }

    addDeck(name, cards) {
        console.log("inside add deck on globals");
        let formData = new FormData();
        console.log("cards: ", cards);
        formData.append("name", name);
        cards.forEach((card, index) => {
            formData.append(`cards[${index}][front][text]`, card.front.text);
            formData.append(`cards[${index}][front][blob]`, card.front.blob);
            formData.append(`cards[${index}][back]`, card.back);
        });

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        DECK_SERVICES.postDecks(formData);
    }

    clearDecks() {
        this.decks.clear();
    }

    removeDeck(name) {
        this.decks.delete(name);
    }
}
const DECK_GLOBALS = GlobalDecks.getInstance();
export default DECK_GLOBALS;
