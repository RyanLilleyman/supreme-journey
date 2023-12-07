import axios from "axios";
class DeckServices {
    constructor() {
        this.uri = "/decks";
        this.map = new Map();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new DeckServices();
        }
        return this.instance;
    }

    setEnvUri(env_uri) {
        this.uri = env_uri;
    }
    getEnvUri() {
        return this.env_uri;
    }

    getmap() {
        return this.map;
    }

    getDecks() {
        return new Promise((resolve, reject) => {
            axios
                .get(this.uri)
                .then((response) => {
                    const array = response.data;
                    console.log("The Array is: ", array);
                    resolve(array);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    postDecks(deck) {
        console.log(deck);
        axios
            .post(this.uri, deck)
            .then((response) => {
                console.log("This is the response: ", response);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    putDecks() {
        axios
            .put(this.uri)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    patchDecks() {
        axios
            .patch(this.uri)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    deleteDeckById(deck_id) {
        console.log(this.uri + "/" + deck_id);
        axios
            .delete(this.uri + "/" + deck_id)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async getDeckById(deck_id) {
        return new Promise((resolve, reject) => {
            axios
                .get(this.uri + "/" + deck_id)
                .then((r) => {
                    console.log(r);
                    resolve(r);
                })
                .catch((e) => {
                    console.log(e);
                });
        });
    }
}

const DECK_SERVICES = DeckServices.getInstance();

export default DECK_SERVICES;
