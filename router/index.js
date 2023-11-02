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
router.get("/check/:slug", authMiddleware, gameController.isAddedToAccount);
router.delete("/library/:slug", authMiddleware, gameController.removeFromLibrary);
router.delete("/wishlist/:slug", authMiddleware, gameController.removeFromWishlist);

router.post("/review/:slug", authMiddleware, userController.addReview);
router.delete("/review/:id", authMiddleware, userController.deleteReview);
router.put("/review/:id", authMiddleware, userController.editReview);
router.get("/reviews/:slug", gameController.getReviews);

router.get("/account/games", authMiddleware, gameController.getAccountGames);
router.get("/account/info/:username", userController.getAccountInfo);
router.put("/account/info/platforms", authMiddleware, userController.updateUserPlatforms);
router.post("/account/info/icon", authMiddleware, userController.updateUserIcon);
router.get("/account/reviews/:username", userController.getUserReviews);

router.post("/review/like/:id", authMiddleware, userController.likeReview);
router.post("/review/dislike/:id", authMiddleware, userController.dislikeReview);

module.exports = router;
