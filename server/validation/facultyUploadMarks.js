const Validator = require('validator');
const isEmpty = require('./is-empty');


const validateFacultyUploadMarks = (data) => {
    let errors = {}
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    data.exam = !isEmpty(data.exam) ? data.exam : '';
    data.totalMarks = !isEmpty(data.totalMarks) ? data.totalMarks : '';

    if (Validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'Código da matéria é obrigatório';
    }

    if (Validator.isEmpty(data.exam)) {
        errors.exam = 'Matéria é obrigatório';
    }
    if (Validator.isEmpty(data.totalMarks)) {
        errors.totalMarks = 'Valor da prova é obrigatório';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateFacultyUploadMarks