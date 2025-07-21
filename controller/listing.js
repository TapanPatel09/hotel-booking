const { ur } = require("@faker-js/faker");
const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const alllisting = await listing.find({});
    res.render("listing/index.ejs", { alllisting });
};

module.exports.renderNewForm = (req, res) => {
    console.log(req.user);
    res.render("listing/new.ejs");
}

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    list = await listing.findById(id)
        .populate({
            path: "review",         
            populate: {
                path: "author"      
            }
        })
        .populate("owner");   
    // let list = await listing.findById(id).populate("review").populate("owner");
    if(!list){
        req.flash("error", "listing is does not exits");
        // res.redirect("/listing");
        return res.redirect("/listings");
    }
    console.log(list);
    res.render("listing/show.ejs", {list} );
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();

    req.flash("success","lisgin is successduly ");
    res.redirect("/listings");
};



module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const list = await listing.findById(id);
    if (!list) {
        throw new ExpressError(404, "Listing not found for editing");
    }

    let original = list.image.url;
    original=original.replace("/upload","/upload/h_300,w_250");
    res.render("listing/edit.ejs", { list ,original});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const list = await listing.findByIdAndUpdate(id, { ...req.body.listing });

    // if(typeof req.file == undefined){
    if(req.file){
        let url = req.file.path;
        let filename = req.file.filename;
        list.image = {url,filename};
        await list.save();
    } 
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
};