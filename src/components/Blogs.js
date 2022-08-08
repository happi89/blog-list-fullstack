const Blog = ({ blog }) => {
	return (
		<div style={{ border: '1px solid black' }}>
			<p>title: {blog.title}</p>
			<p>Author: {blog.author}</p>
			<p>Url: {blog.url}</p>
			<p>
				Likes: {blog.likes} <button>Like</button>
			</p>
		</div>
	);
};

export default Blog;
