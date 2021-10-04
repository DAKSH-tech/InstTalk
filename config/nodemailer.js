//Sometimes Gmail does not allow to send gmail by third party so search enable less secure app in gmail then go to myaccount.google.com and toogle that button
const nodemailer = require("nodemailer");
const ejs=require('ejs');
const path=require('path');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    //below is sender email account (email can be send in limited amount after that you have to pay)
    auth: {
      user: 'testAccount.user', // generated ethereal user
      pass: '', // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false 
    }
  });
  let renderTemplate=(data,relativePath)=>{
      let mailHTML;
      ejs.renderFile(
            path.join(__dirname,'../views/mailers',relativePath),
            data,
            function(err,template){
              if(err){
                  console.log('Error in rendering template');return;
              }
              mailHTML=template;
            }
      )
      return mailHTML;
  }
module.exports = 
{
    transporter: transporter,
    renderTemplate: renderTemplate
}

