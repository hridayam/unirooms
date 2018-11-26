import { combineReducers } from 'redux';

import auth from './auth';
import messagesList from './messagesList';
import activeMessages from './activeMessages';
import listings from './listings';
import matcherUsers from './matcherUsers';

export default combineReducers({
    auth,
    messages: messagesList,
    activeMessages,
    listings,
    matcherUsers
});
