import Validator from 'validator';

export default function validateLogin(data) {
    let errors = {};
    const email = data.email ? data.email : "";
    const password = data.password ? data.password : "";
        
    // user name
    if(Validator.isEmpty(email, {ignore_whitespace: true})) {
        errors.email = "To pole jest obowiązkowe!";
    } else if(!Validator.isEmail(email)) {
        errors.email = "Niepoprawny adres e-mail!";
    }

    // password
    if(Validator.isEmpty(password, {ignore_whitespace: true})) {
        errors.password = "To pole jest obowiązkowe!";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 ? true: false
    }
}