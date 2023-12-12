/**
 * I wrote this import statement.
 */
import DECK_SERVICES from "../services/deckServices.mjs";

/**
 * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
 *
 * I had never written a singleton class before. This class was
 * an introduction to learning how to write one in javascript.
 */
class GlobalDecks {
    constructor() {
        this.decks = new Map();
    }

    /**
     * I wrote this method with guidance from chatgpt. It instantiates a static method.
     * Static methods of a class are available outside the object instance of a class and operate
     * on the class itself. This method checks to see if an instance attribute exists for the class.
     * If it does not, then it returns a new instance. Otherwise it returns the current instance.
     */
    static getInstance() {
        if (!GlobalDecks.instance) {
            GlobalDecks.instance = new GlobalDecks();
        }
        return GlobalDecks.instance;
    }

    /**
     * I wrote this method to provide a way to access decks from the backend api.
     */
    getCurrentDecks() {
        return this.decks;
    }

    /**
     * I wrote thie method to grab a deck by name. I don't use this method in the code.
     */
    getDeckByName(name) {
        return this.decks.get(name);
    }

    /**
     * [4] [1] MozDevNet, “Using FormData objects - web apis: MDN,”
     * MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects.
     *
     * In conjunction with the above source, I wrote this method to append for each card
     * in the cards array a collection based on the index of the card and then by breaking the card into
     * its constituent parts.
     *
     * This method then uses the formData.entries method which exposes the collection
     * and logs them to the console. I commented this function out.
     *
     * It then calls the post method of the DECK_SERVICES singleton to make a request to the backend
     * server.
     */
    addDeck(name, cards) {
        let formData = new FormData();
        formData.append("name", name);
        cards.forEach((card, index) => {
            formData.append(`cards[${index}][front][text]`, card.front.text);
            formData.append(`cards[${index}][front][blob]`, card.front.blob);
            formData.append(`cards[${index}][back]`, card.back);
        });

        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        DECK_SERVICES.postDecks(formData);
    }

    /**
     * I wrote this method to clear the current decks.
     */
    clearDecks() {
        this.decks.clear();
    }
}
/**
 * The below assignment instantiates the singleton instance and then exports it.
 */
const DECK_GLOBALS = GlobalDecks.getInstance();
export default DECK_GLOBALS;
