const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema({
    colorName : String,
    productImage : String,
    //colorId : String

}, {timestamps: true})

const Colors = mongoose.model('colors', colorSchema);
module.exports = Colors;
