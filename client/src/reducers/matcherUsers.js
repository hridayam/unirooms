import _ from 'lodash';
import { GET_MATCHER_USERS, LEFT_SWIPE, RIGHT_SWIPE, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_MATCHER_USERS:
            return _.mapKeys(action.payload, 'id');
        case LOGOUT_USER:
            return INITIAL_STATE;
        case RIGHT_SWIPE: {
            const data = state;
            delete data[`${action.payload}`];
            return {
                ...data
            };
        }
        case LEFT_SWIPE: {
            const data = state;
            delete data[`${action.payload}`];
            return {
                ...data
            };
        }
        default:
            return state;
    }
}
