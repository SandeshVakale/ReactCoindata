import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  marketsRequest: ['referenceCurrencyUuid', 'orderBy', 'orderDirection', 'limit', 'offset'],
  marketsSuccess: ['payload'],
  marketsFailure: ['payload']
})

export const MarketsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const MarketsSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: true, payload })
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MARKETS_REQUEST]: request,
  [Types.MARKETS_SUCCESS]: success,
  [Types.MARKETS_FAILURE]: failure
})
