require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");

const bodyParser = require("body-parser");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const { apiLimiter } = require("./middleware/rateLimit");

// ADD CONNECTION TO DATABASE AND PORT !

const app = express();

app.use(cors());
app.options("*", cors());

app.use(helmet());
app.use(apiLimiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ADD TEMPORARY CODE FOR SERVER CRASH TEST !

app.use(router);

app.use(errors());
app.use(errorHandler);

/* mongoose
  .connect(DB_ADDRESS)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });*/
