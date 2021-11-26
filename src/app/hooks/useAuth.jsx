import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState({});

  function setTokens({ expiresIn = 3600, idToken, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
  }

  async function signUp({ email, password, ...rest }) {
    const KEY = 'AIzaSyBb5eKDcDpZszOWpDFtZqK82-VtVD6Eh6s';
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;

    try {
      const { data } = await httpAuth.post(URL, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);

      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return <AuthContext.Provider value={{ signUp, currentUser }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
