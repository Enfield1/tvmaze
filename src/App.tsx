import * as React from 'react';
import './style.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers/rootReducer';
import TesterReducer from './components/TesterReducer';

const store = createStore(rootReducer);

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