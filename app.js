const express = require('express')
const bodyParser = require("body-parser")
const users = require('./routes/router');
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
users(app);

app.listen(port, () => console.log(`port 3000`))