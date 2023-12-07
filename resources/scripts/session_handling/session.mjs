import axios from "axios";
import easytimer from "easytimer.js";
import { UtilityCenter } from "../utility/utility.mjs";
import CountdownTimer from "./countDown.mjs";

class Session {
    #env_url;
    #front_url_array;
    #back_url_array;
    #url_array;
    #idx;
    #session_time;
    #round_time;
    #deck_id;
    #session_settings;
    #session_url;
    #session_timer;
    #results;

    /**
     * Initializes the instance of the class.
     */
    constructor() {
        this.#session_settings = {
            deck: "",
            cardColor: "",
            cardFont: "",
            fontSize: "",
            fontWeight: "",
            fontColor: "",
            sessionTimer: "",
            roundTimer: "",
            showSessionTimer: false,
            showRoundTimer: false,
        };
        this.#results = {
            totalSessionTime: 0,
            totalRoundTime: 0,
            skipped_manual: 0,
            skipped_latency: 0,
            skipped_total: 0,
            number_of_cards_viewed: 0,
            number_of_cards_in_deck: 0,
            correct: 0,
            incorrect: 0,
            skipped_array_manual: [],
            skipped_array_latency: [],
            correct_array: [],
            incorrect_array: [],
        };
        // this.#env_url = "http://127.0.0.1:8000";
        this.#front_url_array = [];
        this.#back_url_array = [];
        this.#url_array = [];
        this.#idx = 0;
        this.#session_time = "";
        this.#round_time = "";
        this.#deck_id = "";
        this.#session_timer = "";
    }

    /**
     * Returns the singleton instance of the Session class.
     *
     * @return {Session} The singleton instance of the Session class.
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new Session();
        }
        return this.instance;
    }

    /**
     * Set the parameters for starting a session.
     *
     * @param {type} deck_id - the ID of the deck
     * @param {type} front_url_array - an array of front URLs
     * @param {type} back_url_array - an array of back URLs
     */
    set_session_Start_Params(deck_id) {
        this.#deck_id = deck_id;
        this.#session_url = this.get_session_url_from_deck_id(this.#deck_id);
    }

    bind_session_and_round_spans() {
        let session_Time_Toggle_Container =
            document.querySelector(".toggleSessionTime");
        let round_Time_Toggle_Container =
            document.querySelector(".toggleRoundTime");

        let session_Time_Span = document.createElement("span");
        let round_Time_Span = document.createElement("span");

        session_Time_Span.className = "togglerBoxOFF";
        session_Time_Span.textContent = "OFF";
        round_Time_Span.className = "togglerBoxOFF";
        round_Time_Span.textContent = "OFF";

        session_Time_Span.addEventListener("click", (event) => {
            if (session_Time_Span.className === "togglerBoxOFF") {
                session_Time_Span.className = "togglerBoxON";
                session_Time_Span.textContent = "ON";
                this.#session_settings.showSessionTimer = true;
            } else {
                session_Time_Span.className = "togglerBoxOFF";
                session_Time_Span.textContent = "OFF";
                this.#session_settings.showSessionTimer = false;
            }
        });

        round_Time_Span.addEventListener("click", (event) => {
            if (round_Time_Span.className == "togglerBoxOFF") {
                round_Time_Span.className = "togglerBoxON";
                round_Time_Span.textContent = "ON";
                this.#session_settings.showRoundTimer = true;
            } else {
                round_Time_Span.className = "togglerBoxOFF";
                round_Time_Span.textContent = "OFF";
                this.#session_settings.showRoundTimer = false;
            }
        });

        session_Time_Toggle_Container.appendChild(session_Time_Span);
        round_Time_Toggle_Container.appendChild(round_Time_Span);
    }

    /**
     * Asynchronously retrieves the session URL from a given deck ID.
     *
     * @param {type} deck_id - The ID of the deck.
     * @return {type} The result of the session URL retrieval.
     */
    async get_session_url_from_deck_id(deck_id) {
        let result = await this.get_request_for_deck_id(deck_id);
    }

    /**
     * Retrieves a request for the specified deck ID.
     *
     * @param {type} deck_id - The ID of the deck to retrieve the request for.
     * @return {Promise} A promise that resolves to the URL of the request.
     */
    get_request_for_deck_id(deck_id) {
        return new Promise((resolve, reject) => {
            axios
                .get("get_sess_url", {
                    params: {
                        deck_id: deck_id,
                    },
                })
                .then((response) => {
                    window.location.href = response.data.url;
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Binds event listeners and sets up session settings for rendering.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    bindRenders() {
        document.addEventListener("DOMContentLoaded", () => {
            this.#session_settings = {
                deck: "",
                cardColor: document.querySelector(".cardColor").value,
                cardFont: document.querySelector(".cardFont").value,
                fontSize: document.querySelector(".fontSize").value,
                fontWeight: document.querySelector(".howManyCards").value,
                fontColor: document.querySelector(".font_color").value,
                sessionTimer:
                    document.querySelector(".sessionTimeSelect").value,
                roundTimer: document.querySelector(".timePerRoundSelect").value,
                showSessionTimer: this.#session_settings.showSessionTimer,
                showRoundTimer: this.#session_settings.showRoundTimer,
            };

            /**
             * Binds a listener to an element specified by the selector.
             *
             * @param {string} selector - The CSS selector of the element.
             * @param {string} property - The name of the property to be updated in the session settings.
             */
            const bindListener = (selector, property) => {
                document
                    .querySelector(selector)
                    .addEventListener("change", (event) => {
                        this.#session_settings[property] = event.target.value;
                    });
            };

            bindListener(".cardColor", "cardColor");
            bindListener(".cardFont", "cardFont");
            bindListener(".fontSize", "fontSize");
            bindListener(".howManyCards", "fontWeight");
            bindListener(".font_color", "fontColor");
            bindListener(".sessionTimeSelect", "sessionTimer");
            bindListener(".timePerRoundSelect", "roundTimer");

            document
                .querySelector(".startSessFront")
                .addEventListener("click", (event) => {
                    let check_array = [];
                    const decks_inputs =
                        document.querySelectorAll(".radios_inner");

                    for (let deck of decks_inputs) {
                        if (deck.checked) {
                            check_array.push(deck);
                            this.#session_settings.deck = deck.id;
                        }
                    }
                    if (check_array.length == 0) {
                        alert("Please select a deck");
                        return;
                    } else if (check_array.length > 1) {
                        alert("Please select only one deck");
                        return;
                    }

                    axios
                        .get("/fession", { params: this.#session_settings })
                        .then((response) => {
                            this.set_session_Start_Params(
                                this.#session_settings.deck
                            );
                        });
                });
        });
    }

    create_front_buttons() {
        this.delete_buttons();
        let flipandskip = document.querySelector(".flipAndSkip");
        let skip = document.createElement("button");
        skip.type = "submit";
        skip.className = "skipButton";
        skip.innerHTML =
            '<span class="skipShadow"></span><span class="skipEdge"></span><span class="skipFront"><i class="fa-solid fa-forward fa-xl" style="color: #ffffff;"></i></span>';

        let flip = document.createElement("button");
        flip.type = "submit";
        flip.className = "flipButton";
        flip.innerHTML =
            '<span class="flipShadow"></span><span class="flipEdge"></span><span class="flipFront"><i class="fa-solid fa-repeat fa-xl" style="color: #004477;"></i></span>';

        flipandskip.appendChild(skip);
        flipandskip.appendChild(flip);
        this.bind_front_buttons();
    }

    create_back_buttons() {
        this.delete_buttons();
        let flipandskip = document.querySelector(".flipAndSkip");
        let incorrect = document.createElement("button");
        incorrect.type = "submit";
        incorrect.className = "incorrectButton";
        incorrect.innerHTML =
            '<span class="incorrectShadow"></span><span class="incorrectEdge"></span><span class="incorrectFront"><i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i></span>';

        let correct = document.createElement("button");
        correct.type = "submit";
        correct.className = "correctButton";
        correct.innerHTML =
            '<span class="correctShadow"></span><span class="correctEdge"></span><span class="correctFront"><i class="fa-solid fa-check fa-xl" style="color: #ffffff;"></i></span>';

        flipandskip.appendChild(incorrect);
        flipandskip.appendChild(correct);
        this.bind_back_buttons();
    }

    bind_front_buttons() {
        let skip = document.querySelector(".skipButton");
        skip.addEventListener("click", () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.skipped_array_manual.push(
                    this.#url_array[this.#idx]
                );
                console.log("skip:", this.#results.skipped_array_manual);
                this.#idx++;
                this.next_front();

                // Checking if session timer is CountDown instance
                if (this.#session_timer instanceof CountdownTimer) {
                    this.#session_timer.reset_round_timer();
                }
                this.create_front_buttons();
            } else {
                console.log("heading to results ");
                this.grab_results();
            }
        });
        let flip = document.querySelector(".flipButton");
        flip.addEventListener("click", () => {
            this.next_back();
            this.create_back_buttons();
        });
    }

    bind_back_buttons() {
        let incorrect = document.querySelector(".incorrectButton");
        incorrect.addEventListener("click", () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.incorrect_array.push(this.#url_array[this.#idx]);
                console.log("incorrect:", this.#results.incorrect_array);
                this.#idx++;
                this.next_front();
                this.#session_timer.reset_round_timer();
                this.create_front_buttons();

                if (this.#idx == this.#url_array.length) {
                    this.#session_timer.reset_round_timer();
                    this.grab_results();
                }
            }
        });
        let correct = document.querySelector(".correctButton");
        correct.addEventListener("click", () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.correct_array.push(this.#url_array[this.#idx]);
                console.log("correct:", this.#results.correct_array);
                this.#idx++;
                this.next_front();
                this.#session_timer.reset_round_timer();
                this.create_front_buttons();

                if (this.#idx == this.#url_array.length) {
                    this.#session_timer.reset_round_timer();
                    this.grab_results();
                }
            }
        });
    }

    async first_card() {
        let string = await this.get_next_front(this.#url_array[0][0].id);
        this.create_front_of_card(string);
    }

    async next_front() {
        if (this.#idx > this.#url_array.length - 1) {
            console.log("no more cards");
            return;
        }
        if (this.#idx == this.#url_array.length - 1) {
            console.log("last card");
        }
        let string = await this.get_next_front(
            this.#url_array[this.#idx][0].id
        );
        this.create_front_of_card(string);
    }

    async next_back() {
        let string = await this.get_next_back(this.#url_array[this.#idx][1].id);
        this.create_front_of_card(string);
    }

    async get_next_front(string) {
        return new Promise((resolve, reject) => {
            axios
                .get("/fetch_front/" + string)
                .then((response) => {
                    console.log(response);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    async get_next_back(string) {
        return new Promise((resolve, reject) => {
            axios
                .get("/fetch_back/" + string)
                .then((response) => {
                    console.log(response);
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    create_front_of_card(string) {
        let front_of_card = document.querySelector(".frontOfCard");
        front_of_card.innerHTML = string;
    }

    delete_buttons() {
        let flipandskip = document.querySelector(".flipAndSkip");
        flipandskip.innerHTML = "";
    }

    /**
     * This function checks the arrays.
     * and returns them from the database.
     *
     * @param {} - No parameters.
     * @return {} - No return value.
     */
    grab_url_arrays_and_timers_then_merge_and_start_session() {
        document.addEventListener("DOMContentLoaded", () => {
            axios
                .get("/fetch_arrays")
                .then((response) => {
                    console.log(response);
                    this.#back_url_array = response.data.backs;
                    this.#front_url_array = response.data.fronts;
                    this.#session_time = response.data.session_timer;
                    this.#round_time = response.data.round_timer;
                    this.#session_settings.showSessionTimer =
                        response.data.showSessTime == 1 ? true : false;
                    this.#session_settings.showRoundTimer =
                        response.data.showRoundTime == 1 ? true : false;

                    console.log(this.#session_settings);
                    this.merge_url_array();
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    merge_url_array() {
        for (let i = 0; i < this.#back_url_array.length; i++) {
            let card = [];
            card.push(this.#front_url_array[i]);
            card.push(this.#back_url_array[i]);
            this.#url_array.push(card);
        }
        this.session_main_loop();
    }

    async grab_results() {
        this.#results.correct = this.#results.correct_array.length;
        this.#results.incorrect = this.#results.incorrect_array.length;
        this.#results.skipped_manual =
            this.#results.skipped_array_manual.length;
        this.#results.skipped_latency =
            this.#results.skipped_array_latency.length;
        this.#results.number_of_cards_in_deck = this.#url_array.length;

        this.#results.skipped_total =
            this.#results.skipped_latency + this.#results.skipped_manual;
        this.#results.number_of_cards_viewed =
            this.#results.correct +
            this.#results.incorrect +
            this.#results.skipped_total;
        this.#results.totalRoundTime = parseInt(this.#round_time);
        this.#results.totalSessionTime = parseInt(this.#session_time);
        console.log(this.#results);
        let results = {
            sessTime: this.#results.totalSessionTime,
            roundTime: this.#results.totalRoundTime,
            correct: this.#results.correct,
            incorrect: this.#results.incorrect,
            skipped_manual: this.#results.skipped_manual,
            skipped_latency: this.#results.skipped_latency,
            skipped_total: this.#results.skipped_total,
            number_of_cards_viewed: this.#results.number_of_cards_viewed,
            number_of_cards_in_deck: this.#results.number_of_cards_in_deck,
        };

        console.log(this.#deck_id);
        console.log(await this.results_request(results));
    }

    async results_request(results) {
        return new Promise((resolve, reject) => {
            axios
                .post("save-results", results)
                .then((response) => {
                    console.log("response: ", response);
                    // window.location.href = response.data.url;
                    resolve(response);
                })
                .catch((error) => console.log(error));
        });
    }

    session_main_loop() {
        console.log(this.#session_timer);
        this.#session_timer = new CountdownTimer(
            this.#session_time * 1000,
            this.#round_time * 1000,
            (roundTimeLeft) => {
                console.log("round tick");
                if (this.#session_settings.showRoundTimer) {
                    let roundTimeSpan = document.querySelector(".roundTime");
                    console.log("round time: ", roundTimeLeft);
                    if (roundTimeLeft > 1) {
                        roundTimeSpan.innerHTML =
                            "<span>Round: " +
                            Math.ceil(roundTimeLeft / 1000) +
                            " seconds</span>";
                    } else {
                        roundTimeSpan.innerHTML =
                            "<span>Round: " +
                            Math.trunc(roundTimeLeft / 1000) +
                            " seconds</span>";
                    }
                }
            },

            () => {
                console.log("round over");
                this.#results.skipped_array_latency.push(
                    this.#url_array[this.#idx]
                );
                this.#idx++;
                this.next_front();
            },
            () => {
                console.log("starting timer");
            },
            (timeLeft) => {
                if (this.#session_settings.showSessionTimer) {
                    let sessionTimeSpan = document.querySelector(".totalTime");
                    sessionTimeSpan.innerHTML =
                        "<span>Session: " +
                        Math.trunc(timeLeft / 1000) +
                        " seconds</span>";
                }
                if (this.#idx == this.#url_array.length) {
                    this.#session_timer.stop();
                    this.grab_results();
                }
            },
            () => {
                this.grab_results();
                console.log("Time is up!");
                console.log("calculating score");
            }
        );
        console.log(this.#session_timer);

        this.#session_timer.test();

        this.first_card();
        this.#session_timer.start_with_many_rounds();
        console.log(this.#session_timer.toString());
        this.create_front_buttons();

        // while (i < this.#url_array.length) {
        //     let round_time = new CountdownTimer(
        //         this.#round_time * 1000,
        //         (round_time_left) => {
        //             let roundTimeSpan = document.querySelector(".roundTime");
        //             roundTimeSpan.innerHTML =
        //                 Math.ceil(round_time_left / 1000) + " seconds";
        //         },
        //         () => {
        //             console.log("round over!");
        //             this.next_card();
        //         }
        //     );
        //     round_time.start();
        //     i++;
        // }
    }
}

const SESSION = Session.getInstance();
export default SESSION;
