const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const EmployeeSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  Emp_Name: { type: String, required: true },
  Department: { type: String, required: true },
  Position: { type: String, required: true },
  State: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

EmployeeSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      ID: this.ID,
      isAdmin: this.isAdmin,
      Position: this.Position,
      Department: this.Department,
    },
    config.get("jwtPraivetKey")
  );
  return token;
};

const Employee = mongoose.model("Employees", EmployeeSchema);

const validateEmplyee = (employee) => {
  const schema = Joi.object().keys({
    ID: Joi.number().required(),
    Emp_Name: Joi.string().required(),
    Department: Joi.string().required(),
    Position: Joi.string().required(),
    State: Joi.string().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(employee);
};

module.exports.Employee = Employee;
module.exports.validate = validateEmplyee;
