import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setLoaderShows} from '../reducers/showsReducer';
import {useCallback} from 'react';

const TesterReducer = () => {
  const loading = useSelector((state: any) => state.shows.loading);
  const dispatch = useDispatch();

  const setLoader = useCallback(() => {
    dispatch(setLoaderShows(!loading));
  }, [dispatch, loading]);

  return (
    <div>
      <button onClick={setLoader}>тыц</button>
      <p>loading: {loading ? 'true' : 'false'}</p>
    </div>
  );
};

export default TesterReducer;