const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();
const auth = require('./middleware/Auth');
const protected = require('./middleware/Protected');

mongoose.connect(process.env.MONGODB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

const app = express();
app.use(bodyParser.json());
app.use(auth);

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use('/api/user', require('./controllers/User'));
app.use('/api/category', require('./controllers/Category'));
app.use('/api/forum', require('./controllers/Forum'));
app.use('/api/message', require('./controllers/Message'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client/build/index.html"));
});

app.listen(5000, () => console.log('Server started on port 5000'));