/**
 * Подключаем Экспресс
 */
const express = require("express");
const app = express();

/** Подключаем Handlebar */
const hbs = require("hbs");

/** Подключаем файл Фолдер */
const folder = require("./folder");

/** Подключаем Multer */
const multer = require("multer");

/** Сохраняем в файл Files */
const upload = multer({dest: "files"});

/** Зададим конфигурацию для мультера */
const StorageConfig = multer.diskStorage(
    {
        destination: (req, file, cb) =>{
            cb(null, "files")
        },
        filename: (req, file, cb) =>{
            cb(null, Date.now() + "-" + file.originalname)
        }
    }
);

app.set("view engine", "hbs");

app.use(express.static(__dirname));

/** подключаем конфигурацию для мультера */
app.use(multer({storage:StorageConfig}).single("filedata"));

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
    let links = folder.getFiles("./files/");
    response.render("index", {
        title: "Главная страница!",
        description: "Вывод хранимых файлов.",
        links: links,
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

/**
 * Метод загрузки файлов Post'ом.
 */
app.post("/upload", upload.single("filedata") , function(request, response, next){
   let filedata = request.file;
   if (!filedata) response.send("Ошибка при загрузке файла, нет файла")
    else
       response.render("upload", {
           title: "File upload",
           buttonName: "Загрузить файл",

       });
});

/** multer */

app.listen(3000, function(){
    console.log("server is running on port 3000");
});