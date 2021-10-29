import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';
import CommentsList from '../../ui/comments/commentsList';
import { useHistory } from 'react-router';
import CommentForm from '../../ui/commentForm';
import MeetingsCard from '../../ui/cards/meetingsCard';
import UserCard from '../../ui/cards/userCard';
import QualitiesCard from '../../ui/cards/qualitiesCard';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data));
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data.sort((a, b) => b.created_at - a.created_at)));
  }, []);

  const handleClick = () => {
    history.push(`/users/${userId}/edit`);
  };

  const handleDelete = (id) => {
    API.comments
      .remove(id)
      .then((data) =>
        setComments((prevState) => prevState.filter((comment) => comment._id !== data))
      );
  };

  const handleAddComment = (data) => {
    API.comments.add(data).then((data) => setComments((prevState) => [data, ...prevState]));
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
            <div className="card mb-2">
              <div className="card-body">
                <CommentForm userId={userId} onAdd={handleAddComment} />
              </div>
            </div>
            <CommentsList comments={comments} onDelete={handleDelete} />
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
