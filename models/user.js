const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    firstname: { type: String, min: 5, required: true },
    lastname: { type: String, min: 5, required: true },
    password: { type: String, required: true, min: 8 },
    phonenumber: { type: Number, required: true, min: 11 },
    email: { type: String, required: true, unique: true },
  })
);

const validateuser = (User) => {
  const user = Joi.object().keys({
    firstname: Joi.string().min(5).required(),
    lastname: Joi.string().min(5).required(),
    password: Joi.string().min(8).required(),
    phonenumber: Joi.number().min(11).required(),
    email: Joi.string().required().email(),
  });

  return user.validate(User);
};

module.exports.User = User;
module.exports.validate = validateuser;
