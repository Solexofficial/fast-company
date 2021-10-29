import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './commentForm';
import CommentsList from './comments/commentsList';
import API from '../../api';

const UserCommentsContainer = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data.sort((a, b) => a.created_at - b.created_at)));
  }, []);

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

  return (
    <>
      <CommentForm userId={userId} onAdd={handleAddComment} />
      <CommentsList comments={comments} onDelete={handleDelete} />
    </>
  );
};

UserCommentsContainer.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserCommentsContainer;
