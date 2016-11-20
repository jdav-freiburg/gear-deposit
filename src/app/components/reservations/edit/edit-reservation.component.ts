import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Reservation } from '../../../model';
import { ReservationService } from '../../../services';

@Component({
    selector: 'jgd-edit-reservation',
    templateUrl: './edit-reservation.component.html',
    styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

    private reservation: Reservation;

    constructor(private activatedRoute: ActivatedRoute, private reservationService: ReservationService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.reservationService.get$(params['id']).subscribe(r => this.reservation = r);
        });
    }

}
