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
        // resume/start timer
        for (const [key, value] of Object.entries(this.timers)) {
            let timer = value;
            if (timer.input.name === name) {
                if (timer.input.interval) {
                    // start setInterval
                    timer.timerId = setInterval(timer.input.job, timer.input.delay, ...timer.inputArguments);
                } else {
                    // start setTimeout
                    timer.timerId = setTimeout(timer.input.job, timer.input.delay, ...timer.inputArguments);
                }

                // update timers with timerId
                this.timers[key] = timer;
            }
        }
    }
}

const manager = new TimersManager();

const t1 = {
    name: 't1',
    delay: 2000,
    interval: false,
    job: () => {
        console.log('t1')
    }
};
const t2 = {
    name: 't2',
    delay: 2000,
    interval: false,
    job: (a, b) => {
        console.log(a + b)
    }
};
const t3 = {
    name: 't3',
    delay: 3000,
    interval: true,
    job: () => {
        console.log('t3')
    }
};
const t4 = {
    name: 't4',
    delay: 3000,
    interval: true,
    job: () => {
        console.log('t4')
    }
};
manager.add(t1);
manager.add(t2, 1, 2);
manager.add(t3).add(t4);
manager.start();
setTimeout(function () {
    console.log('remove t3');
    manager.remove('t3');
}, 4000);
setTimeout(function () {
    console.log('pause t4');
    manager.pause('t4');
}, 5000);
setTimeout(function () {
    console.log('resume t4');
    manager.resume('t4');
}, 9000);
setTimeout(function () {
    console.log('stop all');
    manager.stop();
}, 15000);
console.log(1);
