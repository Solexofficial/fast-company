import React, { useState, useEffect } from 'react';
import API from '../api';
import User from '../components/user';

const userPage = ({ id }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (!currentUser) {
      API.users.getById(id).then((data) => setCurrentUser(data));
    }
  }, [currentUser]);

  if (currentUser) {
    return <User {...currentUser} />;
  }
  return <h2>Loading...</h2>;
};

export default userPage;
