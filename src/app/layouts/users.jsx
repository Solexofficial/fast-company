import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import UserEditPage from '../components/page/userEditPage/userEditPage';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UsersLoader from '../components/ui/hoc/usersLoader';
import { getCurrentUserId } from '../store/users';

const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const currentUserId = useSelector(getCurrentUserId());
  return (
    <UsersLoader>
      {userId && edit ? (
        currentUserId === userId ? (
          <UserEditPage />
        ) : (
          <Redirect to={`/users/${currentUserId}/edit`} />
        )
      ) : userId ? (
        <UserPage userId={userId} />
      ) : (
        <UsersListPage />
      )}
    </UsersLoader>
  );
};

export default Users;
