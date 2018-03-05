import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { actions } from 'redux-router5'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import toJS from '../to-js'

class SignedIn extends Component {
  componentDidMount() {
    const match = window.location.hash.match(/token=(.*)/)
    if (!match || match.length < 2) {
      return
    }

    const token = match[1]
    console.log(token)
  }

  render() {
    return <div />
  }
}

SignedIn.propTypes = {}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateTo: actions.navigateTo,
    },
    dispatch
  )

export default connect(mapDispatchToProps)(toJS(SignedIn))
