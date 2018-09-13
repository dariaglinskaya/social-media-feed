import { injectable } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
import * as instagram from 'instagram-node';
//const instagram = require('public-instagram');
const vkapi = new (require('node-vkapi'))({
    accessToken: '0ac4ea2d86e2193528abf4b0b51e384eaf37162a66edf3e2a992dca6a104f260e58fba1b05415a2029693',           // <String> Ключ доступа
    apiVersion: '5.68',         // <String> Версия API
    appId: '6690247',           // <Number> ID приложения ВКонтакте
    appSecret: 'eq7gM0Xy2Z0aSapGVtBr',           // <String> Секретный ключ приложения ВКонтакте
    captchaApiKey: null,           // <String> API ключ сервиса по распознаванию капчи
    captchaService: 'anti-captcha', // <String> Сервис по распознаванию капчи (anti-captcha, antigate, rucaptcha)
    userLogin: '+375336972675',           // <String> Логин пользователя
    userPassword: 'lkjhgfdsa',           // <String> Пароль пользователя
    baseDelay: 334             // <Number> Базовая задержка между вызовами API (334 составляет ~1/3 секунды и используется для авторизации через токен пользователя)
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

    async getUserByIDInstagram(id): Promise<any> {
        var ig = instagram.instagram();
        ig.use({ access_token: '311463581.bb70807.dd7c338aa30d4c858ff97f19446d1a1f' });
        return await new Promise((resolve, reject) => {
            ig.user(id, (err, result) => {
                if (!err) {
                    console.log(result)
                    resolve(result);
                } else {
                    console.log('service error');
                    reject(err.error_message);
                }
            })
        })
    }
    async getFeedsTwitter(tag): Promise<any> {
        return await new Promise<ICard[]>((resolve, reject) => {
            client.get('search/tweets', { q: '#' + tag.tag, count: 50 }, (error, tweets, response) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(tweets);
                }
                console.log();  // The favorites..
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