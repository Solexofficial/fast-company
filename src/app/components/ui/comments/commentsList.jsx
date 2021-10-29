import PropTypes from 'prop-types';
import React from 'react';
import Comment from './comment';

const CommentsList = ({ comments, onDelete }) => {
  return (
    comments.length > 0 && (
      <>
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Комментарии</h2>
            <hr />
            {comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onDelete={onDelete} />
            ))}
          </div>
        </div>
      </>
    )
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
};

export default CommentsList;
