const express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utill/wrapsync.js");
const passport = require("passport");
const { isLoggedin } = require("../middelwere.js");
const {saveRedirectUrl} = require("../middelwere.js");
const UserController = require("../controller/user.js");


router
    .route("/signup")
    .get(UserController.singUpGet)
    .post( UserController.singUpPost);

router
    .route("/login")
    .get(UserController.loginGet)
    .post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),UserController.loginPost);

router.get("/logout",UserController.logOut);

module.exports = router;