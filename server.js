const express = require("express");
const connectToDatabase = require("./src/lib/connect.method");
const dotenv = require("dotenv").config(); // load the enviroment variables
const studentsRouter = require("./src/routes/students.route");

// define default initialization of the server
const app = express();
connectToDatabase();

// Allow requests from any origin (public CORS policy)

app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

app.get("/", (req, res) => {
  // making an endpoint to testing propuses
  res.send("server up");
});
// load the rest of endpoints
app.use("/api/students", studentsRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("server up and running");
});
