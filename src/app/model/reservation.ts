import { RegisteredUser } from './';
import { Item } from './item';

export interface Reservation {
    id?: string;
    user: RegisteredUser;
    name: string;
    begin: Date;
    end: Date;
    items: Item[];
}
