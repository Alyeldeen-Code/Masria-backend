const express = require("express");
const { Vacation, validate } = require("../models/vacatoin");

const router = express.Router();

router.get("/", async (req, res) => {
  const vacations = await Vacation.find().populate(
    "employee",
    "Emp_Name Department"
  );
  res.send(vacations);
});
router.post("/", async (req, res) => {
  const new_vacation = new Vacation({
    employee: req.body.employee,
    start_data: req.body.start_data,
    end_data: req.body.end_data,
    days: req.body.days,
    reason: req.body.reason,
    describtion: req.body.describtion,
    responsible_employee: req.body.responsible_employee,
    manager_res: req.body.manager_res,
    hr_res: req.body.hr_res,
  });

  await new_vacation.save();
  res.send(new_vacation);
});

router.put("/", (req, res) => {
  res.send("put vication");
});
router.delete("/", (req, res) => {
  res.send("delete vication");
});

module.exports = router;
