import axios from 'axios';

import { feedConstant } from '../constants/feedConstants';
import pageActions from './page';

const renderVKPost = (tag) => {
    const res = { tag: tag };
    return (dispatch) => {
        dispatch(pageActions.cardsIsLoading());
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
                        source: 'vk',
                        username: item.owner_id,
                        profile_picture: item.owner_id,
                        image: image,
                        shortcode: item.owner_id + '_' + item.id,
                        likes: item.likes.count,
                        text: item.text,
                        date: new Date(item.date * 1000),
                        shorten_text: item.text.length > 150 ? item.text.substring(0, 150) : item.text,
                        comments: item.comments.count
                    };

                    if (item.owner_id < 0) {
                        ids.push(item.owner_id * (-1))
                    }

                    if (item.owner_id >= 0) {
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
            .catch(() => dispatch(pageActions.renderCardsFailure()));
    };
}
const getVKUsers = async (ids) => {
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
const renderVKCardsSuccess = (cards) => {
    return {
        type: feedConstant.VK_SUCCESS,
        vk_cards: cards
    }
}

export default {
    renderVKPost
};