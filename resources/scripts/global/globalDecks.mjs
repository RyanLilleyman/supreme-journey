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
     * I wrote this method to grab a deck by name. I don't use this method in the code.
     */
    getDeckByName(name) {
        return this.decks.get(name);
    }

    /**
     * [4] MozDevNet, “Using FormData objects - web apis: MDN,”
     * MDN Web Docs, https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects.
     *
     * In conjunction with the above source, I wrote this method to first check if the card exists with all necessary
     * fields. If it does exist, it adds the card into the correct format for appending to the formData.
     * This method then uses the formData.entries method which exposes the collection
     * and logs them to the console. I commented this function out.
     *
     * It then calls the post method of the DECK_SERVICES singleton to make a request to the backend
     * server.
     */
    async addDeck(name, deck) {
        let containsOnlyNewLine = (str) => {
            return /^(\n+)$/.test(str);
        };

        let cards = deck;
        let formData = new FormData();
        formData.append("name", name);
        let cleanCards = (cards) => {
            let cleaned = [];
            cards.forEach((card) => {
                if (card.Id || card.Front || card.Back) {
                    if (
                        (!card.Id && containsOnlyNewLine(card.Front)) ||
                        containsOnlyNewLine(card.Back)
                    ) {
                        return;
                    } else {
                        cleaned.push(card);
                    }
                }
            });
            return cleaned;
        };

        console.log("cleanCards", cleanCards(cards));
        let ne = cleanCards(cards);

        if (ne.length == 0) {
            alert("Cannot have blank cards");
            return;
        }

        ne.forEach((element, i) => {
            formData.append(`cards[${i}][id]`, element.Id);
            formData.append(`cards[${i}][front]`, element.Front);
            formData.append(`cards[${i}][back]`, element.Back);
        });
        console.log("form");
        for (let [k, v] of formData.entries()) {
            console.log(k, v);
        }

        return await DECK_SERVICES.postDecks(formData).then((r) => {
            console.log(r);
            alert("Deck added!");
            // window.location.href = "/";
        });

        // const url = "/api/cache/clear";
        // const request = new Request(url, {
        //     method: "GET",
        // });
        // fetch(request)
        //     .then((r) => r.json())
        //     .then((json) => {
        //         console.log(json);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    }

    async updateDeck(id, name, cards) {
        let formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", name);

        let ne = [];
        cards.forEach((card) => {
            if (card.front.text || card.back || card.front.blob) {
                ne.push(card);
            }
        });
        if (ne.length == 0) {
            alert("Cannot have blank cards");
            return;
        }

        ne.forEach((element, i) => {
            formData.append(`cards[${i}][front][text]`, element.front.text);
            formData.append(`cards[${i}][front][blob]`, element.front.blob);
            formData.append(`cards[${i}][back]`, element.back);
        });
        return await DECK_SERVICES.putDeck(id, formData).then(() => {
            alert("Deck updated!");
            window.location.href = "/";
        });
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
