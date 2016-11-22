import { Component, OnInit } from '@angular/core';
import { Item, Reservation, RegisteredUser } from '../../../model';
import { AppRouterService, ItemService, ReservationService, UiMessageService, UserService } from '../../../services';
import { ROUTE } from '../../../app.routes';
import { ItemStacks } from '../../../model/item';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {
    private reservation: Reservation;
    private items: Set<Item>;

    private reservedListIsToggled = true;

    private selected: Set<Item> = new Set();
    private reserved: ItemStacks = new ItemStacks();

    constructor(private appRouter: AppRouterService, private reservationService: ReservationService,
                private uiMessage: UiMessageService,
                private userService: UserService, private itemService: ItemService) {
    }

    ngOnInit() {
        this.userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
            this.reservation = <Reservation>{
                user: user,
                name: '',
                begin: null,
                end: null,
                itemStacks: new ItemStacks()
            };
        });
        this.itemService.items$().subscribe((items: Item[]) => {
            this.items = new Set(items);
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
        console.debug('#addSelectedToReservation();');
        this.selected.forEach((item: Item) => {
            item.flagged = false;
            this.items.delete(item);
            this.reserved.add(item);
        });
        this.selected.clear();
    }

    private saveReservation(): void {
        this.reservation.itemStacks = this.reserved;
        this.reservation.begin = new Date(this.reservation.begin);
        this.reservation.end = new Date(this.reservation.end);
        console.log('#saveReservation();', this.reservation);
        this.reservationService.add(this.reservation)
            .then(() => {
                this.appRouter.navigate(ROUTE.RESERVATIONS);
                this.uiMessage.emitInfo('Reservierung gespeichert');
            })
            .catch((err: any) => {
                console.error('#saveReservation(); got error while saving', err);
                this.uiMessage.emitError('Unbekannter Fehler - Reservierung nicht gespeichert');
            });
    }

}
