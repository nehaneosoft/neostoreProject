const mongoose = require ('mongoose');
const orderSchema = new mongoose.Schema({

    order : Array,
    Subtotal : Number,
    gst : Number,
    Total : Number,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    deliveryAddresses: Object
    

},{timestamps:true});


const Orders = mongoose.model('orders', orderSchema);
module.exports = Orders;

