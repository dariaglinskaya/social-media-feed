import { IFeedService, ICard } from '../interfaces/interfaces';
import {
    Request as req,
    Response as res,
    NextFunction as next
} from 'express';
import { TYPES } from '../constant/types';
import 'reflect-metadata';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";
import * as instagram from 'instagram-node';

@controller('/feed')
class FeedController {
    private _feedService: IFeedService;
    private _cardsService: ICard;
    constructor(@inject(TYPES.FeedService) private feedService: IFeedService) {
        this._feedService = feedService;
    }
    @httpPost('/auth_instagram')
    private auth_instagram(@request() req, @response() res) {
        console.log(req.body)
    }

    @httpPost('/instagram')
    async instagram(@request() req, @response() res) {
        await req.body.forEach(async (item) => {
            console.log(item)
            await this._feedService.getUserByIDInstagram('311463581').then((result) => {
                res.json(result);
            })
        });
    }
    @httpPost('/twitter')
    async twitter(@request() req, @response() res) {
        await this._feedService.getFeedsTwitter(req.body).then((cards) => {
            res.send(cards);
        }).catch((error) => {
            res.send(error);
        });
    }
    @httpPost('/vk')
    async vk(@request() req, @response() res) {
        console.log(req.body)
        await this._feedService.getFeedsVk(req.body).then((cards) => {
            res.send(cards.items);
        }).catch((error) => {
            console.log('error!!!!')
            res.send(error);
        })
    }
    @httpPost('/vk/users')
    async vk_users(@request() req, @response() res) {
        console.log(req.body)
        await this._feedService.getUsersVk(req.body).then((users) => {
            console.log(users);
            res.send(users);
        }).catch((error) => {
            console.log('error!!!!')
            res.send(error);
        })
    }
}
export default FeedController;