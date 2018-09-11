import { feedConstant } from '../constants/feedConstants';

const INITIAL_STATE = {
    cards: [], 
    isLoading: false
}
export function feed(state = INITIAL_STATE, action) {
    switch (action.type) {
        case feedConstant.CARDS_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                cards: action.cards,
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.CARDS_IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case feedConstant.INSTAGRAM_IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state
    }
}