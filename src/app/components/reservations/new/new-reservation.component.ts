import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, Reservation, RegisteredUser } from '../../../model';
import { AppRouterService, ItemService, ReservationService, UiMessageService, UserService } from '../../../services';
import { ROUTE } from '../../../app.routes';
import { ItemStacks } from '../../../model/item';
import { FooterComponent } from '../../footer/footer.component';
import { UiMessage, UiMessageType } from '../../../model/ui-message';
import { ItemsComponent } from '../../items/items.component';
import { LoadingService } from '../../../services/loading.service';

class ReservationValidation {

    constructor(private reservation: Reservation) {
    }

    get valid(): boolean {
        return this.reservation.name &&
            this.reservation.begin && this.reservation.end &&
            this.reservation.itemStacks.items.size > 0;
    }

    get messages(): any {
        return {
            invalidName: <UiMessage>{
                message: '"Beschreibung" der Ausfahrt fehlt.',
                type: UiMessageType.WARNING
            },
            invalidDate: <UiMessage>{
                message: '"Beginn" und "Ende" der Ausfahrt fehlt.',
                type: UiMessageType.WARNING
            }
        };
    }
}

class FooterState {

    constructor(private selected: Set<Item>, private reserved: ItemStacks) {
    }

    get submitIcon(): string {
        return 'add';
    }

    get submitTitle(): string {
        return (this.selected.size > 1 ? 'Gegenstände ' : 'Gegenstand ') + 'hinzufügen';
    }

    get description(): string {
        if (this.reserved.items.size > 0) {
            return this.reserved.items.size +
                (this.reserved.items.size > 1 ? ' Gegenstände ' : ' Gegenstand ') + 'in Reservierung';
        }
    }

}

interface OnDateChange {
    onBeginChange(date: Date): void;
    onEndChange(date: Date): void;
}

interface ReservationDates {
    begin: Date;
    end: Date;
}

class NewReservation implements Reservation {

    name: string;
    itemStacks: ItemStacks;

    /**
     * Stores valid date objects, as values from date inputs are strings.
     */
    dates: ReservationDates;

    private _begin: Date;
    private _end: Date;

    constructor(public user: RegisteredUser, private onDateChange: OnDateChange) {
        this.user = user;
        this.itemStacks = new ItemStacks();
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
}

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

    @ViewChild('footerComponent') private footerComponent: FooterComponent;
    @ViewChild('itemsComponent') private itemsComponent: ItemsComponent;

    private minDateValue: string = new Intl.DateTimeFormat('de-DE').format(new Date());

    private reservation: NewReservation;
    private reservations: Set<Reservation>;
    private items: Set<Item>;

    private selected: Set<Item> = new Set();
    private reserved: ItemStacks = new ItemStacks();

    private reservationValidation: ReservationValidation;
    private footerState: FooterState;

    constructor(private appRouter: AppRouterService,
                private reservationService: ReservationService,
                private uiMessage: UiMessageService,
                private userService: UserService,
                private itemService: ItemService,
                private loadingService: LoadingService) {

        this.footerState = new FooterState(this.selected, this.reserved);
    }

    ngOnInit() {
        this.loadingService.emitLoading(true);
        this.userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
            this.reservation = new NewReservation(user, {
                onBeginChange: (date: Date) => {
                    if (this.reservation.dates.end === null) {
                        return;
                    }

                    let blocked: Set<Item> = new Set<Item>();
                    this.reservations.forEach((reservation: Reservation) => {
                        if ((date >= reservation.begin && this.reservation.dates.end <= reservation.end) ||
                            (date <= reservation.end && this.reservation.dates.begin >= reservation.begin )) {
                            reservation.itemStacks.items.forEach((i: Item) => {
                                blocked.add(i);
                            });
                        }
                    });

                    this.itemsComponent.unblockAll();
                    this.itemsComponent.block(blocked);
                },
                onEndChange: (date: Date) => {
                    if (this.reservation.dates.begin === null) {
                        return;
                    }

                    let blocked: Set<Item> = new Set<Item>();
                    this.reservations.forEach((reservation: Reservation) => {
                        if ((date >= reservation.begin && this.reservation.dates.end <= reservation.end) ||
                            (date <= reservation.end && this.reservation.dates.begin >= reservation.begin )) {
                            reservation.itemStacks.items.forEach((i: Item) => {
                                blocked.add(i);
                            });
                        }
                    });

                    this.itemsComponent.unblockAll();
                    this.itemsComponent.block(blocked);
                }
            });
            this.reservationValidation = new ReservationValidation(this.reservation);
        });

        this.itemService.items$().subscribe((items: Item[]) => {
            this.items = new Set(items);

            // FIXME join these requests
            this.reservationService.all$().subscribe((reservations: Set<Reservation>) => {
                this.reservations = reservations;
                this.loadingService.emitLoading(false);
            });
        });
    }

    private addToSelected(items: Set<Item>): void {
        console.debug('#addToSelected();', Array.from(items));
        items.forEach((item: Item) => {
            this.selected.add(item);
        });
    }

    private removeFromSelected(items: Set<Item>): void {
        console.debug('#removeFromSelected();', Array.from(items));
        items.forEach((item: Item) => {
            this.selected.delete(item);
        });
    }

    private addSelectedToReservation(): void {
        console.log('#addSelectedToReservation();');
        this.selected.forEach((item: Item) => {
            this.items.delete(item);
            this.reserved.add(item);
        });
        this.selected.clear();
        this.footerComponent.open();
    }

    private saveReservation(): void {
        console.time('#saveReservation()');
        let reservation: Reservation = {
            user: this.reservation.user,
            name: this.reservation.name,
            begin: this.reservation.dates.begin,
            end: this.reservation.dates.end,
            itemStacks: this.reserved
        };
        console.log('#saveReservation();', reservation);
        this.reservationService.add(reservation)
            .then(() => {
                this.appRouter.navigate(ROUTE.RESERVATIONS);
                this.uiMessage.emitInfo('Reservierung gespeichert');
                console.info('#saveReservation(); done');
                console.timeEnd('#saveReservation()');
            })
            .catch((err: any) => {
                console.error('#saveReservation(); got error while saving', err);
                this.uiMessage.emitError('Unbekannter Fehler - Reservierung nicht gespeichert');
                console.timeEnd('#saveReservation()');
            });
    }

}
