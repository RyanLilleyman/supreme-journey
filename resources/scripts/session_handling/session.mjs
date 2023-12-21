import axios from "axios";
/**
 * [33]“Generate a UUID in JavaScript,” www.uuidgenerator.net.
 *  https://www.uuidgenerator.net/dev-corner/javascript#:~:text=The%20JavaScript%20library%20we%20recommend
 *  (accessed Dec. 17, 2023).
 * For the below import.
 */
import { v4 as uuidv4 } from "uuid";
import CountdownTimer from "./countDown.mjs";

/**
 * I wrote this class to handle session logic.
 */
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
    #results_uuid_set;
    #skip_check;

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
        this.#results_uuid_set = false;
        this.#skip_check = false;
    }

    /**
     * I wrote this method which returns the singleton instance of the Session class.
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
     * I wrote this method which sets the parameters for starting a session.
     *
     * @param {type} deck_id - the ID of the deck
     * @param {type} front_url_array - an array of front URLs
     * @param {type} back_url_array - an array of back URLs
     */
    set_session_Start_Params(deck_id) {
        this.#deck_id = deck_id;
        this.#session_url = this.get_session_url_from_deck_id(this.#deck_id);
    }

    /**
     * I wrote this method which binds session and round spans to their respective toggle containers.
     *
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
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
            if (this.#session_settings.sessionTimer > 0) {
                if (session_Time_Span.className === "togglerBoxOFF") {
                    session_Time_Span.className = "togglerBoxON";
                    session_Time_Span.textContent = "ON";
                    this.#session_settings.showSessionTimer = true;
                } else {
                    session_Time_Span.className = "togglerBoxOFF";
                    session_Time_Span.textContent = "OFF";
                    this.#session_settings.showSessionTimer = false;
                }
            } else {
                alert("Please select a session time.");
            }
        });

        round_Time_Span.addEventListener("click", (event) => {
            if (this.#session_settings.roundTimer > 0) {
                if (round_Time_Span.className == "togglerBoxOFF") {
                    round_Time_Span.className = "togglerBoxON";
                    round_Time_Span.textContent = "ON";
                    this.#session_settings.showRoundTimer = true;
                } else {
                    round_Time_Span.className = "togglerBoxOFF";
                    round_Time_Span.textContent = "OFF";
                    this.#session_settings.showRoundTimer = false;
                }
            } else {
                alert("Please select a round time.");
            }
        });

        session_Time_Toggle_Container.appendChild(session_Time_Span);
        round_Time_Toggle_Container.appendChild(round_Time_Span);
    }

    /**
     * I wrote this method asynchronously retrieves the session URL from a given deck ID.
     *
     * @param {type} deck_id - The ID of the deck.
     * @return {type} The result of the session URL retrieval.
     */
    async get_session_url_from_deck_id(deck_id) {
        let result = await this.get_request_for_deck_id(deck_id);
    }

    /**
     * I wrote this method which retrieves a request for the specified deck ID.
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
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * I wrote thie method which binds event listeners and sets up session settings for rendering.
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
             * [2] Codeium · Free AI Code Completion &amp; Chat, codeium.com/.
             *
             * This method originally bound every listener to the above property of the
             * session settings object. It was refactored for simplicity.
             *
             * @param {string} selector - The CSS selector of the element.
             * @param {string} property - The name of the property to be updated in the session settings.
             */
            const bindListener = (selector, property) => {
                if (selector == ".fontSize") {
                    document
                        .querySelector(".fontSizeText")
                        .addEventListener("change", (e) => {
                            const outer_key = e.target.value;
                            const inner_size =
                                document.querySelector(".fontSize");
                            inner_size.value = outer_key;
                        });

                    document
                        .querySelector(selector)
                        .addEventListener("change", (event) => {
                            const outer_size =
                                document.querySelector(".fontSizeText");
                            outer_size.value = event.target.value;
                            this.#session_settings[property] =
                                event.target.value + "px";
                            console.log(this.#session_settings[property]);
                        });
                    return;
                }

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

    /**
     * I wrote this method which creates front buttons for the UI.
     *
     * @return {void}
     */
    create_front_buttons() {
        this.delete_buttons();
        let flipandskip = document.querySelector(".flipAndSkip");
        let skip = document.createElement("button");
        skip.type = "submit";
        skip.className = "skipButton";
        skip.innerHTML =
            '<span class="skipShadow"></span><span class="skipEdge"></span><span class="skipFront">Skip</span>';

        //<i class="fa-solid fa-forward fa-xl" style="color: #ffffff;"></i>
        let flip = document.createElement("button");
        flip.type = "submit";
        flip.className = "flipButton";
        flip.innerHTML =
            '<span class="flipShadow"></span><span class="flipEdge"></span><span class="flipFront">Flip</span>';

        flipandskip.appendChild(skip);
        flipandskip.appendChild(flip);
        this.bind_front_buttons();
    }

    /**
     * I wrote this method which create back buttons for the UI.
     */
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

    /**
     * I wrote this method to handle the below functinality.
     * Binds event listeners to the front buttons.
     *
     * The click event on the "skip" button adds the current URL to the "skipped_array_manual" array, increments the
     * index, calls the "next_front" function, and resets the round timer if applicable. It then creates the front
     * buttons.
     *
     * The click event on the "flip" button calls the "next_back" function and creates the back buttons.
     */
    bind_front_buttons() {
        let skip = document.querySelector(".skipButton");
        skip.addEventListener("click", async () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.skipped_array_manual.push(
                    this.#url_array[this.#idx]
                );
                if (this.#idx == this.#url_array.length - 1) {
                    this.#skip_check = true;
                    this.grab_results();
                }
                this.#idx++;
                await this.next_front();
                // Checking if session timer is CountDown instance
                if (this.#session_timer instanceof CountdownTimer) {
                    this.#session_timer.reset_round_timer();
                }
                this.create_front_buttons();
            }
        });
        let flip = document.querySelector(".flipButton");
        flip.addEventListener("click", async () => {
            await this.next_back();
            this.create_back_buttons();
        });
    }

    /**
     * I wrote this method to bind different callbacks to the incorrect and correct buttons.
     *
     * The click event for the incorrect button pushes the current url onto the incorrect
     * array. It then increments the index, renders the next front, resets the round timer,
     * and then create the front buttons again.
     *
     * The click event for the correct button does the same thing
     * but with the correct array.
     */
    bind_back_buttons() {
        let incorrect = document.querySelector(".incorrectButton");
        incorrect.addEventListener("click", async () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.incorrect_array.push(this.#url_array[this.#idx]);
                this.#idx++;
                await this.next_front();
                // Checking if session timer is CountDown instance
                if (this.#session_timer instanceof CountdownTimer) {
                    this.#session_timer.reset_round_timer();
                }
                this.create_front_buttons();

                if (this.#idx == this.#url_array.length) {
                    // Checking if session timer is CountDown instance
                    if (this.#session_timer instanceof CountdownTimer) {
                        this.#session_timer.reset_round_timer();
                    }
                    this.grab_results();
                }
            }
        });
        let correct = document.querySelector(".correctButton");
        correct.addEventListener("click", async () => {
            if (this.#idx < this.#url_array.length) {
                this.#results.correct_array.push(this.#url_array[this.#idx]);
                this.#idx++;
                await this.next_front();
                if (this.#session_timer instanceof CountdownTimer) {
                    this.#session_timer.reset_round_timer();
                }
                this.create_front_buttons();

                if (this.#idx == this.#url_array.length) {
                    // Checking if session timer is CountDown instance
                    if (this.#session_timer instanceof CountdownTimer) {
                        this.#session_timer.reset_round_timer();
                    }
                    this.grab_results();
                }
            }
        });
    }

    /**
     * I wrote this asynchronous method to return the first cards front uuid
     * It generated the first card upon loading.
     */
    async first_card() {
        let string = await this.get_next_front(this.#url_array[0][0].id);
        this.create_front_of_card(string);
    }

    /**
     * I wrote this asynchronous method to return the next front card from the url array.
     */
    async next_front() {
        if (this.#idx > this.#url_array.length - 1) {
            return;
        }
        if (this.#idx == this.#url_array.length - 1) {
        }
        let string = await this.get_next_front(
            this.#url_array[this.#idx][0].id
        );
        this.create_front_of_card(string);
    }

    /**
     * I wrote this method to grab the next back_card.html from the server with the
     * back url.
     */
    async next_back() {
        let string = await this.get_next_back(this.#url_array[this.#idx][1].id);
        this.create_front_of_card(string);
    }

    /**
     * I wrote this method to grab the next front_card from the url string.
     */
    async get_next_front(string) {
        return new Promise((resolve, reject) => {
            axios
                .get("/fetch_front/" + string)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    /**
     * Same as above.
     */
    async get_next_back(string) {
        return new Promise((resolve, reject) => {
            axios
                .get("/fetch_back/" + string)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    /**
     * I wrote this method to create the front of the card. It actively renders the
     * content with the input html string.
     */
    create_front_of_card(string) {
        let front_of_card = document.querySelector(".frontOfCard");
        front_of_card.innerHTML = string;
    }

    /**
     * I wrote this method which deletes the buttons from the viewport. It isn't used anywhere in the code.
     */
    delete_buttons() {
        let flipandskip = document.querySelector(".flipAndSkip");
        flipandskip.innerHTML = "";
    }

    /**
     * I wrote this method which is the starting point for fetching the url arrays from the database.
     * It then uses the merge method to place them in a single url array.
     */
    grab_url_arrays_and_timers_then_merge_and_start_session() {
        document.addEventListener("DOMContentLoaded", () => {
            axios
                .get("/fetch_arrays")
                .then((response) => {
                    this.#back_url_array = response.data.backs;
                    this.#front_url_array = response.data.fronts;
                    this.#session_time = response.data.session_timer;
                    this.#round_time = response.data.round_timer;
                    this.#session_settings.showSessionTimer =
                        response.data.showSessTime == 1 ? true : false;
                    this.#session_settings.showRoundTimer =
                        response.data.showRoundTime == 1 ? true : false;

                    this.merge_url_array();
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }

    /**
     * I wrote this to merge this.#front_url_array with this.#back_url_array.
     */
    merge_url_array() {
        for (let i = 0; i < this.#back_url_array.length; i++) {
            let card = [];
            card.push(this.#front_url_array[i]);
            card.push(this.#back_url_array[i]);
            this.#url_array.push(card);
        }

        if (this.#round_time > 0 && this.#session_time > 0) {
            this.session_main_loop();
        } else if (this.#session_time > 0 && this.#round_time == 0) {
            this.session_no_round_main_loop();
        } else {
            this.session_indefinite();
        }
    }

    /**
     * I wrote this asynchronous method to grab the statistics of the
     * session and place them into the this.#results object.
     */
    async grab_results() {
        for (this.#idx; this.#idx < this.#url_array.length; this.#idx++) {
            if (!this.#skip_check) {
                this.#results.skipped_array_latency.push(
                    this.#url_array[this.#idx]
                );
            }
        }

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
        /**
         * [33]“Generate a UUID in JavaScript,” www.uuidgenerator.net. https://www.uuidgenerator.net/dev-corner/javascript#:~:text=The%20JavaScript%20library%20we%20recommend (accessed Dec. 17, 2023).
         * Used to generate the below uuid.
         */
        let results_uuid = "";
        if (!this.#results_uuid_set) {
            results_uuid = uuidv4();
            let results = {
                results_id: results_uuid,
                sessTime: this.#results.totalSessionTime,
                roundTime: this.#results.totalRoundTime,
                correct: this.#results.correct,
                incorrect: this.#results.incorrect,
                skipped_manual: this.#results.skipped_manual,
                skipped_latency: this.#results.skipped_latency,
                skipped_total: this.#results.skipped_total,
                number_of_cards_viewed: this.#results.number_of_cards_viewed,
                number_of_cards_in_deck: this.#results.number_of_cards_in_deck,
                skipped_array_latency: this.#results.skipped_array_latency,
                skipped_array_manual: this.#results.skipped_array_manual,
                correct_array: this.#results.correct_array,
                incorrect_array: this.#results.incorrect_array,
            };
            let rel = await this.results_request(results);
            this.#results_uuid_set = true;
        } else {
            alert("Results are being processed.");
        }
    }

    /**
     * I wrote this function to send the results to the server and place them into
     * inside a newly created result.view.
     */
    async results_request(results) {
        return new Promise((resolve, reject) => {
            axios
                .post("save-results", results)
                .then((response) => {
                    window.location.href = response.data.url;
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * I wrote this method to instantiate a new instance of the CountdownTimer
     * and then set the various properties of the timer from the session setting. It handles
     * all necessary timing events. It also displays the current round time and session time
     * if the show boolean is truthy.
     */
    session_main_loop() {
        this.#session_timer = new CountdownTimer(
            this.#session_time * 1000,
            this.#round_time * 1000,
            (roundTimeLeft) => {
                if (this.#session_settings.showRoundTimer) {
                    let roundTimeSpan = document.querySelector(".roundTime");
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
                this.#results.skipped_array_latency.push(
                    this.#url_array[this.#idx]
                );
                this.#idx++;
                this.create_front_buttons();
                this.next_front();
            },
            () => {},
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
            }
        );
        this.first_card();
        this.#session_timer.start_with_many_rounds();
        this.create_front_buttons();
    }
    /**
     * This method is for no round time.
     */
    session_no_round_main_loop() {
        this.#session_timer = new CountdownTimer(
            this.#session_time * 1000,
            0,
            () => {},
            () => {},
            () => {},
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
            }
        );
        this.first_card();
        this.#session_timer.start_just_total_timer();
        this.create_front_buttons();
    }

    session_indefinite() {
        this.first_card();
        this.create_front_buttons();
    }
}

/**
 * I wrote the below assignment statement to generate a SESSION singleton.
 */
const SESSION = Session.getInstance();
export default SESSION;
