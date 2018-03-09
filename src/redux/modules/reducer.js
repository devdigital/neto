import { router5Reducer } from 'redux-router5'
import { combineReducers } from 'redux-immutable'
import boards from './boards'
import board from './board'
import list from './list'
import user from './user'

export default combineReducers({
  router: router5Reducer,
  boards,
  board,
  list,
  user,
})
