import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import boardsService from '~/services/boards-service'

export const GET_LIST = 'neto/list/GET'

const initialState = fromJS({
  isLoading: false,
  list: null,
  error: null,
})

const reducer = handleActions(
  {
    [GET_LIST]: (state, action) =>
      handle(state, action, {
        start: state =>
          state
            .set('isLoading', true)
            .set('list', initialState.get('list'))
            .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state =>
          state
            .set('list', fromJS(action.payload))
            .set('error', initialState.get('error')),
        failure: state =>
          state
            .set('list', initialState.get('list'))
            .set('error', fromJS(action.payload)),
      }),
  },
  initialState
)

export default reducer

export const getList = listId => ({
  type: GET_LIST,
  promise: boardsService.getList(listId),
})
