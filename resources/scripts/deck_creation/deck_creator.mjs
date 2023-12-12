/**
 * I wrote these import statements to import the Deck and Card
 *  classes from the respective modules.
 */
import Deck from "./deck.mjs";
import Card from "./card.mjs";

/**
 *  I wrote this class as a super class which contains all the methods for creating and editing
 * cards within a deck
 */
export class DeckCreator {
    constructor() {
        this.deck = new Deck();
        this.idx = 0;
        this.currentCard = this.setBlank();
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
     * refactored as for simplicity. It's use is meant to to access the current card in the deckArray.
     */
    get Current() {
        return this.currentCard;
    }

    /**
     * I wrote this class to set the current card.
     */
    setCurrent(card) {
        this.currentCard = card;
    }

    /**
     * I wrote this class to set automatically add a default NEW card instance
     * everytime the setBlank() method is called. It then adds the card to the the current deck instance being
     * edited in the Deck Creator class.
     */
    setBlank(card = new Card()) {
        this.Deck.addCard(card);
        return card;
    }

    /**
     * I wrote this class to update the current card being viewed by the deck_dom subclass
     * of the Deck Creator class to the current card accessed by the current Index.
     */
    updateCard() {
        this.currentCard = this.Deck.Cards[this.Index];
        this.handleCardNumber();
    }

    /**
     * I wrote this method to first be callable from the deck_dom subclass by the next button.
     * It acts as a callback which if and only if the current length of the interior cards array
     * is greater than the current index will then add one to the index and then update the current card.
     * I deleted the Index console.log for the sake of performance and privacy.
     */
    Next() {
        if (this.Deck.Cards.length - 1 > this.Index) {
            this.idx += 1;
            // console.log(this.Index);
            this.updateCard();
        }
    }

    /**
     * I wrote the following method such that the previous button fires from the
     * subclass deck_dom. It's designed to update the card if and only if the Index is greater than one.
     * This then updates the card after decrementing the Index.
     */
    Previous() {
        if (this.idx > 0) {
            this.idx -= 1;
            // console.log(this.Index);
            this.updateCard();
        }
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     *
     * I wrote this method to bind the name field and then on any input change the current
     * decks name from the event target's value. In a private conversation, it was suggested to me
     * to use the input option for the first argument within the addEventListener() method.
     */
    bindNameField() {
        const deckName = document.querySelector("input[name=deckName]");
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
        frontCard.addEventListener("input", (e) => {
            const target = e.target;
            this.Current.setFrontText(target.value);
        });

        const backCard = document.querySelector(".backCardCreate");
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
     * This method was written following a search for the .shift and .splice methods.
     * I wrote it to delete the current card either at the end of the Deck array or from anywhere within the array.
     * It includes a check for the last card. If the current index is equal to the Cards array length - 1, then
     * the program alerts that the last card cannot be deleted. Basically, there has to be at least one
     * card in the deck in order to be deleted and cannot delete the current editable card.
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
     * I wrote this method to handle creation of the card. It alerts the user that the
     * card was added to the deck and then sets the new current card to a new instance of a blank card.
     * This effectively adds a new Card object with all its attributes and methods to the back of the Cards array.
     * It updates the Index and then updates the card number on the DOM accordingly.
     */
    handleCreation() {
        alert("Card added");
        this.setCurrent(this.setBlank());
        this.idx++;
        this.handleCardNumber();
        console.log(this.idx);
        console.log(this.Deck.Cards);
    }

    /**
     * I wrote this method to handle the image creattion for the current card if the blob is provided.
     * Otherwise, it sets the current cards image to an empty string.
     */
    handleImageCreation(blob = "") {
        this.Current.setFrontImage(blob);
    }

    /**
     * I wrote this method to change the card number based on the
     * current index plus one due to zero based indexing.
     */
    handleCardNumber() {
        let element = document.querySelector(".cardNumber");
        element.innerHTML = (this.Index + 1).toString();
        return (this.Index + 1).toString();
    }
}
