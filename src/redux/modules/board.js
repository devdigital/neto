import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import boardsService from '../../services/boards-service'

export const GET_BOARD = 'neto/board/GET'

const initialState = fromJS({
  isLoading: false,
  board: null,
  error: null,
})

const reducer = handleActions(
  {
    [GET_BOARD]: (state, action) =>
      handle(state, action, {
        start: state =>
          state
            .set('isLoading', true)
            .set('board', initialState.get('board'))
            .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state =>
          state
            .set('board', fromJS(action.payload))
            .set('error', initialState.get('error')),
        failure: state =>
          state
            .set('board', initialState.get('board'))
            .set('error', fromJS(action.payload)),
      }),
  },
  initialState
)

export default reducer

export const getBoard = boardId => ({
  type: GET_BOARD,
  promise: boardsService.getBoard(boardId),
})
