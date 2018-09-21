import { feedConstant } from '../constants/feedConstants';

const INITIAL_COUNT = 5;

const INITIAL_STATE = {
    vk_cards: [],
    inst_cards: [],
    tw_cards: [],
    actual_cards: [],
    isLoading: false
}
export function feed(state = INITIAL_STATE, action) {
    switch (action.type) {
        case feedConstant.INSTAGRAM_SUCCESS: {
            return {
                ...state,
                inst_cards: action.inst_cards,
                vk_cards: [],
                tw_cards: [],
                actual_cards: action.actual_cards,
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.VK_SUCCESS: {
            return {
                ...state,
                vk_cards: action.vk_cards,
                inst_cards: [],
                tw_cards: [],
                actual_cards: action.actual_cards,
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.TWITTER_SUCCESS: {
            return {
                ...state,
                vk_cards: [],
                inst_cards: [],
                tw_cards: action.tw_cards,
                actual_cards: action.actual_cards,
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
        case feedConstant.LOAD_MORE: {
            let cards = [];
            if (state.inst_cards.length !== 0) {
                cards = state.actual_cards.concat(state.inst_cards.slice(state.actual_cards.length, state.actual_cards.length + INITIAL_COUNT));
            } else if (state.vk_cards.length !== 0) {
                cards = state.actual_cards.concat(state.vk_cards.slice(state.actual_cards.length, state.actual_cards.length + INITIAL_COUNT));
            } else if (state.tw_cards.length !== 0) {
                cards = state.actual_cards.concat(state.tw_cards.slice(state.actual_cards.length, state.actual_cards.length + INITIAL_COUNT));
            }
            return {
                ...state,
                isLoading: false,
                actual_cards: cards
            }
        }
        default:
            return state
    }
}