const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
require('express-async-errors');

// utils
const logger = require('./utils/logger.utils');
const config = require('./utils/config.utils.js');
const middleware = require('./utils/middleware.utils.js');

// controllers
const blogsRouter = require('./controllers/blogs.controller');
const usersRouter = require('./controllers/users.controller');
const loginRouter = require('./controllers/login.controller');

logger.info('connecting to', config.MONGO_URI);

mongoose
	.connect(config.MONGO_URI)
	.then((result) => {
		logger.info('connected to mongodb');
	})
	.catch((err) => {
		logger.error('error connecting to MongoDB', err.message);
	});

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
