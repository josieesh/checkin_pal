import { validateRegistration } from "./validators"

function formatRegistrationBody(form) {
    errors = validateRegistration(form);
    if (errors.length != 0) {
        throw errors;
    }
    const { firstName, lastName, sin, password, username} = form
    return {
        "first_name": firstName,
        "last_name": lastName,
        "sin": sin,
        "username": username,
        "password": password
    }
}

export {
    formatRegistrationBody
}