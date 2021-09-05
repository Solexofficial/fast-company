import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ id, status, onToggleBookMark }) => {
  let classes = 'bi bi-bookmark';
  classes = status ? 'bi bi-bookmark-fill' : classes;

  return (
    <button className="btn btn-primary" onClick={() => onToggleBookMark(id)}>
      <i className={classes}></i>
    </button>
  );
};
BookMark.propTypes = {
  id: PropTypes.string,
  status: PropTypes.bool,
  onToggleBookMark: PropTypes.func
};

export default BookMark;
