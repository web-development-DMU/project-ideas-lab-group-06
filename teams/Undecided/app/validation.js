export function required(name, value) {
    if (!value) return `${name} is a required field`;
}

export function minLength(min) {
    return (name, value) => {
        if (value.length < min) {
            return `${name} must have at least ${min} characters`;
        }
    };
}

//can many types of validators, e.g. ones that make sure that your pasword has numbers in them etc
export function validateField(name, value, validators) {
    for (const validator of validators) {
        const error = validator(name, value);
        if (error) return error;
    }
}

export function validateSchema(formData, schema) {
    const validated = {};
    const entries = Object.entries(schema);
    let isValid = true;
    const errorEntries = entries.map(([key, { validators, displayName }]) => {
        const value = formData.get(key);
        const message = validateField(displayName || key, value, validators) ||
            "";
        if (message) {
            isValid = false;
        } else {
            validated[key] = value;
        }
        return [key, { value, message, error: !!message }];
        //!!message -> converts message to boolean value, if its not ? twice
    });
    const errors = Object.fromEntries(errorEntries);
    return { isValid, errors, validated };
}
