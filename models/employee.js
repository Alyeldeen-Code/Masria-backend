const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
/*
==>Permissions Roles:
##number identefire:
*0:not Allowed
*1:Read
*3:Read and Create
*5:Read , Delete and Create

##number Index identefie:
*1:manage own user.
*2:manage own vecation.
*3:mange own Complains.
*4:manage Employee.
*5:manage Departments.
*6:manage Department Complains.
*7:manage Department vecation Requests.
*/
const NUMBER_OF_PERMISSIONS = 7;
const DEFAULT_PERMISSION_VALUE = "1000000";

const EmployeeSchema = new mongoose.Schema({
  ID: { type: Number, required: true, unique: true },
  Emp_Name: { type: String, required: true },
  Department: { type: String, required: true },
  Position: { type: String, required: true },
  State: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  Roles: { type: String, required: true, default: DEFAULT_PERMISSION_VALUE },
});

EmployeeSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      ID: this.ID,
      isAdmin: this.isAdmin,
      Position: this.Position,
      Department: this.Department,
      Roles: this.Roles,
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
    Roles: Joi.string()
      .min(NUMBER_OF_PERMISSIONS)
      .max(NUMBER_OF_PERMISSIONS)
      .required(),
  });
  return schema.validate(employee);
};

module.exports.Employee = Employee;
module.exports.validate = validateEmplyee;
