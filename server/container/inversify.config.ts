import { Container } from "inversify";
import { TYPES } from "../constant/types";
import { IFeedService, ICard } from "../interfaces/interfaces";
import { FeedService } from '../service/feedService';

const myContainer = new Container();
myContainer.bind<IFeedService>(TYPES.FeedService).to(FeedService);
export { myContainer };