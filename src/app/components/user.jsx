import React from "react";
import Qualitie from "./qualitie";
const User = ({ name, qualities, profession, completedMeetings, rate, _id, onDelete }) => {
	return (
		<tr>
			<th>{name}</th>
			<td>
				{qualities.map(item => (
					<Qualitie key={item._id} {...item} />
				))}
			</td>
			<td>{profession.name}</td>
			<td>{completedMeetings}</td>
			<td>{rate}/5</td>
			<td>
				<button className='btn btn-danger' onClick={() => onDelete(_id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default User;
