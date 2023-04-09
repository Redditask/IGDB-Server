const ApiError = require("../exceptions/apiError");
const {findGame} = require("../utils/helpers");

const hltb = require('howlongtobeat');
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
}

module.exports = new GameService();
