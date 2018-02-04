import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { router5Middleware } from 'redux-router5'
import reducers from './reducers'

export default function configureStore(router, initialState = {}) {
  const createStoreWithMiddleware = applyMiddleware(router5Middleware(router))(
    createStore
  )

  const store = createStoreWithMiddleware(reducers, initialState)

  return store
}
