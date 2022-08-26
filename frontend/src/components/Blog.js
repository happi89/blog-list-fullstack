import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const Blog = ({ blog, addLike, showDeleteButton }) => {
	// const blogStyle = {
	// 	paddingTop: 10,
	// 	paddingLeft: 2,
	// 	border: 'solid',
	// 	borderWidth: 1,
	// 	marginBottom: 5,
	// };

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
