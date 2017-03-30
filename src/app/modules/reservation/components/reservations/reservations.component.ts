import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ROUTE } from '../../../../';
import { Reservation } from '../../../../model';
import { LoadingService, ReservationService, UiMessageService } from '../../../../services';

@Component({
    selector: 'jgd-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {

    loading = true;

    reservations: Reservation[];

    private subscription: Subscription;

    constructor(private reservationService: ReservationService,
                private uiMessageService: UiMessageService,
                private loadingService: LoadingService,
                private router: Router) {
    }

    ngOnInit() {
        this.loadingService.emitLoading(true);
        this.subscription = this.reservationService.all$().subscribe((reservations: Reservation[]) => {
            this.loading = false;
            this.reservations = reservations;
            this.loadingService.emitLoading(false);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    navigateToEdit(reservation: Reservation) {
        this.router.navigate([
            '/' + ROUTE.RESERVATIONS.path,
            reservation.id,
            'edit'
        ]);
    }

    remove(reservation: Reservation) {
        this.reservationService.remove(reservation.id).then(() => {
            this.reservations = this.reservations.filter((r: Reservation) => {
                return r.id !== reservation.id;
            });
            this.uiMessageService.emitInfo(`Reservierung '${reservation.name}' gelöscht`);
        });
    }

}
