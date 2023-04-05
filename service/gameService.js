const ApiError = require("../exceptions/apiError");

const hltb = require('howlongtobeat');
const hltbService = new hltb.HowLongToBeatService();

class GameService {
    async howLongToBeat(gameName){
        if(!gameName){
            throw ApiError.BadRequest("Введено некорректное название игры");
        }else {
            //доработать, чтобы возвращало конкретно то, что нужно, без дополнений и т.д.
            return await hltbService.search(gameName);
        }
    };
}

module.exports = new GameService();
