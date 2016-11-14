import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFire } from 'angularfire2';
import { RegisteredUser, AuthUser } from '../model/user';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    private registeredUser: RegisteredUser;

    constructor(private af: AngularFire, private authService: AuthService) {
    }

    public reset(): void {
        this.registerUser = undefined;
    }

    public isRegistered(): Observable<boolean> {
        if (this.registeredUser === undefined) {
            return this.getRegisteredUser().map((user: RegisteredUser) => {
                return user !== undefined;
            });
        }

        return Observable.from([this.registeredUser !== undefined]);
    }

    public getRegisteredUser(): Observable<RegisteredUser> {
        if (this.registeredUser === undefined) {
            console.trace('#getRegisteredUser();');

            let subject: Subject<RegisteredUser> = new Subject<RegisteredUser>();

            this.authService.getAuthUser().subscribe((authUser: AuthUser) => {
                console.debug('getRegisteredUser(); authUser=', authUser);
                if (authUser === null) {
                    console.warn('getRegisteredUser(); will emit nothing');
                    subject.complete();
                } else {
                    this.getUser(authUser.uid).subscribe((user: RegisteredUser) => {
                        console.debug('getRegisteredUser(); will emit ', user);
                        subject.next(user);
                        subject.complete();
                    });
                }
            });
            return subject;
        }

        return Observable.from([this.registeredUser]);
    }

    public registerUser(id: string, user: RegisteredUser): firebase.Promise<void> {
        console.trace(`#registerUser(); id=${id}, user=`, user);
        return this.af.database.object(`/users/${id}`).set(user);
    }

    private getUser(id: string): Observable<RegisteredUser> {
        return this.af.database.object(`/users/${id}`).map((user: any) => {
            let exists: boolean = user.$exists();
            console.debug(`#getUser(); id=${id}, exists=${exists}`);
            if (exists) {
                this.registeredUser = <RegisteredUser>{
                    uid: id,
                    name: user.name,
                    email: user.email,
                    youthGroup: user.youthGroup,
                    roles: user.roles
                };
            }
            return this.registeredUser;
        });
    }

}
