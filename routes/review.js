const express =require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const Review= require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview} = require("../middelwere.js");


// review
    //post review 
router.post("/",validateReview, wrapasync(async(req, res) => {
    // console.log(req.params.id); 
    const list = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    
    list.review.push(newReview); // Now this will work because 'review' field exists
    await newReview.save();
    await list.save(); 
    
    console.log("new review");
    // console.log(newReview);
    // res.send("new review save");
    req.flash("success", "New review Created!");
    res.redirect(`/listings/${req.params.id}`);
}));

//delete review rout
router.delete("/:reviewId", wrapasync(async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
     req.flash("success", "review Deketed!");
    res.redirect(`/listings/${id}`);
}));


module.exports =router;