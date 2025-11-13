const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");

const port = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.use(morgan("dev"));



// MVC Layout Below

// const fruitsCtrl = require('./controllers/fruits');
// app.get('/fruits', fruitsCtrl.index);




app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});