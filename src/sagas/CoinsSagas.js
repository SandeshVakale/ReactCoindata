/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the Infinite Red Slack channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import CoinsActions from '../redux/CoinsRedux'
// import { CoinsSelectors } from '../redux/CoinsRedux'

export function * getCoins (api, action) {
  const { referenceCurrencyUuid, timePeriod, orderBy, orderDirection, limit, offset } = action
  // get current data from Store
  // const currentData = yield select(CoinsSelectors.getData)
  // make the call to the api
  console.log(action);
  const response = yield call(api.getCoins, { referenceCurrencyUuid, timePeriod, orderBy, orderDirection, limit, offset })
  // success?
  if (response.data.status === 'success') {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(CoinsActions.coinsSuccess(response.data))
  } else {
    yield put(CoinsActions.coinsFailure(response))
  }
}
