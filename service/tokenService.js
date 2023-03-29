const jwt = require("jsonwebtoken");

const {Token} = require("../models/index");

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
      const tokenData = await Token.findOne({where: {userId}});
      if (tokenData) {
          tokenData.refreshToken = refreshToken;
          return tokenData.save();
      }else {
          const token = Token.create({userId, refreshToken});
          return token;
      }
    };
}

module.exports = new TokenService();