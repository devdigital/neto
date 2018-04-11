import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList } from '../redux/modules/list'
import toJS from '../to-js'
import { actions } from 'redux-router5'
import Checkbox from 'material-ui/Checkbox'
import g from 'glamorous'

const Member = ({ name, avatar }) => {
  const member = avatar ? (
    <g.Img
      borderRadius="50%"
      src={`https://trello-avatars.s3.amazonaws.com/${avatar}/30.png`}
    />
  ) : (
    <em>{name}</em>
  )
  return <g.Div>{member}</g.Div>
}

Member.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
}

const Card = ({ name, members }) => {
  const Grid = g.div({
    display: 'grid',
    justifyItems: 'end',
    alignItems: 'center',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '1rem',
  })

  return (
    <g.Div marginBottom="0.8rem">
      <Checkbox label={name} />
      <Grid>
        {members.map((m, i) => (
          <g.Div gridColumnStart={i + 2} gridColumnEnd={i + 3}>
            <Member name={m.fullName} avatar={m.avatarHash} />
          </g.Div>
        ))}
      </Grid>
    </g.Div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
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
        {this.props.list.cards.map(c => (
          <Card key={c.id} name={c.name} members={c.members} />
        ))}
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
