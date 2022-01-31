import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  createComment,
  removeComment
} from '../../store/comments';
import AddCommentForm from './comments/addCommentForm';
import CommentsList from './comments/commentsList';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };

  return (
    <>
      <AddCommentForm onSubmit={handleSubmit} />
      {!isLoading ? <CommentsList comments={comments} onRemove={handleRemoveComment} /> : 'loading...'}
    </>
  );
};

export default Comments;
