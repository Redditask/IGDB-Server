const sequileze = require("../db");
const {DataTypes} = require("sequelize");

const User = sequileze.define("user", {
    email: {type: DataTypes.STRING, unique: true, required: true},
    password: {type: DataTypes.STRING, required: true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
});

module.exports = {
  User
};
