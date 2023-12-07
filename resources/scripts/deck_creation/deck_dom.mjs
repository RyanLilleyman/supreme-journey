import DECK_GLOBALS from "../global/globalDecks.mjs";
import { DeckCreator } from "./deck_creator.mjs";
export class DeckDOM extends DeckCreator {
    constructor() {
        super();
        this.clearCardOnDOM();
        this.inject();
    }

    renderCard() {
        this.clearCardOnDOM();
        this.innerBackTextArea();
        this.innerFrontTextArea();
        this.displayImage();
    }

    innerFrontTextArea() {
        const cards = this.Deck.Cards;
        const currentIndex = this.Index;
        if (cards.length > currentIndex) {
            const currentCard = cards[currentIndex];
            const element = document.querySelector(".frontCardCreate");
            if (currentCard.Front.text) {
                element.value = currentCard.Front.text;
                return currentCard.Front.text;
            }
        }
        return "";
    }

    innerBackTextArea() {
        const cards = this.Deck.Cards;
        const currentIndex = this.Index;
        if (cards.length > currentIndex) {
            const currentCard = cards[currentIndex];
            const element2 = document.querySelector(".backCardCreate");
            element2.value = currentCard.Back;
            return currentCard.Back;
        }
        return "";
    }

    clearCardOnDOM() {
        let imgPoss = document.querySelector("#imagePossible");
        let frontCardToClear = document.querySelector(".frontCardCreate");
        let backCreationToClear = document.querySelector(".backCardCreate");
        let img = document.querySelector("#imagePossible img");
        if (img) {
            imgPoss.removeChild(img);
        }
        frontCardToClear.value = "";
        backCreationToClear.value = "";
        this.removeRemoveImgButton();
    }

    bindClear() {
        const clearButton = document.querySelector(".clearButton");
        clearButton?.addEventListener("click", () => {
            this.clearCardOnDOM();
            this.handleClear();
        });
    }

    /**
     * bindPrevious
     */
    bindPrevious() {
        const previousButton = document.querySelector(".previousButton");
        previousButton.addEventListener("click", () => {
            this.Previous();
            this.renderCard();
        });
        return previousButton;
    }

    /**
     * bindNext
     */
    bindNext() {
        const nextButton = document.querySelector(".nextButton");
        nextButton.addEventListener("click", () => {
            this.Next();
            this.renderCard();
        });
        return nextButton;
    }

    bindCreate() {
        const createButton = document.querySelector(".createButton");
        createButton.addEventListener("click", () => {
            this.handleCreation();
            this.clearCardOnDOM();
        });
        return createButton;
    }

    bindDestroy() {
        const destroyButton = document.querySelector(".destroyButton");
        destroyButton.addEventListener("click", () => {
            this.handleDelete();
            this.renderCard();
            this.handleCardNumber();
            console.log(this.Deck.Cards);
        });
    }

    bindFinish() {
        const finishButton = document.querySelector(".finishButton");
        finishButton.addEventListener("click", () => {
            if (!this.Deck.Name) {
                alert("Deck must have a name!");
            } else {
                if (
                    this.Deck.Cards.length > 1 &&
                    !this.Deck.Cards[this.Deck.Cards.length - 1].Front.image &&
                    !this.Deck.Cards[this.Deck.Cards.length - 1].Front.text &&
                    !this.Deck.Cards[this.Deck.Cards.length - 1].Back
                ) {
                    this.Deck.removeLastCard();
                    const name = this.Deck.Name;
                    const cards = this.Deck.Cards;
                    alert("Deck added!");

                    console.log("to deck globals");
                    DECK_GLOBALS.addDeck(name, cards);
                    this.clearCardOnDOM();
                    window.location.href = "/";
                } else {
                    const name = this.Deck.Name;
                    const cards = this.Deck.Cards;
                    alert("Deck added!");
                    console.log("to deck globals.");
                    DECK_GLOBALS.addDeck(name, cards);
                    this.clearCardOnDOM();
                    window.location.href = "/";
                }
            }
        });
    }
    bindIKey() {
        document.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key === "I") {
                console.log("I pressed");
                this.bindFileInput();
            }
        });
    }

    bindEnterKey() {
        document.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key === "Enter") {
                this.handleCreation();
                this.clearCardOnDOM();
            }
            if (e.shiftKey && e.key === "Escape") {
                this.clearCardOnDOM();
            }
        });
    }

    deleteImg() {
        this.handleDeleteImg();
        this.renderCard();
        this.removeRemoveImgButton();
    }

    removeRemoveImgButton() {
        let removeImg = document.getElementById("removeImage");
        if (removeImg) {
            removeImg.style.display = "none";
        }
    }

    showRemoveImgButton() {
        let removeImg = document.getElementById("removeImage");
        if (removeImg) {
            removeImg.addEventListener("click", () => {
                this.deleteImg();
            });
            removeImg.style.display = "flex";
        }
    }

    displayImage() {
        console.log("first");
        const imagePossible = document.getElementById("imagePossible");
        const first_image = imagePossible.childNodes[0];
        if (first_image) {
            imagePossible.removeChild(first_image);
        }
        const imgElement = document.createElement("img");

        const img = this.Deck.Cards[this.Index].Front.blob;

        if (img) {
            imgElement.src = this.getBlobUrl(img);
            this.showRemoveImgButton();
            imagePossible.appendChild(imgElement);
        }
    }

    detectMIMEType(file) {
        return file.type;
    }

    getBlob(arrayBuffer, mimeType) {
        const blob = new Blob([arrayBuffer], { type: mimeType });
        console.log(blob);
        return blob;
    }
    getBlobUrl(blob) {
        if (!blob) {
            return null;
        }
        console.log(URL.createObjectURL(blob));
        return URL.createObjectURL(blob);
    }

    bindFileInput() {
        const fileInput = document.getElementById("fileInput");
        const openFileImage = document.getElementById("uploadImage");

        //manage events
        openFileImage.addEventListener("click", () => {
            fileInput.click();
        });
        fileInput.addEventListener("change", async () => {
            const selectedFiles = fileInput.files;
            if (selectedFiles && selectedFiles.length > 0) {
                const selectedFile = selectedFiles[0];
                const mimeType = this.detectMIMEType(selectedFile);

                const arrayBuffer = await selectedFile.arrayBuffer();
                const blob = this.getBlob(arrayBuffer, mimeType);
                const object_url = this.getBlobUrl(blob);

                if (object_url) {
                    this.handleImageCreation(blob);
                    this.displayImage();
                }
            }
            fileInput.value = null;
        });
        return fileInput;
    }

    inject() {
        this.bindNameField();
        this.bindCardCreators();
        this.bindCreate();
        this.bindNext();
        this.bindPrevious();
        this.bindFileInput();
        this.bindClear();
        this.bindDestroy();
        this.bindFinish();
        this.bindEnterKey();
        this.bindIKey();
    }
}
