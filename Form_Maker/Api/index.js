const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const {
  CreateForm,
  GetUsers,
  GetQuestions,
  CheckForm,
} = require("./middleware/Controllers");

const corsOptions = {
  origin: "",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/CreateForm", CreateForm);
app.get("/users", GetUsers);
app.get("/questions/:creator", GetQuestions);
app.post("/CheckForm", CheckForm);
app.use("/", (req, res, next) => {
  res.json({ message: "HEllo" });
  next();
});

mongoose
  .connect("")
  .then(() => {
    app.listen(port, () => {
      console.log("Server is Online");
    });

    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Server because: ");
    console.log(err);
  });
