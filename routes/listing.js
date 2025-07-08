const express =require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");

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
router.get("/new", (req, res) => {
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
    let list = await listing.findById(id).populate("review");
    res.render("listing/show.ejs", {list} );
});


// Create Listing
router.post("/",validatelisting, wrapasync(async (req, res) => {
    console.log("REQ.BODY >>>", req.body);
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


// Edit Route
router.get("/:id/edit", wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        throw new ExpressError(404, "Listing not found for editing");
    }
    res.render("listing/edit.ejs", { list });
}));

// Update Route
router.put("/:id", validatelisting,wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");

}));

module.exports = router; 