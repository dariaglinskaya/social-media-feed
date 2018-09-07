export interface IFeed {
    cards: ICard[];
}
export interface ICard {
    username: string;
    profile_picture: string;
    image: string;
    tags: string[];
    likes: number;
    location: string;
    text: string;
}

export interface IFeedService {
    getFeedsInstagram: (url: string) => Promise<ICard>;
    getFeedsTwitter: (url: string) => Promise<ICard>;
    getFeedsVk: (url: string) => Promise<ICard>;
}

export interface IFeedController {
    
}