import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});
  const [error, setError] = useState({});

  async function signUp({ email, password, ...rest }) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(URL, { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({ _id: data.localId, email, ...rest });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = { email: 'Пользователь с таким email уже существует' };
          throw errorObject;
        }
      }
    }
  }

  async function signIn({ email, password, stayOn }) {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    try {
      const { data } = await httpAuth.post(URL, { email, password, returnSecureToken: true });
      if (stayOn) setTokens(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === 'USER_DISABLED') {
          const errorObject = { email: 'Учетная запись пользователя отключена администратором.' };
          throw errorObject;
        }
        if (message === 'EMAIL_NOT_FOUND' || message === 'INVALID_PASSWORD') {
          const errorObject = { email: 'Неверный логин или пароль' };
          throw errorObject;
        }
        if (message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
          const errorObject = {
            email: 'За последнее время мы заметили слишком много попыток входа, попробуйте позже'
          };
          throw errorObject;
        }
      }
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

  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
