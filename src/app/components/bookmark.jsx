import React from "react";

const BookMark = ({ id, status, onToggleBookMark }) => {
	let classes = "bi bi-bookmark";
	classes = status ? "bi bi-bookmark-fill" : classes;

	return (
		<button className='btn btn-primary' onClick={() => onToggleBookMark(id)}>
			<i className={classes}></i>
		</button>
	);
};

export default BookMark;
