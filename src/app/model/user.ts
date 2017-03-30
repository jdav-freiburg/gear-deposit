/* tslint:disable:no-empty-interface */

export enum Role {
    ADMIN = 1
}

export interface RegisteredUser {
    uid: string;
    registered: Date;
    photoUrl: string;
    name: string;
    email: string;
    youthGroup: string;
    confirmed?: boolean;
    roles?: Role[];
}

export interface AuthUser extends firebase.UserInfo {
}

export interface UserAuthStatus {
    isAuthorized: boolean;
    isRegistered: boolean;
    hasAdminRole: boolean;
}
