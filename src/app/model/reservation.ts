import { RegisteredUser } from './';
import { ItemStack } from './item';

export interface Reservation {
    id?: string;
    user: RegisteredUser;
    name: string;
    begin: Date;
    end: Date;
    itemStacks: ItemStack[];
}
