/**
 * I wrote this class to encapsulate the attributes of a standard flash card. The front contains
 * an object literal with two fields. The first field, entitled 'text', is designed for strings.
 * While the second field, called blob, is designed for images (Binary Large Objects).
 * The back contains a single field named 'text' which is self explanatory.
 */
class Card {
    constructor(front = { text: "", blob: "" }, back = "") {
        this.front = front;
        this.back = back;
    }

    /**
     * [2] Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
     * Accessed 6 Oct, 2023.
     *
     * The following method was initially implemented as getFront() and was refactored to
     * get Front() based on the suggestions from Codieum.
     */
    get Front() {
        return this.front;
    }

    /**
     * [2] Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
     * Accessed 6 Oct, 2023.
     *
     * The following methd was initially implemented as getBack() and refactored to get Back()
     * based on suggestions from Codieum.
     */
    get Back() {
        return this.back;
    }

    /**
     * I wrote this method to set the front text field.
     */
    setFrontText(text) {
        this.front.text = text;
        return this.front.text;
    }

    /**
     * I wrote this method to set the front blob field.
     */
    setFrontImage(blob = "") {
        this.front.blob = blob;
        return this.front.image;
    }

    /**
     * I wrote this method to set the back text field.
     */
    setBack(back) {
        this.back = back;
        return this.back;
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * This method was suggested initially to change the
     * front and back attributes of the class into an object literal.
     * It isn't used in the application. I kept it in for transparency.
     */
    toObject() {
        return { front: this.front, back: this.back };
    }
}

/**
 * I wrote this export statement to be compatible with ES6 module syntax
 */
export default Card;
