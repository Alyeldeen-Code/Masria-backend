const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Vacation, validate } = require("../models/vacatoin");
const { date } = require("joi");

const router = express.Router();

//GET ME
router.get("/", [auth], async (req, res) => {
  if (!req.Roles.ManageOwnVecation.read)
    return res.status(403).send("You are not Allowed.");

  const vacations = await Vacation.find({ employee: req.user._id })
    .populate("employee", "Emp_Name ")
    .populate("responsible_employee", "Emp_Name");

  res.send(vacations);
});

//GET ALL
router.get("/all", [auth], async (req, res) => {
  if (!(req.user.Position === "HR"))
    return res.status(403).send("You are not Allowed.");

  const vacations = await Vacation.find()
    .populate("employee", "Emp_Name ")
    .populate("responsible_employee", "Emp_Name");
  res.send(vacations);
});

//GET DEPARTMENT
router.get("/department", [auth], async (req, res) => {
  if (req.user.position != "Manager" && !req.user.isAdmin)
    return res.status(403).send("you are not Auth to get that data.");
  const vacations = await Vacation.find({ department: req.user.Department })
    .populate("employee", "Emp_Name ")
    .populate("responsible_employee", "Emp_Name");
  res.send(vacations);
});

//POST
router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const start_date =
    new Date(req.body.start_date).getTime() + 2 * 60 * 60 * 1000;
  const end_date = new Date(req.body.end_date).getTime() + 2 * 60 * 60 * 1000;

  let vacation = await Vacation.findOne({
    $or: [
      {
        start_date: start_date,
      },
      { end_date: end_date },
    ],
  }).populate("employee");

  if (vacation) {
    if (vacation.employee._id === req.body.employee)
      return res.status(400).send("that vacation is arrdy sended.");
  }

  vacation = new Vacation({
    department: req.body.department,
    employee: req.body.employee,
    start_date: new Date(start_date).toISOString(),
    end_date: new Date(end_date).toISOString(),
    days: req.body.days,
    reason: req.body.reason,
    description: req.body.description,
    responsible_employee: req.body.responsible_employee,
    manager_res: req.body.manager_res,
    hr_res: req.body.hr_res,
  });

  await vacation.save();
  res.send(vacation);
});

//UPDATE
router.put("/response/:id", [auth], async (req, res) => {
  const position = req.user.Position;

  if (position != "Manager" && position != "HR") {
    return res.status(403).send("You are not Allowed.");
  }

  if (!(req.body.manager_res || req.body.hr_res))
    return res.status(400).send("There is no valid data.");

  const vacation = await Vacation.findById(req.params.id).populate(
    "employee",
    "Department"
  );

  if (!vacation)
    return res.status(404).send("There is No Vacation with that id.");
  if (
    vacation.employee.Department != req.user.Department &&
    position === "HR"
  ) {
    return res.status(403).send("You are not Allowed.");
  }

  //TODO: Validate data.

  await vacation.updateOne(req.body);
  res.send(`Vacation ${req.body.manager_res || req.body.hr_res}`);
});

//DELETE
router.delete("/:id", [auth], async (req, res) => {
  //find
  console.log(req.params?.id);
  let vacation = await Vacation.findById(req.params.id).populate(
    "employee",
    "Emp_Name"
  );
  //check
  if (!vacation.employee)
    return res.status(400).send("there is no vcation match.");
  if (vacation.employee._id.equals(req.user._id)) {
    //delete
    vacation = await Vacation.deleteOne({ _id: req.params?.id });
    res.status(200).send("Deleted.");
  } else {
    //not Allowed
    return res.status(400).send("You can not Delete that vacation.");
  }
});

module.exports = router;
