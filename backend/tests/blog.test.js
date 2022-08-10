const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(listHelper.initialBlogs);
});

test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe('totalLikes', () => {
	describe('total likes', () => {
		test('when list has only one blog, equals the likes of that', () => {
			const result = listHelper.totalLikes(listHelper.listWithOneBlog);
			expect(result).toBe(5);
		});

		test('multiple blogs', () => {
			const result = listHelper.totalLikes(listHelper.initialBlogs);
			expect(result).toBe(15);
		});
	});
});

describe('get requests', () => {
	test('getting all blogs epecting them in content json', async () => {
		await api.get('/api/blogs').expect('Content-Type', /json/).expect(200);
	});

	// test('id to be defind', async () => {
	// 	const response = await api.get('/api/blogs');

	// 	const titles = response.body.map((r) => r.title);

	// 	expect(response.titles).toBeDefined();
	// });
});

describe('post request', () => {
	test('post request works', async () => {
		const blog = {
			title: 'jest testing post request',
			author: 'farhaan patel',
			url: 'jest.ca',
			likes: 0,
		};

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /json/);

		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /json/);

		const titles = response.body.map((blog) => blog.title);
		expect(titles).toContain('jest testing post request');
	});
});

describe('delete requests', () => {
	test('delete single blog', async () => {
		const blogsAtStart = await listHelper.getBlogs();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await listHelper.getBlogs();

		expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map((blog) => blog.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe('put requests', () => {
	test('update single blog', async () => {
		const blog = {
			title: 'jest testing put request',
			author: 'farhaan patel',
			url: 'jest.ca',
			likes: 69,
		};

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /json/);

		const blogsAtEnd = await listHelper.getBlogs();

		expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1);

		const titles = blogsAtEnd.map((blog) => blog.title);

		expect(titles).toContain(blog.title);
	});
	test('add new blog without likes', async () => {
		const blog = {
			title: 'jest testing put request',
			author: 'farhaan patel',
			url: 'jest.ca',
		};

		await api
			.post('/api/blogs')
			.send(blog)
			.expect(201)
			.expect('Content-Type', /json/);

		const blogsAtEnd = await listHelper.getBlogs();

		expect(blogsAtEnd).toHaveLength(listHelper.initialBlogs.length + 1);

		expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
