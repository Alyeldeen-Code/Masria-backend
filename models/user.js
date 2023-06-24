const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const UserSchema = new mongoose.Schema({
  name: { type: String, min: 5, required: true },
  password: { type: String, required: true },
  ID: { type: Number, required: true, unique: true },
  isAdmin: { type: Boolean, required: true },
});

UserSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { ID: this.ID, isAdmin: this.isAdmin },
    config.get("jwtPraivetKey")
  );
  return token;
};
const User = mongoose.model("user", UserSchema);

const validateuser = (User) => {
  const user = Joi.object().keys({
    name: Joi.string().min(5).required(),
    password: Joi.string().required(),
    ID: Joi.number().required(),
    isAdmin: Joi.boolean().required(),
  });

  return user.validate(User);
};

module.exports.User = User;
module.exports.validate = validateuser;
