import { Component, OnInit } from '@angular/core';
import { Item, Reservation, RegisteredUser } from '../../../model';
import { AppRouterService, ItemService, ReservationService, UiMessageService, UserService } from '../../../services';
import { ROUTE } from '../../../app.routes';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {
    private reserved: Set<Item> = new Set<Item>();

    private reservation: Reservation;
    private items: Item[];

    constructor(private appRouter: AppRouterService, private reservationService: ReservationService,
                private uiMessage: UiMessageService,
                private userService: UserService, private itemService: ItemService) {
    }

    ngOnInit() {
        this.userService.getRegisteredUser().subscribe((user: RegisteredUser) => {
            this.reservation = <Reservation>{
                user: user,
                name: '',
                begin: null,
                end: null,
                items: []
            };
        });
        this.itemService.items.subscribe((items: Item[]) => {
            this.items = items;
        });
    }

    private addToReserved(items: Set<Item>): void {
        let i = 0;
        items.forEach((item: Item) => {
            this.reserved.add(item);
            i++;
        });
        this.uiMessage.emitInfo(`${i} Gegenstände hinzugefügt.`);
    }

    private removeFromReserved(items: Set<Item>): void {
        let i = 0;
        items.forEach((item: Item) => {
            this.reserved.delete(item);
            i++;
        });
        this.uiMessage.emitInfo(`${i} Gegenstände entfernt.`);
    }

    private saveReservation(): void {
        this.reservation.items = Array.from(this.reserved);
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
