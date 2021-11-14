import React from 'react';
import PropTypes from 'prop-types';
import Quality from './qualitiy';

const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((item) => (
        <Quality key={item} {...item} />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
