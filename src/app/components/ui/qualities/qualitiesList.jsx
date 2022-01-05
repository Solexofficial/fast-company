import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  getQualities,
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities';
import Quality from './quality';

const QualitiesList = ({ data }) => {
  const qualities = useSelector(getQualities());
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(data));
  console.log('qualList', qualitiesList);
  if (!data) return null;
  const userQualities = qualities.filter((q) => data.includes(q._id));
  console.log('userQual', userQualities);

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
