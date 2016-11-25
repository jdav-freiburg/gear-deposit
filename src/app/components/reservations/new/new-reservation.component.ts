import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, Reservation, RegisteredUser } from '../../../model';
import { AppRouterService, ItemService, ReservationService, UiMessageService, UserService } from '../../../services';
import { ROUTE } from '../../../app.routes';
import { ItemStacks } from '../../../model/item';
import { FooterComponent } from '../../footer/footer.component';
import { UiMessage, UiMessageType } from '../../../model/ui-message';

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

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit {

    @ViewChild('footer') private footer: FooterComponent;

    private reservation: Reservation;
    private items: Set<Item>;

    private selected: Set<Item> = new Set();
    private reserved: ItemStacks = new ItemStacks();

    private reservationValidation: ReservationValidation;
    private footerState: FooterState;

    constructor(private appRouter: AppRouterService, private reservationService: ReservationService,
                private uiMessage: UiMessageService,
                private userService: UserService, private itemService: ItemService) {
        this.footerState = new FooterState(this.selected, this.reserved);
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
            this.reservationValidation = new ReservationValidation(this.reservation);
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
            this.items.delete(item);
            this.reserved.add(item);
        });
        this.selected.clear();
        this.footer.open();
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
