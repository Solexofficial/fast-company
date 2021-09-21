import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../api';
import User from '../components/user';

const UserPage = ({ userId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    if (!currentUser) {
      API.users.getById(userId).then((data) => setCurrentUser(data));
    }
  }, [currentUser]);

  if (currentUser) {
    return <User {...currentUser} />;
  }
  return <h2>Loading...</h2>;
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
