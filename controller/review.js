const listing = require("../models/listing.js");
const Review= require("../models/review.js");

module.exports.createReview = async(req, res) => {
    // console.log(req.params.id); 
    const list = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;    
    console.log(newReview);
    list.review.push(newReview); // Now this will work because 'review' field exists
    await newReview.save();
    await list.save(); 
    
    console.log("new review");
    // console.log(newReview);
    // res.send("new review save");
    req.flash("success", "New review Created!");
    res.redirect(`/listings/${req.params.id}`);
};

module.exports.deletereview = async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review Deketed!");
    res.redirect(`/listings/${id}`);
};