export enum Role {
    ADMIN = 1
}

export interface RegisteredUser {
    uid: string;
    name: string;
    email: string;
    youthGroup: string;
    roles?: Role[];
}

export interface AuthUser extends firebase.UserInfo {
}

export interface UserAuthStatus {
    isAuthorized: boolean;
    isRegistered: boolean;
    hasAdminRole: boolean;
}
