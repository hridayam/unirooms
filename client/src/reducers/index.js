import { combineReducers } from 'redux';

import auth from './auth';
import messagesList from './messagesList';
import activeMessages from './activeMessages';
import listings from './listings';
import favoriteListings from './favoriteListings';
import userListings from './userListings';
import matchedUsers from './matchedUsers';

export default combineReducers({
    auth,
    messages: messagesList,
    activeMessages,
    listings,
    favoriteListings,
    userListings,
    matchedUsers
});
