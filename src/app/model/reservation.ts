import { Item } from './item';

export interface Reservation {
    id?: string;
    uid?: string;
    name: string;
    begin: Date;
    end: Date;
    items: Item[];
}
