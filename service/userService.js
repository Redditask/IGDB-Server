const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {User} = require("../models/index");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDtos");
const ApiError = require("../exceptions/apiError");

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`);
        }
        else {
            const hashPassword = await bcrypt.hash(password, 4);
            const activationLink = uuid.v4();

            const user = await User.create({email, password: hashPassword, activationLink});
            await mailService.sendActivation(email, `${process.env.API_URL}/api/activate/${activationLink}`);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, user: userDto};
        }
    };

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}});
        if(!user){
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }else{
            user.isActivated = true;
            await user.save();
        }
    };
}

module.exports = new UserService();
