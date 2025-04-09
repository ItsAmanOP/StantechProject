import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import itemsReducer from './itemsSlice';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);