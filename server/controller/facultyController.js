const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/nodemailer')
const Student = require('../models/student')
const Subject = require('../models/subject')
const Faculty = require('../models/faculty')
const Attendence = require('../models/attendence')
const Mark = require('../models/marks')

const keys = require('../config/key')

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateFacultyLoginInput = require('../validation/facultyLogin')
const validateFetchStudentsInput = require('../validation/facultyFetchStudent')
const validateFacultyUpdatePassword = require('../validation/FacultyUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/otpValidation')
const validateFacultyUploadMarks = require('../validation/facultyUploadMarks')

module.exports = {
    facultyLogin: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyLoginInput(req.body);
            // Check Validation
            if (!isValid) {
              return res.status(400).json(errors);
            }
            const { registrationNumber, password } = req.body;

            const faculty = await Faculty.findOne({ registrationNumber })
            if (!faculty) {
                errors.registrationNumber = 'Número de Registro inválido';
                return res.status(404).json(errors);
            }
            const isCorrect = password == faculty.password
            if (!isCorrect) {
                errors.password = 'Credenciais inválidas';
                return res.status(404).json(errors);
            }
            const payload = {
                id: faculty.id, faculty
            };
            jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                }
            );
        }
        catch (err) {
            console.log("Erro na hora de fazer o login", err.message)
        }
    },
    fetchStudents: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFetchStudentsInput(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { department, year, section } = req.body;
            const subjectList = await Subject.find({ department, year })
            if (subjectList.length === 0) {
                errors.department = 'Nenhuma matéria encontrada nesse departamento';
                return res.status(404).json(errors);
            }
            const students = await Student.find({ department, year, section })
            if (students.length === 0) {
                errors.department = 'Nenhum aluno encontrado'
                return res.status(404).json(errors);
            }
            res.status(200).json({
                result: students.map(student => {
                    var student = {
                        _id: student._id,
                        registrationNumber: student.registrationNumber,
                        name: student.name
                    }
                    return student
                }),
                subjectCode: subjectList.map(sub => {
                    return sub.subjectCode
                })
            })
        }
        catch (err) {
            console.log("Erro na hora de buscar todos os alunos", err.message)
        }

    },
    markAttendence: async (req, res, next) => {
        try {
            const { selectedStudents, department,
                year,
                section,dob,presence } = req.body

            const allStudents = await Student.find({ department, year, section })
            
            var filteredArr = allStudents.filter(function (item) {
                return selectedStudents.indexOf(item.id) === -1
            });

            for (let i = 0; i < filteredArr.length; i++) {
                const pre = await Attendence.findOne({ student: filteredArr[i]._id, /* subject: sub._id */dob,presence })
                if (!pre) {
                    const attendence = new Attendence({
                        student: filteredArr[i],
                        /* subject: sub._id */
                        dob,
                        presence
                    })
                    attendence.totalLecturesByFaculty += 1
                    await attendence.save()
                }
                else {
                    pre.totalLecturesByFaculty += 1
                    await pre.save()
                }
            }
            for (var a = 0; a < selectedStudents.length; a++) {
                const pre = await Attendence.findOne({ student : selectedStudents[a] , /* subject: sub._id */dob,presence})
                if (!pre) {
                    const attendence = new Attendence({
                        student: selectedStudents[a],
                        dob,
                        presence
                    })
                    await attendence.save()
                }
                else {
                    await pre.save()
                }
            }
            res.status(200).json({ message: "Pronto" })
        }
        catch (err) {
            console.log("error", err.message)
            return res.status(400).json({ message: `Erro na hora de fazer a chamada${err.message}` })
        }
    }, 
    checkAttendence: async (req, res, next) => {
        try {
            const student = req.user
            const attendence = await Attendence.find({student}).populate('attendence')
            if (!attendence) {
                res.status(400).json({ message: "Attendence not found" })
            }
            res.status(200).json({
                result: attendence.map(att => {
                    let res = {};
                    res.student = att.student
                    res.presence = att.presence
                    res.dob = att.dob
                    return res
                })
            })
        }
        catch (err) {
            console.log("Erro na hora de ver todas as chamadas",err.message)
        }
        
    },
    uploadMarks: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyUploadMarks(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { subjectCode, exam, totalMarks, marks, department, semester,
                section } = req.body
            const subject = await Subject.findOne({ subjectCode})
            const isAlready = await Mark.find({ exam, department, section, subjectCode:subject._id,semester })
            if (isAlready.length !== 0) {
                errors.exam = "Você já enviou notas dessa matéria"
                return res.status(400).json(errors);
            }
            for (var i = 0; i < marks.length; i++) {
                const newMarks = await new Mark({
                    student: marks[i]._id,
                    subject: subject._id,
                    exam,
                    department,
                    section,
                    semester,
                    marks: marks[i].value,
                    totalMarks
                })
                await newMarks.save()
            }
            res.status(200).json({message:"Notas enviadas com sucesso"})
        }
        catch (err) {
            console.log("Erro na hora de lançar as notas",err.message)
        }
        
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const allSubjects = await Subject.find({})
            if (!allSubjects) {
                return res.status(404).json({ message: "Você ainda não registrou nenhuma matéria." })
            }
            res.status(200).json({ allSubjects })
        }
        catch (err) {
            res.status(400).json({ message: `Erro em carregas as matérias", ${err.message}` })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateFacultyUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Senhas não se coincidem'
                return res.status(404).json(errors);
            }
            const faculty = await Faculty.findOne({ registrationNumber })
            const isCorrect = oldPassword == faculty.password
            if (!isCorrect) {
                errors.oldPassword = 'Senha antiga inválida';
                return res.status(404).json(errors);
            }
            let Password;
            Password = await newPassword 
            faculty.password = Password;
            await faculty.save()
            res.status(200).json({ message: "Senha Atualizada com sucesso" })
        }
        catch (err) {
            console.log("Erro na hora de atualizar a senha", err.message)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const faculty = await Faculty.findOne({ email })
            if (!faculty) {
                errors.email = "Email não encontrado, insira um email válido"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            faculty.otp = OTP
            await faculty.save()
            await sendEmail(faculty.email, OTP, "OTP")
            res.status(200).json({ message: "Cheque seu email para o código de verificação" })
            const helper = async () => {
                faculty.otp = ""
                await faculty.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Erro na hora de mandar o email", err.message)
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Senhas não se coincidem'
                return res.status(400).json(errors);
            }
            const faculty = await Faculty.findOne({ email });
            if (faculty.otp !== otp) {
                errors.otp = "código de verificação inválido, verifique seu email denovo !"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            faculty.password = hashedPassword;
            await faculty.save()
            return res.status(200).json({ message: "Senha Atualizada" })
        }
        catch (err) {
            console.log("Erro de envio do código de verificação", err.message)
            return res.status(200)
        }

    },
    updateProfile: async (req, res, next) => {
        try {
            const { email, gender, facultyMobileNumber,
                aadharCard } = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const faculty = await Faculty.findOne({ email })
            if (gender) {
                faculty.gender = gender
                await faculty.save()
            }
            if (facultyMobileNumber) {
                faculty.facultyMobileNumber = facultyMobileNumber
                await faculty.save()
            }
            if (aadharCard) {
                faculty.aadharCard = aadharCard
                await faculty.save()
            }
            faculty.avatar = imgResponse.secure_url
            await faculty.save()
            res.status(200).json(faculty)
        }
        catch (err) {
            console.log("Erro na hora de atualizar perfil", err.message)
        }
    }
}