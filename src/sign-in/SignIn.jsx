import React, { Component } from 'react'
import { signIn } from '../redux/modules/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import toJS from '../to-js'

class SignIn extends Component {
  componentDidMount() {
    this.props.signIn()
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.error) {
      return <p>Error</p>
    }

    if (!this.props.user) {
      return <div />
    }

    return <div />
  }
}

const mapStateToProps = state => ({
  isLoading: state.get('user').get('isLoading'),
  boards: state.get('user').get('user'),
  error: state.get('user').get('error'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SignIn))
