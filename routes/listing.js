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

// ✅ Home Route
// routes/listing.js
router.get("/home", async (req, res) => {
    try {
        const listings = await Listing.find({});
        const topHostels = await Listing.find({})
            .populate("review")
            .limit(6);

        res.render("listing/home.ejs", {
            currUser: req.user,
            listings,      // ✅ PASS listings to EJS
            topHostels     // ✅ PASS topHostels too
        });
    } catch (err) {
        console.error("Error rendering home:", err);
        res.status(500).send("Internal Server Error");
    }
});


// ✅ Search Route - must be ABOVE any "/:id"
router.get("/search", async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.redirect("/listings");
    }

    const regex = new RegExp(query, "i");

    const filteredListings = await Listing.find({
        $or: [
            { location: regex },
            { title: regex },
            { country: regex }
        ]
    });

    res.render("listing/index.ejs", { alllisting: filteredListings });
});

router
    .route("/")
    .get(wrapasync(ListingController.index))
    .post(isLoggedin, upload.single("listing[image]"), validatelisting, wrapasync(ListingController.createListing));

router.get("/new", isLoggedin, ListingController.renderNewForm);

// ✅ Show Route
router
    .route("/:id")
    .get(ListingController.showListing)
    .put(isLoggedin, isOwner, upload.single("listing[image]"), validatelisting, wrapasync(ListingController.updateListing))
    .delete(isLoggedin, isOwner, wrapasync(ListingController.deleteListing));


router.get("/:id/edit", isLoggedin, isOwner, wrapasync(ListingController.renderEditForm));

router.get("/category/:category", async (req, res) => {
    const category = req.params.category;

    const listings = await Listing.find({ category });

    const categories = [
        "Trending", "Room", "Iconic cities", "Castles", "Swimming Pools",
        "Camping", "Farms", "Arctic", "Domes", "Boats"
    ];

    res.render("listing/index.ejs", {
        alllisting: listings,
        categoryName: category,
        categories
    });
});


module.exports = router;
