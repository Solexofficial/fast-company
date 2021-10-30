import PropTypes from 'prop-types';
import React from 'react';
import Comment from './comment';

const CommentsList = ({ comments, onRemove }) => {
  return (
    <div className="card mb-3">
      <div className="card-body ">
        <h2>Комментарии</h2>
        <hr />
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func
};

export default CommentsList;
