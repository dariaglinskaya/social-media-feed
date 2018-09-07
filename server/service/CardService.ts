import { injectable } from 'inversify';
import {ICard} from '../interfaces/interfaces';

@injectable()
export class CardService implements ICard{
    private card: ICard;
    
    
}