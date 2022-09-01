/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Link } from 'react-router-dom';

const User = ({ users }) => {
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-2xl font-bold my-3'>Users</h1>
			<table className='table table-zebra'>
				<thead>
					<tr>
						<td>User</td>
						<td>Blogs Created</td>
					</tr>
				</thead>
				<tbody>
					{users?.map((user) => {
						return (
							<tr key={user.id}>
								<td className='link'>
									<Link to={`/users/${user.id}`}>{user.name}</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default User;
