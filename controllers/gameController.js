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
            const {gameInfo} = req.body;
            await gameService.addToLibrary(id, gameInfo);
            return res.json({status: 200});
        }catch (error){
            next(error);
        }
    };

    async addToWishlist (req, res, next){
        try{
            const {id} = req.user;
            const {gameInfo} = req.body;
            await gameService.addToWishlist(id, gameInfo);
            return res.json({status: 200});
        }catch (error){
            next(error);
        }
    };

    async removeFromLibrary (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            await gameService.removeFromLibrary(id, slug);
            return res.json({status: 200});
        }catch (error){
            next(error);
        }
    };

    async removeFromWishlist (req, res, next){
        try{
            const {id} = req.user;
            const {slug} = req.body;
            await gameService.removeFromWishlist(id, slug);
            return res.json({status: 200});
        }catch (error){
            next(error);
        }
    };
}

module.exports = new GameController();
