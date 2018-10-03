
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
    getFeedsTwitter: (url: string) => Promise<any>;
    getFeedsVk: (url: string) => Promise<any>;
    getUsersVk: (ids: string[]) => Promise<any>;
}

export interface IFeedController {
    
}