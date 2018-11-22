import { GET_ACTIVE_MESSAGES, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ACTIVE_MESSAGES:
            return [...state, action.payload];

        case LOGOUT_USER:
            return INITIAL_STATE;

        default:
            return state;
    }
}
