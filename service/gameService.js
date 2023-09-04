const ApiError = require("../exceptions/apiError");

const {User, LibraryGame, WishlistGame, GameReview} = require("../models");
const {mostLikedSort, latestSort} = require("../utils");

class GameService {

    async getAccountGames(userId) {
        const user = await User.findOne({where: {id: userId}});
        if (!user) {
            throw ApiError.BadRequest("User not found");
        } else {
            const library = await LibraryGame.findAll({where: {userId}});
            const wishlist = await WishlistGame.findAll({where: {userId}});

            return {library: library, wishlist: wishlist};
        }
    };

    async addToLibrary(userId, gameInfo) {
        const candidate = await LibraryGame.findOne({where: {userId, slug: gameInfo.slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added`);
        } else {
            await LibraryGame.create({
                slug: gameInfo.slug,
                name: gameInfo.name,
                released: gameInfo.released,
                background_image: gameInfo.background_image,
                metacritic: gameInfo.metacritic,
                genres: gameInfo.genres,
                parent_platforms: gameInfo.parent_platforms,
                userId: userId,
            });
        }
    };

    async addToWishlist(userId, gameInfo) {
        const candidate = await WishlistGame.findOne({where: {userId, slug: gameInfo.slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added`);
        } else {
            await WishlistGame.create({
                slug: gameInfo.slug,
                name: gameInfo.name,
                released: gameInfo.released,
                background_image: gameInfo.background_image,
                metacritic: gameInfo.metacritic,
                genres: gameInfo.genres,
                parent_platforms: gameInfo.parent_platforms,
                userId: userId,
            });
        }
    };

    async removeFromLibrary(userId, slug) {
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added`);
        } else {
            await LibraryGame.destroy({where: {slug, userId}});
        }
    };

    async removeFromWishlist(userId, slug) {
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added`);
        } else {
            await WishlistGame.destroy({where: {slug, userId}});
        }
    };

    async isAddedToAccount(userId, slug) {
        if(userId) {
            const library = await LibraryGame.findOne({where: {userId, slug}});
            const wishlist = await WishlistGame.findOne({where: {userId, slug}});
            return {library: !!library, wishlist: !!wishlist};
        } else return {library: false, wishlist: false};
    };

    async getReviews(slug, username, sortOption) {
        const result = await GameReview.findAll({where: {slug}});
        let userReviewId = 0;

        let userReview = result.find((review) => review.username === username);
        const otherReviews = result.filter((review) => review.username !== username);

        if (userReview) {
            userReview.dataValues = {
                ...userReview.dataValues,
                likedUsers: userReview.likedUsers.length,
                dislikedUsers: userReview.dislikedUsers.length,
                userReaction: "null",
            };

            userReviewId = userReview.id;
        }

        for (let review of otherReviews) {
            if (review.likedUsers.includes(username)) {
                review.dataValues = {
                    ...review.dataValues,
                    likedUsers: review.likedUsers.length,
                    dislikedUsers: review.dislikedUsers.length,
                    userReaction: "like",
                };
            } else if (review.dislikedUsers.includes(username)) {
                review.dataValues = {
                    ...review.dataValues,
                    likedUsers: review.likedUsers.length,
                    dislikedUsers: review.dislikedUsers.length,
                    userReaction: "dislike",
                };
            } else {
                review.dataValues = {
                    ...review.dataValues,
                    likedUsers: review.likedUsers.length,
                    dislikedUsers: review.dislikedUsers.length,
                    userReaction: "null",
                };
            }
        }

        if (sortOption === "mostLiked") {
            otherReviews.sort(mostLikedSort);
        } else otherReviews.sort(latestSort);

        return userReview
            ? {reviews: [userReview, ...otherReviews], userReviewId}
            : {reviews: otherReviews, userReviewId};
    };
}

module.exports = new GameService();
