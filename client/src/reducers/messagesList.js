import _ from 'lodash';

import { GET_MESSAGES, LOGOUT_USER, UPDATE_MESSAGES } from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_MESSAGES:
            return { ...state, [action.payload.id]: action.payload };
            //return _.mapKeys(action.payload, 'id')
            //return [...state, action.payload];
        case UPDATE_MESSAGES: 
            return { 
                ...state, 
                [action.payload.id]: {
                    ...state[action.payload.id],
                    thread: action.payload.thread
                }
            };
        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
}
