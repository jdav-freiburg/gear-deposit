import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Item, Reservation } from '../model';
import { ItemService } from './item.service';

@Injectable()
export class ReservationService {

    constructor(private af: AngularFire, private itemService: ItemService) {
    }

    public add(reservation: Reservation): firebase.Promise<void> {
        return this.af.database.list('/reservations').push({
            uid: reservation.uid,
            name: reservation.name,
            begin: reservation.begin.getTime(),
            end: reservation.end.getTime(),
            items: reservation.items.map((item: Item) => {
                return item.id;
            })
        });
    }

    private convertFromDB(items: Item[], dbReservation: any): Reservation {
        return <Reservation>{
            id: dbReservation.$key,
            name: dbReservation.name,
            begin: new Date(dbReservation.begin),
            end: new Date(dbReservation.end),
            items: items.filter((item: Item) => {
                return !!dbReservation.items.find((id: string) => {
                    return id === item.id;
                });
            })
        };
    }

    public all(): Observable<Set<Reservation>> {
        let now: number = Date.now();

        return Observable.zip(
            this.itemService.items,
            this.af.database.list('/reservations'),
            (items: Item[], reservations: any[]) => {
                let result: Set<Reservation> = new Set<Reservation>();

                reservations.forEach((reservation: any) => {
                    if (reservation.begin >= now || reservation.end >= now) {
                        result.add(this.convertFromDB(items, reservation));
                    }
                });

                return result;
            });
    }

    public get(id: string): Observable<Reservation> {
        return Observable.zip(
            this.itemService.items,
            this.af.database.object(`/reservations/${id}`),
            (items: Item[], reservation: any) => {
                return this.convertFromDB(items, reservation);
            });
    }

    public remove(id: string): firebase.Promise<void> {
        return this.af.database.object(`/reservations/${id}`).remove();
    }

}
