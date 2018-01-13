import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
import routes from './routes'

const App = ({ route }) => {
  const name = route ? route.name : null
  const routeToRender = name ? routes.find(r => r.name === name) : null

  if (routeToRender) {
    return React.createElement(routeToRender.component)
  }

  return <p>Not found.</p>
}

export default connect(state => routeNodeSelector(''))(App)
