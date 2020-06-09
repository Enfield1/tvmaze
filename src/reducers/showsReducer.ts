import {takeEvery, put, call, select} from 'redux-saga/effects';
import axios from 'axios';
import { RootState } from './rootReducer';
import { Show } from '../types/show';

export const showsActions = {
  GET_LIST: 'GET_LIST_SHOWS',
  SET_LIST: 'SET_LIST_SHOWS',
  LOADING: 'LOADING_SHOWS',
  SET_LIST_PAGINATION: 'SET_LIST_PAGINATION_SHOWS',
};

export const getListShows = (data: any) => ({
  type: showsActions.GET_LIST,
  data,
});

export const setLoaderShows = (data: boolean) => ({
  type: showsActions.LOADING,
  data,
});

export const setListShows = (data: any) => ({
  type: showsActions.SET_LIST,
  data,
});

export const setPaginationShows = (data: any) => ({
  type: showsActions.SET_LIST_PAGINATION,
  data,
});

interface ShowsState {
  shows: Show[];
  pagination: {
    limit: number;
    page: number;
  };
  loading: boolean;
}

const initialState: ShowsState = {
  shows: [],
  pagination: {
    limit: 20,
    page: 1,
  },
  loading: false,
};

export const showsReducer = (state: ShowsState = initialState, action: any): ShowsState => {
  switch (action.type) {
    case showsActions.SET_LIST:
      return {
        ...state,
        shows: action.data,
      };

    case showsActions.LOADING:
      return {
        ...state,
        loading: action.data,
      };

    case showsActions.SET_LIST_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.data,
        }
      }

    default:
      return state;
  }
};

const getPaginationState = (state: RootState) => state.shows.pagination;

function* getListRequestShows() {
  yield put(setLoaderShows(true));
  const pagination = yield select(getPaginationState);
  const params = {
    _page: pagination.page,
    _limit: pagination.limit,
  }
  try {
    const response = yield call(
      axios.get,
      '/api/shows',
      {params},
    );

    yield put(setListShows(response.data));
  } catch(error) {
    console.error(error);
  }
  yield put(setLoaderShows(false));
}

export const showsSagas = function* () {
  yield takeEvery([showsActions.GET_LIST, showsActions.SET_LIST_PAGINATION], getListRequestShows);
};
