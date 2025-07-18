const express =require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const Review= require("../models/review.js");
const listing = require("../models/listing.js");
const {validateReview ,isLoggedin,isReviewOwner} = require("../middelwere.js");
const reviewController = require("../controller/review.js");

// review
    //post review 
router.post("/",isLoggedin,validateReview, wrapasync(reviewController.createReview));

//delete review rout
router.delete("/:reviewId",isLoggedin,isReviewOwner, wrapasync(reviewController.deletereview));


module.exports =router;