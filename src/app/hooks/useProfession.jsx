import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import professionService from '../services/profession.service';

const ProfessionContext = React.createContext();

export const useProfessions = () => useContext(ProfessionContext);

export const ProfessionProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState(null);

  const getProfessions = async () => {
    try {
      const { content } = await professionService.getAll();
      setProfessions(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getProfessionById = (id) => {
    return professions.find((p) => p._id === id);
  };

  useEffect(() => {
    getProfessions();
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
    <ProfessionContext.Provider value={{ isLoading, professions, getProfessionById }}>
      {children}
    </ProfessionContext.Provider>
  );
};

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
