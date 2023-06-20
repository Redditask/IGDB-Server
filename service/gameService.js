const ApiError = require("../exceptions/apiError");

const {User, LibraryGame, WishlistGame} = require("../models");

class GameService {

    async getAccountGames(userId){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("User not found");
        }else {
            const library = await LibraryGame.findAll({where: {userId}});
            console.log(library)
            const wishlist = await WishlistGame.findAll({where: {userId}});
            console.log(wishlist)
            return {library: library, wishlist: wishlist};
        }
    };

    async addToLibrary(userId, gameInfo){
        const candidate = await LibraryGame.findOne({where: {userId, slug: gameInfo.slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added by this user`);
        }else {
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

    async addToWishlist(userId, gameInfo){
        const candidate = await WishlistGame.findOne({where: {userId, slug: gameInfo.slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added by this user`);
        }else {
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

    async removeFromLibrary(userId, slug){
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added for this user`);
        }else {
            await LibraryGame.destroy({where: {slug, userId}});
        }
    };

    async removeFromWishlist(userId, slug){
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added for this user`);
        }else {
            await WishlistGame.destroy({where: {slug, userId}});
        }
    };
}

module.exports = new GameService();
