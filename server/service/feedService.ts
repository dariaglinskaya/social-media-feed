import { injectable, inject } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
import * as instagram from 'instagram-node';

@injectable()
export class FeedService implements IFeedService {

    async getFeedsInstagram(tag): Promise<any> {
        var ig = instagram.instagram();
        ig.use({
            client_id: 'bb70807d70154d83ada0d4ddc8492fdb',
            client_secret: '5ca6066ad3e8473e86d8d76fd46f618d'
        });
        ig.use({ access_token: '311463581.bb70807.dd7c338aa30d4c858ff97f19446d1a1f' });
        return await new Promise((resolve, reject) => {
            ig.tag_media_recent(tag, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    console.log('service error');
                    reject(err.error_message);
                }
            })
        })
    }
    getFeedsTwitter(url): Promise<ICard> {
        var ig = instagram.instagram();
        ig.use({
            client_id: '4486b6d357a24d52b84d937bbfa80e4e',
            client_secret: 'f019457dfef44b0b8162176ea060aa5a'
        });
        return new Promise<ICard>((resolve, reject) => {
            instagram.get('tags/search', { q: 'paris' }).then(data => {
                console.log(data);
                resolve(data);
            })
                .catch((err) => reject(err));
        });
    }
    getFeedsVk(url): Promise<ICard> {
        var ig = instagram.instagram();
        ig.use({
            client_id: '4486b6d357a24d52b84d937bbfa80e4e',
            client_secret: 'f019457dfef44b0b8162176ea060aa5a'
        });
        return new Promise<ICard>((resolve, reject) => {
            instagram.get('tags/search', { q: 'paris' }).then(data => {
                console.log(data);
                resolve(data);
            })
                .catch((err) => reject(err));
        });
    }

}