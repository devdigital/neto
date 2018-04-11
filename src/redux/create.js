import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'
import { createLogger } from 'redux-logger'
import { router5Middleware } from 'redux-router5'
import { Iterable, Map } from 'immutable'
import reducer from './modules/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAuthenticationMiddleware } from './middleware/authentication'
import routes from '~/routes'

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

const addRoute = router => (name, path, component) => {
  router.addNode(name, path)
  routes.add(name, path, component)
}

export default function configureStore(router, initialState = new Map()) {
  const authenticationMiddleware = createAuthenticationMiddleware(
    addRoute(router)
  )

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        router5Middleware(router),
        reduxPackMiddleware,
        thunkMiddleware,
        authenticationMiddleware,
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
