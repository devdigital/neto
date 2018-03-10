import React from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
import routes from './routes'
import g from 'glamorous'

const App = ({ route }) => {
  const name = route ? route.name : null
  const routeToRender = routes.get(name)
  if (routeToRender) {
    return (
      <g.Div padding="1rem">
        {React.createElement(routeToRender.component)}
      </g.Div>
    )
  }

  return <div />
}

export default connect(state => routeNodeSelector(''))(App)
