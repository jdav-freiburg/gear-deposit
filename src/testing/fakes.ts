import { AngularFire, AngularFireAuth, AngularFireDatabase } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import {
    MOCKED_AUTH_USER,
    MOCKED_REGISTERED_USER,
    createMockItem,
    MOCKED_RESERVATIONS,
    MOCKED_USER_AUTH_STATUS
} from './mocks';
import { Item, RegisteredUser, Reservation } from '../app/model';
import {
    AuthService,
    ItemService,
    ReservationService,
    UiMessageService,
    UserAuthStatusService,
    UserService
} from '../app/services';

function createAngularFireAuthFake(): AngularFireAuth {
    return {
        getAuth: () => {
            return {
                uid: MOCKED_AUTH_USER.uid,
                auth: MOCKED_AUTH_USER
            };
        }
    } as AngularFireAuth;
}

function createAngularFireDatabaseFake(): AngularFireDatabase {
    return {
        list: (ref: string) => {
        },
        object: (ref: string) => {
        }
    } as AngularFireDatabase;
}

export function createAngularFireFake(): AngularFire {
    const auth = createAngularFireAuthFake();
    const database = createAngularFireDatabaseFake();
    return {
        auth: auth,
        database: database
    } as AngularFire;
}

export function createAuthServiceFake(): AuthService {
    return {
        getAuthUser$: () => {
            return Observable.from([MOCKED_AUTH_USER]);
        },
        isAuthorized$: () => {
            return Observable.from([true]);
        }
    } as AuthService;
}

export function createUiMessageServiceFake(): UiMessageService {
    return {
        emitInfo: (message: string) => {
        },
        emitError: (message: string) => {
        }
    } as UiMessageService;
}

export function createUserAuthStatusServiceFake(): UserAuthStatusService {
    return {
        getUserAuthStatus$: () => {
            return Observable.from([MOCKED_USER_AUTH_STATUS]);
        },
        reset: {}
    } as UserAuthStatusService;
}

export function createItemServiceFake(): ItemService {
    return {
        items$: () => {
            return Observable.from([
                [
                    createMockItem(1),
                    createMockItem(2)
                ]
            ]);
        },
        types$: () => {
        },
        update: (id: string, item: Item) => {
        }
    } as ItemService;
}

export function createReservationServiceFake(): ReservationService {
    return {
        add: (reservation: Reservation) => {
        },
        all$: () => {
            return Observable.from([MOCKED_RESERVATIONS]);
        },
        get$: (id: string) => {
            return Observable.from([
                Array.from(MOCKED_RESERVATIONS).find((r: Reservation) => {
                    return r.id === id;
                })
            ]);
        },
        remove: (id: string) => {
        }
    } as ReservationService;
}

export function createUserServiceFake(): UserService {
    return {
        reset: () => {
        },
        isRegistered$: () => {
            return Observable.from([true]);
        },
        getRegisteredUser$: () => {
            return Observable.from([MOCKED_REGISTERED_USER]);
        },
        registerUser: (id: string, user: RegisteredUser) => {
        }
    } as UserService;
}
