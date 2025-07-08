const express =require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const Review= require("../models/review.js");

const validateReview  =(req,res,next)=>{
    
    const { error } = reviewSchema.validate(req.body); 
    if (error) {
        let errmsg = error.details.map((el)=> el.message).join(",");
        console.log("Validation Error:", error.details[0].message);
        throw new  ExpressError(400,errmsg);
    }
    else{
        next();
    }
};

// review
    //post review 
router.post("/",validateReview, wrapasync(async(req, res) => {
    const list = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    
    list.review.push(newReview); // Now this will work because 'review' field exists
    await newReview.save();
    await list.save(); 
    
    console.log("new review");
    // console.log(newReview);
    // res.send("new review save");
    res.redirect(`/listings/${req.params.id}`);
}));

//delete review rout
router.delete("/:reviewId", wrapasync(async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));


module.exports =router;