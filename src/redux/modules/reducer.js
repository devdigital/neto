import { router5Reducer } from 'redux-router5'
import { combineReducers } from 'redux-immutable'
import boards from './boards'
import board from './board'
import list from './list'

export default combineReducers({
  router: router5Reducer,
  boards,
  board,
  list,
})
