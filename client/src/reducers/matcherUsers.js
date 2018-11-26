import _ from 'lodash';
import { GET_MATCHER_USERS, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_MATCHER_USERS:
            return _.mapKeys(action.payload, 'id')
        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
}
