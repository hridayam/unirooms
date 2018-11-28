import _ from 'lodash';

import { GET_MATCHES, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_MATCHES:
            return { ...state, [action.payload.id]: action.payload };
            //return _.mapKeys(action.payload, 'id')
            //return [...state, action.payload];
        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
}
