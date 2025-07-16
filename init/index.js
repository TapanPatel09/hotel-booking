const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");
const mongo_url = "mongodb://127.0.0.1:27017/wonderlust";

main().
    then(()=>{
        console.log("connecting to db's");
    })
    .catch((err)=>{
        console.log("err is found",err);
    });

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async () =>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj , owner:"6877f6150e757205f7805985"}));
    await listing.insertMany(initdata.data);    
    console.log("data was initated");
}

initDB();
