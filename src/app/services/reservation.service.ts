import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Reservation } from '../model/reservation';
import { Item } from '../model/item';

@Injectable()
export class ReservationService {

    constructor(private af: AngularFire) {
    }

    public add(reservation: Reservation): firebase.Promise<void> {
        return this.af.database.list('/reservations').push({
            uid: reservation.uid,
            name: reservation.name,
            begin: reservation.begin,
            end: reservation.end,
            reserved: reservation.items.map((item: Item) => {
                return item.id;
            })
        });
    }

}
