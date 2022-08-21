const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateUserUpdatePassword = (data) => {
    let errors = {}
    data.email = !isEmpty(data.email) ? data.email : '';


    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email inválido';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateUserUpdatePassword