import * as React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './reducers/rootReducer';
import ShowList from './components/ShowList/ShowList';
import { Router, Link } from '@reach/router';
import ShowPage from './components/ShowPage/ShowPage';

const App = (): JSX.Element => {
  return (
    <Provider store={ store }>
      <div className="app-wrapper">
        <Link to="/">Main</Link>
        <Link to="/show/123">Show 123</Link>
        <Router>
          <ShowList path="/"/>
          <ShowPage path="/show/:showId"/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
