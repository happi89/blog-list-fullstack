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
			<h1>Add Blog</h1>
			<div>
				title
				<input
					type='text'
					name='Title'
					id='title'
					placeholder='Title goes here...'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type='text'
					name='Author'
					id='author'
					placeholder='Author goes here...'
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type='url'
					name='URL'
					id='url'
					placeholder='Url goes here...'
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type='submit' id='add-blog'>
				Add
			</button>
		</form>
	);
};

export default BlogForm;
