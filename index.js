var express = require("express")
var cors = require("cors");
const { route } = require("./src/routes/web");
require('dotenv').config();

var app = express()

app.use(cors())

app.use(route);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    try {
        console.log(`Running on ${port}`);
    } catch (error) {
        throw error;
    }
})
