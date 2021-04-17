import Validator from 'validator';

export default function validateRegister(data) {
    let errors = {};
    const email = data.email ? data.email : "";
    const password = data.password ? data.password : "";
    const repassword = data.repassword ? data.repassword : "";
        
    // user name
    if(Validator.isEmpty(email, {ignore_whitespace: true})) {
        errors.email = "To pole jest obowiązkowe!";
    } else if(!Validator.isEmail(email)) {
        errors.email = "Niepoprawny adres e-mail!";
    }

    // password
    if(Validator.isEmpty(password, {ignore_whitespace: true})) {
        errors.password = "To pole jest obowiązkowe!";
    } else if(!Validator.isLength(password, {min: 6, max: 128})) {
        errors.password = "Hasło musi mieć od 8 do 128 znaków!";
    } else if(!Validator.equals(password, repassword)) {
        errors.password = "Hasła do siebie nie pasują!";
        errors.repassword = "Hasła do siebie nie pasują!";
    }

    if(Validator.isEmpty(repassword, {ignore_whitespace: true})) {
        errors.repassword = "To pole jest obowiązkowe!";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0 ? true: false
    }
}