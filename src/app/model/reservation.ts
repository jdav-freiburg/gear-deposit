import { Item, RegisteredUser } from './';

export interface Reservation {
    id?: string;
    user: RegisteredUser;
    name: string;
    begin: Date;
    end: Date;
    items: Item[];
}
