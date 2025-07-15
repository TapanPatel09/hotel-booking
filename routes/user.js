const express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utill/wrapsync.js");
const passport = require("passport");

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

    req.flash("success", `${username} → welcome to Wanderlust`);
    res.redirect("/listings");
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

router.post("/login",
    passport.authenticate("local" , {failureFlash :true , failureRedirect:'/login'}),
    async(req,res)=>{
      const { username, email, password } = req.body;
      const newUser = new User({ email, username });
      req.flash("success" ,`${username} welcome back to wonderlust`);
    res.redirect("/listings");
});


module.exports = router;