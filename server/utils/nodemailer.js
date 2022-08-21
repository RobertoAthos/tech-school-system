const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    debug: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})

const sendMail = async (email, secretToken, mode) => {
    try {
        if (mode == 'OTP') {
            
            return await transport.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: "OTP Submission",
                html: `
        <h1>Atualizar Senha | Tech School</h1>
        <p> Aqui está o código de verificação para atualizar sua senha ${secretToken} </p>
      `
            })
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = sendMail  