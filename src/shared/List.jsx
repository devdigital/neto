import React from 'react'
import PropTypes from 'prop-types'
import MUIList, { ListItem as MUIListItem } from 'material-ui/List'

const List = ({ items, onClick }) => (
  <MUIList>
    {items.map(i => (
      <MUIListItem
        key={i.id}
        primaryText={i.name}
        onClick={() => onClick(i.id)}
      />
    ))}
  </MUIList>
)

List.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default List
