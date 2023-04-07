const findGame = (games, gameName) => games.filter(game=>game.name === gameName);

module.exports = {
    findGame
};
