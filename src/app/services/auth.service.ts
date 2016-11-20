import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthUser } from '../model/user';

@Injectable()
export class AuthService {

    private authUser: AuthUser;
    private authorized: boolean;

    constructor(private af: AngularFire) {
    }

    public getAuthUser$(): Observable<AuthUser> {
        if (this.authUser === undefined) {
            console.trace('#getAuthUser$();');
            return this.af.auth.map((authState: FirebaseAuthState) => {
                this.authUser = (authState != null && authState.auth !== undefined) ? authState.auth : null;
                console.trace('#getAuthUser$(); authUser=', this.authUser);
                return this.authUser;
            });
        }

        return Observable.from([this.authUser]);
    }

    public isAuthorized$(): Observable<boolean> {
        if (this.authorized === undefined) {
            console.trace('#isAuthorized$();');
            return this.af.auth.map((authState: FirebaseAuthState) => {
                this.authorized = authState != null && authState.auth !== undefined;
                console.trace(`#isAuthorized(); authorized=${this.authorized}`);
                return this.authorized;
            });
        }

        return Observable.from([this.authorized]);
    }

    public loginGoogle(): firebase.Promise<FirebaseAuthState> {
        console.trace('#loginGoogle()');
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Redirect
        });
    }

    private isSet(value: string): boolean {
        return value !== undefined || value.trim().length > 0;
    }

    public loginPW(email: string, password: string): firebase.Promise<FirebaseAuthState> {
        console.trace('#loginPW()');
        if (!this.isSet(email) || !this.isSet(password)) {
            throw new Error(`email, password not set: ${email}, ${password}`);
        }

        return this.af.auth.login({
            email: email,
            password: password,
        }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        });
    }

    public logout(): void {
        console.trace('#logout()');
        this.af.auth.logout();
    }

    public reset(): void {
        this.authUser = undefined;
        this.authorized = undefined;
    }

}
