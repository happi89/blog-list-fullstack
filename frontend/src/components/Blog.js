import { useState } from 'react';
import blogService from '../services/blog';

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, setBlogs, user, blogs }) => {
	const showDeleteButton = (blog) => {
		if (user?.username === blog.user.username) {
			return (
				<button
					onClick={() => deleteBlog(blog)}
					className='btn btn-sm w-full btn-error mt-2'>
					delete
				</button>
			);
		}
	};

	const deleteBlog = (blogToDelete) => {
		if (
			window.confirm(
				`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
			)
		) {
			blogService
				.deleteBlog(blogToDelete)
				.then(setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id)));
		}
	};

	const addLike = (blog) => {
		const updatedBlog = {
			...blog,
			likes: (blog.likes += 1),
		};
		blogService.addLike(updatedBlog).then((updatedBlog) => {
			setBlogs(
				blogs
					.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
					.sort((a, b) => b.likes - a.likes)
			);
		});
	};

	const [visible, setVisible] = useState(true);

	const showWhenHidden = { display: visible ? 'none' : '' };
	const hideWhenShown = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div className='p-4 rounded border border-black my-2 w-96'>
			<div style={hideWhenShown} className='flex justify-between'>
				<span>
					{blog.title} <strong>by {blog.author}</strong>
				</span>
				<button onClick={toggleVisibility} className='btn btn-xs'>
					Show More
				</button>
			</div>

			<div style={showWhenHidden}>
				<div className='flex justify-between my-1'>
					<span>
						{blog.title} <strong>by {blog.author}</strong>
					</span>
					<button onClick={toggleVisibility} className='btn btn-xs w-20 ml-2'>
						Hide
					</button>
				</div>
				<p className='my-2'>
					<strong>Url: </strong>
					<a
						href={blog.url}
						target='_blank'
						rel='noreferrer'
						className='link text-blue-900'>
						{blog.url}
					</a>
				</p>
				<p className='my-1'>
					<strong>Likes: </strong> {blog.likes}{' '}
					<button
						onClick={() => addLike(blog)}
						className='btn btn-xs btn-primary w-16 ml-3 my-1'>
						Like
					</button>
				</p>
				<p className='my-1'>
					<strong>posted by: </strong>
					{blog.user.username}
				</p>
				{showDeleteButton(blog)}
			</div>
		</div>
	);
};

export default Blog;
