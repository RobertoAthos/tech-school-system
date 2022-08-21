const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateOTP = (data) => {
    let errors = {}
    data.otp = !isEmpty(data.otp) ? data.otp : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


    if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
        errors.newPassword = 'Senha deve conter pelo menos 6 caractéres';
    } 

    if (!Validator.isLength(data.otp, { min: 6, max: 6})) {
        errors.otp = 'Código de verificação deve conter no mínimo 6 caractéres ';
    } 

    if (Validator.isEmpty(data.otp)) {
        errors.otp = 'Código de verificação é obrigatório';
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

module.exports = validateOTP