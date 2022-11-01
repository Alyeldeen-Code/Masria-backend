const mongoose = require("mongoose");
const Joi = require("joi");
const { join } = require("lodash");

const Employee = mongoose.model(
  "Employees",
  new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    Cin: { type: String, required: true },
    Cout: { type: String, required: true },
  })
);

const validateEmplyee = (employee) => {
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    Cin: Joi.string().required(),
    Cout: Joi.string().required(),
  });
  return schema.validate(employee);
};

module.exports.Employee = Employee;
module.exports.validate = validateEmplyee;
