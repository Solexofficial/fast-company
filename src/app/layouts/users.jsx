import React from 'react';
import { useParams } from 'react-router';
import UsersListPage from '../components/page/usersListPage';
import UserPage from '../components/page/userPage';
import UserEditPage from '../components/page/userEditPage/userEditPage';
import UserProvider from '../hooks/useUsers';
import { QualitiesProvider } from '../hooks/useQuality';
const Users = () => {
  const params = useParams();
  const { userId, edit } = params;

  return (
    <>
      <UserProvider>
        <QualitiesProvider>
          {userId && edit ? (
            <UserEditPage />
          ) : userId ? (
            <UserPage userId={userId} />
          ) : (
            <UsersListPage />
          )}
        </QualitiesProvider>
      </UserProvider>
    </>
  );
};

export default Users;
