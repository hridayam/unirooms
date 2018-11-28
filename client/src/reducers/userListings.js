import _ from 'lodash';
import { 
    LOGOUT_USER, GET_CURRENT_USER_LISTINGS
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CURRENT_USER_LISTINGS: 
            return _.mapKeys(action.payload, 'id');
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}
