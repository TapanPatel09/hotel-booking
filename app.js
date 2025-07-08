const express = require("express");
const app = express();

const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapasync = require("./utill/wrapsync.js");
const ExpressError = require("./utill/expresserror.js");
// const { ListSchema , reviewSchema } = require("./schema.js");
// const { errorMonitor } = require("events");
const Review= require("./models/review.js");
const listingRoutes = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");

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




// listing.js
app.use("/listings",listingRoutes);
//review.js
app.use("/listings/:id/reviews", reviewsRoute); 
// Routes
app.get("/", (req, res) => {
    res.send("Hi, it's the start");
});



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
