import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ name, color }) => {
  const classes = 'badge m-1 bg-';
  return <span className={classes + color}>{name}</span>;
};

Quality.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string
};

export default Quality;
