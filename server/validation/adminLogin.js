const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateAdminLoginInput = (data) => {
    let errors = {}
    data.registrationNumber = !isEmpty(data.registrationNumber) ? data.registrationNumber : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isLength(data.registrationNumber, { min: 2, max: 50 })) {
        errors.registrationNumber = 'Número de Registro deve ter de 5 à 50 caractéres';
    }

    if (Validator.isEmpty(data.registrationNumber)) {
        errors.registrationNumber = 'Número de Registro invalido';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Senha inválida';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateAdminLoginInput 