const express =require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema , reviewSchema } = require("../schema.js");
const listing = require("../models/listing.js");
const {isLoggedin,isOwner,validatelisting} = require("../middelwere.js");

const multer = require("multer");
const {storage} = require("../cloudeConfig.js");
const upload = multer({storage});


//controller
const ListingController = require("../controller/listing.js");
// const isOwner = require("../midde   lwere.js"); 

router
    .route("/")
    .get(wrapasync(ListingController.index))                            // Show all listings
    .post(isLoggedin , upload.single("listing[image]") ,validatelisting, wrapasync(ListingController.createListing))


router.get("/new", isLoggedin,ListingController.renderNewForm); 

router
    .route("/:id")
    .get(ListingController.showListing)
    .put(isLoggedin, isOwner,upload.single("listing[image]") ,validatelisting,wrapasync(ListingController.updateListing)) 
    .delete(isLoggedin,isOwner, wrapasync(ListingController.deleteListing))
    // New Listing Route - IMPORTANT: Must be before :id
    
    
router.get("/:id/edit", isLoggedin,isOwner,wrapasync(ListingController.renderEditForm));




module.exports = router; 