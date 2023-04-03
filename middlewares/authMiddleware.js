const ApiError = require("../exceptions/apiError");
const tokenService = require("../service/tokenService");

module.exports = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            return next(ApiError.UnauthorizedError());
        }else {
            const accessToken = authHeader.split(" ")[1];
            if (!accessToken){
                return next(ApiError.UnauthorizedError());
            }else{
                const userData = tokenService.validateAccessToken(accessToken);
                if (!userData){
                    return next(ApiError.UnauthorizedError());
                }else{
                    req.user = userData;
                    next();
                }
            }
        }
    }catch (error){
        return next(ApiError.UnauthorizedError());
    }
};
