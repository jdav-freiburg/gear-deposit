import { MdDialogRef } from '@angular/material';
import { AngularFire, AngularFireAuth, AngularFireDatabase } from 'angularfire2';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Item, RegisteredUser, Reservation } from '../app/model';
import { ReservationStateService } from '../app/modules/reservation/services/reservation-state.service';
import {
    AuthService,
    ItemService,
    ReservationService,
    UiMessageService,
    UserAuthStatusService,
    UserService
} from '../app/services';
import { Mocks } from './mocks';

export namespace Fakes {

    function createAngularFireAuthFake(): AngularFireAuth {
        return {
            getAuth: () => {
                return {
                    uid: Mocks.MOCKED_AUTH_USER.uid,
                    auth: Mocks.MOCKED_AUTH_USER
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
                return Observable.of(Mocks.MOCKED_AUTH_USER);
            },
            isAuthorized$: () => {
                return Observable.of(true);
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
                return Observable.of(Mocks.MOCKED_USER_AUTH_STATUS);
            },
            reset: {}
        } as UserAuthStatusService;
    }

    export function createMdDialogRefFake(): MdDialogRef<void> {
        const afterClosed: Observable<any> = new Subject<any>();
        const dialogRef = jasmine.createSpyObj('MdDialogRef', ['afterClosed']);
        dialogRef.afterClosed.and.returnValue(afterClosed);
        return dialogRef;
    }

    export function createItemServiceFake(): ItemService {
        return {
            items$: () => {
                return Observable.of(Mocks.MOCK_ITEMS);
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
                return Observable.of(Mocks.MOCKED_RESERVATIONS);
            },
            get$: (id: string) => {
                return Observable.of(
                    Array.from(Mocks.MOCKED_RESERVATIONS).find((r: Reservation) => {
                        return r.id === id;
                    })
                );
            },
            remove: (id: string) => {
            }
        } as ReservationService;
    }

    export function createReservationStateServiceFake(): ReservationStateService {
        const initialized: Subject<void> = new ReplaySubject<void>();
        const blockedChange: Subject<void> = new ReplaySubject<void>();
        return {
            initialized: initialized,

            blockedChange: blockedChange,

            stacks: Mocks.createItemStacks(9)

        } as ReservationStateService;
    }

    export function createUserServiceFake(): UserService {
        return {
            reset: () => {
            },
            isRegistered$: () => {
                return Observable.of(true);
            },
            getRegisteredUser$: () => {
                return Observable.of(Mocks.MOCKED_REGISTERED_USER);
            },
            registerUser: (id: string, user: RegisteredUser) => {
            }
        } as UserService;
    }

    const AUTH_SERVICE_FAKE = {provide: AuthService, useValue: createAuthServiceFake()};

    const ITEM_SERVICE_FAKE = {provide: ItemService, useValue: createItemServiceFake()};

    const RESERVATION_SERVICE_FAKE = {provide: ReservationService, useValue: createReservationServiceFake()};

    // const RESERVATION_STATE_SERVICE_FAKE = {
    //     provide: ReservationStateService,
    //     useValue: createReservationStateServiceFake()
    // };

    const USER_SERVICE_FAKE = {provide: UserService, useValue: createUserServiceFake()};

    export const PROVIDERS = [
        AUTH_SERVICE_FAKE,
        ITEM_SERVICE_FAKE,
        RESERVATION_SERVICE_FAKE,
        // RESERVATION_STATE_SERVICE_FAKE,
        USER_SERVICE_FAKE
    ];

}


