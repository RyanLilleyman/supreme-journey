/**
 * I wrote the import statements below to allow DeckEDITDOM access to various methods to the hash map within
 * the DECK_GLOBALS module.
 *
 * The DeckEditor superclass is responsible for creating and manipulating the Deck.Cards array.
 */
import DECK_GLOBALS from "../global/globalDecks.mjs";
import { DeckEditor } from "./deck_editor.mjs";

/**
 * I wrote the below sub class as an exportable class, following ES6 conventions, that
 * manipulates the DOM elements on the page and binds callbacks to their respective events.
 */
export class DeckEDITDOM extends DeckEditor {
    constructor(
        deck = new Deck(),
        idx = 0,
        currentCard = this.setBlank(),
        deck_id = ""
    ) {
        super(deck, idx, currentCard, deck_id);
        this.isFileHandleClickBound = false;
        this.clearCardOnDOM();
        this.inject();
    }

    /**
     * I wrote this method as a catchall for rendering the card on the DOM.
     */
    renderCard() {
        this.clearCardOnDOM();
        this.innerBackTextArea();
        this.innerFrontTextArea();
        this.displayImage();
    }

    /**
     * I wrote this method to show the current cards front text string on the DOM.
     */
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

    /**
     * Same as above but for the back text area.
     */
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

    /**
     * I wrote this method to act as a callback for clearing the front and back text areas.
     * This method also removes the img child from the imdPoss div element if the img exists.
     */
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

    /**
     * I wrote this method to bind the clear button to the above callback and also to the handle clear callback.
     */
    bindClear() {
        const clearButton = document.querySelector(".clearButton");
        clearButton?.addEventListener("click", () => {
            this.clearCardOnDOM();
            this.handleClear();
        });
    }

    /**
     * I wrote this to bind the previous button element. It calls the Previous() method
     * and then rerenders the card.
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
     * I wrote this to bind the next button and then call the Next() method. It also
     * rerenders the card.
     */
    bindNext() {
        const nextButton = document.querySelector(".nextButton");
        nextButton.addEventListener("click", () => {
            this.Next();
            this.renderCard();
        });
        return nextButton;
    }

    /**
     * I wrote this method to handle creation. It binds the button to the creation callback
     * and then clears the card.
     */
    bindCreate() {
        const createButton = document.querySelector(".createButton");
        createButton.addEventListener("click", () => {
            this.handleCreation();
            if (this.Index == this.Deck.Cards.length - 1) {
                this.clearCardOnDOM();
            } else {
                this.renderCard();
            }
        });
        return createButton;
    }

    /**
     * I wrote this method to handle destruction of a card from the array.
     * It completely destroys the card unlike the clear method which just erases the fields.
     * It rerenders the card and handles the cardnumber.
     */
    bindDestroy() {
        const destroyButton = document.querySelector(".destroyButton");
        destroyButton.addEventListener("click", () => {
            this.handleDelete();
            this.renderCard();
            this.handleCardNumber();
        });
    }

    /**
     * I wrote this method to first check if the name exists. If not, alert the user.
     * It has a variety of checks to make sure that the deck actually has a card added and
     * also to check that if the last card is just a blank card. If the last card is blank,
     * then it will remove the card from the deck array.
     *
     * The method then uses the DECK_GLOBALS.addDeck() with the name and cards as parameters
     * to create a hash map where the key is the name and the cards array is the value.
     * It then makes a get request to the server to change the view back to the index.blade.php
     * or Route::get('/', funciton(){});
     */
    bindFinish() {
        const finishButton = document.querySelector(".finishButton");
        finishButton.addEventListener("click", async () => {
            if (!this.Deck.Name) {
                alert("Deck must have a name!");
            } else {
                const name = this.Deck.Name;
                const cards = this.Deck.Cards;
                let last_card = this.Deck.Cards[this.Deck.Cards.length - 1];
                if (
                    !last_card.front.text &&
                    !last_card.back &&
                    !last_card.front.blob
                ) {
                    this.removeLastCard();
                }

                await DECK_GLOBALS.updateDeck(this.Id, name, cards);
            }
        });
    }

    /**
     * I wrote the following method to delete the last card from the deck.
     */
    removeLastCard() {
        this.Deck.Cards.splice(this.Deck.Cards.length - 1, 1);
    }

