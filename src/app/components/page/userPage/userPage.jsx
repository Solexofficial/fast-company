import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import Qualities from '../../ui/qualities';
import { useHistory } from 'react-router';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  const handleClick = () => {
    history.replace('/users');
  };
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div className="d-flex flex-column m-3">
        <h1 className="mb-3">{user.name}</h1>
        <h2>{`Профессия: ${user.profession.name}`}</h2>
        <ul>
          <Qualities qualities={user.qualities} />
        </ul>
        <span>{`completedMeetings: ${user.completedMeetings}`}</span>
        <h3 className="my-3">{`Rate: ${user.rate}/5`}</h3>
        <div>
          <button className="btn btn-success" onClick={handleClick}>
            Все пользователи
          </button>
        </div>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
