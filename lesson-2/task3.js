class TimersManager {
    constructor() {
        this.timers = [];
        this.timerValidateRules = {
            'requireFields': [
                'name', 'delay', 'interval', 'job'
            ],
            'requiredTypes': {
                name: 'string',
                delay: 'number',
                interval: 'boolean',
                job: 'function'
            },
            'notEmpty': [
                'name'
            ],
            'delayRange': {
                min: 0,
                max: 5000
            }
        };
        this.logs = [];
    }

    validate(timer) {
        // validate required fields
        this.timerValidateRules.requireFields.forEach((key) => {
            if (!timer.hasOwnProperty(key)) {
                throw new Error(`Timer doesn't have '${key}' property. Timer: ${JSON.stringify(timer)}`);
            }
        });

        // validate required types
        for (const [key, value] of Object.entries(this.timerValidateRules.requiredTypes)) {
            if (!(typeof timer[key] === value)) {
                throw new Error(`Timer's '${key}' property is not a '${value}'. Timer: ${JSON.stringify(timer)}`);
            }
        }

        // validate empty fields
        this.timerValidateRules.notEmpty.forEach((key) => {
            if (!timer[key]) {
                throw new Error(`Timer's '${key}' property can't be empty. Timer: ${JSON.stringify(timer)}`);
            }
        });

        // validate delay range
        if (timer.delay > this.timerValidateRules.delayRange.max || timer.delay < this.timerValidateRules.delayRange.min) {
            throw new Error(`Timer's delay property not on range from ${this.timerValidateRules.delayRange.min} ` +
                `to ${this.timerValidateRules.delayRange.max}. Timer: ${JSON.stringify(timer)}`);
        }

        // validate if timer was added before
        this.timers.forEach((savedTimer) => {
            if (savedTimer.input.name === timer.name) {
                throw new Error(`Timer with name '${timer.name}' was already added. Timer: ${JSON.stringify(timer)}`);
            }
        })
    }

    add(timer, ...args) {
        // validate timer
        this.validate(timer);

        // add timer to the timers array
        this.timers.push({input: timer, inputArguments: args});

        return this;
    }

    remove(name) {
        // search, stop and remove timer
        for (const [key, value] of Object.entries(this.timers)) {
            if (value.input.name === name) {
                // pause before remove
                this.pause(name);

                // remove from timers
                delete this.timers[key];
            }
        }
    }

    start() {
        // start all timers
        this.timers.forEach((timer) => {
            this.resume(timer.input.name);
        })
    }

    stop() {
        // search and stop all timers
        this.timers.forEach((timer) => {
            this.pause(timer.input.name);
        });
    }

    pause(name) {
        // search and pause
        for (const [key, value] of Object.entries(this.timers)) {
            let timer = value;
            if (timer.input.name === name) {
                if (timer.input.interval) {
                    // stop by clearInterval
                    clearInterval(timer.timerId)
                } else {
                    // stop by clearTimeout
                    clearTimeout(timer.timerId)
                }

                // unset timerId if exist
                if (timer.hasOwnProperty('timerId')) {
                    delete timer.timerId;
                }

                // update timers without timerId
                this.timers[key] = timer;
            }
        }
    }

    resume(name) {
        // resume timer
        for (const [key, value] of Object.entries(this.timers)) {
            let timer = value;
            if (timer.input.name === name) {
                if (timer.input.interval) {
                    // start setInterval
                    timer.timerId = setInterval(() => {
                        // getting and logging result
                        try {
                            let result = timer.input.job(...timer.inputArguments);
                            this._log(timer, result);

                            return result;
                        } catch (e) {
                            this._log(timer, e);
                        }
                    }, timer.input.delay);
                } else {
                    // start setTimeout
                    timer.timerId = setTimeout(() => {
                        // getting and logging result
                        try {
                            let result = timer.input.job(...timer.inputArguments);
                            this._log(timer, result);

                            return result;
                        } catch (e) {
                            this._log(timer, e);
                        }
                    }, timer.input.delay);
                }

                // update timers with timerId
                this.timers[key] = timer;
            }
        }
    }

    _log(timer, result) {
        if (timer) {
            let data = new Date().toISOString();
            if (result instanceof Error) {
                this.logs.push({
                    name: timer.input.name,
                    in: timer.inputArguments,
                    out: result,
                    error: {
                        name: result.name,
                        message: result.message,
                        stack: result.stack,

                    },
                    created: data
                })
            } else {
                this.logs.push({
                    name: timer.input.name,
                    in: timer.inputArguments,
                    out: result,
                    created: data
                })
            }
        }
    }

    print() {
        return JSON.stringify(this.logs);
    }
}

const manager = new TimersManager();

const t1 = {
    name: 't1',
    delay: 1000,
    interval: false,
    job: (a, b) => a + b
};

function throwException() {
    throw new Error('We have a problem!');
}

const t2 = {
    name: 't2',
    delay: 1000,
    interval: false,
    job: throwException
};
const t3 = {
    name: 't3',
    delay: 1000,
    interval: false,
    job: n => n
};
manager.add(t1, 1, 2); // 3
manager.add(t2); // undefined
manager.add(t3, 1); // 1
manager.start();

setTimeout(() => {
    console.log(manager.print());
}, 2000);
