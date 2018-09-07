import { IFeedService } from '../interfaces/interfaces';
import {
    Request as req,
    Response as res,
    NextFunction as next
} from 'express';
import { TYPES } from '../constant/types';
import 'reflect-metadata';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { injectable, inject } from "inversify";
@controller('/feed')
class FeedController {
    private _feedService: IFeedService;

    constructor(@inject(TYPES.FeedService) private feedService: IFeedService) {
        this._feedService = feedService;
    }

    @httpPost('/instagram')
    private instagram(@request() req, @response() res) {
        this._feedService.getFeedsInstagram(req.body).then((cards) => {
            console.log(cards)
            res.send(cards);
        }).catch((error) => {
            res.send(error);
        });
    }
    @httpPost('/twitter')
    private twitter(@request() req, @response() res) {
        this._feedService.getFeedsTwitter(req.body).then((cards) => {
            res.send(cards);
        }).catch((error) => {
            res.send(error);
        });
    }
    @httpPost('/vk')
    private vk(@request() req, @response() res) {
        this._feedService.getFeedsVk(req.body).then((cards) => {
            res.send(cards);
        }).catch((error) => {
            res.send(error);
        });
    }
}
export default FeedController;