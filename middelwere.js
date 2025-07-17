// module.exports.isLoggedin = (req, res, next) => {
//     if (!req.isAuthenticated()) {
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "First login then come");
//         return res.redirect("/login");
//     }
//     next();
// };
const listing = require("./models/listing")
const ExpressError = require("./utill/expresserror.js");
const { ListSchema , reviewSchema } = require("./schema.js");
// const { ListSchema , reviewSchema } = require("../schema.js");

module.exports.isLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // store the URL
        req.flash("error", "First login then come");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// module.exports.isOwner = async(req,res,next)=>{
// let ll = await listing.findById(id);
//     if( ! ll.owner._id.equals(res.locals.currUser._id)){
//         req.flash("error","you do't have parmitons too edit");
//         return  res.redirect(`/listings/${id}`);
//     }
// }
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params; // 👈 Get the id from request parameters
    const ll = await listing.findById(id);

    if (!ll) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    if (!ll.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "You don't have permission to edit this listing");
        return res.redirect(`/listings/${id}`);
    }

    next(); // 👈 Proceed to next middleware or route handler
};

module.exports.validatelisting  =(req,res,next)=>{
    
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

module.exports.validateReview  =(req,res,next)=>{
    
    const { error } = reviewSchema.validate(req.body); 
    if (error) {
        let errmsg = error.details.map((el)=> el.message).join(",");
        console.log("Validation Error:", error.details[0].message);
        throw new  ExpressError(400,errmsg);
    }
    else{
        next();
    }
};
