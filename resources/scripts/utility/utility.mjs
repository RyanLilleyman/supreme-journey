import axios from "axios";
import DECK_SERVICES from "../services/deckServices.mjs";
/**
 * I wrote this class for general utility purposes.
 */
export class UtilityCenter {
    constructor() {}
    /**
     * I wrote this method to bind a simple style change to the button element.
     */
    static bindArrowStyleChange() {
        var button = document.querySelector(".generalInstructions button");
        button.addEventListener("click", function () {
            button.classList.toggle("active");
            var instList = document.querySelector(".generalInstList");
            var upArrow = document.querySelector(".upArrow");
            instList.classList.toggle("active");
            upArrow.classList.toggle("activeArrow");
        });

        var arrow = document.querySelector(".upArrow");
        arrow.addEventListener("click", function () {
            button.classList.toggle("active");
            var instList = document.querySelector(".generalInstList");
            var upArrow = document.querySelector(".upArrow");
            instList.classList.toggle("active");
            upArrow.classList.toggle("activeArrow");
        });
    }

    /**
     * I wrote this method which capitalizes the first letter of a string.
     *
     * @param {string} str - The string to capitalize the first letter of.
     * @return {string} The capitalized string.
     */
    static capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * I wrote this method which sets the URI from the environment variable.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    static set_uri_from_env() {
        axios
            .get("/get-env-variable")
            .then((response) => {
                DECK_SERVICES.setEnvUri(response.data.value);
            })
            .catch((error) => {
                console.log(error);
            });
        DECK_SERVICES.addDeckSuffix();
    }

    /**
     * I wrote this method to get the uri from the database which accepts different routes.
     */
    static get_uri_from_env() {
        axios
            .get("/get-env-variable")
            .then((response) => {
                return response.data.value;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    /**
     * I wrote this method which fills the deck with data from the DECK_SERVICES API.
     *
     * @return {Promise<void>} A promise that resolves when the deck is filled.
     */
    static async fill_Deck() {
        let array = await DECK_SERVICES.getDecks();

        const deckL = document.querySelector(".dl");
        deckL.innerHTML = "";

        for (let { id, name, cards } of array) {
            let deck = document.createElement("div");
            deck.className = "deck_input_info_container";

            let input = document.createElement("input");
            input.type = "checkbox";
            input.name = name;
            input.className = "radios_inner";
            input.id = id;

            deck.appendChild(input);

            let deck_info = document.createElement("div");
            deck_info.id = id;
            deck_info.name = name;
            deck_info.className = "radios_outer";
            deck_info.innerHTML =
                "<span>" +
                this.capitalizeFirstLetter(name) +
                "</span><span> (" +
                cards.length +
                ")</span>";

            deck.appendChild(deck_info);
            deck_info.addEventListener("click", (e) => {
                if (deck.childNodes[0].checked) {
                    deck.childNodes[0].checked = false;
                } else {
                    deck.childNodes[0].checked = true;
                }
            });

            deckL.appendChild(deck);
            let divider = document.createElement("div");
            divider.className = "divider";
            deckL.appendChild(divider);
        }
    }

    /**
     * I wrote this method to bind an event handler for the delete action on the home page.
     * This function is responsible for deleting selected decks.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    static async onHomeDelete() {
        const del = document.querySelector(".destroyButton");
        del.addEventListener("click", async () => {
            let decks_inputs = document.querySelectorAll(".radios_inner");
            for (let deck of decks_inputs) {
                if (deck.checked) {
                    await DECK_SERVICES.deleteDeckById(deck.id);
                }
            }
            this.fill_Deck();
        });
    }

    /**
     * I wrote this method which binds the search functionality to the input field.
     *
     * @param {Event} e - The input event.
     * @return {void}
     */
    static bindSearch() {
        let search = document.querySelector(".search");
        search.addEventListener("input", (e) => {
            let decks_inputs = document.querySelectorAll(".radios_inner");
            for (let deck of decks_inputs) {
                if (
                    deck.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                ) {
                    deck.parentElement.style.display = "flex";
                    deck.parentElement.nextSibling.style.display = "flex";
                } else {
                    deck.parentElement.style.display = "none";
                    deck.parentElement.nextSibling.style.display = "none";
                }
            }
        });
    }

    /**
     * I wrote this for the edit button.
     */
    static async bindEdit() {
        let edit_button = document.querySelector(".edit-button");
        edit_button.addEventListener("click", async () => {
            const empty = [];
            let decks_inputs = document.querySelectorAll(".radios_inner");
            for (let deck of decks_inputs) {
                if (deck.checked) {
                    empty.push(deck.id);
                }
            }
            if (empty.length > 1) {
                alert("Please select only one deck to edit.");
                return;
            } else if (empty.length == 0) {
                alert("Please select at least one deck to edit.");
                return;
            } else {
                let result = await DECK_SERVICES.cacheDeckById(empty[0]);
                window.location.href = "/edit-deck";
                return result;
            }
        });
    }

    /**
     * I wrote this function to fill the catalog with the decks.
     */
    static async fill_catolog() {
        let array = await DECK_SERVICES.getDecks();

        let catalog = document.querySelector(".catalog");
        for (let { id, name, cards } of array) {
            let outer_div = document.createElement("div");
            outer_div.className = "deckholder";
            outer_div.style.width = "20rem";
            outer_div.style.height = "20rem";
            let deck_preview = document.createElement("div");
            deck_preview.id = id;
            deck_preview.name = name;
            deck_preview.className = "deckPreview";

            let deckHeader = document.createElement("h4");
            deckHeader.textContent = name;
            outer_div.appendChild(deckHeader);

            let frontSpan = document.createElement("span");
            frontSpan.className = "front";
            if (cards[0].imgUrl) {
                let img = document.createElement("img");
                img.src = "storage/" + cards[0].imgUrl;
                frontSpan.appendChild(img);
            }
            frontSpan.textContent = cards[0].front;
            deck_preview.appendChild(frontSpan);

            let backSpan = document.createElement("span");
            backSpan.style.display = "none";
            backSpan.className = "back";
            backSpan.textContent = cards[0].back;
            deck_preview.appendChild(backSpan);
            outer_div.appendChild(deck_preview);

            catalog.appendChild(outer_div);
        }
        let decks = document.getElementsByClassName("deckholder");
        for (let deck of decks) {
            deck.addEventListener("mouseenter", (e) => {
                e.target.lastChild.classList.add("front-show");
                setTimeout(
                    () => {
                        e.target.lastChild.firstChild.style.display = "none";
                        e.target.lastChild.lastChild.style.display = "flex";
                        e.target.lastChild.lastChild.style.transform =
                            "rotateY(180deg)";
                    },
                    150,
                    e
                );
            });

            deck.addEventListener("mouseleave", (e) => {
                e.target.lastChild.classList.remove("front-show");

                setTimeout(
                    () => {
                        e.target.lastChild.lastChild.style.display = "none";
                        e.target.lastChild.firstChild.style.display = "flex";
                    },
                    150,
                    e
                );
            });
        }
    }

    /**
     * I wrote this file to grab the blob from of an imgUrl from the server.
     * @param {} imgUrl
     * @returns
     */
    static async grabBlobFromUrl(imgUrl) {
        return new Promise((res, rej) => {
            fetch("api/grab-blob/?param1=" + imgUrl)
                .then((r) => res(r.blob()))
                .catch((e) => {
                    console.log(e);
                    rej(e);
                });
        });
    }
}
