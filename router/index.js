const Router = require("express").Router;

const userController = require("../controllers/userController");
const gameController = require("../controllers/gameController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

const {body} = require("express-validator");

router.post(
    "/registration",
    body("email").isEmail(),
    body("username").isLength({min: 5, max: 14}),
    body("password").isLength({min: 4, max: 32}),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

router.post("/library", authMiddleware, gameController.addToLibrary);
router.post("/wishlist", authMiddleware, gameController.addToWishlist);
router.get("/library", authMiddleware, gameController.getLibrary);
router.get("/wishlist", authMiddleware, gameController.getWishlist);
router.delete("/library", authMiddleware, gameController.removeFromLibrary);
router.delete("/wishlist", authMiddleware, gameController.removeFromWishlist);
router.get("/howLongToBeat", gameController.howLongToBeat);

module.exports = router;
