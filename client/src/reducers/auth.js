import { 
    LOGIN_USER, LOGOUT_USER, UPDATE_USER, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES 
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.payload;
        case ADD_TO_FAVORITES: {
            const { favorites } = state;
            if (!favorites.includes(action.payload)) {
                favorites.push(action.payload);
                return { ...state, favorites };
            }
            return { ...state };
        }
        case REMOVE_FROM_FAVORITES: {
            const { favorites } = state;
            const index = favorites.indexOf(action.payload);
            if (index !== -1) {
                favorites.splice(index);
            }
            return { ...state, favorites };
        }
        case UPDATE_USER: 
            return { ...state, ...action.payload };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}
