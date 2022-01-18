const express = require("express");
const router = express.Router();

require('../db/conn');
const Orders = require('../models/orderSchema');


router.get('/orderDetails',async(req,res) =>{
    

})

module.exports = router;