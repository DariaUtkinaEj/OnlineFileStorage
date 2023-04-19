/**
 * Подключаем Экспресс
 */
const express = require("express");
const app = express();

const hbs = require("hbs");

app.set("view engine", "hbs");

/**
 * Подключаем виджет меню и все детали, которые будут в partial
 */
hbs.registerPartials(__dirname+"/views/partial")

/**
 * Главная страница.
 * путь: /
 * (ex: localhost:3000/)
 */
app.get("/", function(request, response){
    response.render("index", {
        title: "Главная страница!",
        description: "Вывод хранимых файлов.",
    });
});

/**
 * Страница загрузки файлов.
 * путь: /upload
 * (ex: localhost:3000/upload)
 */
app.get("/upload", function(request, response){
    response.render("upload", {
        title: "File upload",
        buttonName: "Загрузить файл",

    });
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
});