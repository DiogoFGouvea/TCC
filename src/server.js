const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://dgouvea:dgouvea@cluster01-g36ux.mongodb.net/lincah?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});



app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
