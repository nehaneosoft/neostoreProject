const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName : String,
    productImage : String,
    productDesc : String,
    productRating: Number,
    productProducer : String,
    productCost : Number,
    productStock : Number,
    productDimension : String,
    productMaterial : String,
      
    categoryName:String,
    colorName:String,
    subImages:Array,
    categoryId :{
                type:mongoose.Schema.Types.ObjectId,
                ref : "categories"
               },
    colorId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "colors"
             }
  


    // subImages : [
    //     {
    //         categoryId :{
    //             type:mongoose.Schema.Types.ObjectId,
    //             ref : "categories"
    //         },
    //         colorId : {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref : "colors"
    //         }
    //     }
    //     ]

})

const Products = mongoose.model('Products' ,productSchema);
module.exports = Products;
