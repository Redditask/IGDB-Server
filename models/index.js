const sequelize = require("../db");
const {DataTypes, Sequelize} = require("sequelize");

const Token = sequelize.define("token", {
    refreshToken: {type: DataTypes.STRING, required: true},
});

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    username: {type: DataTypes.STRING, unique: true, required: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
});

const LibraryGame = sequelize.define("libraryGame", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    slug: {type: DataTypes.STRING, required: true},
    name: {type: DataTypes.STRING, required: true},
    released: {type: DataTypes.STRING, required: true},
    background_image: {type: DataTypes.STRING, required: true},
    metacritic: {type: DataTypes.INTEGER, required: true},
    genres: {type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [], required: true},
    parent_platforms: {type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [], required: true},
});

const WishlistGame = sequelize.define("wishlistGame", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    slug: {type: DataTypes.STRING, required: true},
    name: {type: DataTypes.STRING, required: true},
    released: {type: DataTypes.STRING, required: true},
    background_image: {type: DataTypes.STRING, required: true},
    metacritic: {type: DataTypes.INTEGER, required: true},
    genres: {type: DataTypes.ARRAY(DataTypes.JSON), required: true},
    parent_platforms: {type: DataTypes.ARRAY(DataTypes.JSON), required: true}});

const GameReview = sequelize.define("gameReview", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    slug: {type: DataTypes.STRING, required: true},
    username: {type: DataTypes.STRING, required: true},
    text: {type: DataTypes.TEXT, required: true}
});

User.hasOne(Token);
User.hasMany(LibraryGame);
User.hasMany(WishlistGame);

Token.belongsTo(User);

module.exports = {
    Token, User, LibraryGame, WishlistGame, GameReview
};
