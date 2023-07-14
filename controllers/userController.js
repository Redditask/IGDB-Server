const userService = require("../service/userService");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/apiError");

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                    return next(ApiError.BadRequest("Validation error", errors.array()));
            }else {
                const {email, password, username} = req.body;
                const userData = await userService.registration(email, password, username);
                res.cookie("refreshToken", userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
                return res.json(userData);
            }
        }catch (error){
            next(error);
        }
    };

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }catch (error){
            next(error);
        }
    };

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(token);
        }catch (error){
            next(error);
        }
    };

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            const response = await userService.activate(activationLink);
            return res.json(response);
        }catch (error){
            next(error);
        }
    };

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }catch (error){
            next(error);
        }
    };

    async addReview(req, res, next) {
        try {
            const {username} = req.user;
            const slug = req.params.slug;
            const {text} = req.body;
            await userService.addReview(slug, username, text);
            return res.json({status: 200, message: "Review added!"});
        }catch (error){
            next(error);
        }
    };
}

module.exports = new UserController();
