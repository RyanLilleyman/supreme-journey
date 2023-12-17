/**
 * [5] “Getting started,” Getting Started |&nbsp;Axios Docs, https://axios-http.com/docs/intro (accessed Dec. 11, 2023).
 *
 * I used axios to make necessary requests to my server.
 */
import axios from "axios";
class DeckServices {
    constructor() {
        this.uri = "api/decks";
        this.map = new Map();
    }

    /**
     * I wrote this method to ensure the class acted as a singleton.
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new DeckServices();
        }
        return this.instance;
    }

    /**
     * I wrote this funciton to incorporate the current env_uri
     */
    setEnvUri(env_uri) {
        this.uri = env_uri;
    }
    /**
     * I wrote this function to return the current env_uri
     */
    getEnvUri() {
        return this.env_uri;
    }

    /**
     * I wrote this function to grab the current map.
     */
    getmap() {
        return this.map;
    }

    /**
     * I wrote this function to grab the current array of deck objects from the database.
     */
    async getDecks() {
        return new Promise((resolve, reject) => {
            axios
                .get(this.uri)
                .then((response) => {
                    const array = response.data;
                    resolve(array);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * I wrote this function to post the decks to the database.
     */
    async postDecks(deck) {
        return new Promise((resolve, reject) => {
            axios
                .post(this.uri, deck)
                .then((r) => {
                    console.log(r);
                    resolve(r);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    /**
     * I wrote this function for patch requests.
     */
    async putDeck(id, formData) {
        return new Promise((resolve, reject) => {
            fetch(`${this.uri}/${id}`, {
                method: "PUT",
                body: formData,
            })
                .then((r) => {
                    console.log(r);
                })
                .catch((r) => {
                    console.log(e);
                });
        });
    }

    /**
     * I wrote thie function to delete decks by their uuid.
     */
    async deleteDeckById(deck_id) {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.uri + "/" + deck_id)
                .then((r) => {
                    resolve(r);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    /**
     * I wrote this function to get a deck by a specific uuid.
     */
    getDeckById(deck_id) {
        return new Promise((resolve, reject) => {
            axios
                .get(this.uri + "/" + deck_id)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * I wrote this to cache the deck_id
     */
    cacheDeckById(deck_id) {
        return new Promise((resolve, reject) => {
            axios
                .post("/cache/" + deck_id)
                .then((r) => {
                    resolve(r);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    }

    /**
     * I wrote this to grab the cached deck from the server.
     */
    grabCachedDeck() {
        return new Promise((resolve, reject) => {
            axios
                .get("/cache")
                .then((r) => {
                    resolve(r);
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    }
}

/**
 * I wrote the below assignment statement to instantiate the singleton.
 */
const DECK_SERVICES = DeckServices.getInstance();

/**
 * I exported the above constant.
 */
export default DECK_SERVICES;
