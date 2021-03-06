import { EventEmitter, Injectable } from '@angular/core';
import { ItemFilterPipe } from 'app/pipes';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { convert, Item, ItemStack, RegisteredUser, Reservation as IReservation } from '../../../model';
import { ItemService, ReservationService, UserService } from '../../../services';

export interface OnDateChange {
    onBeginChange(date: Date): void;
    onEndChange(date: Date): void;
}

export interface ReservationDates {
    begin: Date;
    end: Date;
}

export class Reservation implements IReservation {

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

    set begin(date: Date) {
        this.dates.begin = new Date(date);
        if (this.dates.begin !== this._begin) {
            this._begin = date;
            this.onDateChange.onBeginChange(this.dates.begin);
        }
    }

    get begin(): Date {
        return this._begin;
    }

    set end(date: Date) {
        this.dates.end = new Date(date);
        if (this.dates.end !== this._end) {
            this._end = date;
            this.onDateChange.onEndChange(this.dates.end);
        }
    }

    get end(): Date {
        return this._end;
    }

}

@Injectable()
export class ReservationStateService {

    private _allReservations: Reservation[];
    private _allItems: Item[];
    private _filteredItems: ItemStack[];

    addedCount = 0;

    readonly initialized: Subject<void> = new ReplaySubject<void>();
    readonly blockedChange: EventEmitter<void> = new EventEmitter<void>();

    reservation: Reservation;

    stacks: ItemStack[];

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
                // need to check whether reservation interferes with others or not
                //      | b    |
                //      | b  e |
                //      | b    | e
                // b  e |      |
                //      |      | b  e
                onBeginChange: (date: Date) => {
                    this.unblockAll();
                    this._allReservations.forEach((reservation: Reservation) => {
                        const begin = date;
                        const end = this.reservation.dates.end;
                        // #1 | b |
                        // #2 | b  e |
                        if ((begin >= reservation.begin && begin <= reservation.end) ||
                            (end && begin >= reservation.begin && end <= reservation.end)) {
                            this.block(reservation.items);
                        }
                    });
                    this.blockedChange.emit();
                },
                // need to check whether reservation interferes with others or not
                //      | b    |
                //      | b  e |
                //      | b    | e
                // b  e |      |
                //      |      | b  e
                onEndChange: (date: Date) => {
                    this.unblockAll();
                    this._allReservations.forEach((reservation: Reservation) => {
                        const begin = this.reservation.dates.begin;
                        const end = date;
                        // #1 | e |
                        // #2 | b |
                        if ((end >= reservation.begin && end <= reservation.end) ||
                            (begin && begin >= reservation.begin && begin <= reservation.end)) {
                            this.block(reservation.items);
                        }
                    });
                    this.blockedChange.emit();
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
            this.initialized.next();
        }
    }

    private block(items: Item[]): void {
        console.debug('#block();', items);
        this.stacks.forEach((stack: ItemStack) => {
            const leftover: Item[] = [];
            items.forEach((i: Item) => {
                if (!stack.block(i.id)) {
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

    filter(query: string): ItemStack[] {
        const filtered: Item[] = this.itemFilter.transform(this._allItems, query);
        this._filteredItems = convert(filtered);
        return this._filteredItems;
    }

    // FIXME better use a list specific for selected stacks that is updated all the time (save iterating all stacks)
    get added(): Item[] {
        let items: Item[] = [];
        this.stacks.forEach((stack: ItemStack) => {
            if (stack.selected) {
                items = items.concat(Array.from(stack.items).slice(0, stack.selectedCount));
            }
        });

        return items;
    }

}
