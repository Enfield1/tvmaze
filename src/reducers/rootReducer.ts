import {combineReducers, createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects';
import {showsReducer, showsSagas} from './showsReducer';

const rootReducer = combineReducers({
  shows: showsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const rootSaga = function* helloSaga(): any {
  yield all([
    showsSagas(),
  ])
};

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);