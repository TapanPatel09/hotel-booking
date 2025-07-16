const express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utill/wrapsync.js");
const passport = require("passport");
const { isLoggedin } = require("../middelwere.js");
const {saveRedirectUrl} = require("../middelwere.js");

router.get("/signup",(req,res)=>{
    // res.render("users/singup.ejs");
    res.render('users/signup.ejs', { error: null, formData: {} });
});

// router.post(
//     "/signup",
//     wrapAsync(async (req, res) => {
//     try {
//       const { username, email, password } = req.body;
//       const newUser = new User({ email, username });
//       const registeredUser = await User.register(newUser, password);
//       req.flash("success", "Welcome to Wanderlust!");
//       res.redirect("/listings");
//     } catch (e) {
//       req.flash("error", e.message);
//       res.redirect("/signup");
//     }
//   })
// );

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Client-side bypass protection
  if (!username || !email || !password) {
    return res.status(400).render("users/signup", {
      error: "All fields are required.",
      formData: { username, email },
    });
  }

  try {
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password); // can still throw
    req.logIn(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", `${username} → welcome to Wanderlust`);
      res.redirect("/listings");
    });

    console.log(registeredUser);
    
    } catch (err) {
        console.error(err);

        let errorMessage = "Something went wrong.";
        if (err.name === "UserExistsError") {
        errorMessage = "A user with that username already exists.";
        } else if (err.message === "No username was given") {
        errorMessage = "Username is required.";
        }

        res.status(400).render("users/signup", {
        error: errorMessage,
        formData: { username, email },
        });
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

// router.post("/login",
//     saveRedirectUrl,
//     passport.authenticate("local" ,
//       {failureRedirect:'/login',failureFlash :true }),
//     async(req,res)=>{
//       const { username, email, password } = req.body;
//       // const newUser = new User({ email, username });
//       req.flash("success" ,`${username} welcome back to wonderlust`);
//       // res.redirect(redirectUrl);
//       res.redirect(req.session.redirectUrl || "/listings");
//       // delete req.session.redirectUrl;

// });
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (req, res) => {
        const redirectUrl = req.session.redirectUrl || "/listings";
        delete req.session.redirectUrl; // ✅ Clear it after using
        req.flash("success", `${req.user.username} welcome back to Wanderlust`);
        res.redirect(redirectUrl); // ✅ Redirect to originally intended page
    }
);


router.get("/logout",(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","you are logged out!")
    return res.redirect("/listings");
  });

});

module.exports = router;