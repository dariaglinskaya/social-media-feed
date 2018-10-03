import { injectable } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
import * as instagram from 'instagram-node';
const vkapi = new (require('node-vkapi'))({
    accessToken: '0ac4ea2d86e2193528abf4b0b51e384eaf37162a66edf3e2a992dca6a104f260e58fba1b05415a2029693',
    apiVersion: '5.68',
    appId: '6690247',
    appSecret: 'eq7gM0Xy2Z0aSapGVtBr',
    captchaApiKey: null,
    captchaService: 'anti-captcha',
    userLogin: '+375336972675',
    userPassword: 'lkjhgfdsa',
    baseDelay: 334
});
const Twitter = require('twitter');
const client = new Twitter({
    consumer_key: 'sLb6RJBZNCjMAXH9ZW0oZ2vAT',
    consumer_secret: 'Z2S3sYJg5XS6hqy6cAxadK1YaH96py1fJamDsdUWXYQE7svLwa',
    access_token_key: '505844624-AVNm132S99d3h5XgVDuymy5PAcUflPNPrj9E7BQW',
    access_token_secret: 'XQkYolSEZ3mntNVsUfD9vzPk0N0GvyRVIieAb8GQ8Obnf'
});

@injectable()
export class FeedService implements IFeedService {

    async getFeedsTwitter(tag): Promise<any> {
        return await new Promise<ICard[]>((resolve, reject) => {
            client.get('search/tweets', { q: '#' + tag.tag, count: 50 }, (error, tweets, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(tweets);
                }
            });
        });
    }
    async getFeedsVk(tag): Promise<any> {
        return await vkapi.call('newsfeed.search', {
            q: tag.tag,
        })
    }
    async getUsersVk(ids): Promise<any> {
        return await vkapi.call('users.get', {
            user_ids: ids.join(),
            fields: 'photo_50'
        })
    }
}