const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const cookie = require('cookie-parser')

require('dotenv').config();

const routes = require('./routes/index')

const app = express()

app.use(cors())
app.use(parser.urlencoded({
    extended: true
}));
app.use(parser.json());
app.use(cookie());

app.use(express.static('public'));

// routes
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);

})
