const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config.utils');
const bcrypt = require('bcrypt');

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username });
	const passwordTrue =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && passwordTrue)) {
		res.status(401).json({
			error: 'invalid username or password',
		});
	}

	const forToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(forToken, config.SECRET, { expiresIn: 60 * 60 });

	res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
