class Validator {
    constructor(requiredFields = null) {
        this.requiredFields = requiredFields || ['name', 'email', 'password'];
    }

    isInvalid(customer) {
        for (const [key, value] of Object.entries(customer)) {
            if (typeof value !== 'string' || value === "") {
                return `Customer field ${key} should be non-empty string`;
            }

            if (!this.requiredFields.includes(key)) {
                return `Customer object contains disallowed field ${key}`;
            }
        }

        if (Object.keys(customer).length !== this.requiredFields.length) {
            return `Customer object does not contain all necessary fields`;
        }

        return false;
    }
}

module.exports = Validator;
