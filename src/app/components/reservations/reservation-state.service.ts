import { Injectable, EventEmitter } from '@angular/core';
import { Item, ItemStack, RegisteredUser, Reservation as IReservation } from '../../model';
import { convert } from '../../model/item-stack-factory';
import { ItemService, ReservationService, UserService } from '../../services';
import { ItemFilterPipe } from '../../pipes';

interface OnDateChange {
    onBeginChange(date: Date): void;
    onEndChange(date: Date): void;
}

interface ReservationDates {
    begin: Date;
    end: Date;
}

class Reservation implements IReservation {

    name: string;
    items: Item[] = [];

    /**
     * Stores valid date objects, as values from date inputs are strings.
     */
    dates: ReservationDates;

    private _begin: Date;
    private _end: Date;

    constructor(public user: RegisteredUser, private onDateChange: OnDateChange) {
        this.user = user;
        this.dates = {
            begin: null,
            end: null
        };
    }

    public set begin(date: Date) {
        this._begin = date;
        this.dates.begin = new Date(date);
        this.onDateChange.onBeginChange(this.dates.begin);
    }

    public get begin(): Date {
        return this._begin;
    }

    public set end(date: Date) {
        this._end = date;
        this.dates.end = new Date(date);
        this.onDateChange.onEndChange(this.dates.end);
    }

    public get end(): Date {
        return this._end;
    }

    public get isValid(): boolean {
        return this.name && this.begin && this.end && this.items.length > 0;
    }
}

@Injectable()
export class ReservationStateService {

    private _allReservations: Reservation[];
    private _allItems: Item[];
    private _filteredItems: ItemStack[];

    private _added: Set<ItemStack> = new Set();
    public addedCount: number = 0;

    public readonly selected: Set<ItemStack> = new Set();
    public readonly initialized: EventEmitter<void> = new EventEmitter<void>();

    public reservation: Reservation;

    public stacks: ItemStack[];

    constructor(private userService: UserService,
                private itemService: ItemService,
                private reservationService: ReservationService,
                private itemFilter: ItemFilterPipe) {
        this.init();
    }

    private init(): void {

        // FIXME join these requests

        this.userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
            this.reservation = new Reservation(user, {
                onBeginChange: (date: Date) => {
                    this.unblockAll();
                    this._allReservations.forEach((reservation: Reservation) => {
                        let begin = date;
                        let end = this.reservation.dates.end;
                        if ((begin <= reservation.end && begin >= reservation.begin ) ||
                            (end && begin >= reservation.begin && end <= reservation.end)) {
                            this.block(reservation.items);
                        }
                    });
                },
                onEndChange: (date: Date) => {
                    this.unblockAll();
                    this._allReservations.forEach((reservation: Reservation) => {
                        let begin = this.reservation.dates.begin;
                        let end = date;
                        if ((end >= reservation.begin && end <= reservation.end) ||
                            (begin && end >= reservation.end && begin >= reservation.begin )) {
                            this.block(reservation.items);
                        }
                    });
                }
            });

            this.checkInitialized();
        });

        this.itemService.items$().subscribe((items: Item[]) => {
            this._allItems = items;
            this.stacks = convert(items);

            this.reservationService.all$().subscribe((reservations: Reservation[]) => {
                this._allReservations = reservations;
                this.checkInitialized();
            });
        });
    }

    private checkInitialized(): void {
        if (this.reservation && this._allItems && this.stacks && this._allReservations) {
            this.initialized.emit();
        }
    }

    private block(items: Item[]): void {
        console.debug('#block();', items);
        this.stacks.forEach((stack: ItemStack) => {
            let leftover: Item[] = [];
            items.forEach((i: Item) => {
                if (!stack.block(i)) {
                    leftover.push(i);
                }
            });
            items = leftover;
        });
    }

    private unblockAll(): void {
        console.debug('#unblockAll();');
        this.stacks.forEach((stack: ItemStack) => {
            stack.unblockAll();
        });
    }

    public select(stacks: ItemStack[]): void {
        stacks.forEach(s => this.selected.add(s));
    }

    public deselect(stacks: ItemStack[]): void {
        stacks.forEach(s => this.selected.delete(s));
    }

    public pushSelectedToReservation(): void {
        this.selected.forEach((stack: ItemStack) => {
            this._added.add(stack);
            this.addedCount += stack.selectedCount;
        });
        this.selected.clear();
    }

    public filter(query: string): ItemStack[] {
        let filtered: Item[] = this.itemFilter.transform(this._allItems, query);
        this._filteredItems = convert(filtered);
        return this._filteredItems;
    }

    // FIXME should not be rebuilt all the time
    get added(): Item[] {
        let items: Item[] = [];
        this._added.forEach((stack: ItemStack) => {
            items = items.concat(Array.from(stack.items).slice(0, stack.selectedCount));
        });

        return items;
    }

}
