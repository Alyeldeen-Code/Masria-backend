const mongoose = require("mongoose");
const Joi = require("joi");

const VacationSchema = new mongoose.Schema({
  department: { type: String, require: true },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  days: { type: Number, required: true },
  reason: { type: String, require: true },
  description: { type: String, require: true },
  responsible_employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  manager_res: { type: String, required: true, default: "processing" },
  hr_res: { type: String, required: true, default: "processing" },
});

const Vacation = mongoose.model("Vacation", VacationSchema);

const validateVacation = (vacation) => {
  const schema = Joi.object().keys({
    department: Joi.string().required(),
    employee: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    days: Joi.number().required(),
    reason: Joi.valid("regular", "emergency", "exceptional", "Sick").required(),
    description: Joi.string().optional(),
    responsible_employee: Joi.string().required(),
    manager_res: Joi.valid("accepted", "rejected", "processing").default(
      "processing"
    ),
    hr_res: Joi.valid("accepted", "rejected", "processing").default(
      "processing"
    ),
  });
  return schema.validate(vacation);
};

module.exports.Vacation = Vacation;
module.exports.validate = validateVacation;
