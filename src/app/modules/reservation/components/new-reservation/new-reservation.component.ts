import { Location } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ROUTE } from '../../../../';
import { Reservation } from '../../../../model';
import { AppRouterService, LoadingService, ReservationService, UiMessageService } from '../../../../services';
import { ReservationStateService } from '../../services/reservation-state.service';

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss'],
    providers: [ReservationStateService]
})
export class NewReservationComponent implements OnInit, AfterContentInit {

    @ViewChild('nameInput') nameInput: ElementRef;

    minDateValue: string = new Intl.DateTimeFormat('de-DE').format(new Date());

    constructor(private location: Location,
                private appRouter: AppRouterService,
                private reservationService: ReservationService,
                private reservationState: ReservationStateService,
                private uiMessage: UiMessageService,
                private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadingService.emitLoading(true);
        this.reservationState.initialized.subscribe(() => {
            this.loadingService.emitLoading(false);
        });
    }

    ngAfterContentInit(): void {
        this.nameInput.nativeElement.focus();
    }

    get reservation(): Reservation {
        return this.reservationState.reservation;
    }

    // FIXME may be extracted to Reservation class
    isValid(): boolean {
        return this.reservation.name &&
            this.reservation.begin && this.reservation.end &&
            this.reservationState.added.length > 0;
    }

    cancel() {
        this.location.back();
    }

    saveReservation() {
        if (!this.isValid()) {
            if (!this.reservation.name) {
                console.warn('#saveReservation(); `name` is missing');
            }
            if (!this.reservation.begin) {
                console.warn('#saveReservation(); `begin` is missing');
            }
            if (!this.reservation.end) {
                console.warn('#saveReservation(); `end` is missing');
            }
            // FIXME may be called twice
            if (this.reservationState.added.length === 0) {
                console.warn('#saveReservation(); no items in reservation');
            }
            return;
        }

        const reservation: Reservation = {
            user: this.reservationState.reservation.user,
            name: this.reservationState.reservation.name,
            begin: this.reservationState.reservation.dates.begin,
            end: this.reservationState.reservation.dates.end,
            items: this.reservationState.added
        };

        console.log('#saveReservation();', reservation);
        console.time('#saveReservation();');
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
