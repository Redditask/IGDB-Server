const userService = require("../service/userService");
const express = require("express");

class UserController {
    async registration(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 15*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        }catch (error){
            next(error);
        }
    };

    async login(req, res, next){
        try {

        }catch (error){
            next(error);
        }
    };

    async logout(req, res, next){
        try {

        }catch (error){
            next(error);
        }
    };

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect("https://yandex.by/"); //просто для наглядности работы
            //return res.redirect(process.env.CLIENT_URL);
        }catch (error){
            next(error);
        }
    };

    async refresh(req, res, next){
        try {

        }catch (error){
            next(error);
        }
    };

    //test
    async getUsers(req, res, next){
        try {
            res.json([1, 2, 3]);
        }catch (error){
            next(error);
        }
    }
}

module.exports = new UserController();
