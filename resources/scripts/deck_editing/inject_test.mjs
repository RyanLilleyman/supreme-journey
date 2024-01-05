import Card from "../deck_creation/card.mjs";
import Deck from "../deck_creation/deck.mjs";
import DECK_SERVICES from "../services/deckServices.mjs";
import { UtilityCenter } from "../utility/utility.mjs";
import { DeckEDITDOM } from "./deck_edit_dom.mjs";

function timepiece() {
    document.addEventListener("DOMContentLoaded", async () => {
        await DECK_SERVICES.grabCachedDeck().then(async (res) => {
            console.log(res);
            let deck = res.data.deck;

            let name = deck.name;
            let id = deck.id;
            let cards = deck.cards;

            let deck_to_edit = new Deck();
            let trimmed_name = name.replace(" Deck", "");
            deck_to_edit.setName(trimmed_name);

            function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }

            for (let card of cards) {
                await delay(100);
                if (card.imgUrl) {
                    await UtilityCenter.grabBlobFromUrl(card.imgUrl).then(
                        (res) => {
                            console.log("response", res);
                            let new_card = new Card(
                                res.ID,
                                card.front,
                                card.back
                            );
                            console.log("new card", new_card);
                            deck_to_edit.addCard(new_card);
                            // const url = "/api/cache/" + uuid;

                            // const request = new Request(url, {
                            //     method: "POST",
                            //     body: res,
                            // });
                            // fetch(request)
                            //     .then((r) => r.blob())
                            //     .then((blob) => {
                            //         console.log("the blobs are", blob);
                            //     })
                            //     .catch((e) => {
                            //         console.log(e);
                            //     });
                        }
                    );
                } else {
                    let new_card = new Card("", card.front, card.back);
                    deck_to_edit.addCard(new_card);
                }
            }
            let new_blank = new Card();
            deck_to_edit.addCard(new_blank);
            let firstCard = deck_to_edit.Cards[0];
            console.log("first card ", firstCard);
            let deckEditor = new DeckEDITDOM(deck_to_edit, 0, firstCard, id);
            console.log("first card again ", firstCard);
        });
    });
}
timepiece();
