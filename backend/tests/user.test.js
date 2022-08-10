const bcrypt = require('bcrypt');
const User = require('../models/user');
const listHelper = require('../utils/list_helper');
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app);

beforeEach(async () => {
	await User.deleteMany({});

	const passwordHash = await bcrypt.hash('sekret', 10);
	const user = new User({
		username: 'initial user',
		name: 'initial',
		passwordHash,
	});

	await user.save();
});

describe('when there is initially one user in db', () => {
	test('creation of user succeeds with a fresh username', async () => {
		const usersAtStart = await listHelper.getUsers();

		const user = new User({
			username: 'happi89',
			name: 'farhaan',
			password: 'this is a secure password',
		});

		api.post('/api/users').send(user).expect(201);

		const usersAtEnd = await listHelper.getUsers();

		expect(usersAtEnd).toHaveLength(usersAtStart + 1);

		const usernames = usersAtEnd.map((user) => user.userName);
		expect(usernames).toContain(user.username);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
