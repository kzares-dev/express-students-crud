const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    grade: Number,
    age: Number,
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;