const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		author: 1,
		url: 1,
		likes: 1,
	});
	return res.status(200).json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const id = req.params.id;
	return res.status(200).json(await User.findById(id).populate('blogs'));
});

usersRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body;

	if (username.length < 3 || password.length < 3) {
		return res.status(400).json({
			error: 'username and password have to be atleast 3 characters long',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	res.status(201).json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	return res.status(204).end();
});

module.exports = usersRouter;
