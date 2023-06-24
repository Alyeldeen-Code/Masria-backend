const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Employee, validate } = require("../models/employee");

router.get("/me", auth, async (req, res) => {
  const me = await Employee.findOne({ ID: req.user.ID });
  res.status(200).send(me);
});

router.get("/", auth, async (req, res) => {
  const employees = await Employee.find().sort("ID");
  res.send(
    employees.map((emp) => {
      return _.pick(emp, ["ID", "Emp_Name", "Department", "Position", "State"]);
    })
  );
});

router.get("/:ID", auth, async (req, res) => {
  const employees = await Employee.find({ ID: req.params.ID }).sort("ID");
  res.send(
    employees.map((emp) => {
      return _.pick(emp, ["ID", "Emp_Name", "Department", "Position", "State"]);
    })
  );
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let employee = await Employee.findOne({ ID: req.body.ID });
  if (employee) {
    if (employee.name !== req.body.name)
      return res.status(400).send("that ID is exiested with diffrant name.");
  }
  console.log("SUBERMAN");
  employee = new Employee({
    ID: req.body.ID,
    Emp_Name: req.body.Emp_Name,
    Department: req.body.Department,
    Position: req.body.Position,
    State: req.body.State,
  });

  employee = await employee.save();
  res.send(employee);
});

router.delete("/:ID", [auth, admin], async (req, res) => {
  const employee = await Employee.findOneAndRemove({ ID: req.params.ID });
  if (!employee) return res.status(400).send("bad requist.");
  res.status(200).send("User is Deleted.");
});

module.exports = router;
