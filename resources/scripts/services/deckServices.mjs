/**
 * [5] “Getting started,” Getting Started |&nbsp;Axios Docs, https://axios-http.com/docs/intro (accessed Dec. 11, 2023).
 *
 * I used axios to make necessary requests to my server.
 */
import axios from "axios";
class DeckServices {
    constructor() {
        this.uri = "/decks";
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
    getDecks() {
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
    postDecks(deck) {
        console.log(deck);
        axios
            .post(this.uri, deck)
            .then((response) => {
                // console.log(response.data);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * I wrote this function for put requests.
     */
    putDecks() {
        axios
            .put(this.uri)
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * I wrote this function for patch requests.
     */
    patchDecks() {
        axios
            .patch(this.uri)
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * I wrote thie function to delete decks by their uuid.
     */
    deleteDeckById(deck_id) {
        console.log(this.uri + "/" + deck_id);
        axios
            .delete(this.uri + "/" + deck_id)
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
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

    grabCachedDeck() {
        return new Promise((resolve, reject) => {
            axios
                .get("/cache")
                .then((r) => {
                    console.log(r);
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
