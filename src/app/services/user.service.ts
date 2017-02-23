import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import { RegisteredUser, AuthUser } from '../model';
import { AuthService } from './auth.service';
import { UiMessageService } from './ui-message.service';

@Injectable()
export class UserService {

    private registeredUser: RegisteredUser;

    constructor(private af: AngularFire, private authService: AuthService, private uiMessageService: UiMessageService) {
    }

    reset(): void {
        this.registeredUser = undefined;
    }

    isRegistered$(): Observable<boolean> {
        if (this.registeredUser === undefined) {
            return this.getRegisteredUser$().map((user: RegisteredUser) => {
                return user !== undefined;
            });
        }

        return Observable.from([this.registeredUser !== undefined]);
    }

    getRegisteredUser$(): Observable<RegisteredUser> {
        if (this.registeredUser === undefined) {
            const subject: Subject<RegisteredUser> = new Subject<RegisteredUser>();

            this.authService.getAuthUser$().subscribe((authUser: AuthUser) => {
                if (authUser === null) {
                    console.warn('#getRegisteredUser$(); will emit nothing');
                    subject.complete();
                } else {
                    this.getUser(authUser.uid).subscribe((user: RegisteredUser) => {
                        console.debug('#getRegisteredUser$(); will emit ', user);
                        subject.next(user);
                        subject.complete();
                    });
                }
            });

            return subject;
        }

        return Observable.from([this.registeredUser]);
    }

    getUnconfirmedUsers$(): Observable<Set<RegisteredUser>> {
        const unconfirmedUsers: Set<RegisteredUser> = new Set<RegisteredUser>();
        const subject: Subject<Set<RegisteredUser>> = new Subject<Set<RegisteredUser>>();
        this.af.database.list('/users').subscribe((users: any[]) => {
            users.forEach((user: any) => {
                if (!user.confirmed) {
                    unconfirmedUsers.add(<RegisteredUser>{
                        uid: user.$key,
                        registered: new Date(user.registered),
                        confirmed: false,
                        name: user.name,
                        email: user.email,
                        photoUrl: user.photoUrl,
                        youthGroup: user.youthGroup,
                        roles: user.roles
                    });
                }
            });
            console.debug('#getUnconfirmedUsers$(); will emit ', unconfirmedUsers);
            subject.next(unconfirmedUsers);
            subject.complete();
        });

        return subject;
    }

    confirmUser(id: string): firebase.Promise<void> {
        if (this.registeredUser === undefined) {
            console.error('#confirmUser(); current user is unknown.');
            this.uiMessageService.emitError('Ein Fehler ist aufgetreten.');
            return null;
        }

        console.debug(`#confirmUser(); id=${id} by`, this.registeredUser);
        return this.af.database.object(`/users/${id}`).update({
            confirmed: {
                state: 'valid',
                by: this.registeredUser.uid,
                when: Date.now()
            }
        });
    }

    registerUser(id: string, user: RegisteredUser): firebase.Promise<void> {
        console.debug(`#registerUser(); id=${id}, user=`, user);
        return this.af.database.object(`/users/${id}`).set({
            registered: Date.now(),
            name: user.name,
            email: user.email,
            photoUrl: user.photoUrl,
            youthGroup: user.youthGroup
        });
    }

    private getUser(id: string): Observable<RegisteredUser> {
        return this.af.database.object(`/users/${id}`).map((user: any) => {
            const exists: boolean = user.$exists();
            console.debug(`#getUser(); id=${id}, exists=${exists}`);
            if (exists) {
                this.registeredUser = <RegisteredUser>{
                    uid: id,
                    registered: new Date(user.registered),
                    name: user.name,
                    email: user.email,
                    photoUrl: user.photoUrl,
                    youthGroup: user.youthGroup,
                    confirmed: user.confirmed,
                    roles: user.roles
                };
            }
            return this.registeredUser;
        });
    }

}
