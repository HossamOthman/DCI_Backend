const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const userRoutes = require("./routes/user");
const messageRoutes = require('./routes/message');
const passport = require('passport');
const initialize = require('./passport-config');




// const { generateAvatar } = require("./helpers/avatar");

// console.log(generateAvatar(3))


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

// specify your middleware here
initialize(passport);

// specify your routes here
app.use('/user', userRoutes);
app.use('/message', messageRoutes)


console.log("Connecting to database. Put the kettle on while you wait... 🫖");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

app.listen(3001, () => console.log("The server is listening... 🐒"));