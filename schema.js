const Joi = require("joi");
const review = require("./models/review");

const ListSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().uri().allow("",null),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required()
    }).required()
});

module.exports = { ListSchema };

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});
