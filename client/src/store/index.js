import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
//import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

//const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const persistConfig = {
    key: 'root',
    blacklist: ['connectedUsers', 'messages', 'activeMessages', 'listings'],
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// const composeEnhancers = composeWithDevTools({ 
//     realtime: true, 
//     name: 'uniroom dev server',
//     hostname: 'localhost',
//     port: 8000
// });

const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

//remotedev({ hostname: 'localhost', port: 8000 });

const persistor = persistStore(store);

export { store, persistor };
