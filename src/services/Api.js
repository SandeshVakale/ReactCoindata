// a library to wrap and simplify api calls
import axios from "axios";
import Config from '../config/appConfig'

// our "constructor"
const create = (baseURL = Config.API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = axios.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      'Cache-Control': 'no-cache',
      'x-access-token': Config.API_KEY
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  const getCurrencies = () => api.get('reference-currencies?limit=100' )
  const getCoin = ({ uuid, referenceCurrencyUuid, timePeriod }) => api.get(`coin/${uuid}`, { referenceCurrencyUuid, timePeriod })
  const getCoins = ({ referenceCurrencyUuid, timePeriod, orderBy, orderDirection }) => api.get('coins', { referenceCurrencyUuid, timePeriod, orderBy, orderDirection, limit: 100 })
  const getExchanges = ({ referenceCurrencyUuid, orderBy, orderDirection, limit, offset }) => api.get(`exchanges?limit=${limit}&offset=${offset}&referenceCurrencyUuid=${referenceCurrencyUuid}`, { referenceCurrencyUuid, orderBy, orderDirection })
  const getMarkets = ({ referenceCurrencyUuid, orderBy, orderDirection }) => api.get('markets', { referenceCurrencyUuid, orderBy, orderDirection, limit: 100 })
  const getMarket = ({uuid, referenceCurrencyUuid}) => api.get(`market/${uuid}`, { referenceCurrencyUuid })
  const getOverview = ({ referenceCurrencyUuid }) => api.get('stats', { referenceCurrencyUuid })
  const getCoinExchanges = ({ uuid, referenceCurrencyUuid, orderDirection }) => api.get(`coin/${uuid}/exchanges`, { referenceCurrencyUuid, orderDirection, limit: 100 })
  const getCoinMarkets = ({ uuid, referenceCurrencyUuid, orderDirection }) => api.get(`coin/${uuid}/markets`, { referenceCurrencyUuid, orderDirection, limit: 100 })
  const getSearchSuggestions = ({ query }) => api.get('search-suggestions', { query })
  const getExchange = ({uuid, referenceCurrencyUuid}) => api.get(`exchange/${uuid}`, {referenceCurrencyUuid})
  const getExchangeCoins = ({ uuid, referenceCurrencyUuid, orderDirection }) => api.get(`exchange/${uuid}/coins`, { referenceCurrencyUuid, orderDirection, limit: 100 })
  const getExchangeMarkets = ({ uuid, referenceCurrencyUuid, orderDirection }) => api.get(`exchange/${uuid}/markets`, { referenceCurrencyUuid, orderDirection, limit: 100 })
  const getCoinHistory = ({ uuid, referenceCurrencyUuid, timePeriod }) => api.get(`coin/${uuid}/history`, { referenceCurrencyUuid, timePeriod })

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    // getRoot,
    // getRate,
    // getUser,
    getCurrencies,
    getCoin,
    getCoins,
    getExchanges,
    getMarkets,
    getMarket,
    getOverview,
    getCoinExchanges,
    getCoinMarkets,
    getSearchSuggestions,
    getExchange,
    getExchangeCoins,
    getExchangeMarkets,
    getCoinHistory
  }
}

// let's return back our create method as the default.
export default {
  create
}
