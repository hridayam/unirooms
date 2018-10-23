import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';

import reducers from '../reducers';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
    persistedReducer,
    {},
    compose(
        applyMiddleware(thunk, loggerMiddleware)
    )
);

const persistor = persistStore(store);

export { store, persistor };
