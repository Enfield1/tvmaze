import * as React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import {Provider} from 'react-redux';
import TesterReducer from './components/TesterReducer';
import {store} from './reducers/rootReducer';


function App() {
  return (
    <Provider store={store}>
      <div className="test-class">
        Hell, o-world
      </div>
      <TesterReducer/>
    </Provider>
  );
}

export default App;