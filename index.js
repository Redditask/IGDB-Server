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
app.use(cors());
app.use("/api", router);
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

// Вынести фразы в отдельный файл
// if/else как-то получше оформить
// Вынести некоторые фрагменты в отдельные функции (в utils)
// Лучше обработать ошибки
