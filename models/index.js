const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Token = sequelize.define("token", {
    refreshToken: {type: DataTypes.STRING, required: true},
});

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
});

User.hasOne(Token);
Token.belongsTo(User);

module.exports = {
    Token, User
};
