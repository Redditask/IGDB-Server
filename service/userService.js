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

    async login(email, password){
        const user = await User.findOne({where: {email}});
        if(!user){
            throw ApiError.BadRequest("Пользователь не найден");
        }else{
            const correctPassword = await bcrypt.compare(password, user.password);
            if(!correctPassword){
                throw ApiError.BadRequest("Некорректный пароль");
            }else {
                const userDto = new UserDto(user);
                const tokens = tokenService.generateTokens({...userDto});
                await tokenService.saveToken(userDto.id, tokens.refreshToken);

                return {...tokens, user: userDto};
            }
        }
    };

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    };

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }else{
            const userData = tokenService.validateRefreshToken(refreshToken);
            const databaseToken = await tokenService.findToken(refreshToken);
            if(!databaseToken || !userData){
                throw ApiError.UnauthorizedError();
            }else{
                const user = await User.findOne({where: {id: userData.id}});
                const userDto = new UserDto(user);
                const tokens = tokenService.generateTokens({...userDto});
                await tokenService.saveToken(userDto.id, tokens.refreshToken);

                return {...tokens, user: userDto};
            }
        }
    };

    //test
    async getUsers(){
        const users = await User.findAll();
        return users;
    };
}

module.exports = new UserService();
