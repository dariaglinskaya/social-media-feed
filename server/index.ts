import * as bodyParser from 'body-parser';
import "reflect-metadata";
import { myContainer } from './container/inversify.config';

import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import  * as cors from 'cors';

import "./controller/FeedController";

let server = new InversifyExpressServer(myContainer);

server.setConfig((app) => {
  app.set('port', (process.env.PORT || 5000));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  
  app.use(cors())
});

let app = server.build();
app.listen(app.get('port'), () => console.log('App is listening on port ', app.get('port')));