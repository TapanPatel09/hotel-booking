const User  = require("../models/user.js");

module.exports.singUpGet =(req,res)=>{
    // res.render("users/singup.ejs");
    res.render('users/signup.ejs', { error: null, formData: {} });
};

module.exports.singUpPost = async (req, res) => {
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
};


module.exports.loginGet = (req,res)=>{
    res.render("users/login.ejs");
};


module.exports.loginPost = (req,res)=>{
      const { username, email, password } = req.body;
      // const newUser = new User({ email, username });
      req.flash("success" ,`${username} welcome back to wonderlust`);
      // res.redirect(redirectUrl);
      // res.redirect(req.session.redirectUrl || "/listings");
      // const redirectUrl = res.session.redirectUrl || "/listings";
      const redirectUrl = req.session.redirectUrl || "/listings";

    delete req.session.redirectUrl; // clean up

    res.redirect(redirectUrl);
      // delete req.session.redirectUrl;
};

module.exports.logOut = (req,res,next)=>{
  req.logOut((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","you are logged out!")
    return res.redirect("/listings");
  });
};