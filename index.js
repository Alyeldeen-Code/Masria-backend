const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("config");
const Employees = require("./routes/employees");
const Auth = require("./routes/auth");
const Department = require("./routes/department");
const Vacation = require("./routes/vacation");

if (!config.get("jwtPraivetKey")) {
  console.error("FATAL ERROR: jwtPraivetKey is not defined.");
  process.exit(1);
}

const app = express();
const db = mongoose.connect(
  "mongodb+srv://alyeldeen:alyeldeen2@masria.nqunjno.mongodb.net/?retryWrites=true&w=majority",
  (error) => {
    if (!error) console.log("db connected ......");
    else console.log(error);
  }
);

app.use(cors());
app.use(express.json());
app.use("/api/employee", Employees);
app.use("/api/vacation", Vacation);
app.use("/api/auth", Auth);
app.use("/api/department", Department);

app.get("/", (req, res) => {
  res.send("Masria API.....");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
