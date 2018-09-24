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
    const all_cards = state.inst_cards.concat(state.vk_cards, state.tw_cards);
    const sorted_cards = all_cards.sort((a, b) => {
        return b.date.getTime() - a.date.getTime()
    });
    switch (action.type) {
        case feedConstant.INSTAGRAM_SUCCESS: {
            console.log(state.inst_cards.concat(state.vk_cards, state.tw_cards));
            console.log(all_cards);
            return {
                ...state,
                inst_cards: action.inst_cards,
                actual_cards: sorted_cards.slice(0, INITIAL_COUNT),
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.VK_SUCCESS: {
            console.log(state.inst_cards.concat(state.vk_cards, state.tw_cards));
            console.log(all_cards);
            return {
                ...state,
                vk_cards: action.vk_cards,
                actual_cards: sorted_cards.slice(0, INITIAL_COUNT),
                isLoading: false,
                fetchSuccess: true
            }
        }
        case feedConstant.TWITTER_SUCCESS: {
            console.log(state.inst_cards.concat(state.vk_cards, state.tw_cards));
            console.log(all_cards);
            return {
                ...state,
                tw_cards: action.tw_cards,
                actual_cards: sorted_cards.slice(0, INITIAL_COUNT),
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
            const cards = state.actual_cards.concat(all_cards.slice(state.actual_cards.length, state.actual_cards.length + INITIAL_COUNT));
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