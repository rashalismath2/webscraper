import { createStore, combineReducers, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import historyReducer from './history/history.reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['history']
  };


const rootReducer = combineReducers({ 
    history:historyReducer 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pReducer=persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);


