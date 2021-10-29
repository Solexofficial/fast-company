import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import { useHistory } from 'react-router';
import MeetingsCard from '../../ui/cards/meetingsCard';
import UserCard from '../../ui/cards/userCard';
import QualitiesCard from '../../ui/cards/qualitiesCard';
import UserCommentsContainer from '../../ui/userCommentsContainer';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push(`/users/${userId}/edit`);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard
              name={user.name}
              profession={user.profession}
              rate={user.rate}
              onClick={handleClick}
            />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <UserCommentsContainer userId={userId} />
          </div>
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
