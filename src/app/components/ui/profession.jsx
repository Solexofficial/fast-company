import React from 'react';
import { useProfessions } from '../../hooks/useProfession';
import PropTypes from 'prop-types';

const Profession = ({ id }) => {
  const { isLoading, getProfessionById } = useProfessions();
  const prof = getProfessionById(id);

  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else {
    return <p>Loading...</p>;
  }
};

Profession.propTypes = {
  id: PropTypes.string.isRequired
};

export default Profession;
