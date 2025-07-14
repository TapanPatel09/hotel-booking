const express = require("express");
const app = express();
const path = require("path");
const user = require("./route/users");
const post = require("./route/post");
const session = require("express-session");
const flash = require("connect-flash");
const { ne } = require("@faker-js/faker");
// const flash = require("express-flash");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// app.use(session( {secret :"mysecretstring" , resave:false , saveUninitialized:true   } ));
const sessionOption = {
  secret :"mysecretstring" ,
  resave:false ,
  saveUninitialized:true, 
};

app.use(session(sessionOption));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

app.get("/register",(req,res)=>{
  let { name = "unonomous" } = req.query;
  req.session.name =name;

  if(name == "unonomous"){
    req.flash("error","users not found");
  }
  else{
    req.flash("success","flashing text");
  }
  res.redirect("/hello");
  // res.send(name); 
})

app.get("/hello", (req, res) => {
    res.render("view.ejs", { name: req.session.name });
});


app.listen(3030,()=>{
    console.log("server 3030 start");
}); 