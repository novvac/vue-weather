const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.json("test");
})

app.listen(PORT, () => {
    console.log('Server', 'Development server is running!');
})