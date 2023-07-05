const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Employee } = require("../models/employee");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("ID or password is Invalid.");

  const employee = await Employee.findOne({ ID: req.body.ID });
  if (!employee) return res.status(400).send("ID or password is Invalid.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    employee.password
  );
  if (!validPassword) return res.status(400).send("ID or password is Invalid.");

  if (employee.State != "Active")
    return res.status(403).send("This User is not Active Any More.");

  const token = await employee.generateAuthToken();
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
