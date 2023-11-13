const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "097c4353da97ea",
      pass: "e04b9df222c352"
    }
  });

let sendMail = (email , subject , text , html)=>{
    let mailOptions = {
        from: 'clintsimiyu004@gmail.com',
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
            console.log(info);
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
