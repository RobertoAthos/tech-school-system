const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateStudentUpdatePassword = (data) => {
    let errors = {}
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';
   
    if (data.newPassword !== data.confirmNewPassword) {
        errors.confirmNewPassword = 'Senhas não se coincidem';
    }

    if (Validator.isEmpty(data.confirmNewPassword)) {
        errors.confirmNewPassword = 'Confirmar nova senha é obrigatória';
    }
    


    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Senha antiga é obrigatória';
    }

    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Nova senha deve conter de 6 à 30 caractéres';
    }

    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'Nova senha é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateStudentUpdatePassword