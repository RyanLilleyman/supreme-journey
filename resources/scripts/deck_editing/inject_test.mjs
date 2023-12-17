import Card from "../deck_creation/card.mjs";
import Deck from "../deck_creation/deck.mjs";
import DECK_SERVICES from "../services/deckServices.mjs";
import { UtilityCenter } from "../utility/utility.mjs";

function timepiece() {
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("testing");
        let {
            data: { deck },
        } = await DECK_SERVICES.grabCachedDeck();
        let name = deck.name;
        let id = deck.id;
        let cards = deck.cards;

        // let trimmed_name = name.replace("Deck", "");
        // let new_deck = new Deck();

        // let cards_array = [];
        let deck_to_edit = new Deck();
        for (let card of cards) {
            let res = await UtilityCenter.grabBlobFromUrl(card.imgUrl);
            let blob = new Blob([res.data], {
                type: res.headers["content-type"],
            });
            let new_card = new Card(
                { text: card.front, blob: blob },
                card.back
            );

            console.log(blob);
            console.log(new_card);

            // let blob = new Blob(res.data, res.headers["content-type"]);
        }
    });
}
timepiece();
