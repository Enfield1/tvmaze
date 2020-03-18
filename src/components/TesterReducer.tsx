import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListShows, setLoaderShows} from '../reducers/showsReducer';
import {useCallback, useEffect} from 'react';
import {Button} from 'antd';
import {PlusOutlined, MinusOutlined} from '@ant-design/icons';

const TesterReducer = () => {
  const loading = useSelector((state: any) => state.shows.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListShows({}));
  }, [dispatch]);

  const setLoader = useCallback(() => {
    dispatch(setLoaderShows(!loading));
  }, [dispatch, loading]);

  return (
    <div>
      <Button icon={loading ? <PlusOutlined /> : <MinusOutlined />} onClick={setLoader}>Тыц</Button>
      <p>loading: {loading ? 'true' : 'false'}</p>
    </div>
  );
};

export default TesterReducer;