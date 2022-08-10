const { TokenExpiredError } = require('jsonwebtoken');
const logger = require('./logger.utils');
const User = require('../models/user');
const config = require('./config.utils');
const jwt = require('jsonwebtoken');

const unknownEndpoint = (req, res) => {
	return res.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(401).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(401).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(401).json({ error: 'invalid token' });
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	}

	next();
};

const tokenExtractor = (req) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const token = req.headers.authorization.split(' ')[1];
		return token;
	} else {
		return null;
	}
};

const useExtractor = async (req, res, next) => {
	const decodedToken = jwt.verify(tokenExtractor(req), config.SECRET);

	if (!decodedToken.id) {
		return res.status(400).json({
			error: 'invalid token',
		});
	}

	req.user = await User.findById(decodedToken.id);

	next();
};

module.exports = {
	unknownEndpoint,
	errorHandler,
	useExtractor,
};
