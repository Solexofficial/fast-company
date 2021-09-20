import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import UsersList from '../components/usersList';
import UserPage from '../components/userPage';
import api from '../api';

const Users = () => {
  const params = useParams();
  const { userId } = params;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    return setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (userId) => {
    setUsers(
      users.filter((user) => {
        if (user._id === userId) {
          user.bookmark = !user.bookmark;
          return user;
        }
        return user;
      })
    );
  };
  // eslint-disable-next-line multiline-ternary
  return userId ? (
    <UserPage id={userId} />
  ) : (
    <UsersList users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
  );
};

export default Users;
