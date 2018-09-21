import { feedConstant } from '../constants/feedConstants'
import axios from 'axios';

const INITIAL_COUNT = 5;

const feedActions = {
    renderCardsFailure,
    renderInstagramCardsSuccess,
    renderInstagramPost,
    renderTwitterPost,
    renderVKPost,
    loadMore
}
function loadMore() {
    return {
        type: feedConstant.LOAD_MORE,
        isLoading: true
    }
}
function renderInstagramPost(tag) {
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios.get(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
            .catch(() => dispatch(renderCardsFailure()))
            .then((response) => {
                let result: any[] = [];
                let ids: any[] = [];
                response.data.graphql.hashtag.edge_hashtag_to_media.edges.forEach((item) => {
                    let text = '';
                    if (item.node.edge_media_to_caption.edges[0] !== undefined) {
                        text = item.node.edge_media_to_caption.edges[0].node.text;
                    }
                    result.push({
                        username: '#'+item.node.owner.id,
                        profile_picture: 'https://www.limestone.edu/sites/default/files/user.png',
                        image: item.node.display_url,
                        likes: item.node.edge_liked_by.count,
                        text: text,
                        shorten_text: text.length > 150 ? text.substring(0,150) : text,
                        comments: item.node.edge_media_to_comment.count
                    });
                    ids.push(item.node.owner.id);
                });
                result.forEach((item) => {
                    
                });
                dispatch(renderInstagramCardsSuccess(result));

            })

    };
}
function renderVKPost(tag) {
    const res = { tag: tag };
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'post',
            url: '/feed/vk',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            },
            data: res
        })
            .then(async (response) => {
                let result: any[] = [];
                let ids: any[] = [];
                response.data.forEach(async (item) => {
                    let image = '';

                    if (item.attachments !== undefined && item.attachments[0].photo) {
                        if (item.attachments[0].photo.photo_1280 !== undefined) {
                            image = item.attachments[0].photo.photo_1280;
                        } else if (item.attachments[0].photo.photo_604 !== undefined) {
                            image = item.attachments[0].photo.photo_604;
                        }
                    }
                    let res = {
                        username: item.owner_id,
                        profile_picture: item.owner_id,
                        image: image,
                        likes: item.likes.count,
                        text: item.text,
                        shorten_text: item.text.length > 150 ? item.text.substring(0,150) : item.text,
                        comments: item.comments.count
                    };
                    if (item.owner_id < 0) {
                        ids.push(item.owner_id * (-1))
                    } else {
                        ids.push(item.owner_id)
                    }
                    result.push(res);
                });
                await getVKUsers(ids).then((users) => {
                    result.forEach((item) => {
                        users.forEach((user: any) => {
                            item.username = user.first_name + ' ' + user.last_name,
                                item.profile_picture = user.photo_50;
                        })
                    });
                });
                dispatch(renderVKCardsSuccess(result))
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}
async function getVKUsers(ids) {
    let users = [];
    await axios({
        method: 'post',
        url: '/feed/vk/users',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
        },
        data: ids
    })
        .then((response) => {
            users = response.data;
        })
        .catch(() => new Error());
    return await users;
}
function renderTwitterPost(tag) {
    const res = { tag: tag };
    return (dispatch) => {
        dispatch(cardsIsLoading());
        axios({
            method: 'post',
            url: '/feed/twitter',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT'
            },
            data: res
        })
            .then((response) => {
                let result: any[] = [];
                response.data.statuses.forEach((item) => {
                    let image = '';
                    if (item.entities.media !== undefined) {
                        image = item.entities.media[0].media_url;
                    }
                    let res = {
                        username: item.user.screen_name,
                        profile_picture: item.user.profile_image_url,
                        image: image,
                        text: item.text,
                        shorten_text: item.text.length > 150 ? item.text.substring(0,150) : item.text,
                        comments: item.retweet_count
                    };
                    result.push(res);
                });
                dispatch(renderTwitterCardsSuccess(result));
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
function renderInstagramCardsSuccess(cards) {
    return {
        type: feedConstant.INSTAGRAM_SUCCESS,
        inst_cards: cards,
        vk_cards: [],
        tw_cards: [],
        actual_cards: cards.slice(0, INITIAL_COUNT)
    }
}
function renderTwitterCardsSuccess(cards) {
    return {
        type: feedConstant.TWITTER_SUCCESS,
        tw_cards: cards,
        inst_cards: [],
        vk_cards: [],
        actual_cards: cards.slice(0, INITIAL_COUNT)
    }
}
function renderVKCardsSuccess(cards) {
    return {
        type: feedConstant.VK_SUCCESS,
        vk_cards: cards,
        inst_cards: [],
        tw_cards: [],
        actual_cards: cards.slice(0, INITIAL_COUNT)
    }
}

export default feedActions;