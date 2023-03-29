const Router = require("express").Router;

const userController = require("../controllers/userController");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:ling", userController.activate);
router.get("/refresh", userController.refresh);
//test
router.get("/users", userController.getUsers);

module.exports = router;