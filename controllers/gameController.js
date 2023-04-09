const gameService = require("../service/gameService");

class GameController {
    async howLongToBeat(req, res, next){
        try {
            const gameName = req.query.game;
            const result = await gameService.howLongToBeat(gameName);
            return res.json(result);
        }catch (error){
            next(error);
        }
    };
}

module.exports = new GameController();
