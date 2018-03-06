import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoards } from '../redux/modules/boards'
import toJS from '../to-js'

const Board = ({ name, onClick }) => (
  <p>
    <a onClick={() => onClick()}>{name}</a>
  </p>
)

const Boards = ({ boards, onBoardClick }) =>
  boards.map(b => (
    <Board key={b.id} name={b.name} onClick={() => onBoardClick(b.id)} />
  ))

class Home extends Component {
  onBoardSelected = id => console.log(id)

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
        <Boards
          boards={this.props.boards}
          onBoardClick={this.onBoardSelected}
        />
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
