import { useState, useEffect } from 'react';
import blogService from '../services/blog';
import { useParams } from 'react-router-dom';
import blogServices from '../services/blog';

// eslint-disable-next-line no-unused-vars
const Blog = ({ setBlogs, user, blogs }) => {
	const [blog, setBlog] = useState();

	const { id } = useParams();

	useEffect(() => {
		blogServices.getBlog(id).then((blog) => setBlog(blog));
	}, []);

	const showDeleteButton = (blog) => {
		if (user?.username === blog?.user?.username) {
			return (
				<button
					onClick={() => deleteBlog(blog)}
					className='btn btn-sm w-full btn-error mt-4'>
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
			const updatedBlogs = blogs
				.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
				.sort((a, b) => b.likes - a.likes);
			setBlogs(updatedBlogs);
		});
	};

	return (
		<div className='p-4 w-96 my-0 mx-auto'>
			<div>
				<div className='flex justify-between mb-3'>
					<span className='text-lg'>
						{blog?.title} <strong>by {blog?.author}</strong>
					</span>
				</div>
				<p className='my-2'>
					<strong>Url: </strong>
					<a
						href={blog?.url}
						target='_blank'
						rel='noreferrer'
						className='link text-blue-900'>
						{blog?.url}
					</a>
				</p>
				<p className='my-1'>
					<strong>Likes: </strong> {blog?.likes}{' '}
					<button
						onClick={() => addLike(blog)}
						className='btn btn-xs btn-primary w-16 ml-3 my-1'>
						Like
					</button>
				</p>
				<p className='my-1'>
					<strong>posted by: </strong>
					{blog?.user?.username}
				</p>
				{showDeleteButton(blog)}
			</div>
		</div>
	);
};

export default Blog;
