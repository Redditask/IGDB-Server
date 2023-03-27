const sequelize = require("../db");
const {DataTypes} = require("sequelize");

import {User} from "./userModel";

const Token = sequelize.define("token", {
    user: {type: DataTypes.JSON},
    refreshToken: {type: DataTypes.STRING, required: true}
});

Token.hasOne(User);

module.exports = {
  Token
};
