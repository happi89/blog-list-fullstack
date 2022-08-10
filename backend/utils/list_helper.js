const Blog = require('../models/blog');
const User = require('../models/user');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	let totalLikes = 0;

	blogs.forEach((blog) => {
		totalLikes += blog.likes;
	});

	return totalLikes;
};

const listWithOneBlog = [
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
];

const initialBlogs = [
	{
		title: 'Go To Statement Considered Harmful1',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
	{
		title: 'Go To Statement Considered Harmful2',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 4,
	},
	{
		title: 'Go To Statement Considered Harmful3',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 3,
	},
	{
		title: 'Go To Statement Considered Harmful4',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 2,
	},
	{
		title: 'Go To Statement Considered Harmful5',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 1,
	},
];

const getBlogs = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const getUsers = async () => {
	const users = await User.find({});
	return users.map((user) => user.toJSON());
};

module.exports = {
	dummy,
	totalLikes,
	listWithOneBlog,
	initialBlogs,
	getBlogs,
	getUsers,
};
