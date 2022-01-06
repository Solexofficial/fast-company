import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useComments } from '../../hooks/useComments';
import { getComments, getCommentsLoadingStatus, loadCommentsList } from '../../store/comments';
import AddCommentForm from './comments/addCommentForm';
import CommentsList from './comments/commentsList';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { removeComment, createComment } = useComments();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleRemoveComment = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  return (
    <>
      <AddCommentForm onSubmit={handleSubmit} />
      {!isLoading ? (
        <CommentsList comments={comments} onRemove={handleRemoveComment} />
      ) : (
        'loading...'
      )}
    </>
  );
};

export default Comments;
