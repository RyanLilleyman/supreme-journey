import Card from "../deck_creation/card.mjs";
import Deck from "../deck_creation/deck.mjs";
import { v4 as uuidv4 } from "uuid";
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

            for (let card of cards) {
                if (card.imgUrl) {
                    let id = uuidv4();
                    await UtilityCenter.grabBlobFromUrl(card.imgUrl).then(
                        (res) => {
                            console.log(res);
                            const url = "/api/cache/" + id;

                            const request = new Request(url, {
                                method: "POST",
                                body: res,
                            });
                            fetch(request)
                                .then((r) => r.blob())
                                .then((blob) => {
                                    console.log("the blobs are", blob);
                                    const object_url = this.getBlobUrl(blob);

                                    if (object_url) {
                                        // this.handleImageCreation(blob);
                                        this.displayImage();
                                    }
                                })
                                .catch((e) => {
                                    console.log(e);
                                });
                        }
                    );

                    let new_card = new Card(id, front, card.back);
                    deck_to_edit.addCard(new_card);
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
        });
    });
}
timepiece();
