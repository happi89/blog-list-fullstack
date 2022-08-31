import { useRef } from 'react';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm';
import Toggable from '../components/Toggable';

const BlogPage = ({ blogs, setBlogs }) => {
	const blogFormRef = useRef(null);

	const blogForm = () => (
		<Toggable buttonLabel='Add Blog' ref={blogFormRef}>
			<BlogForm blogFormRef={blogFormRef} setBlogs={setBlogs} blogs={blogs} />
		</Toggable>
	);

	return (
		<div className='flex flex-col items-center'>
			{/* <Notification message={success} type={type} /> */}
			{blogForm()}
			{blogs.map((blog) => (
				<Blog blog={blog} key={blog.id} />
			))}{' '}
		</div>
	);
};

export default BlogPage;
