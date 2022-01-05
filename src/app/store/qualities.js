import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } = actions;

const TEN_MINUTES = 10 * 60 * 1000;
const isOutDated = (date) => Date.now() - date > TEN_MINUTES;

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(qualitiesRequested());
    try {
      const { content } = await qualityService.getAll();
      dispatch(qualitiesReceived(content));
    } catch (error) {
      dispatch(qualitiesRequestFailed(error.message));
    }
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  // eslint-disable-next-line no-unused-expressions
  return state.qualities.entities
    ? state.qualities.entities.filter((q) => qualitiesIds.includes(q._id))
    : [];
};

export default qualitiesReducer;
