import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
	return (
		<>
			{blogs.map((blog) => {
				return (
					<div
						key={blog.id}
						className='border-black rounded-md border-2 my-2 py-2 px-4 w-96'>
						<Link to={`/blogs/${blog.id}`} className='link'>
							{blog.title}
						</Link>
					</div>
				);
			})}
		</>
	);
};

export default BlogList;
