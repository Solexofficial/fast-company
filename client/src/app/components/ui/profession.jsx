import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';

const Profession = ({ id }) => {
  const profession = useSelector(getProfessionById(id));
  const professionsIsLoading = useSelector(getProfessionsLoadingStatus());

  if (!professionsIsLoading) {
    return <p>{profession.name}</p>;
  } else {
    return <p>Loading...</p>;
  }
};

Profession.propTypes = {
  id: PropTypes.string.isRequired
};

export default Profession;
