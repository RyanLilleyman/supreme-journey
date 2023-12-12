/**
 * I wrote this class to
 */
class Results {
    constructor() {
        this.results = {
            totalSessionTime: 0,
            totalRoundTime: 0,
            skipped_manual: 0,
            skipped_latency: 0,
            skipped_total: 0,
            number_of_cards_viewed: 0,
            number_of_cards_in_deck: 0,
            correct: 0,
            incorrect: 0,
        };
    }

    fetch_results() {
        axios.get("/fetch-results").then((response) => {
            console.log(response);
        });
    }

    bindListeners() {
        document.addEventListener("DOMContentLoaded", () => {
            this.results.totalSessionTime =
                document.querySelector(".sessionTime span").innerText;
            this.results.totalRoundTime = document.querySelector(
                ".timeToRespond span"
            ).innerText;
            this.results.correct = document.querySelector(
                ".correctResponses span"
            ).innerText;
            this.results.incorrect = document.querySelector(
                ".incorrectResponses span"
            ).innerText;
            this.results.skipped_manual = document.querySelector(
                ".skippedResponses span"
            ).innerText;
            this.results.skipped_latency = document.querySelector(
                ".skippedLatency span"
            ).innerText;
            this.results.number_of_cards_viewed =
                document.querySelector(".cardsViewed span").innerText;
            this.results.number_of_cards_in_deck =
                document.querySelector(".cardsInDeck span").innerText;
        });
    }
}
export default Results;
