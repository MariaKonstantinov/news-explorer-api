// IMPORT MODULES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { apiLimiter } = require('./middleware/rateLimit');

// CONNECTION TO DATABASE AND PORT ----------------------->
const { DEF_MONGO_DB } = require('./utils/config');

const app = express();

const PORT = 3001;

// APP USE ---------------------------------------------------->
app.use(helmet());

app.use(apiLimiter);

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.options('*', cors());

app.use(requestLogger);

// ADD TEMPORARY CODE FOR SERVER CRASH TEST ! TODO remove after project is accepted
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

// CONNECT TO MONGODB ---------------------------------------------------->
mongoose
  .connect(process.env.MONGO_DB ? process.env.MONGO_DB : DEF_MONGO_DB)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`App listening at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
