
export interface ICard {
    username: string;
    profile_picture: string;
    image: string;
    likes: number;
    text: string;
    instagramConvert: (card: any) => ICard;
    vkConvert: (card: any) => ICard;
}

export interface IFeedService {
    getFeedsInstagram: (url: string) => Promise<ICard[]>;
    getFeedsTwitter: (url: string) => Promise<ICard[]>;
    getFeedsVk: (url: string) => Promise<any>;
}

export interface IFeedController {
    
}