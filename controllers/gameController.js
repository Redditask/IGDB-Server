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
            return res.json({status: 200, message: "Added to library"});
        }catch (error){
            next(error);
        }
    };

    async addToWishlist (req, res, next){
        try{
            const {id} = req.user;
            const {gameInfo} = req.body;
            await gameService.addToWishlist(id, gameInfo);
            return res.json({status: 200, message: "Added to wishlist"});
        }catch (error){
            next(error);
        }
    };

    async removeFromLibrary (req, res, next){
        try{
            const {id} = req.user;
            const slug = req.params.slug;
            await gameService.removeFromLibrary(id, slug);
            return res.json({status: 200, message: "Removed from library"});
        }catch (error){
            next(error);
        }
    };

    async removeFromWishlist (req, res, next){
        try{
            const {id} = req.user;
            const slug = req.params.slug;
            await gameService.removeFromWishlist(id, slug);
            return res.json({status: 200, message: "Removed from wishlist"});
        }catch (error){
            next(error);
        }
    };

    async isAddedToAccount (req, res, next){
      try{
          const {id} = req.user;
          const slug = req.params.slug;
          const result = await gameService.isAddedToAccount(id, slug);
          return res.json(result);
      }catch (error){
          next(error)
      }
    };

    async getReviews (req, res, next){
        try{
            const slug = req.params.slug;
            const username = req.query.username;
            const sortOption = req.query.sortOption;
            const result = await gameService.getReviews(slug, username, sortOption);
            return res.json(result);
        }catch (error){
            next(error);
        }
    };
}

module.exports = new GameController();
