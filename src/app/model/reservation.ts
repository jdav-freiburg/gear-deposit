import { Item } from './item';

export interface Reservation {
    uid: string;
    name: string;
    begin: Date;
    end: Date;
    items: Item[];
}
