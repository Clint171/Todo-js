const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let transport = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

let sendMail = (email , subject , text , html)=>{
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        html: html
    }
    transport.sendMail(mailOptions , (err , info)=>{
        if(err){
            console.log("error sending mail to " + email + " : " + err);
        }
        else{
            console.log(info);
        }
    });
}
exports.sendMail = sendMail;

//for only text

let sendTextMail = (email , subject , text)=>{
    let mailOptions = {
        from: 'clintsimiyu004@gmail.com',
        to: email,
        subject: subject,
        text: text
    }
    transport.sendMail(mailOptions , (err , info)=>{
        if(err){
            console.log("error sending mail to " + email + " : " + err);
        }
        else{
            console.log("email sent to: "+ email);
        }
    });
}
exports.sendTextMail = sendTextMail;

//for only html

let sendHtmlMail = (email , subject , html)=>{
    let mailOptions = {
        from: 'clintsimiyu004@gmail.com',
        to: email,
        subject: subject,
        html: html
    }
    transport.sendMail(mailOptions , (err , info)=>{
        if(err){
            console.log("error sending mail to " + email + " : " + err);
        }
        else{
            console.log(info);
        }
    });
}
exports.sendHtmlMail = sendHtmlMail;