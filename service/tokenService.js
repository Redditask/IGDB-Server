const jwt = require("jsonwebtoken");

const tokenModel = require("../models/tokenModel");

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "15d"});

        return {
            accessToken,
            refreshToken
        };
    };

    async saveToken(userId, refreshToken){
      const tokenData = await tokenModel.findOne({user: userId});
      if (tokenData) {
          tokenData.refreshToken = refreshToken;
          return tokenData.save();
      }else {
          const token = tokenModel.create({userId, refreshToken});
          return token;
      }
    };
}

module.exports = new TokenService();
