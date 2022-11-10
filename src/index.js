const express = require('express');
const { json } = require('express');
const connect = require('./config/database');
const todoRoutes = require('./router/todoRoutes');

connect();

const app = express();
app.use(json());
// app.use(urlencoded());
app.use('/Todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Serving on port ${PORT}`));
