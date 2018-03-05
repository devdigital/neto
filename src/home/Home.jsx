import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoards } from '../redux/modules/boards'
import toJS from '../to-js'

const Board = ({ name }) => <p>{name}</p>

const Boards = ({ boards }) => boards.map(b => <Board name={b.name} />)

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

    return (
      <div>
        <h2>Boards</h2>
        <Boards boards={this.props.boards} />
      </div>
    )
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
