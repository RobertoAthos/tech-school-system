const express = require('express')
const passport = require('passport')
const router = express.Router()
const upload = require('../utils/multer')

const {studentLogin,updatePassword, forgotPassword,postOTP, updateProfile, getAllSubjects, getMarks } = require('../controller/studentController')

router.post('/login', studentLogin)

router.post('/forgotPassword', forgotPassword)

router.post('/postOTP', postOTP)

router.post('/updateProfile', passport.authenticate('jwt', { session: false }),

upload.single("avatar"), updateProfile)

router.post('/updatePassword', passport.authenticate('jwt', { session: false }), updatePassword)

router.get('/getMarks', passport.authenticate('jwt', { session: false }),getMarks)

router.get('/getAllSubjects', passport.authenticate('jwt', { session: false }), getAllSubjects)

module.exports = router