import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: professionsReducer } = professionsSlice;

const { professionsRequested, professionsReceived, professionsRequestFailed } = actions;

const TEN_MINUTES = 10 * 60 * 1000;
const isOutDated = (date) => Date.now() - date > TEN_MINUTES;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutDated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.getAll();
      dispatch(professionsReceived(content));
    } catch (error) {
      dispatch(professionsRequestFailed(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
export const getProfessionById = (profId) => (state) =>
  state.professions.entities ? state.professions.entities.find((prof) => prof._id === profId) : '';

export default professionsReducer;
