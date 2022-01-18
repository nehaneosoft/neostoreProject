const mongoose = require ("mongoose");

const  otpSchema = new mongoose.Schema({
    emailAddress:String,
    code:String,
    expireIn: Number
},{
    timestamps: true
})
const Otp = mongoose.model('OTP', otpSchema);
module.exports = Otp ;