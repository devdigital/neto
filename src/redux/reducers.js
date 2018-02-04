import { router5Reducer } from 'redux-router5'
import boards from './boards'

export default combineReducers({
  router: router5Reducer,
  boards,
})

