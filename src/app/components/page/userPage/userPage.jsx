import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { getProfessionById, getProfessionsLoadingStatus } from '../../../store/professions';
import { getUserById } from '../../../store/users';
import MeetingsCard from '../../ui/cards/meetingsCard';
import QualitiesCard from '../../ui/cards/qualitiesCard';
import UserCard from '../../ui/cards/userCard';
import Comments from '../../ui/comments';

const UserPage = ({ userId }) => {
  let user = useSelector(getUserById(userId));
  const userProfession = useSelector(getProfessionById(user?.profession));
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  if (!professionsLoading) {
    user = { ...user, profession: userProfession };
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <Comments />
          </div>
        </div>
      </div>
    );
  }
  return <h2>Loading...</h2>;
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
