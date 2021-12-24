import React from 'react';
import { useComments } from '../../hooks/useComments';
import AddCommentForm from './comments/addCommentForm';
import CommentsList from './comments/commentsList';

const Comments = () => {
  const { removeComment, createComment, comments } = useComments();

  const handleRemoveComment = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

  const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
  return (
    <>
      <AddCommentForm onSubmit={handleSubmit} />
      {sortedComments.length > 0 && (
        <CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
      )}
    </>
  );
};

export default Comments;
