const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keys = require('../config/key')
const sendEmail = require('../utils/nodemailer')
const Student = require('../models/student')
const Subject = require('../models/subject')
const Mark = require("../models/marks")

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateStudentLoginInput = require('../validation/studentLogin')
const validateStudentUpdatePassword = require('../validation/studentUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/otpValidation')

module.exports = {
    studentLogin: async (req, res, next) => {
        const { errors, isValid } = validateStudentLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber, password } = req.body;

        const student = await Student.findOne({ registrationNumber })
        if (!student) {
            errors.registrationNumber = 'Número de Registro inválido';
            return res.status(404).json(errors);
        }
        const isCorrect = password == student.password
        if (!isCorrect) {
            errors.password = 'Credenciais inválidas';
            return res.status(404).json(errors);
        }
        const payload = { id: student.id, student };
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


    },
    getAllStudents: async (req, res, next) => {
        try {
            const { department, year, section } = req.body;
            const students = await Student.find({ department, year, section })
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    getStudentByName: async (req, res, next) => {
        try {
            const { name } = req.body
            const students = await Student.find({ name })
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateStudentUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewpassword = 'Senhas não se coincidem'
                return res.status(400).json(errors);
            }
            const student = await Student.findOne({ registrationNumber })
            const isCorrect = oldPassword == student.password
            if (!isCorrect) {
                errors.oldPassword = 'Senha antiga inválida';
                return res.status(404).json(errors);
            }
            let Password;
            Password = await newPassword 
            student.password = Password;
            await student.save()
            res.status(200).json({ message: "Senha atualizada com sucesso" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const student = await Student.findOne({ email })
            if (!student) {
                errors.email = "Email não encontrado,coloque um email já registrado"
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
            student.otp = OTP
            await student.save()
            await sendEmail(student.email, OTP, "OTP")
            res.status(200).json({ message: "Verifique o código de verificação no seu email" })
            const helper = async () => {
                student.otp = ""
                await student.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Erro na hora de enviar o email", err.message)
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
            const student = await Student.findOne({ email });
            if (student.otp !== otp) {
                errors.otp = "Código de verificação inválido, verifique seu email novamente"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            student.password = hashedPassword;
            await student.save()
            return res.status(200).json({ message: "Senha atualizada com sucesso" })
        }
        catch (err) {
            console.log("Erro na hora de enviar o código", err.message)
            return res.status(200)
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const {email, gender, studentMobileNumber, fatherName,
                fatherMobileNumber, aadharCard} = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const student = await Student.findOne({ email })
            if (gender) {
                student.gender = gender
                await student.save()
            }
            if (studentMobileNumber) {
                student.studentMobileNumber = studentMobileNumber
                await student.save()
            }
            if (fatherName) {
                student.fatherName = fatherName
                await student.save()
            }
            if (fatherMobileNumber) {
                student.fatherMobileNumber = fatherMobileNumber
                await student.save()
            }
            if (aadharCard) {
                student.aadharCard = aadharCard
                await student.save()
            }
                student.avatar = imgResponse.secure_url
                await student.save()
                res.status(200).json(student)
        }
        catch (err) {
            console.log("Erro na hora de atualiar perfil", err.message)
        }
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const { department, year } = req.user;
            const subjects = await Subject.find({ department, year })
            if (subjects.length === 0) {
                return res.status(404).json({ message: "No subjects founds" })
            }
            res.status(200).json({result: subjects })
        }
        catch (err) {
            return res.status(400).json({"Error in getting all subjects":err.message})
        }
    },
    getMarks: async (req, res, next) => {
        try {
            console.log("req.user",req.user)
            const {department, year, id} = req.user
            const getMarks = await Mark.find({ department, student: id }).populate('subject')
            console.log("getMarks",getMarks)
          
            const CycleTest1 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest1"
            })
            const CycleTest2 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest2"
            })
            const CycleTest3 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest3"
            })
            const CycleTest4 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest4"
            })
            const CycleTest5 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest5"
            })
            const CycleTest6 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest6"
            })
            const CycleTest7 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest7"
            })
            const CycleTest8 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest8"
            })
            const CycleTest9 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest9"
            })
            const CycleTest10 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest10"
            })
            const Semester = getMarks.filter((obj) => {
                return obj.exam === "Semester"
            })
            res.status(200).json({
                result: {
                    CycleTest1,
                    CycleTest2,
                    CycleTest3,
                    CycleTest4,
                    CycleTest5,
                    CycleTest6,
                    CycleTest7,
                    CycleTest8,
                    CycleTest9,
                    CycleTest10,
                    Semester
                    
            }})
        }
        catch (err) {
            return res.status(400).json({ "Error in getting marks": err.message })
        }
    }
}
