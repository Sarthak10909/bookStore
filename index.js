const express = require('express');
const bookRouter = require('./routes/book.routes');
const {loggerMiddleware} = require('./middleware/logger');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(loggerMiddleware);

//Routes
app.use('/books', bookRouter);

app.listen(PORT, () => console.log(`HTTP server is running on the port ${PORT}`));