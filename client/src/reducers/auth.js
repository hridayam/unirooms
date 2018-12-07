import { 
    LOGIN_USER, LOGOUT_USER, UPDATE_USER, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, LEFT_SWIPE, RIGHT_SWIPE 
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
        case RIGHT_SWIPE: {
            const { liked } = state;
            if (!liked.includes(action.payload)) {
                liked.push(action.payload);
            }
            return { ...state, liked };
        }
        case LEFT_SWIPE: {
            const { disliked } = state;
            if (!disliked.includes(action.payload)) {
                disliked.push(action.payload);
            }
            return { ...state, disliked };
        }
        case UPDATE_USER: 
            return { ...state, ...action.payload };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}
