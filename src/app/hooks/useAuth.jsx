import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const key = 'AIzaSyBb5eKDcDpZszOWpDFtZqK82-VtVD6Eh6s';
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

    const { data } = await axios.post(url, { email, password, returnSecureToken: true });
    console.log(data);
  }

  return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
