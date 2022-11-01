const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Employee, validate } = require("../models/Employee");

router.get("/", async (req, res) => {
  const employees = await Employee.find().sort("id");
  res.send(
    employees.map((emp) => {
      return _.pick(emp, ["id", "name", "Cin", "Cout"]);
    })
  );
});

router.post("/", async (req, res) => {
  const { erro } = validate(req.body);
  if (erro) return res.status(400).send(erro.details[0].message);

  let employee = await Employee.findOne({ id: req.body.id });
  if (employee) return res.status(400).send("that id is exiested.");

  employee = new Employee({
    id: req.body.id,
    name: req.body.name,
    Cin: req.body.Cin,
    Cout: req.body.Cout,
  });

  employee = await employee.save();
  res.send(employee);
});

module.exports = router;
