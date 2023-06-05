const ApiError = require("../exceptions/apiError");
const {findGame} = require("../utils/helpers");

const hltb = require('howlongtobeat');
const {User, LibraryGame, WishlistGame} = require("../models");
const hltbService = new hltb.HowLongToBeatService();

class GameService {
    async howLongToBeat(gameName){
        if(!gameName){
            throw ApiError.BadRequest("Invalid game name");
        }else {
            const results = await hltbService.search(gameName);
            return findGame(results, gameName)[0];
        }
    };

    async getLibrary(userId){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("User not found");
        }else {
            const library = await LibraryGame.findAll({where: {userId}});
            return library;
        }
    };

    async getWishlist(userId){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("User not found");
        }else {
            const wishlist = await WishlistGame.findAll({where: {userId}});
            return wishlist;
        }
    };

    async addToLibrary(userId, slug){
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added by this user`);
        }else {
            const libraryGame = LibraryGame.create({slug, userId});
            return libraryGame;
        }
    };

    async addToWishlist(userId, slug){
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (candidate) {
            throw ApiError.BadRequest(`This game has already been added by this user`);
        }else {
            const wishlistGame = WishlistGame.create({slug, userId});
            return wishlistGame;
        }
    };

    async removeFromLibrary(userId, slug){
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added for this user`);
        }else {
            const libraryGame = LibraryGame.destroy({where: {slug, userId}});
            return libraryGame;
        }
    };

    async removeFromWishlist(userId, slug){
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`This game is not added for this user`);
        }else {
            const wishlistGame = WishlistGame.destroy({where: {slug, userId}});
            return wishlistGame;
        }
    };
}

module.exports = new GameService();
