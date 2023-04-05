const Router = require("express").Router;

const userController = require("../controllers/userController");
const gameController = require("../controllers/gameController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

const {body} = require("express-validator");

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 32}),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.get("/howLongToBeat", gameController.howLongToBeat)
//test
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
