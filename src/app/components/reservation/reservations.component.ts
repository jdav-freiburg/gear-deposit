import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ROUTE } from '../../app.routes';
import { Reservation } from '../../model';
import { ReservationService } from '../../services';
import { UiMessageService } from '../../services/ui-message.service';

@Component({
    selector: 'jgd-reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private reservations: Set<Reservation>;

    constructor(private reservationService: ReservationService, private uiMessageService: UiMessageService,
                private router: Router) {
    }

    ngOnInit() {
        this.subscription = this.reservationService.all().subscribe((reservations: Set<Reservation>) => {
            this.reservations = reservations;
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
            this.reservations.delete(reservation);
            this.uiMessageService.emitInfo(`Reservierung '${reservation.name}' gelöscht`);
        });
    }

}
