import { RegisteredUser } from './';
import { ItemStacks } from './item';

export interface Reservation {
    id?: string;
    user: RegisteredUser;
    name: string;
    begin: Date;
    end: Date;
    itemStacks: ItemStacks;
}
