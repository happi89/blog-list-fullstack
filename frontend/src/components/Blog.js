import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, addLike, showDeleteButton }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [visible, setVisible] = useState(true);

	const showWhenHidden = { display: visible ? 'none' : '' };
	const hideWhenShown = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div style={blogStyle}>
			<div style={hideWhenShown}>
				{blog.title} <strong>by {blog.author}</strong>
				<button onClick={toggleVisibility}>Show More</button>
			</div>

			<div style={showWhenHidden}>
				{blog.title} by {blog.author}{' '}
				<button onClick={toggleVisibility}>Hide</button>
				<p>
					Url:{' '}
					<a href={blog.url} target='_blank' rel='noreferrer'>
						{blog.url}
					</a>
				</p>
				<p>
					Likes: {blog.likes}{' '}
					<button onClick={() => addLike(blog)}>Like</button>
				</p>
				<p>
					<strong>posted by: </strong>
					{blog?.user?.username}
				</p>
				{showDeleteButton(blog)}
			</div>
		</div>
	);
};

export default Blog;
