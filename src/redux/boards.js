import { handle } from 'redux-pack'
import boardsService from '../services/boards-service'

export const GET_BOARDS = 'neto/boards/GET'

const initialState = new Map({
  isLoading: false,
  boards: null,
  error: null,
})

const boardsReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_BOARDS:
      return handle(state, action, {
        start: state
          .set('isLoading', true)
          .set('boards', initialState.get('boards'))
          .set('error', initialState.get('error')),
        finish: state.set('isLoading', false),
        failure: state
          .set('boards', initialState.get('boards'))
          .set('error', payload),
        success: state
          .set('boards', payload)
          .set('error', initialState.get('error')),
      })
    default:
      return state
  }
}

export function getBoards() {
  return {
    type: GET_BOARDS,
    promise: boardsService.getBoards(),
  }
}
