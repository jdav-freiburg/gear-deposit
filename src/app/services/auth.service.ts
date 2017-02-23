import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthUser } from '../model/user';

@Injectable()
export class AuthService {

    private authUser: AuthUser;
    private authorized: boolean;

    constructor(private af: AngularFire) {
    }

    getAuthUser$(): Observable<AuthUser> {
        if (this.authUser === undefined) {
            return this.af.auth.map((authState: FirebaseAuthState) => {
                this.authUser = (authState != null && authState.auth !== undefined) ? authState.auth : null;
                console.debug('#getAuthUser$(); authUser', this.authUser);
                return this.authUser;
            });
        }

        return Observable.from([this.authUser]);
    }

    isAuthorized$(): Observable<boolean> {
        if (this.authorized === undefined) {
            return this.af.auth.map((authState: FirebaseAuthState) => {
                this.authorized = authState != null && authState.auth !== undefined;
                return this.authorized;
            });
        }

        return Observable.from([this.authorized]);
    }

    loginGoogle(): firebase.Promise<FirebaseAuthState> {
        console.debug('#loginGoogle()');
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Redirect
        });
    }

    private isSet(value: string): boolean {
        return value !== undefined || value.trim().length > 0;
    }

    loginPW(email: string, password: string): firebase.Promise<FirebaseAuthState> {
        console.debug('#loginPW()');
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

    logout(): void {
        console.log('#logout()');
        this.af.auth.logout();
    }

    reset(): void {
        this.authUser = undefined;
        this.authorized = undefined;
    }

}
