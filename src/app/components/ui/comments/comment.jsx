import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { getUserById } from '../../../store/users';
import formatDate from '../../../utils/formatDate';

const Comment = ({ content, created_at: created, _id: id, userId, onRemove }) => {
  const { currentUser } = useAuth();
  const user = useSelector(getUserById(userId));
  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name} - <span className="small">{formatDate(created)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onRemove(id)}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  onRemove: PropTypes.func,
  content: PropTypes.string,
  created_at: PropTypes.number,
  _id: PropTypes.string,
  userId: PropTypes.string.isRequired
};

export default Comment;
