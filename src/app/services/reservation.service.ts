import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { Item, RegisteredUser, Reservation } from '../model';
import { ItemService } from './item.service';
import { UserService } from './user.service';

@Injectable()
export class ReservationService {

    items: Item[];
    user: RegisteredUser;

    constructor(private af: AngularFire, itemService: ItemService, userService: UserService) {
        userService.getRegisteredUser$().subscribe((user: RegisteredUser) => {
            this.user = user;
        });
        itemService.items$().subscribe((items: Item[]) => {
            this.items = items;
        });
    }

    add(reservation: Reservation): firebase.Promise<void> {
        const itemIds: string[] = [];
        reservation.items.forEach(i => itemIds.push(i.id));
        return this.af.database.list('/reservations').push({
            uid: reservation.user.uid,
            name: reservation.name,
            begin: reservation.begin.getTime(),
            end: reservation.end.getTime(),
            items: itemIds
        });
    }

    private convertFromDB(dbReservation: any): Reservation {
        const items: Item[] = [];
        dbReservation.items.forEach((itemId: string) => {
            const item = this.items.find(i => itemId === i.id);
            items.push(item);
        });

        return <Reservation>{
            id: dbReservation.$key,
            user: this.user,
            name: dbReservation.name,
            begin: new Date(dbReservation.begin),
            end: new Date(dbReservation.end),
            items: items
        };
    }

    all$(): Observable<Reservation[]> {
        const now: number = Date.now();

        return this.af.database.list('/reservations').map((reservations: any[]) => {
            const result: Reservation[] = [];

            reservations.forEach((reservation: any) => {
                if (reservation.begin >= now || reservation.end >= now) {
                    result.push(this.convertFromDB(reservation));
                }
            });

            return result;
        });
    }

    get$(id: string): Observable<Reservation> {
        return this.af.database.object(`/reservations/${id}`).map((reservation: any) => {
            return this.convertFromDB(reservation);
        });
    }

    remove(id: string): firebase.Promise<void> {
        return this.af.database.object(`/reservations/${id}`).remove();
    }

}
