const express = require("express")
const cors = require("cors");
const { route } = require("./src/routes/web");
const { CORS_OPTION } = require("./src/routes/cors");
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;

app.use(cors("*"))
app.use(route);

app.listen(port, () => {
    try {
        console.log(`Running on ${port}`);
    } catch (error) {
        throw error;
    }
})
