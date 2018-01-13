import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider } from 'react-router5'
import { Provider } from 'react-redux'
import createRouter from './create-router'
import configureStore from './redux/create'
import App from './App'

const router = createRouter()
const store = configureStore(router)

router.start(() => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>,
    document.getElementById('root')
  )
})
