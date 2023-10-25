const router = require("express").Router();
const {
  validateUserBody,
  validateAuthentication,
} = require("../middleware/validation");
const { userLogin, createUser } = require("../controllers/usersController");
const auth = require("../middleware/auth");

const articlesRouter = require("./articles");
const usersRouter = require("./users");
const notFoundRouter = require("./notFoundRoute");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, userLogin);

router.use(auth); // protecting routes below with auth

router.use("/articles", articlesRouter);
router.use("/users", usersRouter);
router.use("/*", notFoundRouter);

module.exports = router;
