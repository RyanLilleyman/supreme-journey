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
            let uuid = "";

            function delay(ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            }

            for (let card of cards) {
                await delay(1000);
                if (card.imgUrl) {
                    uuid = uuidv4();
                    await UtilityCenter.grabBlobFromUrl(card.imgUrl).then(
                        (res) => {
                            console.log(res);
                            const url = "/api/cache/" + uuid;

                            const request = new Request(url, {
                                method: "POST",
                                body: res,
                            });
                            fetch(request)
                                .then((r) => r.blob())
                                .then((blob) => {
                                    console.log("the blobs are", blob);
                                })
                                .catch((e) => {
                                    console.log(e);
                                });
                        }
                    );

                    let new_card = new Card(uuid, card.front, card.back);
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
            console.log("first card again ", firstCard);
        });
    });
}
timepiece();

// import Card from "../deck_creation/card.mjs";
// import Deck from "../deck_creation/deck.mjs";
// import { v4 as uuidv4 } from "uuid";
// import DECK_SERVICES from "../services/deckServices.mjs";
// import { UtilityCenter } from "../utility/utility.mjs";
// import { DeckEDITDOM } from "./deck_edit_dom.mjs";

// function delay(ms) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function processCard(card) {
//     if (card.imgUrl) {
//         const uuid = uuidv4();
//         const url = "/api/cache/" + uuid;

//         try {
//             const res = await UtilityCenter.grabBlobFromUrl(card.imgUrl);
//             const request = new Request(url, {
//                 method: "POST",
//                 body: res,
//             });

//             await fetch(request);
//             return new Card(uuid, card.front, card.back);
//         } catch (e) {
//             console.error(
//                 `Error processing card with imgUrl: ${card.imgUrl}`,
//                 e
//             );
//             return new Card(uuid, card.front, card.back, false); // Include error flag if needed
//         }
//     } else {
//         return new Card("", card.front, card.back);
//     }
// }

// async function processCards(cards) {
//     const MAX_CONCURRENT_REQUESTS = 3;
//     let activeRequests = 0;
//     let processedCards = [];

//     for (const card of cards) {
//         if (activeRequests >= MAX_CONCURRENT_REQUESTS) {
//             await delay(1000); // Wait before trying next card
//         }

//         processCard(card)
//             .then((processedCard) => {
//                 processedCards.push(processedCard);
//                 activeRequests--;
//             })
//             .catch((error) => {
//                 console.error("Error in processing card", error);
//             });

//         activeRequests++;
//     }

//     // Wait until all cards are processed
//     while (activeRequests > 0) {
//         await delay(500);
//     }

//     return processedCards;
// }

// function timepiece() {
//     document.addEventListener("DOMContentLoaded", async () => {
//         // ... existing code to clear cache ...
//         const url = "/api/cache/clear";
//         const request = new Request(url, {
//             method: "GET",
//         });
//         fetch(request)
//             .then((r) => r.json())
//             .then((json) => {
//                 console.log(json);
//             })
//             .catch((e) => {
//                 console.log(e);
//             });

//         const response = await DECK_SERVICES.grabCachedDeck();
//         const deck = response.data.deck;

//         // Reintegrated code to create and edit deck
//         const trimmedName = deck.name.replace(" Deck", "");
//         const deckToEdit = new Deck();
//         deckToEdit.setName(trimmedName);

//         const processedCards = await processCards(deck.cards);

//         processedCards.forEach((card) => {
//             deckToEdit.addCard(card);
//         });

//         const newBlank = new Card();
//         deckToEdit.addCard(newBlank);
//         const firstCard = deckToEdit.Cards[0];

//         const deckEditor = new DeckEDITDOM(deckToEdit, 0, firstCard, deck.id);
//         // ... any additional code to use deckEditor ...
//     });
// }

// timepiece();

///////
