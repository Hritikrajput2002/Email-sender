
const sendEmail=require("../Utils/sendEmail")
require('dotenv').config({path:'./Config/.env'});
const path = require('path');
const fs = require('fs');





//send mail

exports.sendMail=async(req,res)=>{
   
    
    
   
    
    try{
        
        const {emails,subject,message}=req.body;

        let attachments = [];
        const emailList = emails.split(',').map(email => email.trim());

        if (req.files && req.files.length > 0) {
            attachments = req.files.map(file => ({
                filename: file.originalname,
                path: path.join(__dirname, '../uploads', file.filename),
            }));
        }

        await sendEmail({
            email:emailList,
            subject: subject,
            message: message,
            attachments: attachments
        })

        attachments.forEach(file => fs.unlinkSync(file.path));   //delete file after sending mail

          return res.status(202).json({success:true,   message:`Email send to ${emails} successfully`  })   
    }
    catch(err){
        
        return res.status(500).json({
            success: false,
            message: "Failed to send email. Please try again later0.",
        });
    }
}

