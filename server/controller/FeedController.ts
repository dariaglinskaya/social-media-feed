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
    client_id:  '4486b6d357a24d52b84d937bbfa80e4e',
    client_secret: 'f019457dfef44b0b8162176ea060aa5a'
});
@controller('/feed')
class FeedController {
    private _feedService: IFeedService;

    constructor(@inject(TYPES.FeedService) private feedService: IFeedService) {
        this._feedService = feedService;
    }

    @httpPost('/instagram')
    private instagram(@request() req, @response() res) {
        res.redirect(ig.get_authorization_url('https://localhost:3000/', { scope : ['public_content','likes']}) );
        ig.authorize_user(req.query.code, 'https://localhost:3000/', function(err, result){
        // store this access_token in a global variable called accessToken
            const accessToken = result;
        // After getting the access_token redirect to the '/' route 
           console.log(result)
        });
        console.log('instagram')
        console.log(req.body)
        this._feedService.getFeedsInstagram(req.body).then((cards) => {
            console.log(cards)
            console.log('good')
            res.send(cards);
        }).catch((error) => {
            console.log('error')
            //res.sendStatus(400);
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