const ApiError = require("../exceptions/apiError");
const {findGame} = require("../utils/helpers");

const hltb = require('howlongtobeat');
const {User, LibraryGame, WishlistGame} = require("../models");
const hltbService = new hltb.HowLongToBeatService();

class GameService {
    async howLongToBeat(gameName){
        if(!gameName){
            throw ApiError.BadRequest("Введено некорректное название игры");
        }else {
            const results = await hltbService.search(gameName);
            return findGame(results, gameName)[0];
        }
    };

    async getLibrary(userId){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден");
        }else {
            const library = await LibraryGame.findAll({where: {userId}});
            return library;
        }
    };

    async getWishlist(userId){
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден");
        }else {
            const wishlist = await WishlistGame.findAll({where: {userId}});
            return wishlist;
        }
    };

    async addToLibrary(userId, slug){
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (candidate) {
            throw ApiError.BadRequest(`Такая игра уже добавлена у этого пользователя`);
        }else {
            const libraryGame = LibraryGame.create({slug, userId});
            return libraryGame;
        }
    };

    async addToWishlist(userId, slug){
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (candidate) {
            throw ApiError.BadRequest(`Такая игра уже добавлена у этого пользователя`);
        }else {
            const wishlistGame = WishlistGame.create({slug, userId});
            return wishlistGame;
        }
    };

    async removeFromLibrary(userId, slug){
        const candidate = await LibraryGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`Такая игры не добавлена у этого пользователя`);
        }else {
            const libraryGame = LibraryGame.destroy({where: {slug, userId}});
            return libraryGame;
        }
    };

    async removeFromWishlist(userId, slug){
        const candidate = await WishlistGame.findOne({where: {userId, slug}});
        if (!candidate) {
            throw ApiError.BadRequest(`Такая игра не добавлена у этого пользователя`);
        }else {
            const wishlistGame = WishlistGame.destroy({where: {slug, userId}});
            return wishlistGame;
        }
    };
}

module.exports = new GameService();
