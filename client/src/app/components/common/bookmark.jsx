import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ status, onClick }) => {
  let classes = 'bi bi-bookmark';
  classes = status ? 'bi bi-bookmark-fill' : classes;

  return (
    <button className="btn btn-primary" onClick={onClick}>
      <i className={classes}></i>
    </button>
  );
};
BookMark.propTypes = {
  id: PropTypes.string,
  status: PropTypes.bool,
  onClick: PropTypes.func
};

export default BookMark;
