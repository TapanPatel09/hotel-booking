// // if(process.env.NODE_ENV != "production"){
// // }

// require('dotenv').config();
// // console.log(process.env.SECRET); 

//     const express = require("express");
//     const app = express();
//     const mongoose = require("mongoose");
//     const listing = require("./models/listing.js");
//     const path = require("path");
//     const methodOverride = require("method-override");
//     const ejsMate = require("ejs-mate");
//     // const wrapasync = require("./utill/wrapsync.js");
//     const ExpressError = require("./utill/expresserror.js");
//     // const { ListSchema , reviewSchema } = require("./schema.js");
//     // const { errorMonitor } = require("events");
//     const Review= require("./models/review.js");

//     const listingRoutes = require("./routes/listing.js");
//     const reviewsRoute = require("./routes/review.js");
//     const userRoute = require("./routes/user.js");

//     const session = require("express-session");
//     const flash = require("connect-flash");
//     const passport = require("passport");
//     const LocalStrategy = require("passport-local");
//     const User  = require("./models/user.js");

//     const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";
    
//     const sessionOptios ={
//         secret:"mysuper",
//         resave: false,
//         saeUninitialized: true,
//         cookie:{
//             expiers:Date.now() + 7 *24 * 24 * 60 * 60 *1000,
//             maxAge:7 *24 * 24 * 60 * 60 *1000,
//             httpOnly:true
//         }
//     }


//     // Connect to MongoDB
//     async function main() {
//         await mongoose.connect(mongo_url);
//     }
//     main()
//         .then(() => console.log("Connected to DB"))
//         .catch((err) => console.log("DB connection error:", err));

//     // Middleware
//     app.engine("ejs", ejsMate);
//     app.set("view engine", "ejs");
//     app.set("views", path.join(__dirname, "views"));
//     app.use(express.static(path.join(__dirname, "/public")));
//     app.use(methodOverride("_method"));
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));


//     app.get("/", (req, res) => {
//     res.redirect("/listings/home");
// });

//     app.use(session(sessionOptios));
//     app.use(flash());
    

//     app.use(passport.initialize());
//     app.use(passport.session());
//     passport.use(new LocalStrategy(User.authenticate()));

//     passport.serializeUser(User.serializeUser());
//     passport.deserializeUser(User.deserializeUser());

//     app.use((req,res,next)=>{
//         res.locals.success  = req.flash("success");
//         res.locals.error  = req.flash("error");
//         res.locals.currUser = req.user;
        
//         next();
//     });

//     // listing.js
//     // app.get("/home",async(req,res)=>{
//     //     const topHostels = await Hostel.find({}).limit(6); // or custom logic
//     //     res.render('home', { currUser: req.user, topHostels });
//     // });
//     app.use("/listings",listingRoutes);
//     //review.js
//     app.use("/listings/:id/reviews", reviewsRoute); 
//     app.use("/",userRoute);
//     // Routes



//     // Catch-all 404 route
// app.use((req, res) => {
//     res.status(404).render("listing/erorr.ejs", {
//         message: "Page Not Found",
//         statusCode: 404
//     });
// });

//     // Error-handling middleware
//     app.use((err, req, res, next) => {
//         const { statusCode = 500, message = "Something went wrong" } = err;
//         res.status(statusCode).render("listing/erorr", { message, statusCode });
//     });
    
//     // app.all("*", (req, res, next) => {
//     //     next(new ExpressError(404, "Page Not Found"));
//     // });
//     // Start server
//     app.listen(8080, () => {
//         console.log("Server started on http://localhost:8080");
//     });

require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");

const listingRoutes = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const ExpressError = require("./utill/expresserror.js");

// MongoDB connection
// const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

const db_url =process.env.ATLASTDB_URL;

async function main() {
    await mongoose.connect(db_url);
}
main()
    .then(() => console.log("✅ Connected to DB"))
    .catch((err) => console.log("❌ DB connection error:", err));

//mongos
const store = MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});
; 
store.on('error', function (err) {
    console.log("❌ Mongo session store error:", err);
});


// Session config
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

// View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());


// Passport.js setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global middleware for flash + current user
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Home redirect
app.get("/", (req, res) => {
    res.redirect("/listings/home");
});

// Routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);


// Catch-all 404
app.use((req, res) => {
    res.status(404).render("listing/erorr.ejs", {
        message: "Page Not Found",
        statusCode: 404
    });
});

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listing/erorr", { message, statusCode });
});

// Start server
app.listen(8080, () => {
    console.log("🚀 Server started on http://localhost:8080");
});
