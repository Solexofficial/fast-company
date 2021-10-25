import React from 'react';
import { useParams } from 'react-router';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage/userEditPage';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return userId && edit ? (
    <UserEditPage userId={userId} />
  ) : userId ? (
    <UserPage userId={userId} />
  ) : (
    <UsersListPage />
  );
};

export default Users;
