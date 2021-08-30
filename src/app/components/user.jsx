import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

const User = ({ name, qualities, profession, completedMeetings, rate, _id, onDelete, onToggleBookMark, status }) => {
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
				<BookMark id={_id} onToggleBookMark={onToggleBookMark} status={status} />
			</td>
			<td>
				<button className='btn btn-danger' onClick={() => onDelete(_id)}>
					Delete
				</button>
			</td>
		</tr>
	);
};

export default User;
