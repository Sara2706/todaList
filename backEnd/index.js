const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors');
const mongoose = require('mongoose');
const Auth = require('./routes/Auth/Auth')
const Todo = require('./routes/Todo/Todo')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
dotenv.config()
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB Connected!')).catch((err) => console.log(err));

app.use('/api/auth',Auth)
app.use('/api/todo',Todo)

app.listen(PORT, () => {
    console.log('Server started at 8080')
})