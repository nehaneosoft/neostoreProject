//const { json } = require("express");
const jwt = require('jsonwebtoken'); 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


require('../db/conn');
const User = require("../models/userSchema");
const Otp = require("../models/otpSchema");

// router.get('/', (req, res) => {
//     res.send(`Hello world from router`);
// });

router.post('/register', async (req, res) => {
    const { firstName, lastName, emailAddress, phoneNumber, gender, password, cpassword } = req.body;

    //validation
    if (!firstName || !lastName || !emailAddress || !phoneNumber || !gender || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the required fields" });
    }


    try {

        const userExist = await User.findOne({ emailAddress: emailAddress })

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }else if(password != cpassword){
            return res.status(422).json({ error: "Password are not matching" }); 
        }
        else{
            const user = new User({ firstName, lastName, emailAddress, phoneNumber,gender, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user registered successfully" });  
        }
        

    } 
    catch (err) {
        console.log(err);
    }
});
//login route

router.post('/signin', async (req,res) => {
    // console.log(req.body);
    // res.json({message: "login"});

    try {
        const {emailAddress,password} = req.body;

        if ( !emailAddress || !password) {
            return res.status(400).json({error:"Please fill all the required fields"});
        }

        const userLogin = await User.findOne({ emailAddress: emailAddress});

        //console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password,userLogin.password);

            const  token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

        if(!isMatch){
            res.status(400).json({error: "Invalid Credentials pass"});
        }
        else{
        res.json({ message: "user signin successfully"});
        }

        } else {
            res.status(400).json({error: "Invalid Credentials"});

        }
    }
    catch(err) {
        console.log(err);
    }

});

// My account route
router.get('/account', authenticate, (req,res) => {
    res.send(req.rootUser);
});


// logout route
router.get('/logout',(req,res) => {
    console.log("Hello my logout page");
    res.clearCookie( 'jwtoken', {path:'/'})
    res.status(200).send("user logout");
})

// forget password : otp 
//sending otp via email
router.post('/sendEmail', async (req,res) => {
    const {emailAddress } = req.body;
    //console.log(emailAddress)
    const emailExist = await User.findOne({ emailAddress: emailAddress});
    //console.log(emailExist);
    const responseType = {};

    if(emailExist){
        let code = Math.floor(1000 + Math.random() * 9000);
        let otpData = new Otp ({
        emailAddress : emailAddress,
        code:code,
        expireIn:new Date().getTime() + 600*1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = "Success";
        mailer(emailAddress,code);
        responseType.message = 'Please check your Email Id';
    }else{
        responseType.statusText = "error";
        responseType.message = 'Email Id not exist';
    }
    res.status(200).json(responseType);
})

//recover password
router.post('/recoverpass', async (req,res) =>{
    try
{
    //const {emailAddress,code} = req.body;
    const data = await Otp.find({ emailAddress:req.body.emailAddress,code:req.body.code});
    console.log(data);
    const response = {}
    if (data){
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;
        if(diff < 0){
            response.message = 'Token Expire'
            response.statusText = 'error'
        }else{
            const  user = await User. findOne({emailAddress:req.body.emailAddress});
            //console.log(user.password);
        bcrypt.hash(req.body.password,12).then(hashedpassword => {
            user.password = req.body.password;
            user.save().then((saveduser) =>{
               res.json({message:"password updated"})
            })
        });
           console.log(req.body);
            //user.updateOne({password:req.body.password});
            // user.updateOne({ emailAddress: req.body.emailAddress },
            //     { $set: { password: req.body.password } }, function (err, docs) {
            //         if (err) {
            //             console.log(err)
            //         }
            //         else {
            //             console.log("Updated Docs : ", docs);
            //         }
            //     });
            // user.save();
            response.statusText = 'Success';
            response.message = 'Password changed successfully'
           
        }
    }else{
        response.message = "Invalid otp";
        response.statusText = "error";
    }
    res.status(200).json(response);
} catch(err){
    console.log(err);
    
}
});


const mailer = (emailAddress, code) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user:'neomernstack@gmail.com',
            pass: 'mernstack@12345'
        }
    });

    var mailOptions = {
        from : 'neomernstack@gmail.com',
        to : emailAddress,
        subject: 'OTP for reset password',
        text: `Your OTP for reset password is ${code}`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else {
            console.log('Email sent :' +info.response);
        }
    });

}

// get user detail by id for updating purpose 
router.get("/user_by_id", async(req,res) => {
    let userIds = req.query.id;
    console.log(userIds);

    try{
        const user = await User.find({_id : userIds })
        res.send(user);
        console.log(user);

    }catch(err){
        res.json({message : err});
    }
})



module.exports = router;