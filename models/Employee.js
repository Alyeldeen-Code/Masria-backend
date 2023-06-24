const mongoose = require("mongoose");
const Joi = require("joi");

const Employee = mongoose.model(
  "Employees",
  new mongoose.Schema({
    ID: { type: Number, required: true, unique: true },
    Emp_Name: { type: String, required: true },
    Department: { type: String, required: true },
    Position: { type: String, required: true },
    State: { type: String, required: true },
  })
);

const validateEmplyee = (employee) => {
  const schema = Joi.object().keys({
    ID: Joi.number().required(),
    Emp_Name: Joi.string().required(),
    Department: Joi.string().required(),
    Position: Joi.string().required(),
    State: Joi.string().required(),
  });
  return schema.validate(employee);
};

module.exports.Employee = Employee;
module.exports.validate = validateEmplyee;
