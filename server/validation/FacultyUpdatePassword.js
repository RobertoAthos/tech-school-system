const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyUpdatePassword = (data) => {
    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Senha antiga é obrigatório';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Senha deve conter pelo menos 6 catactéres';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'Nova senha é obrigatório';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirmar nova senha é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyUpdatePassword