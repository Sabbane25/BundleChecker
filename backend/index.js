const express = require('express');
var parser = require("body-parser");
var jsonParser = parser.json();

const app = express();
const port = 3000;

app.use((req, res, next) => {
    express.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    parser.urlencoded({extended:true});
    parser.json();
    next();
  })

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
