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

            person.contrAgent.balance = person.contrAgent.balance - amount;

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
    name: 'Pitter White',
    balance: 100
});
bank.emit('add', personId, 20);
bank.emit('get', personId, (balance) => {
    console.log(`I have ${balance}$`);
});
bank.emit('withdraw', personId, 50);
bank.emit('get', personId, (balance) => {
    console.log(`I have ${balance}$`)
});
