import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useEffect } from 'react';
import { getListShows, setPaginationShows } from '../../reducers/showsReducer';
import Show from './Show';
import './showList.css';
import { Pagination, Spin } from 'antd';

const ShowList = () => {
  const dispatch = useDispatch();
  const { shows, loading, pagination } = useSelector((state: RootState) => state.shows);

  useEffect(() => {
    dispatch(getListShows());
  }, [dispatch]);

  function selectPage(selectedPage: number): void {
    dispatch(setPaginationShows({ current: selectedPage }));
  }

  function selectLimit(currentLimit: number, selectedLimit: number): void {
    dispatch(setPaginationShows({ limit: selectedLimit }));
  }

  return (
    <div className="show-list-wrapper">
      <Pagination
        showSizeChanger
        onShowSizeChange={selectLimit}
        pageSize={pagination.limit}
        defaultPageSize={pagination.limit}
        onChange={selectPage}
        current={pagination.current}
        defaultCurrent={pagination.first}
        total={pagination.last * pagination.limit}
      />

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

export default ShowList;
