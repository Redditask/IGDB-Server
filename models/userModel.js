const sequileze = require("../db");
const {DataTypes} = require("sequelize");

import {Token} from "./tokenModel";

const User = sequileze.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
});

User.hasOne(Token);

module.exports = User;

