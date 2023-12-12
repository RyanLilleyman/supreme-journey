/**
 * I wrote this file to inject the deckDom and all related modules into the create_deck.blade.php
 */
import { DeckDOM } from "./deck_dom.mjs";
function inject() {
    const deckDOM = new DeckDOM();
}
inject();
