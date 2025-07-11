const express = require("express");
const app = express();
const user = require("./route/users");
const post = require("./route/post");
const session = require("express-session");

// app.use(session( {secret :"mysecretstring" , resave:false , saveUninitialized:true   } ));
const sessionOption = {
  secret :"mysecretstring" ,
  resave:false ,
  saveUninitialized:true, 
};

app.use(session(sessionOption));

app.get("/register",(req,res)=>{
  let {name = "tapan"} =req.query;
  req.session.name =name;
  res.send(name); 
})

app.get("/hello",(req,res)=>{
  res.send(`hello,${req.session.name}`);
})

// app.get("/test",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }
//   else{
//     req.session.count=1;
//   }
//   res.send(`session count ${req.session.count}`);
// });


app.listen(3030,()=>{
    console.log("server 3030 start");
});