import React from 'react';
import { useParams } from 'react-router';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage/userEditPage';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;
  const { currentUser } = useAuth();

  return (
    <>
      <UserProvider>
        {userId && edit ? (
          currentUser._id === userId ? (
            <UserEditPage />
          ) : (
            <Redirect to={`/users/${currentUser._id}/edit`} />
          )
        ) : userId ? (
          <UserPage userId={userId} />
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  );
};

export default Users;
