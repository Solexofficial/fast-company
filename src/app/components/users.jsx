import React from "react";
import User from "./user";

const Users = ({ users, onDelete }) => {
	const usersList = users.map(user => <User key={user._id} onDelete={onDelete} {...user} />);
	return users.length > 0 ? (
		<table className='table'>
			<thead>
				<tr>
					<th scope='col'>Имя</th>
					<th scope='col'>Качества</th>
					<th scope='col'>Профессия</th>
					<th scope='col'>Встретился, раз</th>
					<th scope='col'>Оценка</th>
					<th scope='col'></th>
				</tr>
			</thead>
			<tbody>{usersList}</tbody>
		</table>
	) : (
		false
	);
};
export default Users;
