const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employees = require("./routes/employees");
const User = require("./routes/user");
const app = express();
const db = mongoose.connect("mongodb+srv://alyeldeen:alyeldeen2@masria.nqunjno.mongodb.net/?retryWrites=true&w=majority", (error) => {
  if (!error) console.log("db connected ......");
  else console.log(error);
});

app.use(cors());
app.use(express.json());
app.use("/emplo", Employees);
app.use("/user", User);

app.get("/", (req, res) => {
  res.send("Masria API.....");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
