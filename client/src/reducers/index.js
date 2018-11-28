import { combineReducers } from 'redux';

import auth from './auth';
import messagesList from './messagesList';
import activeMessages from './activeMessages';
import listings from './listings';
import matcherUsers from './matcherUsers';
import favoriteListings from './favoriteListings';
import userListings from './userListings';

export default combineReducers({
    auth,
    messages: messagesList,
    activeMessages,
    listings,
    matcherUsers
    favoriteListings,
    userListings
});
