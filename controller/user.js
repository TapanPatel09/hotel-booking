const User = require("../models/user.js");
const passport = require("passport");

// GET Signup page
module.exports.singUpGet = (req, res) => {
  res.render("users/signup.ejs", { error: null, formData: {} });
};

// POST Signup form
module.exports.singUpPost = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic form validation
  if (!username || !email || !password) {
    return res.status(400).render("users/signup", {
      error: "All fields are required.",
      formData: { username, email },
    });
  }

  try {
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password); // from passport-local-mongoose

    // Auto-login after successful registration
    req.logIn(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", `${username}, welcome to Wanderlust!`);
      return res.redirect("/listings");
    });
  } catch (err) {
    console.error(err);

    let errorMessage = "Something went wrong.";
    if (err.name === "UserExistsError") {
      errorMessage = "A user with that username already exists.";
    } else if (err.message === "No username was given") {
      errorMessage = "Username is required.";
    }

    return res.status(400).render("users/signup", {
      error: errorMessage,
      formData: { username, email },
    });
  }
};

// GET Login page
module.exports.loginGet = (req, res) => {
  res.render("users/login.ejs");
};

// POST Login (with Passport)
module.exports.loginPost = (req, res) => {
  const { username } = req.body;
  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl; // Clean up session

  req.flash("success", `${username}, welcome back to Wanderlust!`);
  res.redirect(redirectUrl);
};

// Logout handler
module.exports.logOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You have successfully logged out.");
    return res.redirect("/listings");
  });
};
