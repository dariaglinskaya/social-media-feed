import axios from 'axios';

import { feedConstant } from '../constants/feedConstants';
import pageActions from './page';

const renderTwitterPost = (tag) => {
    const res = { tag: tag };
    return (dispatch) => {
        dispatch(pageActions.cardsIsLoading());
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
                    } else if (item.retweeted_status !== undefined) {
                        if (item.retweeted_status.entities !== undefined) {
                            if (item.retweeted_status.entities.media !== undefined) {
                                image = item.retweeted_status.entities.media[0].media_url;
                            }
                        }
                    }
                    let res = {
                        source: 'twitter',
                        shortcode: item.user.screen_name + '/status/' + item.id_str,
                        username: item.user.screen_name,
                        profile_picture: item.user.profile_image_url,
                        image: image,
                        text: item.text,
                        date: new Date(item.created_at),
                        shorten_text: item.text.length > 150 ? item.text.substring(0, 150) : item.text,
                        comments: item.retweet_count
                    };
                    result.push(res);
                });
                dispatch(renderTwitterCardsSuccess(result));
            })
            .catch(() => dispatch(pageActions.renderCardsFailure()));
    };
}
const renderTwitterCardsSuccess = (cards) => {
    return {
        type: feedConstant.TWITTER_SUCCESS,
        tw_cards: cards
    }
}

export default {
    renderTwitterPost
};