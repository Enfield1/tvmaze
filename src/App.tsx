import * as React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {store} from './reducers/rootReducer';
import ShowList from './components/show/ShowList';


function App() {
  return (
    <Provider store={store}>
      <div className="test-class">
        Hell, o-world
      </div>
      <ShowList/>
    </Provider>
  );
}

export default App;
