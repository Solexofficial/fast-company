import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../../../api';

const Comment = ({ comment, onDelete }) => {
  const [user, setUser] = useState();
  console.log(comment);
  console.log(new Date(Number(comment.created_at)));
  useEffect(() => {
    API.users.getById(comment.userId).then((data) => setUser(data));
  }, []);

  return (
    <div className="bg-light card-body  mb-3">
      {user ? (
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start ">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1 ">
                      {user.name} - <span className="small">{comment.created_at}</span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(comment._id)}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  onDelete: PropTypes.func
};

export default Comment;
