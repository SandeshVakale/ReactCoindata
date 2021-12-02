import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../services/Api'

/* ------------- Types ------------- */
//
// import { StartupTypes } from '../redux/StartupRedux'
// import { GithubTypes } from '../redux/GithubRedux'
import { CurrenciesTypes } from '../redux/CurrenciesRedux'
import { CoinTypes } from '../redux/CoinRedux'
import { CoinsTypes } from '../redux/CoinsRedux'
import { ExchangesTypes } from '../redux/ExchangesRedux'
import { MarketsTypes } from '../redux/MarketsRedux'
import { MarketTypes } from '../redux/MarketRedux'
import { OverviewTypes } from '../redux/OverviewRedux'
import { CoinExchangesTypes } from '../redux/CoinExchangesRedux'
import { CoinMarketsTypes } from '../redux/CoinMarketsRedux'
import { SearchSuggestionsTypes } from '../redux/SearchSuggestionsRedux'
import { ExchangeTypes } from '../redux/ExchangeRedux'
import { ExchangeCoinsTypes } from '../redux/ExchangeCoinsRedux'
import { ExchangeMarketsTypes } from '../redux/ExchangeMarketsRedux'
import { CoinHistoryTypes } from '../redux/CoinHistoryRedux'

/* ------------- sagas ------------- */
//
// import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { getCurrencies } from './CurrenciesSagas'
import { getCoin } from './CoinSagas'
import { getCoins } from './CoinsSagas'
import { getExchanges } from './ExchangesSagas'
import { getMarkets } from './MarketsSagas'
import { getMarket } from './MarketSagas'
import { getOverview } from './OverviewSagas'
import { getCoinExchanges } from './CoinExchangesSagas'
import { getCoinMarkets } from './CoinMarketsSagas'
import { getSearchSuggestions } from './SearchSuggestionsSagas'
import { getExchange } from './ExchangeSagas'
import { getExchangeCoins } from './ExchangeCoinsSagas'
import { getExchangeMarkets } from './ExchangeMarketsSagas'
import { getCoinHistory } from './CoinHistorySagas'
/* ------------- API ------------- */

// The API we use is only used from sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    // takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    takeLatest(CurrenciesTypes.CURRENCIES_REQUEST, getCurrencies, api),
    takeLatest(CoinTypes.COIN_REQUEST, getCoin, api),
    takeLatest(CoinsTypes.COINS_REQUEST, getCoins, api),
    takeLatest(ExchangesTypes.EXCHANGES_REQUEST, getExchanges, api),
    takeLatest(MarketsTypes.MARKETS_REQUEST, getMarkets, api),
    takeLatest(MarketTypes.MARKET_REQUEST, getMarket, api),
    takeLatest(OverviewTypes.OVERVIEW_REQUEST, getOverview, api),
    takeLatest(CoinExchangesTypes.COIN_EXCHANGES_REQUEST, getCoinExchanges, api),
    takeLatest(CoinMarketsTypes.COIN_MARKETS_REQUEST, getCoinMarkets, api),
    takeEvery(SearchSuggestionsTypes.SEARCH_SUGGESTIONS_REQUEST, getSearchSuggestions, api),
    takeLatest(ExchangeTypes.EXCHANGE_REQUEST, getExchange, api),
    takeLatest(ExchangeCoinsTypes.EXCHANGE_COINS_REQUEST, getExchangeCoins, api),
    takeLatest(ExchangeMarketsTypes.EXCHANGE_MARKETS_REQUEST, getExchangeMarkets, api),
    takeLatest(CoinHistoryTypes.COIN_HISTORY_REQUEST, getCoinHistory, api)
  ])
}
