import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList } from '../redux/modules/list'
import toJS from '../to-js'
import { actions } from 'redux-router5'

const Card = ({ name }) => <p>{name}</p>

Card.propTypes = {
  name: PropTypes.string.isRequired,
}

class List extends Component {
  componentDidMount() {
    this.props.getList(this.props.route.params.listId)
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading...</p>
    }

    if (this.props.error) {
      return <p>Error</p>
    }

    if (!this.props.list) {
      return <div />
    }

    return (
      <div>
        <h2>{this.props.list.name}</h2>
        {this.props.list.cards.map(c => <Card key={c.id} name={c.name} />)}
      </div>
    )
  }
}

List.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  list: PropTypes.object,
  error: PropTypes.object,
  route: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isLoading: state.get('list').get('isLoading'),
  list: state.get('list').get('list'),
  error: state.get('list').get('error'),
  route: state.get('router').route,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getList,
      navigateTo: actions.navigateTo,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(toJS(List))
