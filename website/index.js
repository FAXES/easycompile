// EasyCompile - created by FAXES & Pluto
const config = require('./config.json');
const express = require('express');
const app = express();
const fs = require("fs");
const ms = require("ms");
const multer = require('multer');
var multerStorage = multer.memoryStorage();
const bytenode = require('bytenode');

app.use(multer({
    storage: multerStorage
}).any());
app.use(express.static('public'));
app.use("/files", express.static("files"));
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
    res.render('index', {});
});

app.post('/sendform', async function (req, res) {
    const content = req.body.content;
    const time = Date.now();
    const fileName = req.body.name;
    fs.writeFileSync(`./files/${time}.temp`, content);
    bytenode.compileFile({
        filename: `./files/${time}.temp`,
        output: `./files/${fileName}${config.siteInformation.fileExtension.replaceAll(".", "")}`,
    });
    res.download(`./files/${fileName}${config.siteInformation.fileExtension.replaceAll(".", "")}`);
    fs.writeFileSync(`./backups/${fileName}-${time}.js`, content);
    setTimeout(() => {
        fs.unlink(`./files/${fileName}${config.siteInformation.extension}`, function () {});
    }, 60000);
});

app.get("/viewfiles", async function (req, res) {
    const files = fs.readdirSync("./files").filter(file => file.endsWith(config.siteInformation.fileExtension.replaceAll(".", "")));
    res.render('viewfiles', {
        files
    });
});

app.listen(config.siteInformation.processPort, async function () {
    console.log(`EasyCompile Started - Created by FAXES & Pluto.`)
});

app.use(function (req, res, next) {
    if (res.status(404)) res.redirect('/')
});