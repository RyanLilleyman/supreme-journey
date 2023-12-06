// card.js
class Card {
    constructor(front = { text: "", blob: "" }, back = "") {
        this.front = front;
        this.back = back;
    }

    get Front() {
        return this.front;
    }

    get Back() {
        return this.back;
    }

    setFrontText(text) {
        this.front.text = text;
        return this.front.text;
    }

    setFrontImage(blob = "") {
        this.front.blob = blob;
        console.log(this.front.blob);
        return this.front.image;
    }

    setBack(back) {
        this.back = back;
        return this.back;
    }

    toObject() {
        return { front: this.front, back: this.back };
    }
}

export default Card;
