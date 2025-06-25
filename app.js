const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.use(methodOverride("_method"));



const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log("error are fount",err );
})

async function main(){
        await mongoose.connect(mongo_url);
    };  
app.set("view engine","ejs");
// app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hi , it's start");
});

// index rout
app.get("/listings",async(req,res)=>{
    const alllisting = await listing.find({});
    // console.log(alllisting);
    res.render("listing/index.ejs", { alllisting });
});

//new rout
app.get("/listings/new",(req,res)=>{
    res.render("listing/new.ejs");
});

// show rout
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findById(id);
    res.render("listing/show.ejs", {list} );
});

//crete a route
app.post("/listings",async(req,res)=>{
    // let {title , description , image ,price,country,location} = req.body;
    // let listing = req.body.listing;
    let newlistings = new listing(req.body.listing);
    await newlistings.save();
    // console.log(listing);
    res.redirect("/listings");
});

//edit route 
app.get("/listings/:id/edit",async(req,res)=>{
    let{id} = req.params;
    let list = await listing.findById(id);
    res.render("listing/edit.ejs",{list});
});
//update rout
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let list = await listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
});
//delete 
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const deletelistings = await listing.findByIdAndDelete(id);
    console.log(deletelistings);
    res.redirect("/listings");
});

app.use((req,res)=>{
    let qur = req.query;
    res.render("listing/erorr.ejs",{qur});
})

app.listen( 8080,()=>{
    console.log("server is start");
});