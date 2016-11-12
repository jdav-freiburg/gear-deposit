export enum Role {
    ADMIN = 1
}

export interface RegisteredUser {
    name: string;
    email: string;
    youthGroup: string;
    roles?: Role[];
}

export interface AuthUser extends firebase.User {
}

export interface UserAuthStatus {
    isAuthorized: boolean;
    isRegistered: boolean;
    hasAdminRole: boolean;
}
