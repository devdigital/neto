import { router5Reducer } from 'redux-router5'
import {
  combineReducers
} from 'redux-immutable'
import boards from './boards'

export default combineReducers({
  router: router5Reducer,
  boards,
})

