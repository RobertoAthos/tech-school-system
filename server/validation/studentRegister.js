const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.section = !isEmpty(data.section) ? data.section : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.year = !isEmpty(data.year) ? data.year : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Nome deve conter de 2 à 30 caractéres';
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

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Ano é obrigatório';
    }

    if (Validator.isEmpty(data.section)) {
        errors.section = 'Período é obrigatório';
    }

    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'Data de entrada é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentRegisterInput