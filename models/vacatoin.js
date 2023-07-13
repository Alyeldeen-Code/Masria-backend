const mongoose = require("mongoose");
const Joi = require("joi");

const VacationSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  start_data: { type: Date, required: true },
  end_data: { type: Date, required: true },
  days: { type: Number, required: true },
  reason: { type: String, require: true },
  describtion: { type: String, require: true },
  responsible_employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  manager_res: { type: String, required: true },
  hr_res: { type: String, required: true },
});

const Vacation = mongoose.model("Vacation", VacationSchema);

const validateVacation = (employee) => {
  const schema = Joi.object().keys({
    id: Joi.number().required(),
    employee: Joi.string().required(),
    start_data: Joi.date().required(),
    end_data: Joi.date().required(),
    days: Joi.number().required(),
    reason: Joi.valid([
      "regular",
      "emergency",
      "exceptional",
      "Sick",
    ]).required(),
    describtion: Joi.string().optional(),
    responsible_employee: Joi.string().required(),
    manager_res: Joi.valid(["accepted", "refused", "processing"])
      .required()
      .default("processing"),
    hr_res: Joi.valid(valid(["accepted", "refused", "processing"]))
      .required()
      .default("processing"),
  });
  return schema.validate(employee);
};

module.exports.Vacation = Vacation;
module.exports.validate = validateVacation;
