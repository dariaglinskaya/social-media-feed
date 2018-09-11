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
import * as instagram from 'instagram-node';
var ig = instagram.instagram();
ig.use({
    client_id: 'bb70807d70154d83ada0d4ddc8492fdb',
    client_secret: '5ca6066ad3e8473e86d8d76fd46f618d'
});
@controller('/feed')
class FeedController {
    private _feedService: IFeedService;

    constructor(@inject(TYPES.FeedService) private feedService: IFeedService) {
        this._feedService = feedService;
    }
    @httpPost('/auth_instagram')
    private auth_instagram(@request() req, @response() res) {
        console.log(req.body)
    }

    @httpPost('/instagram')
    async instagram(@request() req, @response() res) {
        const data = await this._feedService.getFeedsInstagram(req.body[0]).then((result) => {
            console.log(result);
            res.json(result);
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