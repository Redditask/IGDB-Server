require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use("/api", router);
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(errorMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, ()=>console.log(`started on ${PORT}`));
    }catch (error) {
        console.log(error);
    }
};

start();

// Полный рефакторинг
//
// post на put изменить в нужных местах
// if/else грамотнее сделать в сортировке
//
// индивидуальные оценки для игр (свой рейтинг)
// аватарки пользователей
// функция "забыл пароль"
