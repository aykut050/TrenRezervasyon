const express = require("express");
const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs');
const routers = require("./routes/router");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use('/css', express.static(path.resolve(__dirname, "client/css")));
app.use('/js', express.static(path.resolve(__dirname, "client/js")));
app.use('/images', express.static(path.resolve(__dirname, "client/images")));

app.use(routers);

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}'unda portunda başlatıldı.`);
})