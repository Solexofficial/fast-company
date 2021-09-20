import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
// import API from '../api';

const userPage = ({ user }) => {
  const history = useHistory();
  console.log(history);
  // const userId = API.users.getById(id);
  // console.log(userId);
  return (
    <>
      <Link to={`/${user._id}`}>{user.name}</Link>
    </>
  );
};

export default userPage;
