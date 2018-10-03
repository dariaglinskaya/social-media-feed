import { feedConstant } from '../constants/feedConstants';

const cardsIsLoading = () => {
    return {
        type: feedConstant.CARDS_IS_LOADING,
        isLoading: true
    };
}
const renderCardsFailure = () => {
    return {
        type: feedConstant.CARDS_HAS_ERRORED,
        hasErrored: true
    };
}
const loadMore = () => {
    return {
        type: feedConstant.LOAD_MORE,
        isLoading: true
    }
}
export default {
    renderCardsFailure,
    cardsIsLoading,
    loadMore
};