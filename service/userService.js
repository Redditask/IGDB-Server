const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {User} = require("../models/index");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/userDtos");
const ApiError = require("../exceptions/apiError");
const {GameReview} = require("../models");

class UserService {
    async registration(email, password, username) {
        const emailCandidate = await User.findOne({where: {email}});
        const usernameCandidate = await User.findOne({where: {username}});
        if (emailCandidate) {
            throw ApiError.BadRequest(`User with this email already exists`);
        }
        else if (usernameCandidate) {
            throw ApiError.BadRequest(`User with this username already exists`);
        }
        else {
            const hashPassword = await bcrypt.hash(password, 4);
            const activationLink = uuid.v4();

            const user = await User.create({email, username, password: hashPassword, activationLink});
            await mailService.sendActivation(email, `${process.env.CLIENT_URL}/activate/${activationLink}`);

            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return {...tokens, user: userDto};
        }
    };

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}});
        if(!user){
            throw ApiError.BadRequest("Invalid activation link");
        }else{
            user.isActivated = true;
            await user.save();
            return {message: `${user.username}, your account is activated!`};
        }
    };

    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.BadRequest("User with this email was not found");
        } else if (!user.isActivated) {
            throw ApiError.BadRequest("Account with this email is not activated");
        } else {
            const correctPassword = await bcrypt.compare(password, user.password);
            if (!correctPassword) {
                throw ApiError.BadRequest("Invalid password");
            } else {
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

    async addReview(slug, username, text){
        if (!!slug && !!username && !!text) {
            await GameReview.create({
                slug,
                username,
                text,
                likedUsers: [],
                dislikedUsers: []
            });
        } else {
            throw ApiError.BadRequest("Incorrect review");
        }
    };

    async editReview(reviewId, newText){
        const review = await GameReview.findOne({where: {id: reviewId}});

        if (review) {
            await review.update({text: newText});
        } else {
            throw ApiError.BadRequest("Incorrect review");
        }
    };

    async deleteReview(reviewId){
        if (reviewId) {
            await GameReview.destroy({where: {id: reviewId}});
        } else {
            throw ApiError.BadRequest("Incorrect review");
        }
    };

    async unLikeReview(reviewId, username) {
        const review = await GameReview.findOne({where: {id: reviewId}});

        if (review.likedUsers.includes(username)) {
            const updatedLikedUsers = review.likedUsers.filter((likedUser) => likedUser !== username);

            await review.update({likedUsers: [...updatedLikedUsers]});
        }
    };

    async unDislikeReview(reviewId, username){
        const review = await GameReview.findOne({where: {id: reviewId}});

        if (review.dislikedUsers.includes(username)) {
            const updatedDislikedUsers = review.dislikedUsers.filter((dislikedUser) => dislikedUser !== username);

            await review.update({dislikedUsers: [...updatedDislikedUsers]});
        }
    };

    async likeReview(reviewId, username){
        const review = await GameReview.findOne({where: {id: reviewId}});

        if (review) {
            if (review.likedUsers.includes(username)) {
                this.unLikeReview(reviewId, username);
            } else {
                this.unDislikeReview(reviewId, username);

                await review.update({likedUsers: [...review.likedUsers, username]});
            }
        }else throw ApiError.BadRequest(`Review not found`);
    };

    async dislikeReview(reviewId, username){
        const review = await GameReview.findOne({where: {id: reviewId}});

        if (review) {
            if (review.dislikedUsers.includes(username)) {
                this.unDislikeReview(reviewId, username);
            } else {
                await this.unLikeReview(reviewId, username);

                await review.update({dislikedUsers: [...review.dislikedUsers, username]});
            }
        }else throw ApiError.BadRequest(`Review not found`);
    };
}

module.exports = new UserService();
