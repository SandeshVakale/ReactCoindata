//import ImmutablePersistenceTransformmmutablePersistenceTransform from '../Services/ImmutablePersistenceTransform'
import ImmutablePersistenceTransform from '../services/ImmutablePersistenceTransform';
// import AsyncStorage from '@react-native-community/async-storage'
//import SeamlessImmutablePersistenceTransform from "redux-immutable-persistence-transform";
// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storeConfig: {
    key: 'primary',
    storage: localStorage,
    // Reducer keys that you do NOT want stored to persistence here.
    blacklist: ['login', 'search', 'nav'],
    // Optionally, just specify the keys you DO want stored to persistence.
    // An empty array means 'don't store any reducers' -> infinitered/ignite#409
    // whitelist: [],
    transforms: [ImmutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
