import * as React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './reducers/rootReducer';
import ShowList from './components/show/ShowList';


const App = (): JSX.Element => {
  return (
    <Provider store={ store }>
      <div className="app-wrapper">
        <ShowList/>
      </div>
    </Provider>
  );
}

export default App;
