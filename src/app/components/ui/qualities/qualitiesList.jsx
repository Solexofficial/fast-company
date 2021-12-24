import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQuality';

const QualitiesList = ({ data }) => {
  const { qualities, isLoading } = useQualities();

  const userQualities = qualities.filter((q) => data.includes(q._id));

  return !isLoading ? (
    <>
      {userQualities.map((item) => (
        <Quality key={item._id} {...item} />
      ))}
    </>
  ) : (
    <h2>Loading...</h2>
  );
};

QualitiesList.propTypes = {
  data: PropTypes.array
};

export default QualitiesList;
