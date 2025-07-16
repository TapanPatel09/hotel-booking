const express =require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");
const {isLoggedin} = require("../middelwere.js");

const validatelisting  =(req,res,next)=>{
    
    const { error } = ListSchema.validate(req.body); 
    if (error) {
        let errmsg = error.details.map((el)=> el.message).join(",");
        console.log("Validation Error:", error.details[0].message);
        throw new  ExpressError(400,errmsg);
    }
    else{
        next();
    }
};

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
router.get("/:id/edit", isLoggedin,wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        throw new ExpressError(404, "Listing not found for editing");
    }
    res.render("listing/edit.ejs", { list });
}));

// Update Route
router.put("/:id",isLoggedin, validatelisting,wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id",isLoggedin, wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
     req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router; 