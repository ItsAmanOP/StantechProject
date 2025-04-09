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

// Inferred state type: {todos: TodosState, counter: CounterState}
export type RootState = ReturnType<typeof store.getState>

// Inferred dispatch type: Dispatch & ThunkDispatch<RootState, undefined, UnknownAction>
export type AppDispatch = typeof store.dispatch