function isValidSIN(sin) {
    var pattern = new RegExp("^\\d{9}$");
    return sin.match(pattern);
}

function validateRegistration(form) {
    errors = []
    const { firstName, lastName, sin, password, confirmPassword, username} = form
    if (!firstName) errors.push("First name required")
    if (!lastName) errors.push("Last name required")
    if (! sin) errors.push("Social Insurance Number required")
    if (!password) errors.push("Password required")
    if (! confirmPassword) errors.push("Please confirm password")
    if (!username) errors.push("Username required")

    if (errors.length == 0) {
        if (!isValidSIN(sin)) errors.push("Invalid Social Insurance Number")
        else if (password !== confirmPassword) errors.push("Passwords do not match")
    }
    setTimeout(4000);
    return errors;
}

module.exports = {
    validateRegistration
}