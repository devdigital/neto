import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoard } from '../redux/modules/board'
import toJS from '../to-js'
import { actions } from 'redux-router5'
import List from '../shared/List'

class Board extends Component {
  onListSelected = id => this.props.navigateTo('list', { listId: id })

  componentDidMount() {
    this.props.getBoard(this.props.route.params.boardId)
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.error) {
      return <p>Error</p>
    }

    if (!this.props.board) {
      return <div />
    }

    return (
      <div>
        <h2>{this.props.board.name}</h2>
        <List
          items={this.props.board.lists.map(l => ({ id: l.id, name: l.name }))}
          onClick={id => this.onListSelected(id)}
        />
      </div>
    )
  }
}

Board.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  board: PropTypes.object,
  error: PropTypes.object,
  route: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.get('board').get('isLoading'),
  board: state.get('board').get('board'),
  error: state.get('board').get('error'),
  route: state.get('router').route,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBoard,
      navigateTo: actions.navigateTo,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Board))
