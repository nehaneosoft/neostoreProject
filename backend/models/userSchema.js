const jwt = require ("jsonwebtoken");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required:true
    },
    emailAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens : [
        {
            token :{
                type:String,
                required:true
            }
        }
    ],
    deliveryAddress : Array
})

//creating models



// hashing the password
userSchema.pre('save',async function(next){
    console.log("Hi pre");
    if(this.isModified('password')){
        //console.log("Hii pre password");
        // const rounds=10;
        // const hashpass=await bcrypt.hash(this.password,rounds);
        // this.password=hashpass;
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword =await bcrypt.hash(this.cpassword,12);
        //console.log("I am after bcrypt");
    }
    next();
});

//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
       await this.save();
       return token;
    } catch(err) {
        console.log(err);
    }
}

const User = mongoose.model('user',userSchema);
module.exports = User;

