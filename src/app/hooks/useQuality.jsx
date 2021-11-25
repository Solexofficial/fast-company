import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import qualityService from '../services/quality.service';

const QualitiesContext = React.createContext();

export const useQualities = () => useContext(QualitiesContext);

export const QualitiesProvider = ({ children }) => {
  const [qualitiesList, setQualitiesList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.get();
      setQualitiesList(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getQualityById = (id) => {
    return qualitiesList.find((p) => p._id === id);
  };

  useEffect(() => {
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
  return (
    <QualitiesContext.Provider value={{ isLoading, qualitiesList, getQualityById }}>
      {children}
    </QualitiesContext.Provider>
  );
};

QualitiesProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
