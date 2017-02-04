import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemStack, Reservation, UiMessage, UiMessageType } from '../../../model';
import { AppRouterService, LoadingService, ReservationService, UiMessageService } from '../../../services';
import { ROUTE } from '../../..';
import { FooterComponent } from '../../footer/footer.component';
import { ItemsComponent } from '../../items';
import { ReservationStateService } from '../reservation-state.service';

export class ReservationValidation {

    constructor(private reservation: Reservation) {
    }

    get valid(): boolean {
        return this.reservation.name &&
            this.reservation.begin && this.reservation.end &&
            this.reservation.items.length > 0;
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

export class FooterState {

    constructor(private reservationState: ReservationStateService) {
    }

    get submitIcon(): string {
        return 'add';
    }

    get submitTitle(): string {
        return (this.reservationState.selected.size > 1 ? 'Gegenstände ' : 'Gegenstand ') + 'hinzufügen';
    }

    get description(): string {
        if (this.reservationState.addedCount > 0) {
            return this.reservationState.addedCount +
                (this.reservationState.addedCount > 1 ? ' Gegenstände ' : ' Gegenstand ') + 'in Reservierung';
        }
    }

}

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss'],
    providers: [ReservationStateService]
})
export class NewReservationComponent implements OnInit {

    @ViewChild('footerComponent') private footerComponent: FooterComponent;
    @ViewChild('itemsComponent') private itemsComponent: ItemsComponent;

    minDateValue: string = new Intl.DateTimeFormat('de-DE').format(new Date());

    validation: ReservationValidation;
    footerState: FooterState;

    constructor(private appRouter: AppRouterService,
                private reservationService: ReservationService,
                private reservationState: ReservationStateService,
                private uiMessage: UiMessageService,
                private loadingService: LoadingService) {
        this.footerState = new FooterState(this.reservationState);
    }

    ngOnInit() {
        this.loadingService.emitLoading(true);
        this.reservationState.initialized.subscribe(() => {
            this.validation = new ReservationValidation(this.reservationState.reservation);
            this.loadingService.emitLoading(false);
        });
    }

    get state(): ReservationStateService {
        return this.reservationState;
    }

    get reservation(): Reservation {
        return this.reservationState.reservation;
    }

    onSelected(stacks: ItemStack[]): void {
        console.debug('#onSelected();', stacks);
        this.reservationState.select(stacks);
    }

    onDeselected(stacks: ItemStack[]): void {
        console.debug('#onDeselected();', stacks);
        this.reservationState.deselect(stacks);
    }

    onFooterSubmit(): void {
        console.log('#onFooterSubmit();');
        this.reservationState.pushSelectedToReservation();
        this.footerComponent.open();
    }

    saveReservation(): void {
        console.time('#saveReservation();');

        const reservation: Reservation = {
            user: this.reservationState.reservation.user,
            name: this.reservationState.reservation.name,
            begin: this.reservationState.reservation.dates.begin,
            end: this.reservationState.reservation.dates.end,
            items: this.reservationState.added
        };

        console.log('#saveReservation();', reservation);
        this.reservationService.add(reservation)
            .then(() => {
                this.appRouter.navigate(ROUTE.RESERVATIONS);
                this.uiMessage.emitInfo('Reservierung gespeichert');
                console.info('#saveReservation(); done');
                console.timeEnd('#saveReservation();');
            })
            .catch((err: any) => {
                console.error('#saveReservation(); got error while saving', err);
                this.uiMessage.emitError('Unbekannter Fehler - Reservierung nicht gespeichert');
                console.timeEnd('#saveReservation();');
            });
    }

}
