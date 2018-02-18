import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { createLogger } from 'redux-logger'
import { router5Middleware } from 'redux-router5'
import { Iterable, Map } from 'immutable'
import reducer from './modules/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const isDevelopment = process.env.NODE_ENV !== 'production'
const developmentMiddlewares = []

if (isDevelopment) {
  developmentMiddlewares.push(
    createLogger({
      stateTransformer: state =>
        Iterable.isIterable(state) ? state.toJS() : state,
    })
  )
}

export default function configureStore(router, initialState = new Map()) {
  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        router5Middleware(router),
        reduxPackMiddleware,
        thunkMiddleware,
        ...developmentMiddlewares
      )
    )
  )

  if (module.hot) {
    module.hot.accept('./modules/reducer', () => {
      const reducer = require('./modules/reducer').default
      store.replaceReducer(reducer)
    })
  }

  return store
}
