import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [likes, setLikes] = useState(0);

	const HandleBlogSubmit = (event) => {
		event.preventDefault();

		createBlog({
			title,
			author,
			url,
			likes,
		});

		setTitle('');
		setAuthor('');
		setUrl('');
		setLikes(likes);
	};

	return (
		<form onSubmit={HandleBlogSubmit}>
			<h1 className='font-bold text-xl mt-4'>Add Blog</h1>
			<div>
				<label className='label'>
					<span className='label-text'>Title</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='text'
					name='Title'
					id='title'
					placeholder='Title goes here...'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				<label className='label'>
					<span className='label-text'>Author</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='text'
					name='Author'
					id='author'
					placeholder='Author goes here...'
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				<label className='label'>
					<span className='label-text'>URL</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='url'
					name='URL'
					id='url'
					placeholder='Url goes here...'
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type='submit' className='btn btn-primary btn-wide mt-3'>
				Add
			</button>
		</form>
	);
};

export default BlogForm;
