import { combineReducers } from 'redux';

import auth from './auth';
import messagesList from './messagesList';
import activeMessages from './activeMessages';

export default combineReducers({
    auth,
    messages: messagesList,
    activeMessages
});
