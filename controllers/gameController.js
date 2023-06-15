const gameService = require("../service/gameService");

class GameController {

    async getLibrary (req, res, next){
        try{
            const {id} = req.user;
            const library = await gameService.getLibrary(id);
            return res.json(library);
        }catch (error){
            next(error);
        }
    };

    async getWishlist (req, res, next){
        try{
            const {id} = req.user;
            const wishlist = await gameService.getWishlist(id);
            return res.json(wishlist);
        }catch (error){
            next(error);
        }
    };

    async addToLibrary (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            const game = await gameService.addToLibrary(id, slug);
            return res.json(game);
        }catch (error){
            next(error);
        }
    };

    async addToWishlist (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            const game = await gameService.addToWishlist(id, slug);
            return res.json(game);
        }catch (error){
            next(error);
        }
    };

    async removeFromLibrary (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            const game = await gameService.removeFromLibrary(id, slug);
            return res.json(game);
        }catch (error){
            next(error);
        }
    };

    async removeFromWishlist (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            const game = await gameService.removeFromWishlist(id, slug);
            return res.json(game);
        }catch (error){
            next(error);
        }
    };
}

module.exports = new GameController();
