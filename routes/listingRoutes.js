const express = require("express");
const router = express.Router();
const wrapasync = require("../utill/wrapsync.js");
const ExpressError = require("../utill/expresserror.js");
const { ListSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js"); // ✅ Corrected name
const { isLoggedin, isOwner, validatelisting } = require("../middelwere.js");

const multer = require("multer");
const { storage } = require("../cloudeConfig.js");
const upload = multer({ storage });

const ListingController = require("../controller/listing.js");

// 📌 GET listings by category (MUST be above "/:id")
router.get("/category/:categoryName", async (req, res) => {
    const { categoryName } = req.params;

    // ✅ Use exact match (case-sensitive, or normalize to title case)
    const listingsByCategory = await Listing.find({ category: categoryName });

    res.render("listing/index.ejs", { alllisting: listingsByCategory });
});

