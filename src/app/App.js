import React, { useState, useEffect } from 'react';
import Users from './components/users';
import api from './api';

const App = () => {
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
          user.status = !user.status;
          return user;
        }
        return user;
      })
    );
  };

  return <>{users && <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />}</>;
};

export default App;
