import { feedConstant } from '../constants/feedConstants';

const INITIAL_STATE = {
    cards: []
}
export function feed(state = INITIAL_STATE, action) {
    switch (action.type) {
        case feedConstant.CARDS_FETCH_DATA_SUCCESS: {
            return {
                ...state,
                cards: action.cards,
                fetchSuccess: true
            }
        }
        default:
            return state
    }
}