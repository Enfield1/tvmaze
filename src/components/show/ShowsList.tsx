import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useEffect } from 'react';
import { getListShows, setPaginationShows } from '../../reducers/showsReducer';
import Show from './Show';
import './showsList.css';
import { Spin } from 'antd';

const ShowsList = () => {
  const dispatch = useDispatch();
  const { shows, loading, pagination } = useSelector((state: RootState) => state.shows);

  useEffect(() => {
    dispatch(getListShows({}));
  }, [dispatch]);

  function changePagination(inc: number): void {
    dispatch(setPaginationShows({ page: pagination.page + inc }));
  }

  return (
    <div className="show-list-wrapper">
      <button
        onClick={() => {
          changePagination(-1);
        }}
      >
        Сюда
      </button>

      <button
        onClick={() => {
          changePagination(1);
        }}
      >
        Туда
      </button>

      <Spin spinning={loading}>
        <div className={`show-list ${loading ? ' loading' : ''}`}>
          {shows.map((show) => (
            <Show key={show.id} show={show}/>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default ShowsList;
