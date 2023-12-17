import DECK_SERVICES from "../services/deckServices.mjs";
import { UtilityCenter } from "../utility/utility.mjs";
function timepiece() {
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("testing");
        let {
            data: { deck },
        } = await DECK_SERVICES.grabCachedDeck();
        console.log(deck);
        let name = deck.name;
        let id = deck.id;
        let cards = deck.cards;

        // let trimmed_name = name.replace("Deck", "");
        // let new_deck = new Deck();

        // let cards_array = [];
        for (let card of cards) {
            let blob = await UtilityCenter.grabBlobFromUrl(card.imgUrl);
            console.log("the resulting blob is: " + blob);
        }
    });
}
timepiece();
