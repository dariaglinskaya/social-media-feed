import axios from 'axios';

import { feedConstant } from '../constants/feedConstants';
import pageActions from './page';

const renderInstagramPost = (tag) => (dispatch) => {
    dispatch(pageActions.cardsIsLoading());
    axios.get(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
        .catch(() => dispatch(pageActions.renderCardsFailure()))
        .then((response) => {
            let result: any[] = [];
            let ids: any[] = [];
            response.data.graphql.hashtag.edge_hashtag_to_media.edges.forEach((item) => {
                let text = '';
                if (item.node.edge_media_to_caption.edges[0] !== undefined) {
                    text = item.node.edge_media_to_caption.edges[0].node.text;
                }
                result.push({
                    source: 'instagram',
                    username: '#' + item.node.owner.id,
                    profile_picture: 'https://www.limestone.edu/sites/default/files/user.png',
                    image: item.node.display_url,
                    likes: item.node.edge_liked_by.count,
                    text: text,
                    shortcode: item.node.shortcode,
                    date: new Date(item.node.taken_at_timestamp * 1000),
                    shorten_text: text.length > 150 ? text.substring(0, 150) : text,
                    comments: item.node.edge_media_to_comment.count
                });
                ids.push(item.node.owner.id);
            });
            dispatch(renderInstagramCardsSuccess(result));
        })

};
const renderInstagramCardsSuccess = (cards) => {
    return {
        type: feedConstant.INSTAGRAM_SUCCESS,
        inst_cards: cards
    }
}
export default {
    renderInstagramCardsSuccess,
    renderInstagramPost
};