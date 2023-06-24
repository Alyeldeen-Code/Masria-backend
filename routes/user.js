const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  let users = await User.find().sort("ID");
  res.send(
    users.map((user) => {
      return _.pick(user, ["name", "ID", "isAdmin"]);
    })
  );
});

router.post("/", async (req, res) => {
  const { errors } = validate(
    _.pick(req.body, ["name", "password", "ID", "isAdmin"])
  );

  if (errors) return res.status(400).send(errors.ditails[0].message);

  let user = await User.findOne({ ID: req.body.ID });

  if (user) return res.status(400).send("User is eridy exist");

  const salt = await bcrypt.genSalt(10);
  const scret = await bcrypt.hash(req.body.password, salt);
  user = new User({
    ..._.pick(req.body, ["name", "password", "ID", "isAdmin"]),
    password: scret,
  });

  user.save();

  res.status(200).send(_.pick(req.body, ["name", "ID", "isAdmin"]));
});

module.exports = router;
