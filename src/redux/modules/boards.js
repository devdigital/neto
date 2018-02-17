import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import boardsService from '../../services/boards-service'

export const GET_BOARDS = 'neto/boards/GET'

const initialState = fromJS({
  isLoading: false,
  boards: null,
  error: null,
})

const reducer = handleActions(
  {
    [GET_BOARDS]: (state, action) =>
      handle(state, action, {
        start: state => state
          .set('isLoading', true)
          .set('boards', initialState.get('boards'))
          .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state => state
          .set('boards', fromJS(action.payload))
          .set('error', initialState.get('error')),
        failure: state => state
          .set('boards', initialState.get('boards'))
          .set('error', fromJS(action.payload))
      })
  },
  initialState
)

export default reducer

export const getBoards = () => ({
  type: GET_BOARDS,
  promise: boardsService.getBoards(),
})

