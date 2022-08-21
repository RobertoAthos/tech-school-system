const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateAdminRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Nome deve ter de 2 à 30 caractéres';
    }
    if (!Validator.isLength(data.contactNumber, { min: 5, max: 10 })) {
        errors.contactNumber = 'Número de contato deve ter no máximo 10 dígitos';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Nome é obrigatório';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email inválido';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email é obrigatório';
    }
    if (Validator.isEmpty(data.department)) {
        errors.department = 'Departamento é obrigatório';
    }
    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'Data de entrada é obrigatório';
    }
    if (Validator.isEmpty(data.contactNumber)) {
        errors.contactNumber = 'Número de contato é obrigatório';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}


module.exports = validateAdminRegisterInput