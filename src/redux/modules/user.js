import { handleActions } from 'redux-actions'
import { handle } from 'redux-pack'
import { fromJS } from 'immutable'
import apiService from '../../services/api-service'

export const SIGN_IN = 'neto/user/SIGN_IN'

const initialState = fromJS({
  isLoading: false,
  user: null,
  error: null,
})

const reducer = handleActions(
  {
    [SIGN_IN]: (state, action) =>
      handle(state, action, {
        start: state =>
          state
            .set('isLoading', true)
            .set('user', initialState.get('user'))
            .set('error', initialState.get('error')),
        finish: state => state.set('isLoading', false),
        success: state =>
          state
            .set('user', fromJS(action.payload))
            .set('error', initialState.get('error')),
        failure: state =>
          state
            .set('user', initialState.get('user'))
            .set('error', fromJS(action.payload)),
      }),
  },
  initialState
)

export default reducer

export const signIn = () => ({
  type: SIGN_IN,
  promise: apiService.signIn(),
})
