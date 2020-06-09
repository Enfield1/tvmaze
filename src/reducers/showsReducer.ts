import { takeEvery, put, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { RootState } from './rootReducer';
import { Show } from '../types/show';
import getLastPaginationPage from '../helpers/getLastPaginationPage';

export const showsActions = {
  GET_LIST: 'GET_LIST_SHOWS',
  SET_LIST: 'SET_LIST_SHOWS',
  LOADING: 'LOADING_SHOWS',
  SET_LIST_PAGINATION: 'SET_LIST_PAGINATION_SHOWS',
};

export const getListShows = () => ({
  type: showsActions.GET_LIST,
});

export const setLoaderShows = (data: ShowsState['loading']) => ({
  type: showsActions.LOADING,
  data,
});

export const setListShows = (data: { shows: ShowsState['shows']; pagination: Partial<ShowsState['pagination']> }) => ({
  type: showsActions.SET_LIST,
  data,
});

export const setPaginationShows = (data: Partial<ShowsState['pagination']>) => ({
  type: showsActions.SET_LIST_PAGINATION,
  data,
});

interface ShowsState {
  shows: Show[];
  pagination: {
    limit: number;
    current: number;
    first: number;
    last: number;
  };
  loading: boolean;
}

const initialState: ShowsState = {
  shows: [],
  pagination: {
    limit: 20,
    current: 1,
    first: 1,
    last: 0,
  },
  loading: false,
};

export const showsReducer = (state: ShowsState = initialState, action: any): ShowsState => {
  switch (action.type) {
    case showsActions.SET_LIST:
      return {
        ...state,
        shows: action.data.shows,
        pagination: {
          ...state.pagination,
          ...action.data.pagination,
        }
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

const getPaginationState = (state: RootState): ShowsState['pagination'] => state.shows.pagination;

function* getListRequestShows() {
  yield put(setLoaderShows(true));
  const pagination: ShowsState['pagination'] = yield select(getPaginationState);
  const params = {
    _page: pagination.current,
    _limit: pagination.limit,
  }
  try {
    const response = yield call(
      axios.get,
      '/api/shows',
      { params },
    );

    const last = getLastPaginationPage(response.headers.link);

    yield put(setListShows({ shows: response.data, pagination: { last } }));
  } catch (error) {
    console.error(error);
  }
  yield put(setLoaderShows(false));
}

export const showsSagas = function* () {
  yield takeEvery([showsActions.GET_LIST, showsActions.SET_LIST_PAGINATION], getListRequestShows);
};
