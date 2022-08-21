const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyRegisterInput = (data) => {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.designation = !isEmpty(data.designation) ? data.designation : '';
    data.dob = !isEmpty(data.dob) ? data.dob : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Nome deve ter de 2 à 30 caractéres';
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
    if (Validator.isEmpty(data.designation)) {
        errors.designation = 'Função é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyRegisterInput