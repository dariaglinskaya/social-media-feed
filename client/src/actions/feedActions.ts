import { feedConstant } from '../constants/feedConstants'
import axios from 'axios';

const feedActions = {
    renderCardsFailure,
    renderCardsSuccess,
    renderInstagramPost,
    instagram,
    twitter,
    vk
}
function instagram(code) {
    const code2 = { code: code }
    console.log(code)
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'post',
            url: '/feed/auth_instagram',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET'
            },
            data: code2,
        })
            .then((response) => {
                console.log(response)
                dispatch(instagramSuccess(response.data));
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}
function twitter() {
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'get',
            url: '/twitter',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            }
        })
            .then((response) => {
                console.log(response)
                dispatch(instagramSuccess(response.data));
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}
function vk() {
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'post',
            url: '/vk',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            }
        })
            .then((response) => {
                console.log(response)
                dispatch(instagramSuccess(response.data));
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}
function renderInstagramPost(tag) {
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'post',
            url: '/feed/instagram',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            },
            data: tag
        })
            .then((response) => {
                console.log(response)
                dispatch(renderCardsSuccess(response.data));
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}
function cardsIsLoading() {
    return {
        type: feedConstant.CARDS_IS_LOADING,
        isLoading: true
    };
}
function renderCardsFailure() {
    return {
        type: feedConstant.CARDS_HAS_ERRORED,
        hasErrored: true
    };
}
function renderCardsSuccess(cards) {
    return {
        type: feedConstant.CARDS_FETCH_DATA_SUCCESS,
        cards: cards
    }
}
function instagramSuccess(cards) {
    return {
        type: feedConstant.INSTAGRAM_SUCCESS,
    }
}
export default feedActions;