import { feedConstant } from '../constants/feedConstants';

const INITIAL_STATE = {
    vk_cards: [],
    inst_cards: [],
    tw_cards: [], 
    isLoading: false
}
export function feed(state = INITIAL_STATE, action) {
    switch (action.type) {
        case feedConstant.INSTAGRAM_SUCCESS: {
            return {
                ...state,
                inst_cards: action.inst_cards,
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.VK_SUCCESS: {
            return {
                ...state,
                vk_cards: action.vk_cards,
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.TWITTER_SUCCESS: {
            return {
                ...state,
                tw_cards: action.tw_cards,
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
        case feedConstant.VK_IS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        default:
            return state
    }
}