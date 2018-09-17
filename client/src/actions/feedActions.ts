import { feedConstant } from '../constants/feedConstants'
import axios from 'axios';

const feedActions = {
    renderCardsFailure,
    renderInstagramCardsSuccess,
    renderInstagramPost,
    renderTwitterPost,
    renderVKPost,
    instagram,
    twitter,
    vk
}
function instagram(code) {
    const code2 = { code: code }
    console.log(code)
    return (dispatch) => {
        dispatch(instagramIsLoading());
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
        console.log(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
        axios.get(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
            .catch(() => dispatch(renderCardsFailure()))
            .then((response) => {
                console.log(response);
                let result: any[] = [];
                let ids: any[] = [];
                response.data.graphql.hashtag.edge_hashtag_to_media.edges.forEach((item) => {
                    let text = '';
                    if (item.node.edge_media_to_caption.edges[0] !== undefined) {
                        text = item.node.edge_media_to_caption.edges[0].node.text;
                    }
                   /* axios.get(`https://api.instagram.com/v1/users/${item.node.owner.id}?access_token=311463581.bb70807.dd7c338aa30d4c858ff97f19446d1a1f`)
                        .then((response) => {
                            console.log(response)
                        })*/
                    result.push({
                        username: '#'+item.node.owner.id,
                        profile_picture: 'https://www.limestone.edu/sites/default/files/user.png',
                        image: item.node.display_url,
                        likes: item.node.edge_liked_by.count,
                        text: text,
                        comments: item.node.edge_media_to_comment.count
                    });
                    ids.push(item.node.owner.id);
                });
                result.forEach((item) => {
                    
                });
                dispatch(renderInstagramCardsSuccess(result));

            })

    };
}/*
function getInstagramUsers(ids) {
    console.log(ids)
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
            data: ids
        })
            .then((response) => {
                console.log(response)                
                //dispatch(dispatch(renderInstagramCardsSuccess(response.data)));
            })
            .catch(() => dispatch(renderCardsFailure()));
    };
}*/
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
                console.log(response)
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
                    console.log(users)
                    result.forEach((item) => {
                        users.forEach((user: any) => {
                            item.username = user.first_name + ' ' + user.last_name,
                                item.profile_picture = user.photo_50;
                        })
                    });
                });
                console.log(result)
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
                console.log(response)
                response.data.statuses.forEach((item) => {
                    let image = '';
                    if (item.entities.media !== undefined) {
                        console.log(item)
                        console.log(item.entities.media[0].media_url)
                        image = item.entities.media[0].media_url;
                    }
                    console.log(image)
                    let res = {
                        username: item.user.screen_name,
                        profile_picture: item.user.profile_image_url,
                        image: image,
                        text: item.text,
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
function instagramIsLoading() {
    return {
        type: feedConstant.INSTAGRAM_IS_LOADING,
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
        inst_cards: cards
    }
}
function renderTwitterCardsSuccess(cards) {
    return {
        type: feedConstant.TWITTER_SUCCESS,
        tw_cards: cards
    }
}
function renderVKCardsSuccess(cards) {
    return {
        type: feedConstant.VK_SUCCESS,
        vk_cards: cards
    }
}
function instagramSuccess(cards) {
    return {
        type: feedConstant.INSTAGRAM_SUCCESS,
    }
}
export default feedActions;