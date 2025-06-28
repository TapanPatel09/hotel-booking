const express = require("express");
const app = express();

const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapasync = require("./utill/wrapsync.js");
const ExpressError = require("./utill/expresserror.js");
// const {ListSchema} = require("./schema.js");

const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

// Connect to MongoDB
async function main() {
    await mongoose.connect(mongo_url);
}
main()
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log("DB connection error:", err));

// Middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.get("/", (req, res) => {
    res.send("Hi, it's the start");
});

// New Listing Route - IMPORTANT: Must be before :id
app.get("/listings/new", (req, res) => {
    res.render("listing/new.ejs");
});

// Index Route
app.get("/listings", wrapasync(async (req, res) => {
    const alllisting = await listing.find({});
    res.render("listing/index.ejs", { alllisting });
}));

// Show Route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id);
    res.render("listing/show.ejs", {list} );
});


// Create Listing
app.post("/listings", wrapasync(async (req, res) => {
    console.log("🔍 Incoming Form Data:", req.body); // Add this
    let result = ListSchema.validate(req.body); 
    console.log(result);
    // console.log("Schema Loaded:", ListSchema);
    const newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));



// Edit Route
app.get("/listings/:id/edit", wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        throw new ExpressError(404, "Listing not found for editing");
    }
    res.render("listing/edit.ejs", { list });
}));

// Update Route
app.put("/listings/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

// Delete Route
app.delete("/listings/:id", wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// Catch-all 404 route
app.use((req,res)=>{
    let qur = req.query;
    res.render("listing/erorr.ejs",{qur});
})
// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page Not Found"));
// });

// Error-handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/erorr", { message, statusCode });
});

// Start server
app.listen(8080, () => {
    console.log("Server started on http://localhost:8080");
});
