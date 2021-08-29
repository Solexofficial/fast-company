import React, { useState } from "react";
import api from "../api";

const Users = () => {
	const [users, setUsers] = useState(api.users.fetchAll());

	const renderUser = user => {
		const { name, qualities, profession, completedMeetings, rate, _id } = user;

		const getQualities = () => {
			return qualities.map(quality => {
				const { name, color, _id } = quality;
				const classes = "badge m-1 bg-";
				return (
					<span key={_id} className={classes + color}>
						{name}
					</span>
				);
			});
		};

		return (
			<tr key={_id}>
				<th>{name}</th>
				<td>{getQualities()}</td>
				<td>{profession.name}</td>
				<td>{completedMeetings}</td>
				<td>{rate}/5</td>
				<td>
					<button className='btn btn-danger' onClick={() => handleDelete(_id)}>
						Delete
					</button>
				</td>
			</tr>
		);
	};

	const handleDelete = userId => {
		return setUsers(users.filter(user => user._id !== userId));
	};

	const renderPhrase = () => {
		let text = `${users.length} человек тусанет с тобой сегодня`;
		let className = "badge bg-primary";

		if (users.length <= 4 && users.length > 1) {
			text = `${users.length} человека тусанут с тобой сегодня`;
		}
		if (users.length === 0) {
			text = "Никто с тобой не тусанет";
			className = "badge bg-danger";
		}

		return (
			<h2>
				<span className={className}>{text}</span>
			</h2>
		);
	};

	return users.length === 0 ? (
		renderPhrase()
	) : (
		<>
			{renderPhrase()}
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
				<tbody>{users.map(user => renderUser(user))}</tbody>
			</table>
		</>
	);
};

export default Users;
