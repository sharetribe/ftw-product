/* eslint-disable no-underscore-dangle */
import { AnyAction, createStore, applyMiddleware, compose } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';

import createReducer from './reducers';
import * as analytics from './analytics/analytics';
import config from './config';

/**
 * Create a new store with the given initial state. Adds Redux
 * middleware and enhancers.
 */
export default function configureStore(initialState = {}, sdk = null, analyticsHandlers = []) {
  const middlewares = [thunk.withExtraArgument(sdk), analytics.createMiddleware(analyticsHandlers)];

  // Enable Redux Devtools in client side dev mode.
  const composeEnhancers =
    config.dev && typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(createReducer(), initialState, enhancer);

  return store;
}

const store = configureStore();

export type RootState = ReturnType<typeof createReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
