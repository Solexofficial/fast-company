import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQuality';

const QualitiesList = ({ qualities }) => {
  const { qualitiesList, isLoading } = useQualities();

  const userQualities = qualitiesList.filter((q) => qualities.includes(q._id));

  return !isLoading ? (
    <>
      {userQualities.map((item) => (
        <Quality key={item._id} {...item} />
      ))}
    </>
  ) : (
    <p>Loading...</p>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
