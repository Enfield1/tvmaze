import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers/rootReducer';
import { useCallback, useEffect } from 'react';
import { getListShows, initialState, setFilter, setPaginationShows } from '../../reducers/showsReducer';
import Show from './Show';
import './showList.css';
import { Pagination, Spin, Typography, DatePicker } from 'antd';
import Search from 'antd/lib/input/Search';
import { Moment } from 'moment';
import { RouterComponentType } from '../../router/routing';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const ShowList: RouterComponentType<{}> = () => {
  const dispatch = useDispatch();
  const { shows, loading, pagination, filter } = useSelector((state: RootState) => state.shows);

  useEffect(() => {
    dispatch(getListShows());
  }, [dispatch]);

  const selectPage = useCallback((selectedPage: number) => {
    dispatch(setPaginationShows({ current: selectedPage }));
  }, [dispatch]);

  const selectLimit = useCallback((currentLimit: number, selectedLimit: number) => {
    dispatch(setPaginationShows({ limit: selectedLimit }));
  }, [dispatch]);

  const search = useCallback((e: React.SyntheticEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;
    dispatch(setFilter({ search }));
  }, [dispatch]);

  const filterByDate = useCallback((dates: Moment[]) => {
    let dateStart = initialState.filter.dateStart;
    let dateEnd = initialState.filter.dateEnd;

    if (Array.isArray(dates)) {
      const formattedDates = dates.map((date: Moment, index: number) => {
        const formattedDate = date.clone();
        const isStartDate = index === 0;
        if (isStartDate) {
          formattedDate.startOf('year');
        } else {
          formattedDate.endOf('year');
        }

        return formattedDate.format('YYYY/MM/DD');
      });

      dateStart = formattedDates[0];
      dateEnd = formattedDates[1];
    }

    dispatch(setFilter({ dateStart, dateEnd }));
  }, [dispatch]);

  return (
    <main className="page">
      <Title>TVMAZE</Title>

      <div className="show-list-wrapper">
        <Search onChange={ search } value={ filter.search } loading={ loading }/>

        <RangePicker picker="year" onChange={ filterByDate }/>

        <Pagination
          showSizeChanger
          onShowSizeChange={ selectLimit }
          pageSize={ pagination.limit }
          defaultPageSize={ pagination.limit }
          onChange={ selectPage }
          current={ pagination.current }
          defaultCurrent={ pagination.first }
          total={ pagination.last * pagination.limit }
        />

        <Spin spinning={ loading }>
          <div className={ `show-list ${ loading ? ' loading' : '' }` }>
            { shows.map((show) => (
              <Show key={ show.id } show={ show }/>
            )) }
          </div>
        </Spin>
      </div>
    </main>
  );
};

export default ShowList;
