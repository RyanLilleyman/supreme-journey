import Card from "../deck_creation/card.mjs";
import Deck from "../deck_creation/deck.mjs";

export class DeckEditor {
    constructor(
        deck = new Deck(),
        idx = 0,
        currentCard = this.setBlank(),
        deck_id = ""
    ) {
        this.deck = deck;
        this.idx = idx;
        this.currentCard = currentCard;
        this.deck_id = deck_id;
    }

    /**
     * [2] “Codeium · Free AI Code Completion &amp; Chat.” Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
     *
     * This method was originally implemented as getIndex() and was refactored
     * as get Index().
     */
    get Index() {
        return this.idx;
    }

    /**
     * [2] “Codeium · Free AI Code Completion &amp; Chat.” Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
     *
     * This method was originally implemented as getDeck() and was refactored
     * as get Deck() for simplicity.
     */
    get Deck() {
        return this.deck;
    }

    /**
     * [2] “Codeium · Free AI Code Completion &amp; Chat.” Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
     *
     * This method was initially implemented as getCurrentCard() and was
     * refactored for simplicity. Its use is to access the current card in the deckArray.
     */
    get Current() {
        return this.currentCard;
    }

    get Id() {
        return this.deck_id;
    }

    /**
     * I wrote this method to set the current card.
     */
    setCurrent(card) {
        this.currentCard = card;
    }

    /**
     * I wrote this method to automatically add a default blank NEW card
     * everytime the setBlank() method is called.
     * It then adds the card to the the current deck instance being
     * edited in the Deck Creator class.
     */
    setBlank(card = new Card()) {
        this.Deck.addCard(card);
        return card;
    }

    /**
     * I wrote this method to update the current card being viewed by the deck_dom subclass
     * to the current card accessed by the current Index.
     */
    updateCard() {
        console.log(this.Current);
        this.currentCard = this.Deck.Cards[this.Index];
        this.handleCardNumber();
    }

    /**
     * I wrote this method to first be callable from the deck_dom subclass by the next button.
     * It acts as a callback if and only if the current length of the interior cards array minus one
     * is greater than the current index will then add one to the index and then update the current card.
     * This ensures that the next 'view' only works when the number of cards is greater than one..
     * I commented out the Index console.log for the sake of performance and privacy.
     */
    Next() {
        if (this.Deck.Cards.length - 1 > this.Index) {
            this.idx += 1;
            this.updateCard();
        }
    }

    /**
     * I wrote the following method such that the previous button fires from the
     * subclass deck_dom. It's designed to update the card if and only if the Index is greater than 0.
     * This then updates the card after decrementing the Index.
     */
    Previous() {
        if (this.idx > 0) {
            this.idx -= 1;
            this.updateCard();
        }
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     *
     * I wrote this method to bind the name field and then on any input event change the current
     * deck's name from the event target's value. In a private conversation, it was suggested to me
     * to use the input option for the first argument within the addEventListener() method.
     */
    bindNameField() {
        const deckName = document.querySelector("input[name=deckName]");
        deckName.value = this.Deck.Name;
        deckName.addEventListener("input", (e) => {
            const target = e.target;
            this.deck.setName(target.value);
        });
        return deckName;
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     *
     * Again following the bindNameField() above method. I wrote the event listeners, the const assignment statements,
     * and the return statement.
     */
    bindCardCreators() {
        const frontCard = document.querySelector(".frontCardCreate");
        frontCard.value = this.Current.Front.text;
        frontCard.addEventListener("input", (e) => {
            const target = e.target;
            this.Current.setFrontText(target.value);
        });

        const backCard = document.querySelector(".backCardCreate");
        backCard.value = this.Current.Back;
        backCard.addEventListener("input", (e) => {
            const target = e.target;
            this.Current.setBack(target.value);
        });

        return [frontCard, backCard];
    }

    /**
     * I wrote this method to reset the front image blob field to an empty string for the current card.
     */
    handleDeleteImg() {
        this.Current.setFrontImage();
    }

    /**
     * [3] JavaScript array methods, https://www.w3schools.com/js/js_array_methods.asp.
     * This method was written following a search for the .shift() and .splice() methods.
     * I wrote this to delete the current card either at the end of the Deck array if and only if it exists.
     * It includes a check for the first card and then shifts the array or if the index
     * is between 0 and the lenght minus 1, then the card is spliced and the indices are shifted.
     */
    handleDelete() {
        if (this.Index == this.Deck.Cards.length - 1) {
            alert("Last card cannot be deleted");
        } else if (this.Index === 0) {
            this.Deck.Cards.shift();
            this.idx = 0;
        } else if (this.Index > 0) {
            this.Deck.Cards.splice(this.Index, 1);
            this.idx--;
        }
    }

    /**
     * I wrote this function to set the fields of the current card to an empty string.
     */
    handleClear() {
        this.Current.setFrontText("");
        this.Current.setBack("");
        this.Current.setFrontImage();
    }

    /**
     * I wrote this method to add the current card to the back of the cards array.
     * It then sets the current card to a new blank instance of new Card().
     * It increments the index and handles the card number on the dom.
     */
    handleCreation() {
        alert("Card added");
        if (this.Index == this.Deck.Cards.length - 1) {
            this.setCurrent(this.setBlank());
            this.idx++;
            this.handleCardNumber();
        } else {
            this.idx++;
            this.updateCard();
        }
    }

    /**
     * I wrote this method to handle the image creation for the current card if the blob is provided.
     * Otherwise, it sets the current cards image to an empty string.
     */
    handleImageCreation(blob = "") {
        this.Current.setFrontImage(blob);
    }

    /**
     * I wrote this method to change the card number based on the
     * current index plus one, due to zero based indexing.
     */
    handleCardNumber() {
        let element = document.querySelector(".cardNumber");
        element.innerHTML = (this.Index + 1).toString();
        return (this.Index + 1).toString();
    }
}
