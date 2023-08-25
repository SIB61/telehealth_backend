const express = require("express");
var bodyParser = require('body-parser');
const router=express();
const admin=require("../models/administrators");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const upload=require("../uploadsystem/uplod")
  router.post("/createadminsitrator",async(req,res)=>{

    const {email,password,companyName,phone,}=req.body;
    let saltRounds = 10;
let hashedPassword = await bcrypt.hash(password, saltRounds);
    admin.findOne({email}).then(result=>{
        if(result)
        res.status(400).send("An account already exists with this email");
    else{
        let newAdmin=new admin();
        newAdmin.companyName = companyName;
        newAdmin.email = email;
        newAdmin.password=hashedPassword
        newAdmin.subscription=-1;
        newAdmin.phone=phone;
        newAdmin.dateStart=new Date().toLocaleDateString();
        newAdmin.save().then(createdAdmin=>{
          res.send(createdAdmin)
        }).catch(err=>{
            res.status(400).send(err);
        })
    }
    }).catch(err=>{
        res.status(400).send(err);
    })
});

router.get("/profile",async(req,res)=>{
    admin.findOne({_id:req.query.id}).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})
router.put("/updatepaymentinfo",async(req,res)=>{
    admin.updateOne({_id:req.body.id},{
        paymentInfo:req.body.paymentInfo,
        slots:req.body.slots,
        subscription:req.body.subs,
        dateStart:new Date().toLocaleDateString()
    }).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
})
router.put("/editprofile",upload.single("images"),async(req,res)=>{
    let images="";
    const updatedProfile={  companyName:req.body.companyName,
        phone:req.body.phone,};
   if(req.file){
    images=req.file.filename;
    updatedProfile.images=images;   
}
    admin.updateOne({email:req.body.email},updatedProfile).then(foundedAdmin=>res.send(foundedAdmin)).catch(err=>res.send("No admin found"))
});

router.post("/sendinvitations",async(req,res)=>{
    const {emails}=req.body;
    console.log(req.body);
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'hunter.gusikowski95@ethereal.email',
            pass: 'jZnbRrB5sCktgS3tx9'
        }
    });
    const members=[];
    emails.forEach(element=>{
        members.push({email:element.email,startDate:new Date().toLocaleDateString(),status:"invited"})
    })
    emails.forEach(element => {
        const mailOptions = {
            from: 'hunter.gusikowski95@ethereal.email',
            to: `${element.email}`,
            subject: 'Invitation Link to Join Satori',
            text: `Use this url to join the Satori website: ${element.url}`
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email: ' + error);
           
            } else {
              console.log('Email sent: ' + info.response);
            
            }
          });
    });
    res.send("Successfully Sent");
     admin.updateOne({_id:req.body.id},{
    slots:req.body.slots,members
    }).then(foundedAdmin=>console.log(foundedAdmin)).catch(err=>console.log(err))
});

router.put("/updateslots",async(req,res)=>{
    const profile2=await admin.findOne({_id:req.body.id});
    console.log(profile2);
    const profile=await admin.updateOne({_id:req.body.id},{slots:profile2.slots+parseInt(req.body.slots)});
res.send("successful");
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const administratorUser=await admin.findOne({email:req.body.email});
    if(administratorUser){
    const passwordMatch=await bcrypt.compare(password,administratorUser.password);
    if(passwordMatch)
    res.send(administratorUser);
    else
    res.status(400).send("Wrong");   
 }
 else
 res.status(400).send("Wrong");   

})
router.put("/updatepassword",async(req,res)=>{
    console.log(req.body);
  const {old,newP,id}=req.body;
  const user=await admin.findOne({_id:id});
  const passwordMatch=await bcrypt.compare(old,user.password);
  console.log(passwordMatch)
  if(passwordMatch)
  {
    let hashedPassword = await bcrypt.hash(newP, 10);
    const updated=await admin.updateOne({_id:id},{
        password:hashedPassword
    });
    if(updated)
    res.send("Successfully Updated");
else 
res.status(400).send("Failed to update password");

  }
  else
  res.status(400).send("Old password is not correct");
})
module.exports=router;