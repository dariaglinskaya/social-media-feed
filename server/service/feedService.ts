import { injectable } from 'inversify';
import { IFeedService, ICard } from '../interfaces/interfaces';
//import * as instagram from 'instagram-node';
//const instagram = require('public-instagram');
const vkapi = new (require('node-vkapi'))({
    accessToken: '9d5599f8134d2cc9a1a7264a236573b6f975e32803344ae888a3f408a9552e35a202c48d1d24f9349550f',           // <String> Ключ доступа
    apiVersion: '5.68',         // <String> Версия API
    appId: '6690247',           // <Number> ID приложения ВКонтакте
    appSecret: 'eq7gM0Xy2Z0aSapGVtBr',           // <String> Секретный ключ приложения ВКонтакте
    captchaApiKey: null,           // <String> API ключ сервиса по распознаванию капчи
    captchaService: 'anti-captcha', // <String> Сервис по распознаванию капчи (anti-captcha, antigate, rucaptcha)
    userLogin: '+375336972675',           // <String> Логин пользователя
    userPassword: 'lkjhgfdsa',           // <String> Пароль пользователя
    baseDelay: 334             // <Number> Базовая задержка между вызовами API (334 составляет ~1/3 секунды и используется для авторизации через токен пользователя)
});

@injectable()
export class FeedService implements IFeedService {

    async getFeedsInstagram(tag): Promise<any> {
        //var ig = instagram.instagram();
        //ig.use({ access_token: '311463581.bb70807.dd7c338aa30d4c858ff97f19446d1a1f' });
        /* const result = await instagram.tags.recent(tag, 10);
         console.log(result)
         return result;*/

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
    getFeedsTwitter(url): Promise<ICard[]> {

        return new Promise<ICard[]>((resolve, reject) => {

        });
    }
    async getFeedsVk(tag): Promise<any> {
        return vkapi.call('newsfeed.search', {
            q: tag[0],
        })
    }
}