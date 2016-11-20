import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
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

    public add(reservation: Reservation): firebase.Promise<void> {
        return this.af.database.list('/reservations').push({
            uid: reservation.user.uid,
            name: reservation.name,
            begin: reservation.begin.getTime(),
            end: reservation.end.getTime(),
            items: reservation.items.map((item: Item) => {
                return item.id;
            })
        });
    }

    private convertFromDB(dbReservation: any): Reservation {
        return <Reservation>{
            id: dbReservation.$key,
            user: this.user,
            name: dbReservation.name,
            begin: new Date(dbReservation.begin),
            end: new Date(dbReservation.end),
            items: this.items.filter((item: Item) => {
                return !!dbReservation.items.find((id: string) => {
                    return id === item.id;
                });
            })
        };
    }

    public all$(): Observable<Set<Reservation>> {
        let now: number = Date.now();

        return this.af.database.list('/reservations').map((reservations: any[]) => {
            let result: Set<Reservation> = new Set<Reservation>();

            reservations.forEach((reservation: any) => {
                if (reservation.begin >= now || reservation.end >= now) {
                    result.add(this.convertFromDB(reservation));
                }
            });

            return result;
        });
    }

    public get$(id: string): Observable<Reservation> {
        return this.af.database.object(`/reservations/${id}`).map((reservation: any) => {
            return this.convertFromDB(reservation);
        });
    }

    public remove(id: string): firebase.Promise<void> {
        return this.af.database.object(`/reservations/${id}`).remove();
    }

}
