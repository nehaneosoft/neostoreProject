const express = require("express");
const router = express.Router();

require('../db/conn');
const Categories = require('../models/categorySchema');
const Colors = require('../models/colorSchema');
const Products = require('../models/productSchema');

router.get('/allProducts', async (req,res) => {
    try{
        const allProductsList = await Products.find();
        res.send(allProductsList);

    }catch (err){
        console.log(err);
    }
    
}) 
//get all cattegory
router.get('/allCategory', async(req,res) => {
    try{
        const allCategoryList = await Categories.find();
        res.send(allCategoryList);
        
    }catch (err){
        console.log(err);

    }
})
//sort product by category
router.get("/categorizedProduct/:categoryId", async (req,res) => {
   const id=req.params.categoryId;
    try{
        const prod = await Products.find({categoryId:id })
        res.send(prod);
        console.log(prod);

    }catch(err){
        console.log(err);

    }
})
//end category

//get all colors
router.get('/allColor', async(req,res) => {
    try{
        const allColorList = await Colors.find();
        res.send(allColorList);
        
    }catch (err){
        console.log(err);

    }
})
//sort oproduct by color
router.get("/colorizedProduct/:colorId", async (req,res) => {
    const id=req.params.colorId;
     try{
         const prod = await Products.find({colorId:id })
         res.send(prod);
 
     }catch(err){
         console.log(err);
 
     }
 })
// getting rating
// router.get ("/getAllRating", async(req,res) => {
//     try{
//         const allRatingList = await Products.find();
//         res.send(allRatingList.productRating);

//     }catch (err){
//         console.log(err);
//     }
    
// })


 //product details api
 router.get("/products_by_id",async (req,res) =>{
     let productIds = req.query.id;
    // console.log(productIds);
    try{
        const prod = await Products.find({_id : productIds })
        res.send(prod);
        //console.log(prod);

    }catch(err){
        res.json({message : err});
    }
 });

// router.get('/:id',(req,res) => {
//     console.log(req.params.id);
// })





module.exports = router;