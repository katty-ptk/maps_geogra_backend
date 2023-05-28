require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// import routes
const postsRoute = require('./routes/posts');
const placesRoute = require('./routes/places');

const cors = require('cors');

app.use(cors());

app.use('/posts', postsRoute);
app.use('/places', placesRoute);

// ROUTES
app.get('/', ( req, res ) => {
    res.send("we are on home");
})

// connect to db
mongoose.connect(process.env.DB_CONNECTION);

// listen to the server
app.listen(3000, () => {
    console.log("listening on port 3000");
});