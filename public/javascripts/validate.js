function isEmail(email) {
    var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}

function isAllowedFormat(password) {
    // at least 8 digits with uppercase letter, number, and lowercase letter
    var reg = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return reg.test(password);
}

function isRequired(content) {
    return String(content).length > 0
}