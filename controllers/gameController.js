const gameService = require("../service/gameService");

class GameController {

    async getAccountGames (req, res, next){
        try{
            const {id} = req.user;
            const games = await gameService.getAccountGames(id);
            return res.json(games);
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
