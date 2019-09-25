const EventEmitter = require('events').EventEmitter;

class Bank extends EventEmitter {
    constructor() {
        super();
        this.contrAgents = [];
        this.contrAgentsValidateRules = {
            'requireFields': [
                'name', 'balance'
            ],
            'requiredTypes': {
                name: 'string',
                balance: 'number'
            },
            'notEmpty': [
                'name'
            ],
            'minBalance': 0
        };

        this.registerListeners();
    }

    registerListeners() {
        this.onAddEvent();
        this.onGetEvent();
        this.onWithdrawEvent();
        this.registerErrorHandler();
        this.onSend();
        this.onChangeLimit();
    }

    onChangeLimit() {
        this.on('changeLimit', (personId, limit) => {
            let personKey = this.findPersonKey(personId);
            let person = this.contrAgents[personKey];

            person.contrAgent.limit = limit;

            // update person with the new limit
            this.contrAgents[personKey] = person;
        })
    }

    onSend() {
        this.on('send', (personFirstId, personSecondId, amount) => {
            // check amount if it positive
            if (amount <= 0) {
                this.emit('error', `Withdraw amount should be positive, "${amount}" was given`);
            }

            // withdraw from the first person
            this.emit('withdraw', personFirstId, amount);

            // add to the second person
            this.emit('add', personSecondId, amount);
        })
    }

    registerErrorHandler() {
        this.on('error', (errorMessage) => {
            throw new Error(errorMessage);
        })
    }

    onWithdrawEvent() {
        this.on('withdraw', (personId, amount) => {
            // check amount if it positive
            if (amount < 0) {
                this.emit('error', `Withdraw amount should be positive, "${amount}" was given`);
            }

            let personKey = this.findPersonKey(personId);
            let person = this.contrAgents[personKey];

            if ((person.contrAgent.balance - amount) < this.contrAgentsValidateRules.minBalance) {
                this.emit('error', `Balance after withdraw can't be negative.`);
            }

            let currentBalance = person.contrAgent.balance;

            person.contrAgent.balance = person.contrAgent.balance - amount;

            // check limit
            if (person.contrAgent.hasOwnProperty('limit')) {
                if (!person.contrAgent.limit(amount, currentBalance, person.contrAgent.balance)) {
                    this.emit('error', `Sorry the limit has been reached. limits: ${person.contrAgent.limit}`);
                }
            }

            // update contrAgent with new balance
            this.contrAgents[personKey] = person;
        })
    }

    onAddEvent() {
        this.on('add', (personId, amount) => {
            // check amount if it positive
            if (amount <= 0) {
                this.emit('error', `Withdraw amount should be positive and more than 0 , "${amount}" was given`);
            }

            let personKey = this.findPersonKey(personId);
            let person = this.contrAgents[personKey];

            person.contrAgent.balance = person.contrAgent.balance + amount;

            // update contrAgent with new balance
            this.contrAgents[personKey] = person;
        });
    }

    onGetEvent() {
        this.on('get', (personId, callback) => {
            let personKey = this.findPersonKey(personId);
            let person = this.contrAgents[personKey];

            callback(person.contrAgent.balance);
        })
    }

    findPersonKey(personId) {
        // search for a person
        let personKey = false;

        for (const [key, agent] of Object.entries(this.contrAgents)) {
            if (agent.personId === personId) {
                personKey = key;
                break;
            }
        }

        if (!personKey) {
            this.emit('error', `Person with personId: ${personId} was not found`);
        }

        return personKey;
    }

    register(contrAgent) {
        // validate contrAgent
        this.validate(contrAgent);

        // generate uniq personId
        let personId = this.generateId(10);

        // add contrAgent to the contrAgents array
        this.contrAgents.push({personId, contrAgent});

        return personId;
    }

    validate(contrAgent) {
        // validate required fields
        this.contrAgentsValidateRules.requireFields.forEach((key) => {
            if (!contrAgent.hasOwnProperty(key)) {
                this.emit('error', `ContrAgent doesn't have '${key}' property. ContrAgent: ${JSON.stringify(contrAgent)}`);
            }
        });

        // validate required types
        for (const [key, value] of Object.entries(this.contrAgentsValidateRules.requiredTypes)) {
            if (!(typeof contrAgent[key] === value)) {
                this.emit('error', `ContrAgent's '${key}' property is not a '${value}'. ContrAgent: ${JSON.stringify(contrAgent)}`);
            }
        }

        // validate empty fields
        this.contrAgentsValidateRules.notEmpty.forEach((key) => {
            if (!contrAgent[key]) {
                this.emit('error', `ContrAgent's '${key}' property can't be empty. ContrAgent: ${JSON.stringify(contrAgent)}`);
            }
        });

        // validate balance input
        if (contrAgent.balance < this.contrAgentsValidateRules.minBalance) {
            this.emit('error', `ContrAgent balance should more or equal: ${this.contrAgentsValidateRules.minBalance}`);
        }

        // validate contrAgent name uniq
        for (let agent of this.contrAgents) {
            if (agent.contrAgent.name === contrAgent.name) {
                this.emit('error', `ContrAgent with this name: ${contrAgent.name} already registered`);
            }
        }
    }

    generateId(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

const bank = new Bank();
const personId = bank.register({
    name: 'Oliver White',
    balance: 700,
    limit: amount => amount < 10
});

const personIdSecond = bank.register({
    name: 'Oliver White Second',
    balance: 700,
    limit: amount => amount < 10
});

// bank.emit('withdraw', personId, 5);
bank.emit('get', personId, (amount) => {
    console.log(`I have ${amount}₴`); // I have 695₴
});
// Вариант 1
// bank.emit('changeLimit', personId, (amount, currentBalance,
//                                     updatedBalance) => {
//     return amount < 100 && updatedBalance > 700;
// });
// bank.emit('withdraw', personId, 5); // Error
// done

// Вариант 2
// bank.emit('changeLimit', personId, (amount, currentBalance,
//                                     updatedBalance) => {
//     return amount < 100 && updatedBalance > 600 && currentBalance > 650;
// });
//
// bank.emit('get', personId, (amount) => {
//     console.log(`I have ${amount}₴`); // I have 695₴
// });
//
// bank.emit('send', personId, personIdSecond, 100);
// done


// Вариант 3
// bank.emit('changeLimit', personId, (amount, currentBalance) => {
//     return currentBalance > 800;
// });
// bank.emit('withdraw', personId, 500);
// done

// Вариант 4
bank.emit('changeLimit', personId, (amount, currentBalance,
                                    updatedBalance) => {
    return updatedBalance > 900;
});
// bank.emit('add', personId, 700); // Error
bank.emit('add', personId, 701);
bank.emit('withdraw', personId, 500);
// done

bank.emit('get', personId, (amount) => {
    console.log(`I have ${amount}₴`); // I have 695₴
});
