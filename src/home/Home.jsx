import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoards } from '../redux/modules/boards'
import toJS from '../to-js'

class Home extends Component {
  componentDidMount() {
    this.props.getBoards()
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.error) {
      return <p>Error</p>
    }

    if (!this.props.boards) {
      return <div />
    }

    return <h2>Boards</h2>
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  boards: PropTypes.array,
  error: PropTypes.object,
}

const mapStateToProps = state => ({
  isLoading: state.get('boards').get('isLoading'),
  boards: state.get('boards').get('boards'),
  error: state.get('boards').get('error'),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBoards,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Home))
