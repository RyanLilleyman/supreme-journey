// chat gpt for precise countdown suggestions and elegant callback handling
class CountdownTimer {
    /**
     * I added roundTime functionality, related callbacks, and onStart callback
     * I also added different start, reset, and stop functions
     * @param {Duration} duration
     * @param {RoundTime} roundTime
     * @param {OnRoundTickCallback} onRoundTick
     * @param {OnCompleteRoundCallback} onCompleteRound
     * @param {OnStartCallback} onStart
     * @param {OnTickCallback} onTick
     * @param {OnCompleteCallback} onComplete
     */
    constructor(
        duration = 0,
        roundTime = 0,
        onRoundTick = () => {},
        onCompleteRound = () => {},
        onStart = () => {},
        onTick = () => {},
        onComplete = () => {}
    ) {
        this.roundTime = roundTime;
        this.running = false;
        this.onStart = onStart;
        this.duration = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.onRoundTick = onRoundTick;
        this.onCompleteRound = onCompleteRound;
        this.roundEndTime = null;
        this.timerId = null;
        this.endTime = null;
        this.remaining = null;
        this.remainingRound = null;
        this.roundTimerId = null;
        this.instance = null;
    }

    get_duration() {
        return this.duration;
    }

    /**
     * Sets the duration.
     * @param {number} duration
     */
    set_duration(duration) {
        console.log("set duration");
        this.duration = duration;
    }

    /**
     * Sets the round Time.
     * @param {number} roundTime
     */
    set_round_time(roundTime) {
        this.roundTime = roundTime;
    }

    test() {
        console.log("TEST");
    }

    /**
     * Sets the round tick callback.
     * @param {OnRoundTickCallback} onRoundTick
     */
    set_onRoundTick(onRoundTick) {
        this.onRoundTick = onRoundTick;
    }

    /**
     * Sets on tick callback.
     * @param {OnTickCallback} onTick
     */
    set_onTick(onTick) {
        this.onTick = onTick;
    }

    /**
     * Sets on complete round callback.
     * @param {OnCompleteRoundCallback} onCompleteRound
     */
    set_onCompleteRound(onCompleteRound) {
        this.onCompleteRound = onCompleteRound;
    }

    /**
     * Sets on complete callback.
     * @param {OnCompleteCallback} onComplete
     */
    set_onComplete(onComplete) {
        this.onComplete = onComplete;
    }

    /**
     * Sets on start callback.
     * @param {OnStartCallback} onStart
     */
    set_onStart(onStart) {
        this.onStart = onStart;
    }

    start_round_timer() {
        if (this.roundTime) {
            this.roundEndTime = performance.now() + this.roundTime;
            this.roundTimerId = setInterval(() => this.roundTick(), 10);
        }
    }

    reset_round_timer() {
        this.stop_current_round();
        this.start_round_timer();
    }

    stop_current_round() {
        clearTimeout(this.roundTimerId);
        this.roundTimerId = null;
    }

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

    start_just_total_timer() {
        this.onStart();
        if (this.remaining) {
            this.duration = this.remaining;
        }
        this.running = true;
        this.endTime = performance.now() + this.duration;
        this.timerId = setInterval(() => this.tick(), 10);
    }

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

    stop() {
        this.running = false;
        clearInterval(this.timerId);
        clearInterval(this.roundTimerId);
        this.timerId = null;
    }
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
