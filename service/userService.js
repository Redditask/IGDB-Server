const bcrypt = require("bcrypt");
const uuid = require("uuid");

const User = require("../models/userModel");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDtos");

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({email});
        if (candidate) {
            throw new Error(`Пользователь с email ${email} уже существует`);
        }
        else {
            const hashPassword = await bcrypt.hash(password, 4);
            const activationLink = uuid.v4();

            const user = await User.create({email, password: hashPassword, activationLink});
            await mailService.sendActivation(email, activationLink);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, user: userDto};
        }
    };
}

module.exports = new UserService();
