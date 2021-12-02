import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import Rehydration from '../services/Rehydration'
import ReduxPersist from '../config/ReduxPersist'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  //middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  //middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)
    middleware.push(logger)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
