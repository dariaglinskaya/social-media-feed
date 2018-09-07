import { injectable, inject } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
import * as instagram from 'instagram-node';

@injectable()
export class FeedService implements IFeedService {

    getFeedsInstagram(url): Promise<ICard> {
        var ig = instagram.instagram();
        ig.use({
            client_id:  '4486b6d357a24d52b84d937bbfa80e4e',
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
    getFeedsTwitter(url): Promise<ICard> {
        var ig = instagram.instagram();
        ig.use({
            client_id:  '4486b6d357a24d52b84d937bbfa80e4e',
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
            client_id:  '4486b6d357a24d52b84d937bbfa80e4e',
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