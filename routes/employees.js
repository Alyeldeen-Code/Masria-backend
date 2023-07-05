const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Employee, validate } = require("../models/employee");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const me = await Employee.findOne({ ID: req.user.ID });
  res
    .status(200)
    .send(
      _.pick(me, [
        "ID",
        "Emp_Name",
        "Department",
        "Position",
        "State",
        "isAdmin",
      ])
    );
});

router.get("/", auth, async (req, res) => {
  const employees = await Employee.find().sort("ID");
  res.send(
    employees.map((emp) => {
      return _.pick(emp, [
        "ID",
        "Emp_Name",
        "Department",
        "Position",
        "State",
        "isAdmin",
      ]);
    })
  );
});

router.get("/:ID", auth, async (req, res) => {
  const employees = await Employee.find({ ID: req.params.ID }).sort("ID");
  res.send(
    employees.map((emp) => {
      return _.pick(emp, [
        "ID",
        "Emp_Name",
        "Department",
        "Position",
        "State",
        "isAdmin",
      ]);
    })
  );
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(
    _.pick(req.body, [
      "ID",
      "Emp_Name",
      "Department",
      "Position",
      "State",
      "password",
      "isAdmin",
    ])
  );
  if (error) return res.status(400).send(error.details[0].message);
  let employee = await Employee.findOne({ ID: Number.parseInt(req.body.ID) });
  if (employee) {
    if (
      employee.ID !== req.body.ID ||
      employee.Department !== req.body.Department
    )
      return res.status(400).send("that ID is exiested .");
  }

  const salt = await bcrypt.genSalt(10);
  const scret = await bcrypt.hash(req.body.password, salt);

  employee = new Employee({
    ..._.pick(req.body, [
      "ID",
      "Emp_Name",
      "Department",
      "Position",
      "State",
      "password",
      "isAdmin",
    ]),
    password: scret,
  });

  await employee.save();
  res.send(
    _.pick(req.body, [
      "ID",
      "Emp_Name",
      "Department",
      "Position",
      "State",
      "isAdmin",
    ])
  );
});

router.delete("/:ID", [auth, admin], async (req, res) => {
  const employee = await Employee.findOneAndRemove({ ID: req.params.ID });
  if (!employee) return res.status(400).send("bad requist.");
  res.status(200).send("User is Deleted.");
});

module.exports = router;
