import React, { Component } from 'react'
import PropTypes from 'prop-types'
import parse from 'url-parse'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions } from 'redux-router5'
import {
  isAuthenticated,
  signIn,
  signedIn,
  onCallback,
} from '~/services/trello-service'

class SignedIn extends Component {
  componentDidMount() {
    signedIn()
    this.props.navigateTo('home')
  }

  render() {
    return <div />
  }
}

SignedIn.propTypes = {
  navigateTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: actions.navigateTo,
    },
    dispatch
  )

export const createAuthenticationMiddleware = (addRoute, redirect) => {
  if (!addRoute) {
    throw new Error('No add route function specified.')
  }

  addRoute(
    'signed-in',
    '/signed-in',
    connect(null, mapDispatchToProps)(SignedIn)
  )

  return store => next => action => {
    if (onCallback()) {
      next(action)
      return
    }

    if (!isAuthenticated()) {
      signIn()
      return
    }

    next(action)
  }
}
