const sequelize = require("../db");
const {DataTypes} = require("sequelize");

import {User} from "./userModel";

const Token = sequelize.define("token", {
    refreshToken: {type: DataTypes.STRING, required: true},
});

Token.belongsTo(User);

module.exports = Token;
