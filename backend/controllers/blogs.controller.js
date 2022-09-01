const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { useExtractor } = require('../utils/middleware.utils');

blogsRouter.get('/', async (req, res) => {
	const response = await Blog.find({}).populate('user', {
		username: 1,
		name: 1,
	});
	return res.status(200).json(response);
});

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('user', {
		username: 1,
		name: 1,
	});
	if (blog) {
		return res.status(200).json(blog);
	} else {
		return res.status(404).end();
	}
});

blogsRouter.post('/', useExtractor, async (req, res, next) => {
	const body = req.body;

	const user = req.user;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user,
	});

	const savedBlog = await blog.save();

	user.blogs = user.blogs.concat(savedBlog.id);
	await user.save();

	res.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', useExtractor, async (req, res) => {
	const user = req.user;
	user.blogs = user.blogs.filter((blog) => blog !== req.params.id);

	await Blog.findByIdAndDelete(req.params.id);

	return res.status(204).end();
});

blogsRouter.put('/:id', useExtractor, async (req, res, next) => {
	const body = req.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
		.then((updateBlog) => {
			res.status(200).json(blog);
		})
		.catch((error) => next(error));
});

module.exports = blogsRouter;
