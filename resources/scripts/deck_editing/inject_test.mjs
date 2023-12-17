import Card from "../deck_creation/card.mjs";
import Deck from "../deck_creation/deck.mjs";
import DECK_SERVICES from "../services/deckServices.mjs";
import { UtilityCenter } from "../utility/utility.mjs";
import { DeckEDITDOM } from "./deck_edit_dom.mjs";

function timepiece() {
    document.addEventListener("DOMContentLoaded", async () => {
        let {
            data: { deck },
        } = await DECK_SERVICES.grabCachedDeck();
        let name = deck.name;
        let id = deck.id;
        let cards = deck.cards;

        let deck_to_edit = new Deck();
        let trimmed_name = name.replace(" Deck", "");
        deck_to_edit.setName(trimmed_name);

        for (let card of cards) {
            if (card.imgUrl) {
                let res = await UtilityCenter.grabBlobFromUrl(card.imgUrl);

                let new_card = new Card(
                    { text: card.front, blob: res },
                    card.back
                );
                deck_to_edit.addCard(new_card);
            } else {
                let new_card = new Card(
                    { text: card.front, blob: "" },
                    card.back
                );
                deck_to_edit.addCard(new_card);
            }
        }
        let firstCard = deck_to_edit.Cards[0];
        let deckEditor = new DeckEDITDOM(deck_to_edit, 0, firstCard, id);
    });
}
timepiece();
