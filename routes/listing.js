const express =require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");
const {isLoggedin,isOwner,validatelisting} = require("../middelwere.js");

// const isOwner = require("../midde   lwere.js"); 


// New Listing Route - IMPORTANT: Must be before :id
router.get("/new", isLoggedin,(req, res) => {
    console.log(req.user);
    res.render("listing/new.ejs");
});

// Index Route
router.get("/", wrapasync(async (req, res) => {
    const alllisting = await listing.find({});
    res.render("listing/index.ejs", { alllisting });
}));

// Show Route
router.get("/:id", async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id).populate("review").populate("owner");
    // let list = await listing.findById(id).populate("review").populate("owner");


    if(!list){
        req.flash("error", "listing is does not exits");
        // res.redirect("/listing");
        return res.redirect("/listings");
    }
    console.log(list);
    res.render("listing/show.ejs", {list} );
});


// Create Listing
router.post("/",validatelisting, wrapasync(async (req, res) => {
    console.log("REQ.BODY >>>", req.body);
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));


// Edit Route
router.get("/:id/edit", isLoggedin,isOwner,wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        throw new ExpressError(404, "Listing not found for editing");
    }
    res.render("listing/edit.ejs", { list });
}));

// Update Route
router.put("/:id",isLoggedin, isOwner,validatelisting,wrapasync(async (req, res) => {
    let { id } = req.params;
    // let ll = await listing.findById(id);
    // if( ! ll.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","you do't have parmitons too edit");
    //     return  res.redirect(`/listings/${id}`);
    // }
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id",isLoggedin,isOwner, wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
     req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router; 