import { put, call, select, takeLatest } from 'redux-saga/effects';
import { RootState } from './rootReducer';
import { Show } from '../types/show';
import { getCorrectPagination } from '../helpers/getCorrectPagination';
import { Http } from '../helpers/Http';
import { Action, AnyAction } from 'redux';
import { SagaIterator } from "@redux-saga/types";

export const showsActions = {
  GET_LIST: 'GET_LIST_SHOWS',
  SET_LIST: 'SET_LIST_SHOWS',
  LOADING: 'LOADING_SHOWS',
  SET_LIST_PAGINATION: 'SET_LIST_PAGINATION_SHOWS',
  SET_FILTER: 'SET_FILTER',
};

export const getListShows = (): Action => ({
  type: showsActions.GET_LIST,
});

export const setLoaderShows = (data: ShowsState['loading']): AnyAction => ({
  type: showsActions.LOADING,
  data,
});

export const setListShows = (data: { shows: ShowsState['shows']; pagination: Partial<ShowsState['pagination']> }): AnyAction => ({
  type: showsActions.SET_LIST,
  data,
});

export const setPaginationShows = (data: Partial<ShowsState['pagination']>): AnyAction => ({
  type: showsActions.SET_LIST_PAGINATION,
  data,
});

export const setFilter = (data: Partial<ShowsState['filter']>): AnyAction => ({
  type: showsActions.SET_FILTER,
  data,
});

export interface ShowsState {
  shows: Show[];
  pagination: {
    limit: number;
    current: number;
    first: number;
    last: number;
  };
  filter: {
    search: string;
    dateStart: string;
    dateEnd: string;
  };
  loading: boolean;
}

export const initialState: ShowsState = {
  shows: [],
  pagination: {
    limit: 20,
    current: 1,
    first: 1,
    last: 1,
  },
  filter: {
    search: '',
    dateStart: '',
    dateEnd: '',
  },
  loading: false,
};

export const showsReducer = (state: ShowsState = initialState, action: AnyAction): ShowsState => {
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

    case showsActions.SET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.data,
        }
      }

    default:
      return state;
  }
};

const getPaginationState = (state: RootState): ShowsState['pagination'] => state.shows.pagination;
const getFilterState = (state: RootState): ShowsState['filter'] => state.shows.filter;

function* getListRequestShows(action: Action): SagaIterator {
  yield put(setLoaderShows(true));
  const pagination: ShowsState['pagination'] = yield select(getPaginationState);
  const params: { [key: string]: string | number | boolean } = {
    _page: pagination.current,
    _limit: pagination.limit,
  }

  const filter: ShowsState['filter'] = yield select(getFilterState);
  if (filter.search) {
    params.q = filter.search;
  }
  if (filter.dateStart && filter.dateEnd) {
    params['premiered_gte'] = filter.dateStart;
    params['premiered_lte'] = filter.dateEnd;
  }

  const isFilterAction = action.type === showsActions.SET_FILTER;
  if (isFilterAction) {
    params._page = initialState.pagination.first;
  }

  try {
    const response = yield call(Http.get, '/api/shows', params);
    const newPagination = getCorrectPagination(response.headers.link);

    if (!newPagination.current) newPagination.current = initialState.pagination.first;
    if (!newPagination.last) newPagination.last = initialState.pagination.last;
    if (!newPagination.limit) newPagination.limit = pagination.limit;

    yield put(setListShows({ shows: response.data, pagination: newPagination }));
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoaderShows(false));
  }
}

export const showsSagas = function* (): SagaIterator {
  yield takeLatest([showsActions.GET_LIST, showsActions.SET_LIST_PAGINATION, showsActions.SET_FILTER], getListRequestShows);
};
