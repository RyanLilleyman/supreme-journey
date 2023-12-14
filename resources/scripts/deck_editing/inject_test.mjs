import DECK_SERVICES from "../services/deckServices.mjs";

function timepiece() {
    document.addEventListener("DOMContentLoaded", async () => {
        console.log("testing");
        DECK_SERVICES.grabCachedDeck();
    });
}
timepiece();
