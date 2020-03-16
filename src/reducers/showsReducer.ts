export const showsActions = {
  GET_LIST: 'GET_LIST_SHOWS',
  SET_LIST: 'SET_LIST_SHOWS',
  LOADING: 'LOADING_SHOWS',
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

const initialState: any = {
  shows: [],
  loading: false,
};

export const showsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case showsActions.SET_LIST:
      return {
        ...state,
        shows: action.data.shows,
      };

    case showsActions.LOADING:
      return {
        ...state,
        loading: action.data,
      };

    default:
      return state;
  }
};