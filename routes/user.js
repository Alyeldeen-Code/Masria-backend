const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { errors } = validate(
    _.pick(req.body, [
      "firstname",
      "lastname",
      "password",
      "phonenumber",
      "email",
    ])
  );
  if (errors) return res.status(400).send(errors.ditails[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is eridy exist");
  user = new User(
    _.pick(req.body, [
      "firstname",
      "lastname",
      "password",
      "phonenumber",
      "email",
    ])
  );

  user.save();
  res
    .status(200)
    .send(_.pick(req.body, ["firstname", "lastname", "phonenumber", "email"]));
});

module.exports = router;
