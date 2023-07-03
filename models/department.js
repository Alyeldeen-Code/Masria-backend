const mongoose = require("mongoose");
const Joi = require("joi");

const Department = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: { type: String, required: true, unique: true },
  })
);

const validateDepartment = (employee) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
  });
  return schema.validate(employee);
};

module.exports.Department = Department;
module.exports.validate = validateDepartment;
