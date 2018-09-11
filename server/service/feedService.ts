import { injectable, inject } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
//import * as instagram from 'instagram-node';
const instagram = require('public-instagram');
@injectable()
export class FeedService implements IFeedService {

    async getFeedsInstagram(tag): Promise<any> {
        //var ig = instagram.instagram();
        //ig.use({ access_token: '311463581.bb70807.dd7c338aa30d4c858ff97f19446d1a1f' });
        const result = await instagram.tags.recent(tag, 10);
        console.log(result)
        return result;
        /*return await new Promise((resolve, reject) => {
            
            console.log(result)
            if (result) {
                resolve(result);
            } else {
                reject();
            }
            ig.tag_media_recent(tag, { count: 50 }, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    console.log('service error');
                    reject(err.error_message);
                }
            })
        })*/
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