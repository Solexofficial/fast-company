import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities';
import Quality from './quality';

const QualitiesList = ({ data }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(data));

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return !isLoading ? (
    <>
      {qualitiesList.map((item) => (
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
