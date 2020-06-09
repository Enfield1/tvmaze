import * as React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import {store} from './reducers/rootReducer';
import ShowsList from './components/show/ShowsList';


function App() {
  return (
    <Provider store={store}>
      <div className="test-class">
        Hell, o-world
      </div>
      <ShowsList/>
    </Provider>
  );
}

export default App;
