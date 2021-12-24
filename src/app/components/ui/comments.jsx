import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AddCommentForm from './comments/addCommentForm';
import CommentsList from './comments/commentsList';
import API from '../../api';
import { useComments } from '../../hooks/useComments';

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const { createComment } = useComments();

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleRemoveComment = (id) => {
    API.comments
      .remove(id)
      .then((data) =>
        setComments((prevState) => prevState.filter((comment) => comment._id !== data))
      );
  };

  const handleSubmit = (data) => {
    createComment(data);
    // API.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments((prevState) => [data, ...prevState]));
  };

  const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
  return (
    <>
      <AddCommentForm userId={userId} onSubmit={handleSubmit} />
      {sortedComments.length > 0 && (
        <CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
      )}
    </>
  );
};

export default Comments;
