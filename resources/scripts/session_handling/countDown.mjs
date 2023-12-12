/**
 * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
 * I needed precise timing control for the session logic and the different skip, flip,
 * correct, and incorrect buttons on the front session page.
 */
class CountdownTimer {
    constructor(
        duration = 0,
        roundTime = 0,
        onRoundTick = () => {},
        onCompleteRound = () => {},
        onStart = () => {},
        onTick = () => {},
        onComplete = () => {}
    ) {
        /**
         * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
         * The below 5 data attributes are part of the original countdown
         * class that was sugggested by openai.com
         */
        this.duration = duration;
        this.onComplete = onComplete;
        this.timerId = null;
        this.endTime = null;
        this.onTick = onTick;

        /**
         * I added the rest of these attributes to include precision
         * and functionality for the rounds.
         */
        this.roundTime = roundTime;
        this.running = false;
        this.onStart = onStart;
        this.onRoundTick = onRoundTick;
        this.onCompleteRound = onCompleteRound;
        this.roundEndTime = null;
        this.remainingRound = null;
        this.roundTimerId = null;
        this.remaining = null;
        this.instance = null;
    }

    /**
     * I wrote this method to return the this.duration property.
     */
    get_duration() {
        return this.duration;
    }

    /**
     * I wrote this method which sets the duration.
     * @param {number} duration
     */
    set_duration(duration) {
        console.log("set duration");
        this.duration = duration;
    }

    /**
     * I wrote this method which sets the round Time.
     * @param {number} roundTime
     */
    set_round_time(roundTime) {
        this.roundTime = roundTime;
    }

    /**
     * I wrote this callback which sets the round tick callback.
     * @param {OnRoundTickCallback} onRoundTick
     */
    set_onRoundTick(onRoundTick) {
        this.onRoundTick = onRoundTick;
    }

    /**
     * I wrote this callback which sets on tick callback.
     * @param {OnTickCallback} onTick
     */
    set_onTick(onTick) {
        this.onTick = onTick;
    }

    /**
     * I wrote this callback which sets on complete round callback.
     * @param {OnCompleteRoundCallback} onCompleteRound
     */
    set_onCompleteRound(onCompleteRound) {
        this.onCompleteRound = onCompleteRound;
    }

    /**
     * I wrote this callback which sets on complete callback.
     * @param {OnCompleteCallback} onComplete
     */
    set_onComplete(onComplete) {
        this.onComplete = onComplete;
    }

    /**
     * I wrote this callback which sets on start callback.
     * @param {OnStartCallback} onStart
     */
    set_onStart(onStart) {
        this.onStart = onStart;
    }

    /**
     * I wrote this callback whih starts the round timer.
     * If the this.roundTime is truthy, it sets the this.roundEndTime to
     * the current time (performance.now()) plus the current roundTime in ms.
     * The round time id is then set to change at an interval of 10 every 10ms and then
     * the roundTick callback is called implicitly within the arrow function.
     */
    start_round_timer() {
        if (this.roundTime) {
            this.roundEndTime = performance.now() + this.roundTime;
            this.roundTimerId = setInterval(() => this.roundTick(), 10);
        }
    }

    /**
     * I wrote this method to restart the round timer with one method call.
     */
    reset_round_timer() {
        this.stop_current_round();
        this.start_round_timer();
    }

    /**
     * I wrote this method to stop the current round manuually by setting the clearing
     * the timer id and then setting it to null.
     */
    stop_current_round() {
        clearTimeout(this.roundTimerId);
        this.roundTimerId = null;
    }

    /**
     * I wrote this method ot to start many rounds that have concurrent round starts.
     * It includes an onStart callback.
     */
    start_with_many_rounds() {
        this.onStart();
        if (this.remaining) {
            this.duration = this.remaining;
        }
        this.start_round_timer();
        this.running = true;
        this.endTime = performance.now() + this.duration;
        this.timerId = setInterval(() => this.tick(), 10);
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * This is the original start method that was renamed for redundancy purposes.
     */
    start_just_total_timer() {
        this.onStart();
        if (this.remaining) {
            this.duration = this.remaining;
        }
        this.running = true;
        this.endTime = performance.now() + this.duration;
        this.timerId = setInterval(() => this.tick(), 10);
    }

    /**
     * I wrote this method.
     * It updates the remainingRound
     * to the round end time - the current time.
     * It then checks if the outer count down timer is running
     * or if the remaining round is less than or equal zero.
     * If so, then the roundTime interval is cleared ot and is restarted immediately.
     * Otherwise, it passes the remaining round time to the onRoundTick callback.
     *
     */
    roundTick() {
        this.remainingRound = this.roundEndTime - performance.now();
        if (!this.running || this.remainingRound <= 0) {
            clearInterval(this.roundTimerId);
            this.onCompleteRound();
            this.start_round_timer();
        } else {
            this.onRoundTick(this.remainingRound);
        }
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * This method is the original tick methix that the above method for round times uses
     * as a template.
     */
    tick() {
        this.remaining = this.endTime - performance.now();
        if (this.remaining <= 0) {
            clearInterval(this.timerId);
            this.running = false;
            this.onComplete();
        } else {
            this.onTick(this.remaining);
        }
    }

    /**
     * [1] “Chatgpt.” ChatGPT, openai.com/chatgpt.
     * This method was apart of the stop implementation of the original class.
     */
    stop() {
        this.running = false;
        clearInterval(this.timerId);
        clearInterval(this.roundTimerId);
        this.timerId = null;
    }

    /**
     * I wrote this method for debugging purposes.
     * It returns a format string for all of the current instantiated attributes.
     */
    toString() {
        return `this.remaining = ${this.remaining}
        this.remainingRound = ${this.remainingRound}
        this.roundTime = ${this.roundTime}
        this.roundEndTime = ${this.roundEndTime}
        this.roundTimerId = ${this.roundTimerId}
        this.running = ${this.running}
        this.endTime = ${this.endTime}
        this.timerId = ${this.timerId}
        this.duration = ${this.duration}
        this.onStart = ${this.onStart}
        this.onTick = ${this.onTick}
        this.onComplete = ${this.onComplete}
        this.onRoundTick = ${this.onRoundTick}
        this.onCompleteRound = ${this.onCompleteRound}
        `;
    }
}

export default CountdownTimer;
