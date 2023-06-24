const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("ID or password is Invalid.");

  const user = await User.findOne({ ID: req.body.ID });
  if (!user) return res.status(400).send("ID or password is Invalid.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("ID or password is Invalid.");

  const token = await user.generateAuthToken();
  res.send(token);
});

const validate = (auth) => {
  const schema = Joi.object().keys({
    ID: Joi.number().required(),
    password: Joi.string().required(),
  });
  return schema.validate(auth);
};

module.exports = router;
