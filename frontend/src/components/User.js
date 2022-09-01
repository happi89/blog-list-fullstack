import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userServices from '../services/user';

const User = () => {
	const [user, setUser] = useState();
	const { id } = useParams();

	useEffect(() => {
		userServices.getUser(id).then((user) => setUser(user));
	}, []);

	return (
		<div className='flex flex-col items-center'>
			{console.log(user)}
			<h1 className='text-2xl font-bold my-2'>{user?.name}</h1>
			<h1 className='text-lg font-bold my-2'>Created Blogs</h1>
			<table className='table table-zebra'>
				<thead>
					<tr>
						<td>Title</td>
						<td>Url</td>
						<td>Likes</td>
					</tr>
				</thead>
				<tbody>
					{user?.blogs.map((blog) => (
						<tr key={blog?.id}>
							<td>
								<Link className='link' to={`/blogs/${blog.id}`}>
									{blog?.title}
								</Link>
							</td>
							<td>
								<a
									className='link'
									href={blog?.url}
									target='_blank'
									rel='noreferrer'>
									{blog?.url}
								</a>
							</td>
							<td>{blog?.likes}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default User;
