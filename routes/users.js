const express = require("express");
const { getCurrentUser } = require("../controllers/usersController");

const usersRouter = express.Router();

usersRouter.get("/me", getCurrentUser);

module.exports = usersRouter;
