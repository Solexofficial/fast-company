import { createAction, createSlice, nanoid } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import localStorageService from '../services/localStorage.service';

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentRemoved: (state, action) => {
      const entities = state.entities.filter((comment) => comment._id !== action.payload);
      return { ...state, entities };
    }
  }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions;

const commentCreateRequested = createAction('comments/userCreateRequested');
const commentCreateRequestedFailed = createAction('comments/commentCreateRequestedFailed');
const commentRemoveRequested = createAction('comments/commentRemoveRequested');
const commentRemoveRequestedFailed = createAction('comments/commentRemoveRequestedFailed');

export const createComment =
  ({ data, pageId }) =>
  async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
      const comment = {
        ...data,
        pageId,
        _id: nanoid(),
        created_at: Date.now(),
        userId: localStorageService.getUserId()
      };
      const { content } = await commentService.createComment(comment);
      dispatch(commentCreated(content));
    } catch (error) {
      dispatch(commentCreateRequestedFailed(error.message));
    }
  };

export const removeComment = (id) => async (dispatch) => {
  dispatch(commentRemoveRequested());
  try {
    const commentId = await commentService.removeComment(id);
    dispatch(commentRemoved(commentId));
  } catch (error) {
    dispatch(commentRemoveRequestedFailed(error.message));
  }
};

export const loadCommentsList = (pageId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(pageId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading;

export default commentsReducer;
