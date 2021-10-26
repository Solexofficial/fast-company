import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Comment from './comment';
import API from '../../../api';

const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data.sort((a, b) => b.createdAt - a.createdAt)));
  }, []);

  const handleDelete = (id) => {
    API.comments
      .remove(id)
      .then((data) =>
        setComments((prevState) => prevState.filter((comment) => comment._id !== data))
      );
  };
  return (
    <>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Комментарии</h2>
          <hr />
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </>
  );
};

CommentsList.propTypes = {
  userId: PropTypes.string
};

export default CommentsList;
