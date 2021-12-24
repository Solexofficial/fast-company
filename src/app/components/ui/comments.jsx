import React from 'react';
import { useComments } from '../../hooks/useComments';
import AddCommentForm from './comments/addCommentForm';
import CommentsList from './comments/commentsList';

const Comments = () => {
  const { createComment, comments } = useComments();

  // const handleRemoveComment = (id) => {
  //   API.comments
  //     .remove(id)
  //     .then((data) =>
  //       setComments((prevState) => prevState.filter((comment) => comment._id !== data))
  //     );
  // };

  const handleSubmit = (data) => {
    createComment(data);
  };

  const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
  return (
    <>
      <AddCommentForm onSubmit={handleSubmit} />
      {sortedComments.length > 0 && <CommentsList comments={sortedComments} />}
    </>
  );
};

export default Comments;
