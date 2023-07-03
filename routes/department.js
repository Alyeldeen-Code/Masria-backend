const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Department, validate } = require("../models/department");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  let departments = await Department.find().sort("name");

  if (!departments.length) {
    return res.send("there is no department to show.");
  }
  res.status(200).send(departments);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let department = await Department.findOne({ name: req.body?.name });
  console.log(department);
  if (department) {
    return res.status(400).send("that department is exiested.");
  }
  department = new Department({ name: req.body.name });
  department = await department.save();

  res.status(200).send(department);
});

module.exports = router;
