import Deck from "./deck.mjs";
import Card from "./card.mjs";

export class DeckCreator {
    constructor() {
        this.deck = new Deck();
        this.idx = 0;
        this.currentCard = this.setBlank();
    }

    get Index() {
        return this.idx;
    }

    get Deck() {
        return this.deck;
    }

    get Current() {
        return this.currentCard;
    }

    setCurrent(card) {
        this.currentCard = card;
    }

    setBlank(card = new Card()) {
        this.Deck.addCard(card);
        console.log(this.Deck.Cards);
        return card;
    }

    updateCard() {
        this.currentCard = this.Deck.Cards[this.Index];
        this.handleCardNumber();
        console.log(this.Current);
    }

    Next() {
        if (this.Deck.Cards.length - 1 > this.Index) {
            this.idx += 1;
            console.log(this.Index);
            this.updateCard();
        }
    }

    Previous() {
        if (this.idx > 0) {
            this.idx -= 1;
            console.log(this.Index);
            this.updateCard();
        }
    }

    bindNameField() {
        const deckName = document.querySelector("input[name=deckName]");
        deckName.addEventListener("input", (e) => {
            const target = e.target;
            this.deck.setName(target.value);
        });
        return deckName;
    }

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

    handleDeleteImg() {
        this.Current.setFrontImage();
    }

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

    handleClear() {
        this.Current.setFrontText("");
        this.Current.setBack("");
        this.Current.setFrontImage();
    }

    handleCreation() {
        alert("Card added");
        this.setCurrent(this.setBlank());
        this.idx++;
        this.handleCardNumber();
        console.log(this.idx);
        console.log(this.Deck.Cards);
    }

    handleImageCreation(blob = "") {
        this.Current.setFrontImage(blob);
    }

    handleCardNumber() {
        let element = document.querySelector(".cardNumber");
        element.innerHTML = (this.Index + 1).toString();
        return (this.Index + 1).toString();
    }
}
