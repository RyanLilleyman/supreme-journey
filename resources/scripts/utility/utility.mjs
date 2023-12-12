import axios from "axios";
import DECK_SERVICES from "../services/deckServices.mjs";
/**
 * I wrote this class to export for general utility purposes.
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
        console.log(array);

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
    static onHomeDelete() {
        const del = document.querySelector(".destroyButton");
        del.addEventListener("click", () => {
            let decks_inputs = document.querySelectorAll(".radios_inner");
            for (let deck of decks_inputs) {
                console.log(deck);
                if (deck.checked) {
                    DECK_SERVICES.deleteDeckById(deck.id);
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
     * I wrote this function to fetch a deck by its inherent uuid.
     *
     * @param {*} deck_id
     * @returns
     */
    static async fett(deck_id) {
        return await DECK_SERVICES.getDeckById(deck_id);
    }

    /**
     *
     */
    static bindEdit() {
        let edit_button = document.querySelector(".edit-button");
        edit_button.addEventListener("click", () => {
            const empty = [];
            let decks_inputs = document.querySelectorAll(".radios_inner");
            for (let deck of decks_inputs) {
                if (deck.checked) {
                    empty.push(deck.id);
                    console.log(deck.id);
                }
            }
            if (empty.length > 1) {
                alert("Please select only one deck to edit.");
                return;
            } else if (empty.length == 0) {
                alert("Please select at least one deck to edit.");
                return;
            }
            this.fett(empty[0]);
        });
    }

    /**
     * I wrote this function to c
     */
    static async fill_catolog() {
        let array = await DECK_SERVICES.getDecks();

        let catalog = document.querySelector(".catalog");
        for (let { id, name, cards } of array) {
            let outer_div = document.createElement("div");
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
                img.src = cards[0].imgUrl;
                frontSpan.appendChild(img);
            }
            frontSpan.textContent = cards[0].front;
            deck_preview.appendChild(frontSpan);

            let backSpan = document.createElement("span");
            backSpan.className = "back";
            backSpan.textContent = cards[0].back;
            deck_preview.appendChild(backSpan);
            outer_div.appendChild(deck_preview);

            catalog.appendChild(outer_div);
        }
    }

    // <h4>Math Deck:</h4>
    //         <div class="mathDeck">
    //             <span class="front">4+5 = </span>
    //             <span class="back">9</span>
    //         </div>
}