    /**
     * Same as above.
     */
    bindEnterKey() {
        document.addEventListener("keydown", (e) => {
            if (e.shiftKey && e.key === "Enter") {
                this.handleCreation();
                if (this.Index == this.Deck.Cards.length - 1) {
                    this.clearCardOnDOM();
                } else {
                    this.renderCard();
                }
            }
            if (e.shiftKey && e.key === "Escape") {
                this.clearCardOnDOM();
            }
        });
    }

    /**
     * I wrote this method to handle deleting the image. It renders the card and then removes the
     * remove image button or the x which deletes the image from the dom and the card.
     */
    deleteImg() {
        this.handleDeleteImg();
        this.renderCard();
        this.removeRemoveImgButton();
    }

    /**
     * I wrote this method to handle displaying the remove image butotn.
     */
    removeRemoveImgButton() {
        let removeImg = document.getElementById("removeImage");
        if (removeImg) {
            removeImg.style.display = "none";
        }
    }

    /**
     * I needed acute access to either remove or show the button. I wrote thie method to
     * handle showing the remove image button or the x for an image. This function and the one above
     * both dynamically allow me to control the display of the button depending on the user.
     */
    showRemoveImgButton() {
        let removeImg = document.getElementById("removeImage");
        if (removeImg) {
            removeImg.addEventListener("click", () => {
                this.deleteImg();
            });
            removeImg.style.display = "flex";
        }
    }

    /**
     * I wrote this to handle showing the image depending on whether or not the image exists already
     * inside the imagePossible div element. If an image is already present, remove it as the current child
     * of the div element. Then create a new image element and
     * if the current index has a blob to display (not an empty string),
     * then create a blob url to display and show the remove image button. Append the new
     * image element to the imagePossible div element.
     */
    displayImage() {
        const imagePossible = document.getElementById("imagePossible");
        const first_image = imagePossible.childNodes[0];
        if (first_image) {
            imagePossible.removeChild(first_image);
        }
        const imgElement = document.createElement("img");

        const img = this.Deck.Cards[this.Index].front.blob;

        if (img) {
            let blob_url = this.getBlobUrl(img);
            imgElement.src = blob_url;
            this.showRemoveImgButton();
            imagePossible.appendChild(imgElement);
        }
    }

    /**
     * I wrote this simply to check the file type.
     * I needed a way to adjust the mime type of multiple image types
     */
    detectMIMEType(file) {
        return file.type;
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * With the help of chat gpt, I modified this function to take an array buffer
     * and it's associated mimetype upon showing the image.
     */
    async getBlob(arrayBuffer, mimeType) {
        return new Promise((res, rej) => {
            const blob = new Blob([arrayBuffer], { type: mimeType });
            res(blob);
        });
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * Chat gpt provided the URL.createObjectURL() method.
     */
    getBlobUrl(blob) {
        if (!blob) {
            return "";
        }
        return URL.createObjectURL(blob);
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * Chat gpt suggested that in order to open the default file explorer I use a div element
     * and a simulated click on that div which would then wait (async function) for some file to be selected.
     *
     * I included the mimetype detector and the getblob function from above and then
     * if a url is truthy pass the blob to the Current.Front.Blob field.
     *
     * I added fileInput.value = null as to reset the value and fix any duplicate image renders.
     */
    bindFileInput() {
        const fileInput = document.getElementById("fileInput");
        const openFileImage = document.getElementById("uploadImage");

        const rebindClickListener = () => {
            openFileImage.addEventListener("click", handleClick);
        };

        const handleClick = (e) => {
            openFileImage.removeEventListener("click", handleClick);
            fileInput.addEventListener("change", handleChange);
            fileInput.click();
            rebindClickListener();
        };

        const handleChange = async (e) => {
            const selectedFiles = fileInput.files;
            if (selectedFiles && selectedFiles.length > 0) {
                const selectedFile = selectedFiles[0];
                const mimeType = this.detectMIMEType(selectedFile);

                const arrayBuffer = await selectedFile.arrayBuffer();
                const blob = await this.getBlob(arrayBuffer, mimeType);
                const object_url = this.getBlobUrl(blob);

                if (object_url) {
                    this.handleImageCreation(blob);
                    this.displayImage();
                }
            }
            fileInput.value = null;
            rebindClickListener();
        };

        openFileImage.addEventListener("click", handleClick);

        return fileInput;
    }

    /**
     * I wrote this method to inject the event listeners and relevant callbacks into the create_deck document upon loading.
     */
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
        if (this.Current.Front.blob) {
            this.displayImage();
        }
        // this.bindIKey();
    }
}
