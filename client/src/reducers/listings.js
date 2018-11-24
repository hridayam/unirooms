import _ from 'lodash';

import { GET_LISTINGS, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LISTINGS: {
            const data = _.mapKeys(action.payload, 'id');
            return {
                ...state,
                ...data
            };
        }
            //return [...state, action.payload];

        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
}
